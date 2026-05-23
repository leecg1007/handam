/* ---- navigation ---- */
function go(id){
  const target=document.getElementById('page-'+id);
  if(!target) return;
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p===target));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.page===id));
  target.scrollTop=0;
  if(id==='diary') resetOCR();
  if(id==='fortune') setTimeout(animateGauge,260);
}

/* ---- theme ---- */
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.getElementById('theme-btn').innerHTML =
    t==='dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  document.getElementById('dark-switch').classList.toggle('on', t==='dark');
  try{ localStorage.setItem('handam-theme',t); }catch(e){}
}
function toggleTheme(event){
  if(event) event.stopPropagation();
  const cur=document.documentElement.getAttribute('data-theme');
  applyTheme(cur==='dark'?'light':'dark');
}
function toggleSwitch(event, element, message){
  if(event) event.stopPropagation();
  element.classList.toggle('on');
  if(message) showToast(message);
}
(function(){
  let saved='light';
  try{ saved=localStorage.getItem('handam-theme')||'light'; }catch(e){}
  applyTheme(saved);
})();

/* ---- fortune gauge ---- */
function animateGauge(){
  const ring=document.getElementById('gauge-ring');
  const num=document.getElementById('gauge-num');
  const C=515.2, target=window._fortuneTarget||95;
  ring.style.transition='none';
  ring.style.strokeDashoffset=C;
  ring.getBoundingClientRect();          // force reflow
  ring.style.transition='stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)';
  ring.style.strokeDashoffset=C*(1-target/100);
  let v=0;
  clearInterval(window._gauge);
  window._gauge=setInterval(()=>{
    v+=2; if(v>=target){v=target;clearInterval(window._gauge);}
    num.textContent=v;
  },26);
}

/* ---- OCR flow ---- */
function setStep(step){
  document.getElementById('ocr-upload').style.display = step==='upload'?'block':'none';
  document.getElementById('ocr-loading').style.display= step==='loading'?'block':'none';
  document.getElementById('ocr-result').style.display = step==='result'?'block':'none';
}
function runOCR(){
  setStep('loading');
  const status=document.getElementById('ocr-status');
  setTimeout(()=>status.textContent='AI가 문장을 다듬고 있어요…',1500);
  setTimeout(()=>setStep('result'),2900);
}
function resetOCR(){ setStep('upload'); }
function saveDiary(){
  showToast('일기가 내 기기에 안전하게 저장되었어요');
  resetOCR(); go('home');
}
document.getElementById('emo-pick').addEventListener('click',e=>{
  const o=e.target.closest('.emo-opt'); if(!o) return;
  document.querySelectorAll('#emo-pick .emo-opt').forEach(x=>x.classList.remove('sel'));
  o.classList.add('sel');
});

document.getElementById('manual-mood').addEventListener('click',e=>{
  const o=e.target.closest('.emo-opt'); if(!o) return;
  document.querySelectorAll('#manual-mood .emo-opt').forEach(x=>x.classList.remove('sel'));
  o.classList.add('sel');
});

document.querySelectorAll('.seg').forEach(seg=>{
  seg.addEventListener('click',e=>{
    const btn=e.target.closest('button'); if(!btn) return;
    seg.querySelectorAll('button').forEach(x=>x.classList.remove('on'));
    btn.classList.add('on');
    try{ localStorage.setItem('handam-'+seg.parentElement.querySelector('.lead').textContent.trim(), btn.textContent.trim()); }catch(error){}
    showToast(btn.textContent.trim()+' 설정을 적용했어요');
  });
});

