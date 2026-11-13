/* GeForce GTX 1070 podcast episodes: facade cards that load Apple Podcasts' own embedded player on demand. */
(function(){
"use strict";
var root=document.getElementById("pod-gtx1070");if(!root)return;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmtDate(d){var p=d.split("-"),M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return(+p[2])+" "+M[+p[1]-1]+" "+p[0]}
var groups={launch:"The 2016 launch",later:"Later discussion"};
fetch("data/podcasts-gtx1070.json").then(function(r){if(!r.ok)throw Error(r.status);return r.json()}).then(function(d){
  var html="";
  ["launch","later"].forEach(function(g){
    var eps=d.episodes.filter(function(e){return e.kind===g});if(!eps.length)return;
    html+='<h4 class="gtx-group">'+groups[g]+'</h4><div class="gtx-grid">'+eps.map(function(e){
      return'<article class="card gtxpod" data-id="'+esc(e.id)+'"><span class="kicker">'+esc(e.show)+'</span><h5>'+esc(e.title)+'</h5>'+
        '<p class="meta">'+fmtDate(e.date)+" · "+e.mins+' min</p><p>'+esc(e.note)+'</p>'+
        '<div class="gtxslot"><button type="button" class="btn gtxload" aria-label="Load the player for '+esc(e.title)+'">▶ Load player</button></div>'+
        '<a class="chip" href="'+esc(e.page)+'" target="_blank" rel="noopener">Open in Apple Podcasts ↗</a></article>'}).join("")+"</div>"});
  root.innerHTML=html+'<p class="pod-small">Source: Apple Podcasts catalogue, checked '+esc(d.checked)+'. Playback is handled by Apple; episodes belong to their publishers.</p>';
  root.addEventListener("click",function(ev){
    var b=ev.target.closest(".gtxload");if(!b)return;
    var card=b.closest(".gtxpod"),e=d.episodes.filter(function(x){return x.id===card.dataset.id})[0],slot=b.parentNode;
    slot.innerHTML='<iframe title="Play: '+esc(e.title)+' ('+esc(e.show)+')" src="'+esc(e.embed)+'" width="100%" height="175" frameborder="0" loading="lazy" allow="autoplay *; encrypted-media *; clipboard-write" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>';
    var f=slot.querySelector("iframe");if(f&&f.focus)f.focus()});
}).catch(function(err){
  console.error("GTX 1070 podcasts could not load",err);
  root.innerHTML='<p class="searchmessage">The GTX 1070 episode list could not load. Refresh to try again.</p>';
});
})();
