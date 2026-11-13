/* shared: theme, search overlay, YouTube lite embeds */
(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem("theme");if(t)root.setAttribute("data-theme",t)}catch(e){}
  window.__base=(document.currentScript&&document.currentScript.getAttribute("data-base"))||"";
  function icon(){var d=(root.getAttribute("data-theme")||"dark")==="dark";document.querySelectorAll("[data-theme-toggle]").forEach(function(b){b.textContent=d?"☾":"☀"})}
  document.addEventListener("DOMContentLoaded",icon);
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-theme-toggle]");
    if(b){var cur=root.getAttribute("data-theme")||"dark";
      var nx=cur==="dark"?"light":"dark";root.setAttribute("data-theme",nx);try{localStorage.setItem("theme",nx)}catch(e){}icon()}
    var y=e.target.closest(".yt:not(.on)");
    if(y && /^[A-Za-z0-9_-]{11}$/.test(y.dataset.id||"")){
      y.classList.add("on");
      var frame=document.createElement("iframe");
      frame.src="https://www.youtube-nocookie.com/embed/"+y.dataset.id+"?autoplay=1&rel=0";
      frame.title=y.dataset.title||"YouTube video";
      frame.allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen=true;
      y.replaceChildren(frame);
    }
  });
  // ---- search
  var idx=null,wrap,input,res,sel=-1,hits=[],lastFocus=null;
  function esc(s){return s.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
  function build(){
    wrap=document.createElement("div");wrap.id="searchwrap";
    wrap.setAttribute("role","dialog");wrap.setAttribute("aria-modal","true");wrap.setAttribute("aria-label","Search the research library");
    wrap.innerHTML='<div id="searchbox"><div class="searchhead"><label for="sin">Search all research</label><button type="button" id="sclose" aria-label="Close search">✕</button></div><input id="sin" placeholder="Try “async compute”, “SSRTGI”, “power virus”" autocomplete="off" aria-controls="sres"><div id="sres" role="status" aria-live="polite"></div></div>';
    document.body.appendChild(wrap);input=wrap.querySelector("#sin");res=wrap.querySelector("#sres");
    wrap.addEventListener("click",function(e){if(e.target===wrap || e.target.closest("#sclose"))close()});
    wrap.addEventListener("keydown",function(e){
      if(e.key!=="Tab")return;
      var focusables=[wrap.querySelector("#sin"),wrap.querySelector("#sclose")].concat([].slice.call(wrap.querySelectorAll("#sres a")));
      if(!focusables.length)return;
      if(e.shiftKey&&document.activeElement===focusables[0]){focusables[focusables.length-1].focus();e.preventDefault()}
      else if(!e.shiftKey&&document.activeElement===focusables[focusables.length-1]){focusables[0].focus();e.preventDefault()}
    });
    input.addEventListener("input",run);
    input.addEventListener("keydown",function(e){
      if(e.key==="ArrowDown"){sel=Math.min(hits.length-1,sel+1);paint(true);e.preventDefault()}
      else if(e.key==="ArrowUp"){sel=Math.max(0,sel-1);paint(true);e.preventDefault()}
      else if(e.key==="Enter"&&hits[sel]){location.href=hits[sel].href}
    });
  }
  function load(cb){
    if(idx)return cb();
    res.innerHTML='<p class="searchmessage">Loading the research index…</p>';
    fetch(window.__base+"data/search.json").then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json()})
      .then(function(j){if(!Array.isArray(j))throw Error("Invalid search index");idx=j;cb()})
      .catch(function(){res.innerHTML='<p class="searchmessage">Search is unavailable right now. <a href="'+window.__base+'index.html#library">Browse the document library instead.</a></p>'});
  }
  function run(){
    if(!idx)return; // load(run) replays the current query when the index arrives.
    var q=input.value.trim().toLowerCase();if(q.length<2){res.innerHTML='<p style="padding:18px 20px;color:var(--mut)">Type at least two letters. <span class="kbd">↑</span> <span class="kbd">↓</span> to move, <span class="kbd">Enter</span> to open, <span class="kbd">Esc</span> to close.</p>';hits=[];return}
    var terms=q.split(/\s+/);var out=[];
    idx.forEach(function(s){var h=(s.h+" "+s.t).toLowerCase(),sc=0;
      for(var i=0;i<terms.length;i++){var k=h.indexOf(terms[i]);if(k<0){sc=0;break}sc+=1+(s.h.toLowerCase().indexOf(terms[i])>=0?6:0)+(s.title.toLowerCase().indexOf(terms[i])>=0?2:0)}
      if(sc)out.push({s:s,sc:sc})});
    out.sort(function(a,b){return b.sc-a.sc});hits=out.slice(0,30).map(function(o){
      var s=o.s,low=s.t.toLowerCase(),k=low.indexOf(terms[0]);var a=Math.max(0,k-60);var sn=esc(s.t.slice(a,a+200));
      terms.forEach(function(t){sn=sn.replace(new RegExp("("+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>")});
      return{href:window.__base+"read/"+s.doc+".html#"+s.id,title:s.title,h:s.h,sn:(a>0?"…":"")+sn+"…"}});
    sel=hits.length?0:-1;paint(false)}
  function paint(scroll){res.innerHTML=hits.length?hits.map(function(h,i){return'<a href="'+h.href+'" class="'+(i===sel?"sel":"")+'"><small>'+esc(h.title)+'</small><b>'+esc(h.h)+'</b><p>'+h.sn+'</p></a>'}).join(""):'<p style="padding:18px 20px;color:var(--mut)">No matches.</p>';
    if(scroll){var el=res.querySelector(".sel");if(el)el.scrollIntoView({block:"nearest"})}}
  function open(){if(!wrap)build();lastFocus=document.activeElement;wrap.classList.add("open");input.focus();input.select();load(run)}
  function close(){if(wrap&&wrap.classList.contains("open")){wrap.classList.remove("open");if(lastFocus&&lastFocus.focus)lastFocus.focus()}}
  window.openSearch=open;
  document.addEventListener("keydown",function(e){
    if((e.key==="k"&&(e.ctrlKey||e.metaKey))||(e.key==="/"&&!/input|textarea/i.test(document.activeElement.tagName))){e.preventDefault();open()}
    if(e.key==="Escape")close()});
  document.addEventListener("click",function(e){if(e.target.closest("[data-open-search]")){e.preventDefault();open()}});
})();
