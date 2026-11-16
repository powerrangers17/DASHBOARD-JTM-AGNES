// Pembaca data bersama: tampilkan data tersimpan di browser seketika, lalu perbarui dari server.
const tokn=()=>(typeof TOKEN_LIHAT!=='undefined'&&TOKEN_LIHAT)||localStorage.getItem('tok')||(t=>{if(t)localStorage.setItem('tok',t);return t})(prompt('Masukkan token akses'));
const tokAdm=()=>localStorage.getItem('tok_admin')||(t=>{if(t)localStorage.setItem('tok_admin',t);return t})(prompt('Masukkan token ADMIN untuk menyimpan data'));
async function swr(a,cb,fresh){
  const ck='c_'+a; try{const c=JSON.parse(localStorage.getItem(ck));if(c&&!fresh)cb(c,true)}catch(e){}
  const r=await fetch(`${API}?action=${a}&token=${encodeURIComponent(tokn())}${fresh?'&fresh=1':''}`),d=await r.json();
  if(d.error){localStorage.removeItem('tok');throw new Error(d.error)}
  try{localStorage.setItem(ck,JSON.stringify(d))}catch(e){}
  cb(d,false);return d}
async function quick(a){const c=localStorage.getItem('c_'+a);
  if(c){swr(a,()=>{}).catch(()=>{});return JSON.parse(c)}
  return swr(a,()=>{})}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
addEventListener('DOMContentLoaded',()=>{const h=document.querySelector('header');if(!h)return;
 const mk=(t,f)=>{const b=document.createElement('button');b.textContent=t;b.className='ghost';b.onclick=f;h.appendChild(b)};
 mk('Cetak',()=>print());
 mk('Unduh CSV',()=>{const o=[];document.querySelectorAll('table').forEach(t=>{[...t.rows].forEach(r=>o.push([...r.cells].map(c=>'"'+c.innerText.replace(/"/g,'""').trim()+'"').join(',')));o.push('')});
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+o.join('\n')],{type:'text/csv'}));a.download=(document.title||'data')+'.csv';a.click()})});
