(function(){
"use strict";
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function j(u){return fetch(u).then(function(r){if(!r.ok)throw Error(u+" returned HTTP "+r.status);return r.json()})}
var BN={fleet:"My GPUs",furmark:"FurMark",superposition:"Superposition","3dmark":"3DMark",all:"All"};
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- reveal ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.08});
$$(".reveal").forEach(function(el){io.observe(el)});

/* ---------- hero fur torus ---------- */
(function(){
  var cv=$("#furcv");if(!cv)return;var ctx=cv.getContext("2d");
  var N=1500,pts=[],R=1,r=.46,heroVisible=true,lastFrame=0,SEG=N,segs=new Float32Array(3*N*4),NA=N,cost=0,frames=0,stopAt=0;
  if("IntersectionObserver" in window){
    var heroObserver=new IntersectionObserver(function(entries){heroVisible=entries[0].isIntersecting},{threshold:0});
    heroObserver.observe(cv);
  }
  for(var i=0;i<N;i++){var u=Math.random()*6.2832,v=Math.random()*6.2832;
    var nx=Math.cos(v)*Math.cos(u),ny=Math.cos(v)*Math.sin(u),nz=Math.sin(v);
    pts.push({x:(R+r*Math.cos(v))*Math.cos(u),y:(R+r*Math.cos(v))*Math.sin(u),z:r*Math.sin(v),nx:nx,ny:ny,nz:nz,l:.09+Math.random()*.12,w:Math.random()})}
  var ax=.9,ay=0,vx=.0045,vy=.007,drag=false,lx=0,ly=0,heat=.62,t0=0;
  var hs=$("#heat"),hv=$("#heatv");
  function hsl(h,s,l,a){return"hsla("+h+","+s+"%,"+l+"%,"+a+")"}
  function setHeat(){heat=hs.value/100;hv.textContent=Math.round(heat*100)+"% colour"}
  hs.addEventListener("input",setHeat);setHeat();
  cv.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);cv.style.cursor="grabbing"});
  function stopDrag(){drag=false;cv.style.cursor="grab"}
  cv.addEventListener("pointerup",stopDrag);
  cv.addEventListener("pointercancel",stopDrag);
  cv.addEventListener("lostpointercapture",stopDrag);
  cv.addEventListener("keydown",function(e){var d={ArrowLeft:[0,-.15],ArrowRight:[0,.15],ArrowUp:[-.15,0],ArrowDown:[.15,0]}[e.key];if(!d)return;e.preventDefault();ax+=d[0];ay+=d[1];if(reduce)requestAnimationFrame(draw)});
  cv.addEventListener("pointermove",function(e){if(!drag)return;vy=(e.clientX-lx)*.0016;vx=(e.clientY-ly)*.0016;ay+=vy*3;ax+=vx*3;lx=e.clientX;ly=e.clientY});
  function draw(t){
    if(!reduce)requestAnimationFrame(draw);
    if(!heroVisible||document.hidden||(!reduce&&t-lastFrame<41))return;
    lastFrame=t;var f0=performance.now();
    // Render to the actual viewport size rather than a 900px offscreen mobile canvas.
    var rect=cv.getBoundingClientRect(),side=Math.min(720,Math.max(300,Math.round(rect.width*Math.min(devicePixelRatio||1,2))));
    if(cv.width!==side){cv.width=side;cv.height=side}
    var W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
    if(!drag&&!reduce){ay+=.006;ax+=.0022}
    var ca=Math.cos(ax),sa=Math.sin(ax),cb=Math.cos(ay),sb=Math.sin(ay),S=W*.255,cx=W/2,cy=H/2,persp=4.2;
    var K=[[0,215,95,50],[.22,262,90,56],[.4,330,92,56],[.55,8,96,55],[.7,28,100,54],[.86,44,100,60],[1,52,100,86]],hue=215,sat=95,lit=52;
    for(var q=0;q<K.length-1;q++){if(heat>=K[q][0]&&heat<=K[q+1][0]){var f=(heat-K[q][0])/(K[q+1][0]-K[q][0]);hue=K[q][1]+(K[q+1][1]-K[q][1])*f;sat=K[q][2]+(K[q+1][2]-K[q][2])*f;lit=K[q][3]+(K[q+1][3]-K[q][3])*f;break}}
    var nb=[0,0,0],tt=t*.0016*(1+heat*2),amp=.03*(.4+heat),lf=1+heat*.55;
    for(var i=0;i<NA;i++){var p=pts[i],sway=Math.sin(tt+p.w*9)*amp,L=p.l*lf;
      var y1=p.y*ca-p.z*sa,z1=p.y*sa+p.z*ca,x1=p.x*cb+z1*sb,za=-p.x*sb+z1*cb;
      var bx=p.x+p.nx*L+sway,by=p.y+p.ny*L+sway,bz=p.z+p.nz*L,yb=by*ca-bz*sa,zb1=by*sa+bz*ca,xb=bx*cb+zb1*sb,zb=-bx*sb+zb1*cb;
      var d1=persp/(persp-za),d2=persp/(persp-zb),depth=(za+1)/2,k=depth<.35?0:depth<.65?1:2,o=k*SEG*4+nb[k]*4;
      segs[o]=cx+x1*S*d1;segs[o+1]=cy+y1*S*d1;segs[o+2]=cx+xb*S*d2;segs[o+3]=cy+yb*S*d2;nb[k]++}
    ctx.lineCap="round";
    for(var k=0;k<3;k++){ctx.beginPath();for(var m=0,base=k*SEG*4;m<nb[k];m++){var q4=base+m*4;ctx.moveTo(segs[q4],segs[q4+1]);ctx.lineTo(segs[q4+2],segs[q4+3])}
      ctx.lineWidth=.9+k*.7;ctx.strokeStyle=hsl(hue+k*10,sat,lit-18+k*14,.35+k*.3);ctx.stroke()}
    // glow
    var g=ctx.createRadialGradient(cx,cy,S*.3,cx,cy,S*1.8);g.addColorStop(0,hsl(hue,95,55,.10+heat*.14));g.addColorStop(1,"transparent");
    ctx.globalCompositeOperation="lighter";ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="source-over";
    cost=cost*.8+(performance.now()-f0)*.2;if(++frames%8===0){if(cost>7&&NA>400)NA=Math.max(400,Math.round(NA*.75));else if(cost<3&&NA<N)NA=Math.min(N,Math.round(NA*1.15))}
    }
  (window.requestIdleCallback||function(f){setTimeout(f,60)})(function(){requestAnimationFrame(draw)},{timeout:400});
  if(reduce)hs.addEventListener("input",function(){requestAnimationFrame(draw)});
})();

