(function(){
"use strict";
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function j(u){return fetch(u).then(function(r){return r.json()})}
var BN={furmark:"FurMark",superposition:"Superposition","3dmark":"3DMark",all:"All"};
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- reveal ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.08});
$$(".reveal").forEach(function(el){io.observe(el)});

/* ---------- hero fur torus ---------- */
(function(){
  var cv=$("#furcv");if(!cv)return;var ctx=cv.getContext("2d");
  var N=3600,pts=[],R=1,r=.46;
  for(var i=0;i<N;i++){var u=Math.random()*6.2832,v=Math.random()*6.2832;
    var nx=Math.cos(v)*Math.cos(u),ny=Math.cos(v)*Math.sin(u),nz=Math.sin(v);
    pts.push({x:(R+r*Math.cos(v))*Math.cos(u),y:(R+r*Math.cos(v))*Math.sin(u),z:r*Math.sin(v),nx:nx,ny:ny,nz:nz,l:.09+Math.random()*.12,w:Math.random()})}
  var ax=.9,ay=0,vx=.0045,vy=.007,drag=false,lx=0,ly=0,heat=.62,t0=0;
  var hs=$("#heat"),hv=$("#heatv");
  function hsl(h,s,l,a){return"hsla("+h+","+s+"%,"+l+"%,"+a+")"}
  function setHeat(){heat=hs.value/100;hv.textContent=Math.round(38+heat*70)+" °C"}
  hs.addEventListener("input",setHeat);setHeat();
  cv.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);cv.style.cursor="grabbing"});
  cv.addEventListener("pointerup",function(){drag=false;cv.style.cursor="grab"});
  cv.addEventListener("pointermove",function(e){if(!drag)return;vy=(e.clientX-lx)*.0016;vx=(e.clientY-ly)*.0016;ay+=vy*3;ax+=vx*3;lx=e.clientX;ly=e.clientY});
  function draw(t){
    var W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
    if(!drag&&!reduce){ay+=.006;ax+=.0022}
    var ca=Math.cos(ax),sa=Math.sin(ax),cb=Math.cos(ay),sb=Math.sin(ay),S=W*.255,cx=W/2,cy=H/2,persp=4.2;
    var K=[[0,215,95,50],[.22,262,90,56],[.4,330,92,56],[.55,8,96,55],[.7,28,100,54],[.86,44,100,60],[1,52,100,86]],hue=215,sat=95,lit=52;
    for(var q=0;q<K.length-1;q++){if(heat>=K[q][0]&&heat<=K[q+1][0]){var f=(heat-K[q][0])/(K[q+1][0]-K[q][0]);hue=K[q][1]+(K[q+1][1]-K[q][1])*f;sat=K[q][2]+(K[q+1][2]-K[q][2])*f;lit=K[q][3]+(K[q+1][3]-K[q][3])*f;break}}
    var buckets=[[],[],[]];
    for(var i=0;i<N;i++){var p=pts[i];
      var sway=Math.sin(t*.0016*(1+heat*2)+p.w*9)*.03*(.4+heat);
      function tr(x,y,z){var y1=y*ca-z*sa,z1=y*sa+z*ca;var x2=x*cb+z1*sb,z2=-x*sb+z1*cb;return[x2,y1,z2]}
      var a=tr(p.x,p.y,p.z),L=p.l*(1+heat*.55),
          b=tr(p.x+p.nx*L+sway,p.y+p.ny*L+sway,p.z+p.nz*L);
      var d1=persp/(persp-a[2]),d2=persp/(persp-b[2]);
      var seg=[cx+a[0]*S*d1,cy+a[1]*S*d1,cx+b[0]*S*d2,cy+b[1]*S*d2];
      var depth=(a[2]+1)/2;buckets[depth<.35?0:depth<.65?1:2].push(seg)}
    ctx.lineCap="round";
    for(var k=0;k<3;k++){ctx.beginPath();buckets[k].forEach(function(s){ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3])});
      ctx.lineWidth=.9+k*.7;ctx.strokeStyle=hsl(hue+k*10,sat,lit-18+k*14,.35+k*.3);ctx.stroke()}
    // glow
    var g=ctx.createRadialGradient(cx,cy,S*.3,cx,cy,S*1.8);g.addColorStop(0,hsl(hue,95,55,.10+heat*.14));g.addColorStop(1,"transparent");
    ctx.globalCompositeOperation="lighter";ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="source-over";
    if(!reduce)requestAnimationFrame(draw)}
  requestAnimationFrame(draw);
  if(reduce)hs.addEventListener("input",function(){requestAnimationFrame(draw)});
})();

