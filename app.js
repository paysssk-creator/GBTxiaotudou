/* ═══════════════════════════════════════════
   GBT小土豆全能开发者 — 前端交互引擎
   ═══════════════════════════════════════════ */
(function(){'use strict';
const state={isYearly:false,logCount:0,toolFilter:'all'};

const mcpTools=[
  {id:'intelligent-scheduler',name:'智能调度器',icon:'⏰',cat:'ops',desc:'事件驱动自动调度，4种触发器：session_start/code_change/git_commit/error_detected',tags:['自动化','守护进程']},
  {id:'self-evolve',name:'自进化引擎',icon:'🧬',cat:'dev',desc:'6步闭环进化：Scan→Record→Backup→Fix→Audit→Commit',tags:['进化','Git']},
  {id:'scanner',name:'代码扫描器',icon:'🔍',cat:'security',desc:'10条安全规则：eval注入/XSS/硬编码凭据/console.log/debugger检测',tags:['安全','静态分析']},
  {id:'audit',name:'项目审计',icon:'📋',cat:'security',desc:'项目健康审计，生成AUDIT_REPORT.json，strict严格模式',tags:['审计','报告']},
  {id:'memory',name:'记忆库',icon:'🧠',cat:'dev',desc:'持久化键值存储，自动进化记录，跨会话记忆',tags:['记忆','存储']},
  {id:'cloud-llm',name:'云端LLM',icon:'☁️',cat:'ai',desc:'GLM-5.1/GLM-4/GPT-4o/Ollama本地多模型调用',tags:['LLM','推理']},
  {id:'auto-fix',name:'一键修复',icon:'🔧',cat:'dev',desc:'自动扫描→审计→计划→修复→进化，一键完成',tags:['修复','自动化']},
  {id:'bounty-hunter',name:'漏洞赏金',icon:'💰',cat:'security',desc:'深度扫描→CVSS评分→Bounty报告→提交授权平台',tags:['赏金','渗透']},
  {id:'desktop-control',name:'桌面控制',icon:'🖥️',cat:'ops',desc:'屏幕/语音/蓝牙/键鼠/进程全控，Windows原生API',tags:['桌面','硬件']},
  {id:'mcp-router',name:'MCP路由',icon:'🔀',cat:'ops',desc:'MCP配置分发，自动注册能力为可用工具',tags:['配置','路由']},
  {id:'deepseek-analyzer',name:'深度分析',icon:'📊',cat:'ai',desc:'DeepSeek模型分析，深度代码审查与优化建议',tags:['分析','DeepSeek']},
  {id:'global-memory',name:'全局记忆',icon:'🌐',cat:'dev',desc:'跨项目共享记忆，全局上下文关联',tags:['记忆','全局']},
  {id:'mirror-deploy',name:'镜像部署',icon:'🚀',cat:'ops',desc:'一键镜像构建与部署，支持Vercel/Docker',tags:['部署','CI/CD']},
  {id:'email-watcher',name:'邮箱监控',icon:'📧',cat:'ops',desc:'IMAP邮件监控，自动化邮件处理与告警',tags:['邮件','监控']},
  {id:'stress-test',name:'压力测试',icon:'💪',cat:'security',desc:'自动化压力测试，性能瓶颈检测',tags:['测试','性能']},
  {id:'rustdesk',name:'远程桌面',icon:'🔗',cat:'ops',desc:'RustDesk远程桌面集成，安全远程连接',tags:['远程','连接']},
  {id:'halo-cms',name:'Halo建站',icon:'🏗️',cat:'dev',desc:'Halo CMS一键建站，内容管理系统集成',tags:['CMS','建站']}
];

function renderTools(filter){
  const g=document.getElementById('toolsGrid');if(!g)return;
  const f=filter==='all'?mcpTools:mcpTools.filter(t=>t.cat===filter);
  g.innerHTML=f.map(t=>`<div class="tool-card glass-card" data-cat="${t.cat}"><div class="tool-card-header"><div class="tool-icon ${t.cat}">${t.icon}</div><h3>${t.name}</h3></div><p>${t.desc}</p><div class="tool-tags">${t.tags.map(tg=>`<span class="tool-tag">${tg}</span>`).join('')}</div></div>`).join('');
}

function renderPricing(){
  const g=document.getElementById('pricingGrid');if(!g)return;
  g.innerHTML=pricingPlans.map(p=>{
    const pr=state.isYearly?p.yearly:p.monthly;
    return `<div class="pricing-card glass-card${p.popular?' pricing-popular':''}">${p.popular?'<div class="pricing-badge">🔥 最受欢迎</div>':''}<div class="pricing-header"><h3>${p.name}</h3><p>${p.desc}</p></div><div class="pricing-price"><span class="price-currency">¥</span><span class="price-value">${pr}</span><span class="price-period">/月</span></div><ul class="pricing-features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><a href="#contact" class="btn ${p.btnClass} btn-block">立即租用</a></div>`;
  }).join('');
}

const controlAPI={
  screen(){return{ok:true,file:'screen_capture.png',size:'1920x1080',time:Date.now()};},
  snap(a){return{ok:true,file:`snap_${a.label||'key'}.png`,time:Date.now()};},
  speak(a){return{ok:true,text:a.text,engine:'SAPI',spoken:true};},
  listen(){return{ok:true,text:'你好GBT，测试语音识别',confidence:0.95};},
  bt(){return{ok:true,devices:[{name:'GBT Headset',type:'audio'},{name:'MX Master 3',type:'mouse'},{name:'Keychron K8',type:'keyboard'}]};},
  move(a){return{ok:true,x:a.x||500,y:a.y||300};},
  click(a){return{ok:true,x:a.x||500,y:a.y||300,button:'left'};},
  type(a){return{ok:true,text:a.text,length:(a.text||'').length};},
  hotkey(a){return{ok:true,keys:a.keys,executed:true};},
  proc(){return{ok:true,processes:[{name:'node.exe',pid:1234},{name:'chrome.exe',pid:5678},{name:'vscode.exe',pid:9012}]};},
  sys(){return{ok:true,host:'GBT-Workstation',cpu:'Intel i9-14900K',mem:'64GB',plat:'Windows 11 Pro',up:'32d 7h 15m'};}
};

function sendControl(cmd,args={}){
  const h=controlAPI[cmd];if(!h)return logEntry('未知命令: '+cmd,'error');
  const s=document.getElementById('status-'+cmd);
  if(s){s.className='control-status loading';s.textContent='执行中...';}
  setTimeout(()=>{
    try{const r=h(args);const j=JSON.stringify(r);
      if(s){s.className='control-status success';s.textContent=j;}
      logEntry(cmd+' → '+j,'success');showToast(cmd+' 执行成功','success');
    }catch(e){
      if(s){s.className='control-status error';s.textContent='错误: '+e.message;}
      logEntry(cmd+' → 失败: '+e.message,'error');showToast(cmd+' 执行失败','error');
    }
  },300+Math.random()*700);
}

function logEntry(msg,type='system'){
  const b=document.getElementById('logBody');if(!b)return;
  state.logCount++;const e=document.createElement('div');
  e.className='log-entry log-'+type;e.textContent='['+new Date().toLocaleTimeString()+'] '+msg;
  b.prepend(e);if(b.children.length>50)b.lastChild.remove();
}

function clearLog(){
  const b=document.getElementById('logBody');
  if(b)b.innerHTML='<div class="log-entry log-system">日志已清空 — 等待指令...</div>';
  state.logCount=0;
}

function showToast(msg,type='info'){
  const c=document.getElementById('toastContainer');if(!c)return;
  const t=document.createElement('div');t.className='toast '+type;t.textContent=msg;
  c.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(100px)';setTimeout(()=>t.remove(),300);},3000);
}

function init(){
  renderTools('all');renderPricing();
  const nb=document.getElementById('navbar');
  if(nb)window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>20));
  const mt=document.getElementById('mobileToggle'),nl=document.querySelector('.nav-links');
  if(mt&&nl){mt.addEventListener('click',()=>nl.classList.toggle('active'));document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>nl.classList.remove('active')));}
  document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderTools(b.dataset.filter);}));
  const pt=document.getElementById('billingToggle');if(pt)pt.addEventListener('change',()=>{state.isYearly=pt.checked;renderPricing();});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}}));
  document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='k'){e.preventDefault();const si=document.getElementById('speakText');if(si)si.focus();}if(e.key==='Escape'){const nl2=document.querySelector('.nav-links');if(nl2)nl2.classList.remove('active');}});
  const obs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:0.1});
  document.querySelectorAll('.glass-card,.section-header').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(20px)';el.style.transition='opacity 0.6s ease,transform 0.6s ease';obs.observe(el);});
  setTimeout(()=>{const hc=document.querySelector('.hero-content');if(hc){hc.style.opacity='1';hc.style.transform='translateY(0)';}},100);
  console.log('🥔 GBT小土豆全能开发者 — 前端引擎就绪\ngithub.com/paysssk-creator | gbtxiaotudou.com');
}
document.addEventListener('DOMContentLoaded',init);
})();