/* ---------- mini art ---------- */
function drawArt(cv){
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
}
var artIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){artIO.unobserve(e.target);drawArt(e.target)}})},{rootMargin:"300px"});
$$(".miniart").forEach(function(c){artIO.observe(c)});

/* ---------- JSON-driven sections ---------- */
Promise.all([j("data/timeline.json"),j("data/media.json"),j("data/gpus.json"),j("data/counts.json"),j("data/library.json"),j("data/photos.json").catch(function(){return[]}),j("data/batch.json").catch(function(){return null})]).then(function(d){
  var TL=d[0],MEDIA=d[1],GPUS=d[2],COUNTS=d[3],LIB=d[4],PH=d[5],FLEET=d[6];
  stats(TL,MEDIA,COUNTS.qa,LIB);timeline(TL);watch(MEDIA);photos(PH);hall(GPUS);library(LIB);lazyQA();if(FLEET)fleet(FLEET);
}).catch(function(err){
  console.error("Research data could not load",err);
  var s=$("#stats");if(s)s.textContent="Some research data could not load. Refresh to try again; the reading library is still available.";
  var a=$("#rail");if(a)a.innerHTML='<p class="searchmessage">The interactive timeline could not load. <a href="read/history.html">Read the FurMark history directly.</a></p>';
  var b=$("#lab-fleet");if(b && !$("#ftiles").children.length)b.insertAdjacentHTML("beforeend",'<p class="notice">The fleet dataset is temporarily unavailable. <a href="read/gpu-batch-research.html">Read the saved GPU audit.</a></p>');
});