/* ---------- mini art ---------- */
$$(".miniart").forEach(function(cv){
  cv.width=700;cv.height=300;var c=cv.getContext("2d"),k=cv.dataset.kind,W=700,H=300;
  var cs=getComputedStyle(cv.closest("[data-bench]")),acc=cs.getPropertyValue("--acc").trim()||"#ff8a2a",acc2=cs.getPropertyValue("--acc2").trim()||"#ffc15a";
  var g=c.createLinearGradient(0,0,0,H);
  if(k==="donut"){g.addColorStop(0,"#1a0d06");g.addColorStop(1,"#3a1606");c.fillStyle=g;c.fillRect(0,0,W,H);
    // checkerboard floor
    for(var i=0;i<14;i++)for(var j2=0;j2<6;j2++){if((i+j2)%2){c.fillStyle="rgba(255,138,42,.07)";c.fillRect(i*50,H-70+j2*12,50,12)}}
    for(var n=0;n<1100;n++){var u=Math.random()*6.283,v=Math.random()*6.283,x=350+(110+42*Math.cos(v))*Math.cos(u),y=150+(46+18*Math.cos(v))*Math.sin(u)*1.0+42*Math.sin(v)*.5;
      var L=8+Math.random()*10,a=Math.random()*6.283;c.strokeStyle="hsla("+(20+Math.random()*30)+",95%,"+(45+Math.random()*25)+"%,.6)";c.lineWidth=1.2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*L*.7,y+Math.sin(a)*L*.7-L*.3);c.stroke()}
  }else if(k==="lab"){g.addColorStop(0,"#07161a");g.addColorStop(1,"#0b2a2c");c.fillStyle=g;c.fillRect(0,0,W,H);
    // window light + desk + coil
    var wg=c.createLinearGradient(80,0,300,H);wg.addColorStop(0,"rgba(140,243,255,.35)");wg.addColorStop(1,"transparent");c.fillStyle=wg;c.beginPath();c.moveTo(60,0);c.lineTo(250,0);c.lineTo(420,H);c.lineTo(120,H);c.fill();
    c.fillStyle="#0e1f22";c.fillRect(0,H-60,W,60);c.strokeStyle="rgba(53,224,198,.6)";c.lineWidth=3;
    for(var q=0;q<16;q++){c.beginPath();c.ellipse(480,170-q*5,34,10,0,0,6.283);c.stroke()}
    c.strokeStyle="rgba(140,243,255,.9)";c.lineWidth=2;c.beginPath();c.moveTo(480,90);c.lineTo(480,55);c.stroke();
    var gl=c.createRadialGradient(480,50,2,480,50,60);gl.addColorStop(0,"rgba(140,243,255,.9)");gl.addColorStop(1,"transparent");c.fillStyle=gl;c.fillRect(420,0,120,120);
    c.fillStyle="rgba(234,237,246,.5)";c.font="12px monospace";for(var m=0;m<6;m++)c.fillText("ψ = α|0⟩ + β|1⟩",70+m*8,60+m*30);
  }else{g.addColorStop(0,"#1b1040");g.addColorStop(1,"#44236a");c.fillStyle=g;c.fillRect(0,0,W,H);
    c.fillStyle="rgba(255,200,230,.9)";c.beginPath();c.arc(520,90,36,0,6.283);c.fill();
    var sg=c.createRadialGradient(520,90,10,520,90,150);sg.addColorStop(0,"rgba(255,160,220,.5)");sg.addColorStop(1,"transparent");c.fillStyle=sg;c.fillRect(350,0,350,260);
    c.fillStyle="#2a1650";c.beginPath();c.moveTo(0,H);c.lineTo(0,200);c.bezierCurveTo(150,160,260,230,400,190);c.bezierCurveTo(520,160,620,210,700,180);c.lineTo(700,H);c.fill();
    c.fillStyle="#150a30";c.beginPath();c.moveTo(0,H);c.lineTo(0,240);c.bezierCurveTo(200,210,330,270,480,235);c.bezierCurveTo(580,215,650,250,700,240);c.lineTo(700,H);c.fill();
    // figure with conical hat
    c.fillStyle="#0a0418";c.beginPath();c.moveTo(250,150);c.lineTo(228,178);c.lineTo(272,178);c.fill();c.fillRect(242,178,16,50);c.beginPath();c.moveTo(242,228);c.lineTo(236,258);c.lineTo(246,258);c.lineTo(250,228);c.fill();c.beginPath();c.moveTo(258,228);c.lineTo(254,258);c.lineTo(264,258);c.lineTo(262,228);c.fill();
    c.fillStyle="#7df9ff";c.fillRect(246,176,3,3);c.fillRect(252,176,3,3);
  }
});

