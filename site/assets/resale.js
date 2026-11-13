(function(){
"use strict";
var $=function(s,r){return(r||document).querySelector(s)};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function money(n){return "AU$"+Math.round(n).toLocaleString("en-AU")}
var fmt=function(v){return v==null?"–":Math.round(v).toLocaleString("en-AU")};
var D=null,st={grade:null,rig:"all",q:"",sort:"card"};
fetch("data/resale.json").then(function(r){if(!r.ok)throw Error(r.status);return r.json()}).then(function(d){D=d;init()}).catch(function(e){
  console.error("Resale data could not load",e);
  $("#maincontent").insertAdjacentHTML("beforeend",'<p class="note2" role="alert">The resale data could not load. Refresh to try again, or read the <a href="read/resale-analysis.html">written analysis</a>.</p>')});

function init(){
  $("#snap").textContent=D.snapshot;
  var by={};D.cards.forEach(function(c){(by[c.grade]=by[c.grade]||[]).push(c)});
  // tiles
  $("#tiles").innerHTML=D.order.map(function(g){var n=(by[g]||[]).length,m=D.grades[g];return'<button type="button" class="tile '+m.tone+'" data-g="'+g+'" aria-pressed="false"><span class="g">GRADE '+g+'</span><b>'+n+'</b><span>'+esc(m.name)+"</span></button>"}).join("");
  Array.prototype.forEach.call(document.querySelectorAll(".tile"),function(b){b.onclick=function(){st.grade=st.grade===b.dataset.g?null:b.dataset.g;Array.prototype.forEach.call(document.querySelectorAll(".tile"),function(o){o.setAttribute("aria-pressed",String(o.dataset.g===st.grade))});render()}});
  // ask
  var list=D.lots.filter(function(l){return l.key==="list"})[0],fin=D.lots.filter(function(l){return l.key==="finish"})[0];
  $("#ask").innerHTML='<div><b>'+list.count+' cards ready to list</b><small>Grades A and B</small></div><div><b>'+money(list.ask_total[0])+" to "+money(list.ask_total[1])+'</b><small>Gross asking range for those cards, individually. Before fees, shipping and time. Observed asking prices, not sold prices.</small></div>'+(fin.count?'<div><b>+'+money(fin.upside_if_pass[0])+" to "+money(fin.upside_if_pass[1])+'</b><small>Possible extra if the '+fin.count+' cards that need tests pass them.</small></div>':"");
  // rig select
  var rigs=D.cards.map(function(c){return c.rig}).filter(function(v,i,a){return a.indexOf(v)===i}).sort();
  $("#f-rig").innerHTML='<option value="all">All</option>'+rigs.map(function(r){return'<option>'+esc(r)+"</option>"}).join("");
  $("#f-rig").onchange=function(){st.rig=this.value;render()};
  $("#f-q").oninput=function(){st.q=this.value.trim();render()};
  $("#f-sort").onchange=function(){st.sort=this.value;render()};
  // lots
  $("#lots").innerHTML=D.lots.map(function(l){return'<div class="lot"><h3>'+esc(l.name)+'</h3><p>'+esc(l.note)+'</p><div class="n">'+l.count+'</div>'+(l.ask_total?'<p style="margin:6px 0 0">'+money(l.ask_total[0])+" to "+money(l.ask_total[1])+" gross asking</p>":"")+'<div class="nums" aria-label="Cards in this lot">'+l.cards.map(function(n){return'<a href="cards/card-'+("0"+n).slice(-2)+'.html" aria-label="Card '+n+' listing sheet">#'+n+"</a>"}).join("")+"</div></div>"}).join("");
  $("#wholesale").innerHTML="<b>If sold as one lot instead:</b> "+list.wholesale.filter(function(w){return w.discount>0}).map(function(w){return w.discount+"% off per card gives "+money(w.total[0])+" to "+money(w.total[1])}).join("; ")+". The discount levels are planning assumptions, not sourced figures; a single lot would likely achieve less per card.";
  // gaps
  $("#gaplist").innerHTML=D.gaps.map(function(g){return"<li><b>"+esc(g.label)+":</b> <span>"+esc(g.todo)+"</span></li>"}).join("");
  var thr="<tr><th scope=\"col\">Card</th><th scope=\"col\">Grade</th>"+D.gaps.map(function(g){return'<th scope="col">'+esc(g.label)+"</th>"}).join("")+"</tr>";
  $("#matrix thead").innerHTML=thr;
  $("#matrix tbody").innerHTML=D.cards.map(function(c){return'<tr><td><a href="cards/card-'+("0"+c.card).slice(-2)+'.html">#'+c.card+"</a></td><td>"+c.grade+"</td>"+D.gaps.map(function(g){var open=c.gaps.indexOf(g.id)>=0;return"<td>"+(open?'<span class="miss" aria-hidden="true"></span><span class="sr">open</span>':'<span class="ok2" aria-hidden="true"></span><span class="sr">done</span>')+"</td>"}).join("")+"</tr>"}).join("");
  render();
}

function pctCell(c,k){
  if(c[k]==null)return'<span class="pct">not recorded</span>';
  var p=c.pct[k],cls=p==null?"":p<D.rules.retest_below_pct?"low":p>3?"hi":"";
  return"<b>"+fmt(c[k])+'</b> <span class="pct '+cls+'">'+(p==null?"":(p>0?"+":"")+p.toFixed(1)+"%")+"</span>"}

function render(){
  var rows=D.cards.filter(function(c){return(!st.grade||c.grade===st.grade)&&(st.rig==="all"||c.rig===st.rig)&&(!st.q||String(c.card)===st.q||("#"+c.card)===st.q)});
  var ord=D.order,key={card:function(c){return c.card},grade:function(c){return ord.indexOf(c.grade)*1000+c.card},gaps:function(c){return-c.gaps.length*1000+c.card}};
  ["fm","sp","sn"].forEach(function(k){key[k]=function(c){return c.pct[k]==null?999:c.pct[k]}});
  rows.sort(function(a,b){return key[st.sort](a)-key[st.sort](b)});
  $("#count").textContent=rows.length+" of "+D.cards.length+" cards";
  var gl={};D.gaps.forEach(function(g){gl[g.id]=g.label});
  $("#tbl tbody").innerHTML=rows.map(function(c){var m=D.grades[c.grade],n=("0"+c.card).slice(-2);
    return"<tr><th scope=\"row\" style=\"text-transform:none;letter-spacing:0;font:700 15px var(--f-ui);color:var(--ink);background:none\">#"+c.card+'</th><td><span class="pill '+m.tone+'" title="'+esc(m.name)+'">'+c.grade+'</span><div class="pct">'+esc(m.name)+(c.reasons.length?" · "+esc(c.reasons[0]):"")+"</div></td><td>"+esc(c.rig)+(c.basis==="batch"?'<div class="pct">vs batch median</div>':"")+"</td><td>"+pctCell(c,"fm")+"</td><td>"+pctCell(c,"sp")+"</td><td>"+pctCell(c,"sn")+"</td><td>"+c.gaps.length+" open"+'<div class="pct">'+esc(c.gaps.slice(0,2).map(function(g){return gl[g]}).join(", "))+(c.gaps.length>2?", …":"")+'</div></td><td><a href="cards/card-'+n+'.html" aria-label="Listing sheet for card '+c.card+'">Sheet</a></td></tr>'}).join("")||'<tr><td colspan="8" style="color:var(--mut)">No cards match these filters.</td></tr>';
}
})();