function lazyQA(){var el=$("#questions");if(!el)return;var go=function(){if(go.done)return;go.done=true;j("data/qa.json").then(qa).catch(function(){var q=$("#qa");if(q)q.innerHTML='<p class="searchmessage">The questions could not load. <a href="read/questions.html">Read the question index.</a></p>'})};if("IntersectionObserver" in window){var qo=new IntersectionObserver(function(es){if(es[0].isIntersecting){qo.disconnect();go()}},{rootMargin:"900px"});qo.observe(el)}else go();addEventListener("hashchange",function(){if(location.hash==="#questions")go()})}
function stats(TL,M,QAN,LIB){
  var vids=0;M.forEach(function(g){vids+=g.items.length});
  $("#stats").innerHTML=[[TL.length,"timeline events"],[QAN,"answered questions"],[LIB.length,"documents"],[vids,"videos"]].map(function(s){return"<div><b>"+s[0]+"</b>"+s[1]+"</div>"}).join("")}

/* ---------- timeline ---------- */
function timeline(TL){
  var fb={b:"all",t:"all",q:""};
  function chips(el,items,key,fmt){el.innerHTML=items.map(function(x){return'<button class="chip" data-b="'+(key==="b"?x:"")+'" data-k="'+x+'" aria-pressed="'+(fb[key]===x)+'" '+(key==="b"&&x!=="all"?'data-bench="'+x+'"':"")+'>'+(x!=="all"&&key==="b"?'<i class="dot"></i>':"")+fmt(x)+"</button>"}).join("");
    $$("button",el).forEach(function(b){b.onclick=function(){fb[key]=b.dataset.k;$$("button",el).forEach(function(o){o.setAttribute("aria-pressed",o===b)});render()}})}
  chips($("#tf-bench"),["all","furmark","superposition","3dmark"],"b",function(x){return BN[x]});
  chips($("#tf-type"),["all","release","company","controversy","hardware","milestone"],"t",function(x){return x==="all"?"All kinds":x[0].toUpperCase()+x.slice(1)});
  $("#tsearch").oninput=function(){fb.q=this.value.toLowerCase();render()};
  var allOpen=false;$("#texp").onclick=function(){allOpen=!allOpen;this.textContent=allOpen?"Collapse all":"Expand all";$$(".ev").forEach(function(x){x.classList.toggle("open",allOpen);x.querySelector(".ev-toggle").setAttribute("aria-expanded",String(allOpen))})};
  function fmtD(d){var p=d.split("-");var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return p.length===3?(+p[2])+" "+M[+p[1]-1]+" "+p[0]:p.length===2?M[+p[1]-1]+" "+p[0]:p[0]}
  function render(){
    var rows=TL.filter(function(e){return(fb.b==="all"||e.b===fb.b)&&(fb.t==="all"||e.ty===fb.t)&&(!fb.q||(e.t+" "+e.x).toLowerCase().indexOf(fb.q)>=0)});
    $("#tcount").textContent=rows.length+" events";
    var out="",yr="";
    rows.forEach(function(e,i){var y=e.d.slice(0,4);if(y!==yr){yr=y;out+='<div class="yr"><span>'+y+"</span></div>"}
      var eid="event-"+i;
      out+='<article class="ev'+(allOpen?" open":"")+'" data-bench="'+e.b+'"><div class="card"><div class="head"><span class="tag">'+BN[e.b]+'</span><span class="ty '+e.ty+'">'+e.ty+'</span><span class="d">'+fmtD(e.d)+'</span></div><button type="button" class="ev-toggle" aria-expanded="'+allOpen+'" aria-controls="'+eid+'"><h3>'+esc(e.t)+'</h3><span class="expandhint">'+(allOpen?"Collapse":"Explore")+' ▾</span></button><div class="x" id="'+eid+'"><p>'+esc(e.x)+'</p><a href="read/'+e.doc+'.html">Read more and see sources →</a></div></div></article>'});
    $("#rail").innerHTML=out||'<p style="color:var(--mut)">No events match. Try clearing a filter.</p>';
    $$(".ev-toggle").forEach(function(b){b.addEventListener("click",function(){var el=b.closest(".ev"),opened=el.classList.toggle("open");b.setAttribute("aria-expanded",String(opened));b.querySelector(".expandhint").textContent=opened?"Collapse ▴":"Explore ▾"})})}
  render()}