/* ---------- JSON-driven sections ---------- */
Promise.all([j("data/timeline.json"),j("data/media.json"),j("data/gpus.json"),j("data/qa.json"),j("data/library.json"),j("data/photos.json").catch(function(){return[]})]).then(function(d){
  var TL=d[0],MEDIA=d[1],GPUS=d[2],QA=d[3],LIB=d[4],PH=d[5];
  stats(TL,MEDIA,QA,LIB);timeline(TL);watch(MEDIA);photos(PH);hall(GPUS);qa(QA);library(LIB);
});

function stats(TL,M,QA,LIB){
  var vids=0;M.forEach(function(g){vids+=g.items.length});
  $("#stats").innerHTML=[[TL.length,"timeline events"],[QA.length,"answered questions"],[LIB.length,"documents"],[vids,"videos"]].map(function(s){return"<div><b>"+s[0]+"</b>"+s[1]+"</div>"}).join("")}

/* ---------- timeline ---------- */
function timeline(TL){
  var fb={b:"all",t:"all",q:""};
  function chips(el,items,key,fmt){el.innerHTML=items.map(function(x){return'<button class="chip" data-b="'+(key==="b"?x:"")+'" data-k="'+x+'" aria-pressed="'+(fb[key]===x)+'" '+(key==="b"&&x!=="all"?'data-bench="'+x+'"':"")+'>'+(x!=="all"&&key==="b"?'<i class="dot"></i>':"")+fmt(x)+"</button>"}).join("");
    $$("button",el).forEach(function(b){b.onclick=function(){fb[key]=b.dataset.k;$$("button",el).forEach(function(o){o.setAttribute("aria-pressed",o===b)});render()}})}
  chips($("#tf-bench"),["all","furmark","superposition","3dmark"],"b",function(x){return BN[x]});
  chips($("#tf-type"),["all","release","company","controversy","hardware","milestone"],"t",function(x){return x==="all"?"All kinds":x[0].toUpperCase()+x.slice(1)});
  $("#tsearch").oninput=function(){fb.q=this.value.toLowerCase();render()};
  var allOpen=false;$("#texp").onclick=function(e){e.preventDefault();allOpen=!allOpen;this.textContent=allOpen?"Collapse all":"Expand all";$$(".ev").forEach(function(x){x.classList.toggle("open",allOpen)})};
  function fmtD(d){var p=d.split("-");var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return p.length===3?(+p[2])+" "+M[+p[1]-1]+" "+p[0]:p.length===2?M[+p[1]-1]+" "+p[0]:p[0]}
  function render(){
    var rows=TL.filter(function(e){return(fb.b==="all"||e.b===fb.b)&&(fb.t==="all"||e.ty===fb.t)&&(!fb.q||(e.t+" "+e.x).toLowerCase().indexOf(fb.q)>=0)});
    $("#tcount").textContent=rows.length+" events";
    var out="",yr="";
    rows.forEach(function(e){var y=e.d.slice(0,4);if(y!==yr){yr=y;out+='<div class="yr"><span>'+y+"</span></div>"}
      out+='<div class="ev" data-bench="'+e.b+'"><div class="card"><div class="head"><span class="tag">'+BN[e.b]+'</span><span class="ty '+e.ty+'">'+e.ty+'</span><span class="d">'+fmtD(e.d)+'</span></div><h3>'+esc(e.t)+'</h3><div class="x"><p>'+esc(e.x)+'</p><a href="read/'+e.doc+'.html">Read more and see sources →</a></div></div></div>'});
    $("#rail").innerHTML=out||'<p style="color:var(--mut)">No events match. Try clearing a filter.</p>';
    $$(".ev").forEach(function(el){el.addEventListener("click",function(e){if(e.target.tagName==="A")return;el.classList.toggle("open")})})}
  render()}

