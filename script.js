
function openManager(text){
  const m=document.getElementById('managerModal');
  const t=document.getElementById('managerText');
  if(text && t) t.textContent=text;
  m.classList.toggle('active');
}
function setRoute(src){ document.getElementById('mainRoute').src=src; }
function calcPrice(){
  const product=document.getElementById('product').value;
  const qty=Number(document.getElementById('qty').value||1);
  const speed=Number(document.getElementById('speed').value||1);
  const design=Number(document.getElementById('design').value||0);
  const base={cards:9,stickers:18,shirts:850,mugs:450,tags:22,flyers:7}[product]||10;
  const min={cards:1200,stickers:1500,shirts:2500,mugs:1800,tags:1800,flyers:1500}[product]||1000;
  const price=Math.max(min,qty*base)*speed+design;
  document.getElementById('price').textContent=Math.round(price).toLocaleString('ru-RU')+' ₽';
}
function smartPick(type, el){
  document.querySelectorAll('.smart-options button').forEach(b=>b.classList.remove('active'));
  if(el) el.classList.add('active');
  const answers={
    start:"Для запуска бренда:\n\n• визитки\n• наклейки с логотипом\n• флаеры или карточки\n• простая сувенирная продукция\n\nСмысл: быстро сделать бизнес узнаваемым.",
    pack:"Для упаковки:\n\n• наклейки\n• бирки\n• упаковочная лента\n• карточки благодарности\n\nСмысл: товар выглядит дороже уже в руках клиента.",
    gift:"Подарки клиентам:\n\n• кружки\n• ручки\n• открытки\n• небольшие наборы\n\nСмысл: клиент уносит бренд с собой.",
    staff:"Форма персонала:\n\n• футболки с принтом\n• бейджи\n• наклейки/бирки\n• фирменные элементы упаковки.",
    sale:"Для акции:\n\n• флаеры\n• наклейки\n• бейджи\n• сертификаты\n• сувенирка для раздачи.",
    premium:"Чтобы бренд выглядел дороже:\n\n• плотные материалы\n• минималистичный дизайн\n• матовая ламинация\n• аккуратные бирки\n• качественная упаковка."
  };
  document.getElementById('smartAnswer').textContent=answers[type]||'Опишите задачу — подберём комплект.';
}
function sendSmartToAI(){
  const text=document.getElementById('smartAnswer').textContent;
  openAIWith('Прокомментируй и улучши это предложение: '+text);
}
function toggleAI(){ document.getElementById('aiChat').classList.toggle('active'); }
function openAIWith(text){
  document.getElementById('aiChat').classList.add('active');
  const input=document.getElementById('aiInput');
  input.value=text; input.focus();
}
function aiAnswer(q){
  const text=String(q||'').toLowerCase().replace(/ё/g,'е');
  const has=(arr)=>arr.some(w=>text.includes(w));
  if(has(['адрес','как найти','где вы','маршрут'])) return 'Мы находимся: Нальчик, Тарчокова 29. На сайте есть раздел «Как нас найти» с фотографиями маршрута.';
  if(has(['срок','когда','успеете'])) return 'Срок зависит от изделия, тиража и макета. Обычно простая полиграфия 1–3 дня, одежда/сувенирка 2–7 дней.';
  if(has(['макет','дизайн','логотип','файл'])) return 'Для печати лучше подходят PDF, AI, CDR, SVG или качественный PNG/JPG. Если макета нет — дизайнер может подготовить его.';
  if(has(['визит'])) return 'Визитки лучше делать на плотной бумаге. Для премиального вида подойдут матовая ламинация и минималистичный дизайн.';
  if(has(['наклей','стикер'])) return 'Наклейки подходят для упаковки, товаров, акций и узнаваемости бренда. Важно выбрать форму, размер, материал и тираж.';
  if(has(['бирк'])) return 'Бирки делают товар дороже визуально. Для одежды подходят сатиновые или силиконовые бирки.';
  if(has(['футбол','одежд','дтф'])) return 'Печать на одежде подходит для формы персонала, мерча и мероприятий. Нужно уточнить цвет ткани, размер принта и количество.';
  if(has(['круж'])) return 'Кружки с логотипом подходят для подарков, офиса, кофеен и корпоративных наборов.';
  if(has(['что выбрать','подобрать','посоветуй','не знаю','помоги'])) return 'Ответьте на 4 вопроса: сфера бизнеса, цель, бюджет и срок. После этого я предложу эконом, стандарт и премиум комплект.';
  return 'Я ALFA AI. Могу помочь с полиграфией, наклейками, визитками, бирками, одеждой с принтом, кружками, упаковкой, макетами, сроками и подбором решения под бизнес.';
}
function sendAI(e){
  e.preventDefault();
  const input=document.getElementById('aiInput');
  const body=document.getElementById('aiBody');
  const q=input.value.trim();
  if(!q) return;
  const u=document.createElement('div');
  u.className='user'; u.textContent=q; body.appendChild(u);
  input.value='';
  setTimeout(()=>{
    const b=document.createElement('div');
    b.className='bot'; b.textContent=aiAnswer(q); body.appendChild(b); body.scrollTop=body.scrollHeight;
  },250);
}
calcPrice();