/* ---------- watch ---------- */
function watch(M){
  var st={g:0,b:"all"};
  $("#vtabs").innerHTML=M.map(function(g,i){return'<button class="chip" data-i="'+i+'" aria-pressed="'+(i===0)+'">'+esc(g.g)+"</button>"}).join("");
  $("#vbench").innerHTML=["all","fleet","furmark","superposition","3dmark"].map(function(b){return'<button class="chip" data-b="'+b+'" aria-pressed="'+(b==="all")+'">'+BN[b]+"</button>"}).join("");
  $$("#vtabs .chip").forEach(function(c){c.onclick=function(){st.g=+c.dataset.i;$$("#vtabs .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  $$("#vbench .chip").forEach(function(c){c.onclick=function(){st.b=c.dataset.b;$$("#vbench .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  function r(){var items=M[st.g].items.filter(function(v){return st.b==="all"||v.b===st.b});
    $("#vgrid").innerHTML=items.map(function(v){return'<article class="vcard" data-bench="'+v.b+'"><div class="yt" data-id="'+v.id+'" data-title="'+esc(v.t)+'" role="button" tabindex="0" aria-label="Play: '+esc(v.t)+'"><img loading="lazy" decoding="async" width="480" height="360" referrerpolicy="no-referrer" onerror="this.classList.add(\'bad\')" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt=""><div class="play"><i></i></div></div><h3>'+esc(v.t)+"</h3><small>"+esc(v.by)+" · "+BN[v.b]+"</small>"+(v.n?"<p>"+esc(v.n)+"</p>":"")+'<a href="https://www.youtube.com/watch?v='+v.id+'" target="_blank" rel="noopener" style="font-size:13px">Open on YouTube ↗</a></article>'}).join("")||'<p style="color:var(--mut)">Nothing in this view.</p>';
    $$(".yt").forEach(function(y){y.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();y.click()}})})}
  r()}

