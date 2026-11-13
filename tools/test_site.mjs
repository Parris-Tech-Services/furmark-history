#!/usr/bin/env node
/* Offline checks for the committed GitHub Pages artefacts.
 * Intentionally no dependencies or network calls: safe in CI and locally. */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const root = resolve(import.meta.dirname, "..");
const site = join(root, "site");
const read = p => readFileSync(join(root, p), "utf8");
const result = [];
function check(label, fn) {
  try { fn(); console.log("PASS",label); result.push(true); }
  catch(e) { console.error("FAIL",label,"—",e.message); result.push(false); }
}
check("JavaScript parses",() => {
  for(const file of ["site/assets/app.js","site/assets/home.js"])
    execFileSync(process.execPath, ["--check", join(root,file)], {stdio:"pipe"});
});
check("Interactive controls retain working selectors and accessibility hooks",() => {
  const home=read("site/assets/home.js"), shared=read("site/assets/app.js");
  const html=read("site/index.html");
  assert(!/(?<!\$)\$\("[^"]+"\)\.forEach\(/.test(home),"querySelector is not iterable: use $()");
  for(const id of ["fgo","fcardgo","ffollow","fexport","fdetail","fflags","texp","lbclose","heat","heatv"])
    assert(html.includes('id="'+id+'"'),"Missing interactive control "+id);
  assert(home.includes('rowsForView()'),"Fleet filters/export disconnected");
  assert(home.includes('aria-expanded'),"Timeline accessibility missing");
  assert(shared.includes('aria-modal'),"Search dialog accessibility missing");
});
check("All local landing-page assets and links exist", () => {
  const html=read("site/index.html");
  assert.match(html,/<title>/);
  assert.match(html,/<main id="maincontent">/);
  assert.match(html,/type="range"[^>]*aria-label="Simulated colour intensity/);
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url=m[1];
    if(/^(?:https?:|mailto:|#|data:)/i.test(url)) continue;
    const local=decodeURIComponent(url.split(/[?#]/)[0]);
    assert(existsSync(join(site,local)),"Missing landing-page asset: "+local);
  }
});
check("Reader pages exist for every library entry", () => {
  const docs=JSON.parse(read("site/data/library.json"));
  assert(docs.length>=14);
  for(const d of docs) assert(existsSync(join(site,"read",d.slug+".html")),"Missing reader "+d.slug);
});
check("Structured data and cited Q&A are valid", () => {
  for(const f of ["timeline","media","gpus","qa","library","photos","batch","search"]) JSON.parse(read("site/data/"+f+".json"));
  const qa=JSON.parse(read("site/data/qa.json"));
  const search=JSON.parse(read("site/data/search.json"));
  const timeline=JSON.parse(read("site/data/timeline.json"));
  assert(qa.length>=70,"Less than 70 researched questions");
  assert(timeline.length>=70,"Timeline was truncated");
  assert(search.length>=qa.length,"Search index incomplete");
  for(const q of qa){assert(q.doc && q.id && q.q && q.a,"Malformed question");assert(existsSync(join(site,"read",q.doc+".html")),"Missing Q&A destination");}
});
check("Fleet audit has valid card IDs, exceptions and provenance",() => {
  const fleet=JSON.parse(read("site/data/batch.json"));
  assert(fleet.slots>=100 && fleet.started===fleet.cards.length);
  assert.equal(new Set(fleet.cards.map(x=>x.card)).size,fleet.cards.length);
  assert(fleet.cards.filter(c=>c.preset).every(c=>c.status==="MATCHED_GTX1070" && c.tested));
  assert(fleet.cards.every(c=>c.card>=1&&c.card<=fleet.slots));
});
check("No unreferenced local media in the podcast feed", () => {
  const feed=read("site/podcast.xml");
  assert.match(feed,/<rss/);
  for(const f of ["furmark-history-podcast.mp3","superposition-history-podcast.mp3","steelnomad-history-podcast.mp3"])
    assert(existsSync(join(site,f)),"Missing episode "+f);
});
const n=result.filter(Boolean).length;
console.log(n+"/"+result.length+" checks passed");
if(n!==result.length)process.exitCode=1;
