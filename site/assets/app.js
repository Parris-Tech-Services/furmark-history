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
    if(y&&y.dataset.id){y.classList.add("on");
      y.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+y.dataset.id+'?autoplay=1&rel=0" title="'+(y.dataset.title||"YouTube video")+'" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';}
  });
  // ---- search
  var idx=null,wrap,input,res,sel=-1,hits=[];
  function esc(s){return s.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
  function build(){
    wrap=document.createElement("div");wrap.id="searchwrap";
    wrap.innerHTML='<div id="searchbox"><input id="sin" placeholder="Search every document… try “async compute”, “SSRTGI”, “power virus”" autocomplete="off"><div id="sres"></div></div>';
    document.body.appendChild(wrap);input=wrap.querySelector("#sin");res=wrap.querySelector("#sres");
    wrap.addEventListener("click",function(e){if(e.target===wrap)close()});
    input.addEventListener("input",run);
    input.addEventListener("keydown",function(e){
      if(e.key==="ArrowDown"){sel=Math.min(hits.length-1,sel+1);paint(true);e.preventDefault()}
      else if(e.key==="ArrowUp"){sel=Math.max(0,sel-1);paint(true);e.preventDefault()}
      else if(e.key==="Enter"&&hits[sel]){location.href=hits[sel].href}
    });
  }
  function load(cb){if(idx)return cb();fetch(window.__base+"data/search.json").then(function(r){return r.json()}).then(function(j){idx=j;cb()})}
  function run(){
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
  function open(){if(!wrap)build();wrap.classList.add("open");load(function(){input.focus();input.select();run()})}
  function close(){wrap&&wrap.classList.remove("open")}
  window.openSearch=open;
  document.addEventListener("keydown",function(e){
    if((e.key==="k"&&(e.ctrlKey||e.metaKey))||(e.key==="/"&&!/input|textarea/i.test(document.activeElement.tagName))){e.preventDefault();open()}
    if(e.key==="Escape")close()});
  document.addEventListener("click",function(e){if(e.target.closest("[data-open-search]")){e.preventDefault();open()}});
})();
