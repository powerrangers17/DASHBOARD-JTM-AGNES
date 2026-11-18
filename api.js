// Pembaca data bersama: tampilkan data tersimpan di browser seketika, lalu perbarui dari server.
const tokn=()=>(typeof TOKEN_LIHAT!=='undefined'&&TOKEN_LIHAT)||localStorage.getItem('tok')||(t=>{if(t)localStorage.setItem('tok',t);return t})(prompt('Masukkan token akses'));
const tokAdm=()=>localStorage.getItem('tok_admin')||(t=>{if(t)localStorage.setItem('tok_admin',t);return t})(prompt('Masukkan token ADMIN untuk menyimpan data'));
const CK=a=>'c_'+(typeof DEMO!=='undefined'&&DEMO?'d_':'')+a;
async function swr(a,cb,fresh){
  const ck=CK(a); try{const c=JSON.parse(localStorage.getItem(ck));if(c&&!fresh)cb(c,true)}catch(e){}
  const r=await fetch(`${API}?action=${a}&token=${encodeURIComponent(tokn())}${fresh?'&fresh=1':''}`),d=await r.json();
  if(d.error){localStorage.removeItem('tok');throw new Error(d.error)}
  try{localStorage.setItem(ck,JSON.stringify(d))}catch(e){}
  cb(d,false);return d}
async function quick(a){const c=localStorage.getItem(CK(a));
  if(c){swr(a,()=>{}).catch(()=>{});return JSON.parse(c)}
  return swr(a,()=>{})}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
const ICON={grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
list:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
chart:'<path d="M18 20V10M12 20V4M6 20v-6"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
cam:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
bolt:'<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const BLN=['Semua bulan','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const PER={cb:[],get(){const n=new Date(),y=localStorage.getItem('per_y'),m=localStorage.getItem('per_m');return{y:y===null?String(n.getFullYear()):y,m:m===null?String(n.getMonth()+1).padStart(2,'0'):m}}};
const periode=()=>PER.get();
const plabel=()=>{const p=PER.get();return p.y?(p.m?BLN[+p.m]+' '+p.y:'Tahun '+p.y):(p.m?BLN[+p.m]+' (semua tahun)':'Semua periode')};
const PAGES=[['index.html','grid','Dashboard'],['petugas.html','cal','Jadwal Yantek'],['lapor.html','cam','Lapor Kerja'],['riwayat.html','clock','Riwayat'],['temuan.html','list','Temuan'],['peta.html','pin','Peta'],['korelasi.html','chart','Korelasi'],['vendor.html','users','Pelaksana ROW']];
addEventListener('DOMContentLoaded',()=>{
 const h=document.querySelector('header'),m=document.querySelector('main');if(!h||!m)return;
 const f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';document.head.appendChild(f);
 const cur=location.pathname.split('/').pop()||'index.html',n=h.querySelector('nav');if(n)n.remove();
 const acts=document.createElement('div');acts.className='acts';h.querySelectorAll(':scope>button').forEach(b=>acts.appendChild(b));
 const mk=(t,fn)=>{const b=document.createElement('button');b.textContent=t;b.className='ghost';b.onclick=fn;acts.appendChild(b)};
 if(typeof API_DEMO!=='undefined'&&API_DEMO)mk(DEMO?'Mode: data contoh':'Mode: data nyata',()=>{localStorage.setItem('mode',DEMO?'real':'demo');location.reload()});
 mk('Cetak',()=>print());
 mk('Unduh CSV',()=>{const o=[];document.querySelectorAll('table').forEach(t=>{[...t.rows].forEach(r=>o.push([...r.cells].map(c=>'"'+c.innerText.replace(/"/g,'""').trim()+'"').join(',')));o.push('')});
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+o.join('\n')],{type:'text/csv'}));a.download=(document.title||'data')+'.csv';a.click()});
 if(document.body.hasAttribute('data-periode')){const p=PER.get(),n=new Date().getFullYear(),w=document.createElement('div');w.className='per';
  w.innerHTML='<select id="per-y" aria-label="Tahun"><option value="">Semua tahun</option>'+[0,1,2,3].map(i=>`<option${String(n-i)===p.y?' selected':''}>${n-i}</option>`).join('')+'</select><select id="per-m" aria-label="Bulan">'+BLN.map((b,i)=>{const v=i?String(i).padStart(2,'0'):'';return `<option value="${v}"${v===p.m?' selected':''}>${b}</option>`}).join('')+'</select>';
  h.appendChild(w);w.querySelectorAll('select').forEach(s=>s.onchange=()=>{localStorage.setItem('per_y',w.querySelector('#per-y').value);localStorage.setItem('per_m',w.querySelector('#per-m').value);PER.cb.forEach(f=>f())})}
 h.appendChild(acts);
 const g=new Date().getHours(),hi=g<11?'Selamat pagi':g<15?'Selamat siang':g<18?'Selamat sore':'Selamat malam';
 h.firstElementChild.insertAdjacentHTML('afterbegin','<div class="hi">'+hi+'</div>');
 const sh=document.createElement('div');sh.className='shell';
 sh.innerHTML='<aside class="side"><div class="logo">'+ic('bolt')+'<span>JTM Monitor</span></div>'+PAGES.map(p=>`<a href="${p[0]}"${p[0]===cur?' class="on" aria-current="page"':''}>${ic(p[1])}<span>${p[2]}</span></a>`).join('')+'</aside><div class="content"></div>';
 document.body.prepend(sh);sh.querySelector('.content').append(h,m);
 if((typeof DEMO!=='undefined'&&DEMO)||(typeof LABEL_DEMO!=='undefined'&&LABEL_DEMO)){const d=document.createElement('div');d.className='demo';d.textContent='DATA CONTOH (FIKTIF) - bukan data operasional';sh.querySelector('.content').prepend(d)}
 document.querySelectorAll('section').forEach(s=>{if(s.querySelector('#map,textarea,.f,form'))s.classList.add('nosc')});
 const fix=()=>document.querySelectorAll('section').forEach(s=>{const t=s.querySelector('table');if(t&&t.rows.length&&t.rows[0].cells.length>3)s.classList.add('wide');s.querySelectorAll('div[style*="overflow-x"]').forEach(d=>d.style.overflowX='visible')});
 new MutationObserver(fix).observe(m,{childList:true,subtree:true});fix();
 setTimeout(()=>{if(typeof map!=='undefined'&&map.invalidateSize)map.invalidateSize()},300);
});