const promptSets=[
  [
    ['98%','🍜','가장 행복했던 한 끼','최근 일기에 ‘음식’ 키워드가 자주 보였어요. 가장 기억에 남는 맛은 무엇이었나요?'],
    ['85%','🌱','나를 성장시킨 실수','지난주 프로젝트 고민을 기록하셨죠. 그 과정에서 배운 점을 정리해 볼까요?'],
    ['72%','💌','1년 뒤의 나에게','지금의 목표들을 1년 뒤의 내가 읽는다면, 어떤 마음이 들까요?']
  ],
  [
    ['96%','🌙','요즘 나를 쉬게 하는 것','바쁜 기록 사이에 휴식 이야기가 적었어요. 나를 회복시키는 장면을 남겨볼까요?'],
    ['88%','☕','오늘 고마웠던 말','최근 대화가 마음에 남은 날이 있었어요. 다시 듣고 싶은 한마디는 무엇인가요?'],
    ['79%','🧭','다음 주의 작은 약속','해야 할 일이 많아 보여요. 나에게 꼭 지켜주고 싶은 약속 하나를 적어볼까요?']
  ],
  [
    ['94%','📷','사진처럼 남은 순간','오늘 하루를 한 장면으로 고른다면 무엇이 가장 선명한가요?'],
    ['86%','🪴','작게 나아진 부분','아주 작아도 어제보다 나아진 점을 발견해보세요. 무엇이 달라졌나요?'],
    ['74%','✉️','말하지 못한 마음','직접 말하긴 어려웠지만 글로는 남길 수 있는 마음이 있나요?']
  ]
];
let promptSetIndex=0;

function refreshPrompts(){
  promptSetIndex=(promptSetIndex+1)%promptSets.length;
  document.querySelectorAll('.prompt-slot').forEach((card,index)=>{
    const data=promptSets[promptSetIndex][index];
    card.querySelector('.match').innerHTML='<i class="fa-solid fa-bolt"></i> 추천도 '+data[0];
    card.querySelector('span[style*="font-size:20px"]').textContent=data[1];
    card.querySelector('h3').textContent=data[2];
    card.querySelector('p').textContent=data[3];
  });
  showToast('새 글감을 골랐어요');
}

function startPromptDiary(card){
  const title=card.querySelector('h3').textContent;
  try{ localStorage.setItem('handam-selected-prompt',title); }catch(error){}
  showToast('글감 "'+title+'"로 기록을 시작해요');
  go('diary');
}

function openRecord(title,date,mood,body){
  document.getElementById('record-title').textContent=title;
  document.getElementById('record-date').textContent=date;
  document.getElementById('record-mood').textContent=mood;
  document.getElementById('record-body').textContent=body;
  document.getElementById('record-summary').textContent='“'+body.split('.')[0]+'.”';
  go('record-detail');
}

function saveManualDiary(){
  const title=document.getElementById('manual-title').value.trim()||'제목 없는 기록';
  const body=document.getElementById('manual-body').value.trim()||'오늘의 마음을 직접 적어둔 기록입니다.';
  try{ localStorage.setItem('handam-last-manual',JSON.stringify({title,body,createdAt:new Date().toISOString()})); }catch(error){}
  showToast('직접 입력한 일기를 저장했어요');
  openRecord(title,'오늘',document.querySelector('#manual-mood .emo-opt.sel').textContent.replace(/^[^\s]+ /,''),body);
}

function updateFortuneFromBirthday(){
  window._fortuneTarget=88+Math.floor(Math.random()*10);
  closeSheet();
  showToast('생년월일 기준 운세를 다시 계산했어요');
  setTimeout(animateGauge,120);
}

function logout(){
  showToast('로그아웃했어요');
  go('login');
}

function login(){
  showToast('다시 로그인했어요');
  go('home');
}

function showToast(message){
  const toast=document.getElementById('toast');
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(()=>toast.classList.remove('show'),1900);
}

/* ---- bottom sheet ---- */
function openSheet(){
  document.getElementById('scrim').classList.add('show');
  document.getElementById('sheet').classList.add('show');
}
function closeSheet(){
  document.getElementById('scrim').classList.remove('show');
  document.getElementById('sheet').classList.remove('show');
}