/* ---------- watch ---------- */
function watch(M){
  var st={g:0,b:"all"};
  $("#vtabs").innerHTML=M.map(function(g,i){return'<button class="chip" data-i="'+i+'" aria-pressed="'+(i===0)+'">'+esc(g.g)+"</button>"}).join("");
  $("#vbench").innerHTML=["all","furmark","superposition","3dmark"].map(function(b){return'<button class="chip" data-b="'+b+'" aria-pressed="'+(b==="all")+'">'+BN[b]+"</button>"}).join("");
  $$("#vtabs .chip").forEach(function(c){c.onclick=function(){st.g=+c.dataset.i;$$("#vtabs .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  $$("#vbench .chip").forEach(function(c){c.onclick=function(){st.b=c.dataset.b;$$("#vbench .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  function r(){var items=M[st.g].items.filter(function(v){return st.b==="all"||v.b===st.b});
    $("#vgrid").innerHTML=items.map(function(v){return'<article class="vcard" data-bench="'+v.b+'"><div class="yt" data-id="'+v.id+'" data-title="'+esc(v.t)+'" role="button" tabindex="0" aria-label="Play: '+esc(v.t)+'"><img loading="lazy" onerror="this.classList.add(\'bad\')" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt=""><div class="play"><i></i></div></div><h4>'+esc(v.t)+"</h4><small>"+esc(v.by)+" · "+BN[v.b]+"</small>"+(v.n?"<p>"+esc(v.n)+"</p>":"")+'<a href="https://www.youtube.com/watch?v='+v.id+'" target="_blank" rel="noopener" style="font-size:13px">Open on YouTube ↗</a></article>'}).join("")||'<p style="color:var(--mut)">Nothing in this view.</p>';
    $$(".yt").forEach(function(y){y.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();y.click()}})})}
  r()}

/* ---------- spotify shelf ---------- */
(function(){
  var KEY="spotify-shelf",box=$("#spembeds");
  function get(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
  function set(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
  function parse(u){var m=u.trim().match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(episode|show|playlist|album|track|artist)\/([A-Za-z0-9]+)/);return m?{t:m[1],id:m[2]}:null}
  function draw(){var a=get();box.innerHTML=a.map(function(x){return'<iframe loading="lazy" src="https://open.spotify.com/embed/'+x.t+"/"+x.id+'?theme=0" height="'+(x.t==="episode"||x.t==="show"?152:232)+'" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Spotify '+x.t+'"></iframe>'}).join("")||'<p style="color:var(--faint);font-size:13px;margin:0">Nothing pinned yet.</p>'}
  $("#spadd").onclick=function(){var p=parse($("#spurl").value);if(!p){$("#spurl").style.borderColor="#ff6b6b";$("#spurl").placeholder="That isn’t a Spotify link";return}
    $("#spurl").style.borderColor="";var a=get();if(!a.some(function(x){return x.id===p.id}))a.push(p);set(a);$("#spurl").value="";draw()};
  $("#spclear").onclick=function(){set([]);draw()};
  $("#copyfeed").onclick=function(){var u=new URL("podcast.xml",location.href).href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){$("#copyfeed").textContent="Copied ✓"},function(){prompt("Feed URL",u)})};
  draw()})();

/* ---------- photos ---------- */
function photos(P){
  var el=$("#photos");if(!P.length){$("#photos").closest("section").style.display="none";return}
  el.innerHTML=P.map(function(p,i){return'<figure data-i="'+i+'"><div class="imgwrap"><img loading="lazy" src="'+esc(p.src)+'" alt="'+esc(p.alt)+'"></div><figcaption><b>'+esc(p.t)+"</b>"+esc(p.c)+' <a href="'+esc(p.page)+'" target="_blank" rel="noopener">'+esc(p.credit)+" · "+esc(p.lic)+"</a></figcaption></figure>"}).join("");
  var lb=$("#lightbox");
  el.addEventListener("click",function(e){var f=e.target.closest("figure");if(!f||e.target.tagName==="A")return;var p=P[+f.dataset.i];$("#lbimg").src=p.big||p.src;$("#lbimg").alt=p.alt;$("#lbcap").textContent=p.t+" — "+p.credit+", "+p.lic;lb.classList.add("open")});
  lb.onclick=function(){lb.classList.remove("open")};addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("open")})}

