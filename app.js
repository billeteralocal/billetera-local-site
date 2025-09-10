document.getElementById('y').textContent=new Date().getFullYear();
const f=document.getElementById('calc');const out=document.getElementById('res');
f.addEventListener('submit',e=>{e.preventDefault();const P=+document.getElementById('monto').value||0;
const r=(+document.getElementById('tasa').value||0)/100;const n=+document.getElementById('meses').value||1;
const i=P*r*n;const t=P+i;out.innerHTML=`Monto: $${P.toFixed(2)} · Interés: $${i.toFixed(2)} · <b>Total: $${t.toFixed(2)}</b>`;});