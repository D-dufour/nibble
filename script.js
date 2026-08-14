const PASSWORD_HASH = 'a8a7437c0261459e78889537fc9541df50193ec13b796fcda5ac7a2532722095';
const gate = document.getElementById('passwordGate');
const app = document.getElementById('app');
const form = document.getElementById('passwordForm');
const passwordInput = document.getElementById('password');
const error = document.getElementById('passwordError');

async function sha256(text){
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function unlock(){document.body.classList.remove('locked');gate.classList.add('hidden');app.setAttribute('aria-hidden','false');sessionStorage.setItem('nibble-unlocked','1')}
function lock(){sessionStorage.removeItem('nibble-unlocked');document.body.classList.add('locked');gate.classList.remove('hidden');app.setAttribute('aria-hidden','true');passwordInput.value='';passwordInput.focus()}
if(sessionStorage.getItem('nibble-unlocked')==='1') unlock();
form.addEventListener('submit', async e=>{e.preventDefault();error.textContent='';const hash=await sha256(passwordInput.value);if(hash===PASSWORD_HASH){unlock()}else{error.textContent='That password doesn’t match. Try again.';passwordInput.select()}});
document.getElementById('lockButton').addEventListener('click',lock);

document.querySelectorAll('.recipe-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.recipe-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(btn.dataset.target).classList.add('active');
  document.getElementById('recipeDetails').scrollIntoView({behavior:'smooth',block:'start'});
}));

const servingsSelect=document.getElementById('servings');
function formatQty(n){if(Number.isInteger(n))return n;const rounded=Math.round(n*100)/100;return rounded.toString().replace('.5','½').replace('.25','¼').replace('.75','¾')}
function updateServings(){const target=Number(servingsSelect.value);document.querySelectorAll('.ingredients li[data-qty]').forEach(li=>{if(!li.dataset.name){li.dataset.name=li.textContent;li.dataset.baseQty=li.dataset.qty}const base=Number(li.dataset.baseQty);const qty=base*(target/4);const unit=li.dataset.unit||'';const label=li.dataset.name.replace(/^[-\d.½¼¾]+\s*(tbsp|tsp|g|ml|small bunch|sprigs)?\s*/i,'');li.textContent=`${formatQty(qty)}${unit?' '+unit:''} ${label}`})}
servingsSelect.addEventListener('change',updateServings);updateServings();

const shopping={
  'Meat':['4 chicken breasts','12 lamb chops','4 skin-on duck breasts'],
  'Fruit & vegetables':['2 ripe mangoes','2 avocados','1 red pepper','2 medium carrots','150–200 g mixed salad leaves','4 spring onions','5 limes','2 lemons','2 oranges','600–700 g baby potatoes','3 large sweet potatoes (≈950 g)','24–32 baby carrots','300–400 g green beans','250 g cranberries','2 shallots','1 fresh chilli','1 bulb garlic','Fresh ginger'],
  'Fresh herbs':['1 bunch coriander','1 bunch mint','1 bunch rosemary','1 large bunch thyme'],
  'Pantry':['60–80 g roasted cashews or peanuts','Honey','Olive oil','Brown sugar','Caster sugar','Tomato purée','1 cinnamon stick','Smoked paprika','Ground cumin','Ground ginger','Salt','Black pepper'],
  'Sauces & liquids':['Gluten-free tamari','Red-wine vinegar','Balsamic vinegar','1 bottle red wine','400 ml gluten-free beef/lamb stock','300 ml gluten-free chicken stock']
};
const grid=document.getElementById('shoppingGrid');
const saved=JSON.parse(localStorage.getItem('nibble-shopping')||'{}');
Object.entries(shopping).forEach(([cat,items])=>{const card=document.createElement('div');card.className='shopping-card';card.innerHTML=`<h4>${cat}</h4>`;items.forEach(item=>{const id=`${cat}-${item}`;const row=document.createElement('label');row.className='shop-item'+(saved[id]?' done':'');row.innerHTML=`<input type="checkbox" ${saved[id]?'checked':''}><span>${item}</span>`;row.querySelector('input').addEventListener('change',e=>{saved[id]=e.target.checked;row.classList.toggle('done',e.target.checked);localStorage.setItem('nibble-shopping',JSON.stringify(saved))});card.appendChild(row)});grid.appendChild(card)});
document.getElementById('resetShopping').addEventListener('click',()=>{localStorage.removeItem('nibble-shopping');document.querySelectorAll('.shop-item').forEach(r=>{r.classList.remove('done');r.querySelector('input').checked=false});Object.keys(saved).forEach(k=>delete saved[k])});