/* ---------- lab ---------- */
$$("#labtabs .chip").forEach(function(c){c.onclick=function(){$$("#labtabs .chip").forEach(function(o){o.classList.toggle("on",o===c)});["hall","bench","decode"].forEach(function(t){$("#lab-"+t).hidden=t!==c.dataset.t})}});
function hall(G){
  var f={v:"all"};var vs=["all"].concat(G.map(function(g){return g.v}).filter(function(v,i,a){return a.indexOf(v)===i}));
  $("#gf").innerHTML=vs.map(function(v){return'<button class="chip" data-v="'+v+'" aria-pressed="'+(v==="all")+'">'+(v==="all"?"All vendors":v)+"</button>"}).join("");
  $$("#gf .chip").forEach(function(c){c.onclick=function(){f.v=c.dataset.v;$$("#gf .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  function r(){$("#gpugrid").innerHTML=G.filter(function(g){return f.v==="all"||g.v===f.v}).map(function(g){return'<article class="card gpu v-'+g.v+'"><div class="chipface"><span>'+esc(g.v)+"</span><span>"+g.y+'</span></div><h4>'+esc(g.n)+'</h4><div class="hh">'+esc(g.h)+"</div><ul>"+g.f.map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+'</ul><div class="srow">'+g.b.map(function(b){return'<span class="tag" data-bench="'+b+'">'+BN[b]+"</span>"}).join("")+'<a class="chip" href="read/'+g.doc+'.html">Sources →</a></div></article>'}).join("")}
  r();
  /* bench */
  var KEY="bench-gpus",rows=[];
  function load(){try{rows=JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){rows=[]}
    if(location.hash.indexOf("#b=")===0){try{var s=JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(3)))));if(Array.isArray(s)){rows=s;save()}}catch(e){}}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(rows))}catch(e){}}
  var M=[["furmark","FurMark 1080p","furmark"],["sp4k","Superposition 4K","superposition"],["sn","Steel Nomad","3dmark"],["ts","Time Spy graphics","3dmark"],["watts","Peak power W","furmark"],["temp","Peak temp °C","furmark"]];
  function draw(){var out=$("#benchout");if(!rows.length){out.innerHTML='<p style="color:var(--mut);margin:18px 0 0">No GPUs yet. Add the cards you test and the charts appear here.</p>';return}
    var h='<table class="table"><thead><tr><th>GPU</th>'+M.map(function(m){return"<th>"+m[1]+"</th>"}).join("")+"<th></th></tr></thead><tbody>"+rows.map(function(r,i){return"<tr><td><b>"+esc(r.gpu)+"</b></td>"+M.map(function(m){return"<td>"+(r[m[0]]!==""&&r[m[0]]!=null?Number(r[m[0]]).toLocaleString():"–")+"</td>"}).join("")+'<td><button class="chip" data-del="'+i+'">remove</button></td></tr>'}).join("")+"</tbody></table>";
    h+='<div class="bars">';
    M.slice(0,4).forEach(function(m){var vals=rows.filter(function(r){return r[m[0]]!==""&&r[m[0]]!=null});if(vals.length<1)return;var mx=Math.max.apply(null,vals.map(function(r){return+r[m[0]]}));
      h+='<div data-bench="'+m[2]+'"><div class="kicker" style="margin:14px 0 8px">'+m[1]+"</div>"+vals.sort(function(a,b){return b[m[0]]-a[m[0]]}).map(function(r){return'<div class="bar" data-bench="'+m[2]+'"><span>'+esc(r.gpu)+'</span><div><i style="width:'+Math.max(3,(+r[m[0]]/mx*100))+'%"></i></div><span>'+Number(r[m[0]]).toLocaleString()+"</span></div>"}).join("")+"</div>"});
    h+="</div>";out.innerHTML=h;$$("[data-del]",out).forEach(function(b){b.onclick=function(){rows.splice(+b.dataset.del,1);save();draw()}})}
  $("#benchform").onsubmit=function(e){e.preventDefault();var fd=new FormData(this),r={};fd.forEach(function(v,k){r[k]=v});rows.push(r);save();this.reset();draw()};
  $("#bclear").onclick=function(){if(confirm("Remove all logged GPUs from this browser?")){rows=[];save();draw()}};
  $("#bexport").onclick=function(){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(rows,null,1)],{type:"application/json"}));a.download="my-gpu-bench.json";a.click()};
  $("#bimport").onchange=function(){var f=this.files[0];if(!f)return;f.text().then(function(t){try{var a=JSON.parse(t);if(Array.isArray(a)){rows=a;save();draw()}}catch(e){alert("That file isn’t valid JSON.")}})};
  $("#bshare").onclick=function(){var u=location.origin+location.pathname+"#b="+btoa(unescape(encodeURIComponent(JSON.stringify(rows))));(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){$("#bshare").textContent="Link copied ✓"},function(){prompt("Share link",u)})};
  load();draw();
  if(location.hash.indexOf("#b=")===0){$$("#labtabs .chip")[1].click();$("#lab").scrollIntoView()}
  /* decoders */
  function num(id){var v=parseFloat($(id).value);return isFinite(v)?v:null}
  function fmt(x,d){return x.toLocaleString(undefined,{maximumFractionDigits:d==null?1:d})}
  function two(a,b,fa,fb,out,ka,kb,ua,ub){var A=$(a),B=$(b);A.oninput=function(){var v=num(a);B.value="";$(out).innerHTML=v==null?"—":fa(v)};B.oninput=function(){var v=num(b);A.value="";$(out).innerHTML=v==null?"—":fb(v)}}
  two("#fm-pts","#fm-fps",function(p){return fmt(p/60)+" FPS<small>average over the 60 s run (points ÷ 60)</small>"},function(f){return fmt(f*60,0)+" points<small>FPS × 60 for a 60 s run</small>"},"#fm-out");
  two("#sn-score","#sn-fps",function(p){return fmt(p/100,2)+" FPS<small>score ÷ 100</small>"},function(f){return fmt(f*100,0)+" points<small>FPS × 100</small>"},"#sn-out");
  function ts(){var g=num("#ts-g"),c=num("#ts-c");$("#ts-out").innerHTML=(g&&c)?fmt(1/(.85/g+.15/c),0)+"<small>1 ÷ (0.85 ÷ graphics + 0.15 ÷ CPU)</small>":"—"}
  $("#ts-g").oninput=ts;$("#ts-c").oninput=ts}

