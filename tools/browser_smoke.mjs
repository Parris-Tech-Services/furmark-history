#!/usr/bin/env node
/**
 * Browser smoke tests for the committed static site.
 * GitHub Actions provides Google Chrome; npm installs playwright-core at test time.
 * Run locally: npm install --no-save playwright-core && node tools/browser_smoke.mjs
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const site=resolve(dirname(fileURLToPath(import.meta.url)),"..","site");
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",".json":"application/json",".xml":"application/xml",
  ".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",
  ".mp3":"audio/mpeg",".pdf":"application/pdf"};
const server=createServer(async(req,res)=>{
  const u=new URL(req.url,"http://localhost");
  let file=resolve(site,"."+decodeURIComponent(u.pathname));
  if(u.pathname==="/")file=join(site,"index.html");
  if(!file.startsWith(site+"/") && file!==join(site,"index.html")){res.writeHead(403);res.end();return}
  try{
    const info=await stat(file);if(info.isDirectory())file=join(file,"index.html");
    const data=await readFile(file);res.writeHead(200,{"Content-Type":mime[extname(file)]||"application/octet-stream","Cache-Control":"no-cache"});res.end(data);
  }catch(e){res.writeHead(404);res.end("Not found: "+u.pathname)}
});
const chrome=["/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium","/usr/bin/chromium-browser"].find(existsSync);
if(!chrome)throw Error("No system Chrome/Chromium installed; ensure GitHub ubuntu runner has google-chrome-stable");
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
const url="http://127.0.0.1:"+server.address().port+"/";
let browser;const notes=[],errors=[];
const pass=s=>{notes.push(s);console.log("PASS",s)};
try{
  browser=await chromium.launch({headless:true,executablePath:chrome,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
  // Test the Spotify embed URLs and fallbacks, but don't execute untrusted
  // third-party iframe scripts in our own site's JavaScript-error assertion.
  const stubSpotify=route=>route.fulfill({status:200,contentType:"text/html",body:"<!doctype html><title>External Spotify embed test placeholder</title>"});
  await context.route("**/open.spotify.com/**",stubSpotify);
  // External embeds are verified by URL. Exercise first-party scripts and media locally.
  await context.route(/^https:\/\//, route=>route.abort());
  const page=await context.newPage();
  page.on("pageerror",e=>errors.push(e.stack||e.message));
  await page.goto(url,{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>document.querySelector("#ftiles")?.children.length>=5,{timeout:25000});
  assert.match(await page.locator("#ftiles").innerText(),/\d+\s*\/\s*\d+/);
  assert.match(await page.locator("#heatv").innerText(),/^\d+% colour$/);
  pass("Desktop homepage, fleet data and honest colour-only slider");
  const first=page.locator(".ev").first();
  assert(await first.count()>0);
  await page.locator("#texp").click();
  assert.equal(await first.locator(".ev-toggle").getAttribute("aria-expanded"),"true");
  await page.locator("#texp").click();
  assert.equal(await first.locator(".ev-toggle").getAttribute("aria-expanded"),"false");
  pass("Timeline Expand all / Collapse all");
  await page.locator('[data-open-search]').first().click();
  await page.locator("#sin").fill("professor");
  await page.waitForFunction(()=>document.querySelectorAll("#sres a").length>0);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#searchwrap").evaluate(el=>el.classList.contains("open")),false);
  pass("Global search, loaded results, Escape dismissal");
  await page.locator("#fcardgo").fill("36");
  await page.locator("#fgo").click();
  assert.match(await page.locator("#fdetail").innerText(),/fan spinning loudly/i);
  await page.locator("#fcardgo").fill("4");
  await page.locator("#fgo").click();
  assert.match(await page.locator("#fdetail").innerText(),/link mismatch|different GPU|incorrect link/i);
  pass("Card #36 and #4 lookup with correct warning text");
  await page.locator("#ffollow").check();
  await page.locator('#ff-metric button[data-k="sp"]').click();
  await page.locator('#ff-rig button[data-k="Asus B250"]').click();
  assert.match(await page.locator("#fbt").innerText(),/superposition/i);
  assert(await page.locator(".frow").count()>0);
  pass("Follow-ups-only, benchmark and test-rig filters");
  const downloaded=page.waitForEvent("download",{timeout:10000});
  await page.locator("#fexport").click();
  const file=await downloaded;
  assert.match(file.suggestedFilename(),/gtx1070-.*-sp-selected.csv/);
  pass("Filtered results export as a real CSV download");
  await page.locator("#photogrid .photozoom").first().click();
  assert(await page.locator("#lightbox").evaluate(el=>el.classList.contains("open")));
  await page.locator("#lbclose").click();
  assert(!await page.locator("#lightbox").evaluate(el=>el.classList.contains("open")));
  pass("Accessible photo viewer open and close");
  // Verify actual MP3 decoding and playback, not just the presence of download links.
  assert.equal(await page.locator("#pod-originals audio").count(),3);
  assert.equal(await page.locator("#pod-curated iframe").count(),3);
  for(const [id,label] of [["pod-furmark","FurMark"],["pod-superposition","Superposition"],["pod-steelnomad","Steel Nomad"]]){
    await page.locator('#'+id).evaluate(a=>{a.muted=true});
    await page.locator('.pod-play[data-audio="'+id+'"]').click();
    await page.waitForFunction(id=>{const a=document.getElementById(id);return a && !a.paused && a.currentTime>0 && Number.isFinite(a.duration)},id,{timeout:20000});
    assert.equal(await page.locator('.pod-play[data-audio="'+id+'"]').getAttribute("aria-pressed"),"true");
    await page.locator('.pod-play[data-audio="'+id+'"]').click();
    assert.equal(await page.locator('#'+id).evaluate(a=>a.paused),true);
    pass("Actual hosted "+label+" MP3 decodes, plays and pauses");
  }
  await page.locator('.pod-speed[data-audio="pod-furmark"]').selectOption("1.5");
  assert.equal(await page.locator("#pod-furmark").evaluate(a=>a.playbackRate),1.5);
  const embedSources=await page.locator("#pod-curated iframe").evaluateAll(els=>els.map(e=>e.src));
  for(const id of ["55k9yn1q2nxiVUV2qr1zwl","0DPO3mp84ZBbW3ypoHoTo5","10SHjx6JcDNDh0HmsF0Kku"])
    assert(embedSources.some(src=>src.includes("open.spotify.com/embed/episode/"+id)),"Missing curated Spotify episode "+id);
  pass("Podcast playback speed and 3 verified Spotify embeds");
  await page.goto(url+"read/scene-superposition.html",{waitUntil:"domcontentloaded"});
  assert.match(await page.locator("body").innerText(),/professor/i);
  pass("Deep-dive reading page");
  const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  await mobile.route(/^https:\/\//, route=>route.abort());
  await mobile.route("**/open.spotify.com/**",stubSpotify);
  const mp=await mobile.newPage();
  mp.on("pageerror",e=>errors.push("mobile: "+e.message));
  await mp.goto(url,{waitUntil:"domcontentloaded"});
  await mp.waitForFunction(()=>document.querySelector("#ftiles")?.children.length>=5,{timeout:25000});
  const width=await mp.evaluate(()=>({viewport:window.innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(width.scroll<=width.viewport+8,"Horizontal page overflow "+JSON.stringify(width));
  await mp.locator("#fcardgo").fill("37");
  await mp.locator("#fgo").click();
  assert.match(await mp.locator("#fdetail").innerText(),/card #37/i);
  await mp.locator("#fdetail a", {hasText:"Permanent link"}).click();
  await mp.reload({waitUntil:"domcontentloaded"});
  await mp.waitForFunction(()=>document.querySelector("#fdetail")?.textContent.includes("Card #37"));
  assert.match(await mp.locator("#fdetail").innerText(),/peer median|insufficient data for comparison/i);
  pass("390px mobile layout and card finder");
  await context.close();await mobile.close();
  assert.deepEqual(errors,[],"Uncaught browser errors: "+errors.join("; "));
  pass("No uncaught browser JavaScript errors");
  console.log("Browser smoke: "+notes.length+" checks passed");
}catch(error){console.error("Browser smoke FAILURE",error.stack||error);process.exitCode=1}
finally{if(browser)await browser.close();await new Promise(ok=>server.close(ok))}