/* ---------- spotify shelf ---------- */
(function(){
  var KEY="spotify-shelf",box=$("#spembeds");
  function get(){try{var a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a.filter(function(x){return x&&/^(episode|show|playlist|album|track|artist)$/.test(x.t)&&/^[A-Za-z0-9]+$/.test(x.id)}).slice(0,20):[]}catch(e){return[]}}
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
  var el=$("#photogrid");if(!P.length){$("#photos").style.display="none";return}
  el.innerHTML=P.map(function(p,i){return'<figure><button class="photozoom" type="button" data-i="'+i+'" aria-label="Enlarge photo: '+esc(p.t)+'"><img loading="lazy" decoding="async" width="'+(p.w||960)+'" height="'+(p.h||640)+'" src="'+esc(p.src)+'" alt="'+esc(p.alt)+'"></button><figcaption><b>'+esc(p.t)+"</b>"+esc(p.c)+' <a href="'+esc(p.page)+'" target="_blank" rel="noopener">'+esc(p.credit)+" · "+esc(p.lic)+"</a></figcaption></figure>"}).join("");
  var lb=$("#lightbox");
  var previousFocus=null;
  el.addEventListener("click",function(e){var b=e.target.closest(".photozoom");if(!b)return;var p=P[+b.dataset.i];previousFocus=document.activeElement;$("#lbimg").src=p.big||p.src;$("#lbimg").alt=p.alt;$("#lbcap").textContent=p.t+" — "+p.credit+", "+p.lic;lb.classList.add("open");$("#lbclose").focus()});
  function close(){if(!lb.classList.contains("open"))return;lb.classList.remove("open");if(previousFocus&&previousFocus.focus)previousFocus.focus()}
  lb.onclick=function(e){if(e.target===lb||e.target.closest("#lbclose"))close()};
  addEventListener("keydown",function(e){if(e.key==="Escape")close()})}

/* ---------- lab ---------- */
$$("#labtabs .chip").forEach(function(c){c.onclick=function(){$$("#labtabs .chip").forEach(function(o){o.classList.toggle("on",o===c)});["fleet","hall","bench","decode"].forEach(function(t){$("#lab-"+t).hidden=t!==c.dataset.t})}});
function hall(G){
  var f={v:"all"};var vs=["all"].concat(G.map(function(g){return g.v}).filter(function(v,i,a){return a.indexOf(v)===i}));
  $("#gf").innerHTML=vs.map(function(v){return'<button class="chip" data-v="'+v+'" aria-pressed="'+(v==="all")+'">'+(v==="all"?"All vendors":v)+"</button>"}).join("");
  $$("#gf .chip").forEach(function(c){c.onclick=function(){f.v=c.dataset.v;$$("#gf .chip").forEach(function(o){o.setAttribute("aria-pressed",o===c)});r()}});
  function r(){$("#gpugrid").innerHTML=G.filter(function(g){return f.v==="all"||g.v===f.v}).map(function(g){return'<article class="card gpu v-'+g.v+'"><div class="chipface"><span>'+esc(g.v)+"</span><span>"+g.y+'</span></div><h3>'+esc(g.n)+'</h3><div class="hh">'+esc(g.h)+"</div><ul>"+g.f.map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+'</ul><div class="srow">'+g.b.map(function(b){return'<span class="tag" data-bench="'+b+'">'+BN[b]+"</span>"}).join("")+'<a class="chip" href="read/'+g.doc+'.html">Sources →</a></div></article>'}).join("")}
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

/* ---------- fleet ---------- */
function fleet(F){
  var C=F.cards,RIGC={"Gigabyte":"#76d12a","Asus B250":"#35a7ff","ASrock":"#ff8a2a","unlabelled":"#9aa3b8"},st={m:"fm",rig:"all",sel:null,zero:false,follow:false};
  var MET={fm:["FurMark 1080p","points"],sp:["Superposition","points"],sn:["Steel Nomad","points"]};
  var FLAGS={4:["warn","The FurMark link opens a different GPU (RX 9070 XT, 15,590). Do not read its telemetry as this card; find the real result."],15:["note","Lowest FurMark (4,819) and Steel Nomad (1,272), on the Celeron / Asus B250 rig. Retest before judging the card."],19:["ok","OCCT: no errors. FurMark 5,033, 59 °C peak, max 1,785 MHz."],23:["note","Superposition 11,446 is about 7% under the same-rig median. Repeat with an identical preset and API."],24:["ok","Highest recorded in all three benchmarks (5,182 / 13,062 / 1,373), but on a different rig from many lower cards."],25:["note","FurMark and Steel Nomad high, Superposition lower. Check for a settings mismatch first."],36:["warn","Fan spinning loudly; test stopped. Keep out of stress testing until the fan is physically checked."],37:["ok","Public FurMark 5,033 (83 FPS), 56 °C, matches your photo."],38:["note","Superposition and Steel Nomad still blank."]};
  function needsFollowUp(c){return c.status==="LINK_SCORE_MISMATCH"||c.status==="FAN_NOISE_STOP"||c.fm==null||c.sp==null||c.sn==null||[15,23,25].indexOf(c.card)>=0}
  var vals=function(k,rig){return C.filter(function(c){return c[k]!=null&&(rig==="all"||c.rig===rig)}).map(function(c){return c[k]})};
  var mean=function(a){return a.reduce(function(x,y){return x+y},0)/a.length};
  var fmt=function(x){return Math.round(x).toLocaleString()};
  $("#fsnap").textContent=F.snapshot;
  $("#gtxspec").innerHTML=[["Launched","10 Jun 2016"],["Chip","Pascal GP104, 16 nm"],["CUDA cores","1,920"],["Memory","8 GB GDDR5, 256-bit"],["Reference clocks","1506 / 1683 MHz"],["Board power","150 W reference"],["Launch price","US$379 / $449 FE"],["Ray tracing","none (no RT cores)"]].map(function(x){return"<div>"+x[0]+"<b>"+x[1]+"</b></div>"}).join("");
  var fullyTested=C.filter(function(c){return c.fm!=null&&c.sp!=null&&c.sn!=null}).length;
  $("#ftiles").innerHTML='<div class="card ftile"><b>'+F.started+" / "+F.slots+'</b>cards started<small>slots are not proof a card exists</small></div>'+
      '<div class="card ftile"><b>'+fullyTested+'</b>all 3 scores recorded<small>Not a pass certificate; VRAM and fans still need checking</small></div>'+
      Object.keys(MET).map(function(k){var a=vals(k,"all");return'<div class="card ftile"><b>'+(a.length?fmt(mean(a)):"–")+"</b>"+MET[k][0]+" mean<small>n="+a.length+(a.length?" · low "+fmt(Math.min.apply(null,a))+" · high "+fmt(Math.max.apply(null,a)):"")+"</small></div>"}).join("");
  function chips(el,items,key,lab){el.innerHTML=items.map(function(x){return'<button class="chip" data-k="'+x+'" aria-pressed="'+(st[key]===x)+'">'+lab(x)+"</button>"}).join("");$$("button",el).forEach(function(b){b.onclick=function(){st[key]=b.dataset.k;$$("button",el).forEach(function(o){o.setAttribute("aria-pressed",o===b)});draw()}})}
  chips($("#ff-metric"),["fm","sp","sn"],"m",function(k){return MET[k][0]});
  var rigs=["all"].concat(Object.keys(RIGC).filter(function(r){return C.some(function(c){return c.rig===r})}));
  chips($("#ff-rig"),rigs,"rig",function(r){return r==="all"?"All test PCs":r});
  $("#fzero").onchange=function(){st.zero=this.checked;draw()};
  $("#ffollow").onchange=function(){st.follow=this.checked;draw()};
  function rowsForView(){return C.filter(function(c){return c[st.m]!=null&&(st.rig==="all"||c.rig===st.rig)&&(!st.follow||needsFollowUp(c))}).sort(function(a,b){return b[st.m]-a[st.m]})}
  $("#fgo").onclick=function(){var n=Number($("#fcardgo").value),c=C.find(function(x){return x.card===n});
    if(!Number.isInteger(n)||n<1||n>F.slots){$("#factionmsg").textContent="Enter a card number from 1 to "+F.slots+".";return}
    if(!c){$("#factionmsg").textContent="Card #"+n+" is a blank, unstarted slot in this saved snapshot.";return}
    $("#factionmsg").textContent="Showing saved results for card #"+n+".";
    st.rig="all";st.follow=false;$("#ffollow").checked=false;
    $$("#ff-rig button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.k==="all"))});
    draw();sel(n);$("#fdetail").focus();$("#fdetail").scrollIntoView({block:"nearest",behavior:"smooth"});
  };
  $("#fcardgo").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();$("#fgo").click()}});
  $("#fexport").onclick=function(){
    var rows=rowsForView();
    if(!rows.length){$("#factionmsg").textContent="No matching cards to export.";return}
    var fields=["card","rig","fm","sp","sn","status","temp","power","clockmax","cpu","driver","url","note"];
    function cell(v){var x=String(v==null?"":v);if(/^[=+@-]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"'}
    var csv=fields.join(",")+"\r\n"+rows.map(function(c){return fields.map(function(k){return cell(c[k])}).join(",")}).join("\r\n")+"\r\n";
    var blob=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");
    a.href=blob;a.download="gtx1070-"+F.snapshot+"-"+st.m+"-selected.csv";document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(blob)},1000);
    $("#factionmsg").textContent="Exported "+rows.length+" visible cards (snapshot "+F.snapshot+").";
  };
  function sel(n){var c=C.find(function(x){return x.card===n});if(!c)return;st.sel=n;draw();var fl=FLAGS[n];
    var peers=C.filter(function(x){return x.rig===c.rig&&x.fm!=null}),avg=peers.length?mean(peers.map(function(x){return x.fm})):null;
    var comparison=c.fm!=null&&avg!=null?'<p class="fleetcompare">Compared with '+esc(c.rig)+' rig mean ('+fmt(avg)+', n='+peers.length+'): '+((c.fm/avg-1)*100).toFixed(1)+'%. Not a hardware pass/fail or a cross-PC ranking.</p>':"";
    var missing=[c.fm==null?"FurMark":null,c.sp==null?"Superposition":null,c.sn==null?"Steel Nomad":null].filter(Boolean);
    $("#fdetail").innerHTML='<span class="kicker">Card #'+n+'</span><div class="dgrid">'+[["FurMark",c.fm],["Superposition",c.sp],["Steel Nomad",c.sn],["Peak temp",c.temp!=null?c.temp+" °C":null],["Peak power (est.)",c.power!=null?c.power+" W":null],["Max clock",c.clockmax!=null?c.clockmax+" MHz":null],["Test PC",c.rig],["CPU",c.cpu],["Driver",c.driver]].map(function(x){return"<div>"+x[0]+"<b>"+(x[1]!=null&&x[1]!==""?(typeof x[1]==="number"?x[1].toLocaleString():esc(x[1])):"–")+"</b></div>"}).join("")+"</div>"+comparison+(missing.length?'<p class="fleetcompare">No saved score: '+missing.join(", ")+'. Blank is not a failure.</p>':"")+
      (c.fm!=null?'<p style="margin:12px 0 0;color:var(--mut);font-size:14px">FurMark '+fmt(c.fm)+' points ≈ '+(c.fm/60).toFixed(0)+' FPS over the 60 s run'+(c.sn!=null?'; Steel Nomad '+fmt(c.sn)+' ≈ '+(c.sn/100).toFixed(1)+' FPS at 4K':"")+".</p>":"")+
      '<div style="margin-top:10px">'+(c.gpuz?'<span class="pill ok">GPU-Z recognised</span>':"")+(c.status==="MATCHED_GTX1070"?'<span class="pill ok">public result matches</span>':"")+(c.status==="LINK_SCORE_MISMATCH"?'<span class="pill warn">link mismatch</span>':"")+(c.occt?'<span class="pill ok">OCCT: '+esc(c.occt)+"</span>":"")+(c.note?'<span class="pill warn">'+esc(c.note)+"</span>":"")+(fl?'<span class="pill '+fl[0]+'">'+esc(fl[1])+"</span>":"")+"</div>"+(c.url?'<a href="'+esc(c.url)+'" target="_blank" rel="noopener">'+(c.status==="LINK_SCORE_MISMATCH"?"Incorrect link — opens a different GPU ↗":"Open public FurMark result ↗")+'</a>':"")}
  function draw(){
    var k=st.m,rows=rowsForView(),values=rows.map(function(c){return c[k]});
    var mx=rows.length?Math.max.apply(null,values):0,mn=rows.length?Math.min.apply(null,values):0,base=st.zero?0:mn*.97;
    $("#fbt").textContent=MET[k][0]+" · "+rows.length+" cards"+(rows.length?" · chart axis starts at "+fmt(base):"");
    $("#fbars").innerHTML=rows.length?rows.map(function(c){
      var width=mx===base?100:Math.max(2,Math.min(100,(c[k]-base)/(mx-base)*100));
      return '<button type="button" aria-label="#'+c.card+' '+fmt(c[k])+', inspect card '+c.card+' ('+MET[k][0]+' points)" aria-pressed="'+(st.sel===c.card)+'" class="frow'+(st.sel===c.card?" sel":"")+'" data-n="'+c.card+'" style="--rc:'+(RIGC[c.rig]||"#9aa3b8")+'"><b>#'+c.card+'</b><div><i style="width:'+width+'%"></i></div><span>'+fmt(c[k])+'</span></button>'
    }).join(""):'<p class="searchmessage">No scored cards match these filters. Try another test PC or untick “Follow-ups only”.</p>';
    $$(".frow").forEach(function(r){r.onclick=function(){sel(+r.dataset.n)}});
    // The plot is a within-batch comparison, not a causal measure of hardware health.
    var P=C.filter(function(c){return c.fm!=null&&c.sp!=null&&(st.rig==="all"||c.rig===st.rig)&&(!st.follow||needsFollowUp(c))}),svg="";
    if(!P.length){
      $("#fscatter").innerHTML='<text x="310" y="190" text-anchor="middle">No paired scores in this filtered view.</text>';
      $("#ftip").textContent="Choose a broader filter to compare results.";
    }else{
      var x0=Math.min.apply(null,P.map(function(c){return c.fm}))-40,
          x1=Math.max.apply(null,P.map(function(c){return c.fm}))+40,
          y0=Math.min.apply(null,P.map(function(c){return c.sp}))-150,
          y1=Math.max.apply(null,P.map(function(c){return c.sp}))+150;
      var X=function(v){return 78+(v-x0)/(x1-x0)*518},Y=function(v){return 350-(v-y0)/(y1-y0)*320};
      for(var i=0;i<=4;i++){var gx=x0+(x1-x0)*i/4,gy=y0+(y1-y0)*i/4;
        svg+='<line x1="'+X(gx)+'" y1="30" x2="'+X(gx)+'" y2="350" stroke="rgba(255,255,255,.07)"/><line x1="78" y1="'+Y(gy)+'" x2="596" y2="'+Y(gy)+'" stroke="rgba(255,255,255,.07)"/><text x="'+X(gx)+'" y="368" text-anchor="middle">'+fmt(gx)+'</text><text x="70" y="'+(Y(gy)+3)+'" text-anchor="end">'+fmt(gy)+"</text>"}
      svg+='<text x="326" y="392" text-anchor="middle">FurMark points →</text><text x="10" y="190" transform="rotate(-90 10 190)" text-anchor="middle">Superposition →</text>';
      P.forEach(function(c){svg+='<circle data-n="'+c.card+'" tabindex="0" role="button" aria-label="Inspect card '+c.card+', FurMark '+fmt(c.fm)+', Superposition '+fmt(c.sp)+'" cx="'+X(c.fm).toFixed(1)+'" cy="'+Y(c.sp).toFixed(1)+'" r="5.5" fill="'+(RIGC[c.rig]||"#9aa3b8")+'" class="'+(st.sel===c.card?"sel":"")+'"/>'});
      $("#fscatter").innerHTML=svg;
      $$("#fscatter circle").forEach(function(node){var n=+node.dataset.n,cd=C.find(function(x){return x.card===n});
        node.onclick=function(){sel(n)};
        node.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();sel(n)}};
        node.onmouseenter=node.onfocus=function(){$("#ftip").textContent="#"+n+" · FurMark "+fmt(cd.fm)+" · Superposition "+fmt(cd.sp)+" · "+cd.rig};
      });
      $("#ftip").textContent=P.length+" paired results · pick a dot or use “Find a card #”.";
    }
    var legend=$("#fscatter").parentNode.querySelector(".legend");
    if(legend)legend.remove();
    $("#fscatter").insertAdjacentHTML("afterend",'<div class="legend">'+Object.keys(RIGC).filter(function(r){return C.some(function(c){return c.rig===r})}).map(function(r){return'<span><i style="background:'+RIGC[r]+'"></i>'+r+"</span>"}).join("")+"</div>");
    // rigs
    $("#frigs").innerHTML='<table class="table"><thead><tr><th>Test PC</th><th>Cards</th><th>FurMark mean</th><th>Superposition mean</th><th>Steel Nomad mean</th><th>CPU in public result</th></tr></thead><tbody>'+Object.keys(RIGC).filter(function(r){return C.some(function(c){return c.rig===r})}).map(function(r){var cs=C.filter(function(c){return c.rig===r}),m=function(kk){var a=vals(kk,r);return a.length?fmt(mean(a)):"–"},cpus=cs.map(function(c){return c.cpu}).filter(function(v,i,a){return v&&a.indexOf(v)===i}).join(", ");return"<tr><td><i class=\"dot\" style=\"background:"+RIGC[r]+"\"></i> <b>"+r+"</b></td><td>"+cs.length+"</td><td>"+m("fm")+"</td><td>"+m("sp")+"</td><td>"+m("sn")+"</td><td>"+esc(cpus||"–")+"</td></tr>"}).join("")+"</tbody></table>"}
  // Derive actionable list from saved audit statuses, rather than displaying
  // historically "good" cards as if they still require attention.
  var flagged=C.filter(needsFollowUp);
  $("#fflags").innerHTML=flagged.length?flagged.map(function(c){
    var fl=FLAGS[c.card],level=c.status==="FAN_NOISE_STOP"||c.status==="LINK_SCORE_MISMATCH"?"warn":"note";
    var description=fl?fl[1]:[c.fm==null?"FurMark":null,c.sp==null?"Superposition":null,c.sn==null?"Steel Nomad":null]
      .filter(Boolean).join(", ")+" not recorded in the snapshot. Finish testing before grading.";
    return '<button type="button" class="flag" data-n="'+c.card+'"><b>#'+c.card+'</b><span><span class="pill '+level+'">'+(level==="warn"?"check":"follow up")+'</span> '+esc(description)+'</span></button>'
  }).join(""):'<p class="searchmessage">No outstanding items in this snapshot.</p>';
  $$(".flag").forEach(function(button){button.onclick=function(){sel(+button.dataset.n);$("#fdetail").focus();$("#fdetail").scrollIntoView({block:"center",behavior:"smooth"})}});
  draw();sel(24);
}

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
  var G=[["fleet","Your GPUs"],["furmark","FurMark"],["superposition","UNIGINE Superposition"],["3dmark","3DMark & Steel Nomad"],["all","Indexes, method and fact-checking"]];
  $("#libroot").innerHTML=G.map(function(g){var items=L.filter(function(x){return x.bench===g[0]});return'<div class="libgroup" data-bench="'+g[0]+'"><h3><i class="dot"></i>'+g[1]+'</h3><div class="lib">'+items.map(function(x){return'<a class="card libcard" href="read/'+x.slug+'.html"><span class="tag">'+esc(x.kind)+"</span><b>"+esc(x.title)+"</b><span>"+esc(x.blurb)+"</span><small>~"+x.mins+" min read</small></a>"}).join("")+"</div></div>"}).join("")}
})();