/* ---------- Q&A ---------- */
function qa(Q){
  var f={b:"all",k:"all",q:""};
  function chips(el,items,key,fmt){el.innerHTML=items.map(function(x){return'<button class="chip" data-k="'+x+'" aria-pressed="'+(f[key]===x)+'">'+fmt(x)+"</button>"}).join("");$$("button",el).forEach(function(b){b.onclick=function(){f[key]=b.dataset.k;$$("button",el).forEach(function(o){o.setAttribute("aria-pressed",o===b)});render()}})}
  chips($("#qf-bench"),["all","furmark","superposition","3dmark"],"b",function(x){return BN[x]});
  chips($("#qf-kind"),["all","technical","lore"],"k",function(x){return x==="all"?"All kinds":x==="technical"?"Technical deep dives":"Scene & lore"});
  $("#qsearch").oninput=function(){f.q=this.value.toLowerCase();render()};
  function render(){var rows=Q.filter(function(x){return(f.b==="all"||x.bench===f.b)&&(f.k==="all"||x.kind===f.k)&&(!f.q||(x.q+" "+x.a).toLowerCase().indexOf(f.q)>=0)});
    $("#qcount").textContent=rows.length+" questions";
    $("#qa").innerHTML=rows.map(function(x,i){return'<div class="q" data-bench="'+x.bench+'"><button aria-expanded="false"><span class="n">'+BN[x.bench].slice(0,3).toUpperCase()+" "+x.n+"</span><span>"+esc(x.q)+'</span></button><div class="a">'+x.a+'<p class="more"><a href="read/'+x.doc+'.html#'+x.id+'">Open in the full document →</a></p></div></div>'}).join("")||'<p style="color:var(--mut)">No questions match.</p>';
    $$(".q button").forEach(function(b){b.onclick=function(){var q=b.parentNode;var o=q.classList.toggle("open");b.setAttribute("aria-expanded",o)}});
    $$(".q .a a.cite").forEach(function(a){var h=a.getAttribute("href");a.setAttribute("href","read/"+a.closest(".q").querySelector(".more a").getAttribute("href").split("#")[0].replace("read/","")+h)})}
  render()}

/* ---------- library ---------- */
function library(L){
  var G=[["furmark","FurMark"],["superposition","UNIGINE Superposition"],["3dmark","3DMark & Steel Nomad"],["all","Indexes, method and fact-checking"]];
  $("#libroot").innerHTML=G.map(function(g){var items=L.filter(function(x){return x.bench===g[0]});return'<div class="libgroup" data-bench="'+g[0]+'"><h3><i class="dot"></i>'+g[1]+'</h3><div class="lib">'+items.map(function(x){return'<a class="card libcard" href="read/'+x.slug+'.html"><span class="tag">'+esc(x.kind)+"</span><b>"+esc(x.title)+"</b><span>"+esc(x.blurb)+"</span><small>~"+x.mins+" min read</small></a>"}).join("")+"</div></div>"}).join("")}
})();
