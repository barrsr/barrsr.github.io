// Shared brutalist panels for the C-series home screens.
// Each panel has its own lab interaction: well plate, slide box, gel, notebook, terminal.
(() => {
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mail = 'barrsr' + '@' + 'icloud.com';
const css = `
.sheet{position:fixed;inset:0 0 0 auto;margin:0;width:min(1000px,100vw);height:100svh;max-height:none;max-width:none;padding:0;border:0;border-left:6px solid #000;
  background:#efeee9;color:#000;overflow:auto;overscroll-behavior:contain;font:400 1.08rem/1.5 "Newsreader",Georgia,serif;user-select:text;-webkit-user-select:text;
  transition:transform .5s cubic-bezier(.2,.9,.2,1),overlay .5s allow-discrete,display .5s allow-discrete}
.sheet:not([open]){transform:translateX(104%)}
@starting-style{.sheet[open]{transform:translateX(104%)}}
.sheet::backdrop{background:rgba(0,0,0,.35);transition:opacity .5s,overlay .5s allow-discrete,display .5s allow-discrete}
.sheet:not([open])::backdrop{opacity:0}
@starting-style{.sheet[open]::backdrop{opacity:0}}
.sheet .in{padding:clamp(24px,4vw,56px) clamp(20px,4vw,56px) 70px}
.sheet header{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;border-bottom:4px solid #000;padding-bottom:14px;margin-bottom:28px}
.sheet h2{margin:0;font:900 clamp(3rem,7vw,5.4rem)/.86 "Archivo",sans-serif;font-stretch:70%;outline:none}
.sheet .sub{margin:8px 0 0;font:500 1rem/1.3 "Archivo",sans-serif;font-stretch:90%}
.sheet .x{font:900 1rem/1 "Archivo",sans-serif;background:#000;color:#efeee9;border:0;padding:12px 14px 10px;cursor:pointer;box-shadow:5px 5px 0 #e1250f}
.sheet .x:hover{background:#e1250f;color:#000}
.sheet a{color:#000;text-decoration:none;border-bottom:3px solid #e1250f}
.sheet a:hover{background:#e1250f;color:#000}
.sheet :focus-visible{outline:3px solid #e1250f;outline-offset:3px}
/* well plate */
.plate{display:inline-grid;grid-template-columns:28px repeat(3,minmax(64px,96px));gap:12px;padding:20px 22px;border:3px solid #000;border-radius:18px;background:#fff;box-shadow:8px 8px 0 #000}
.plate .lab{font:900 .95rem/1 "Archivo",sans-serif;display:flex;align-items:center;justify-content:center}
.well{aspect-ratio:1;border-radius:50%;border:3px solid #000;background:radial-gradient(circle at 35% 30%,#fff,#e4e2db 70%);cursor:pointer;position:relative;padding:0}
.well::after{content:"";position:absolute;inset:18%;border-radius:50%;background:#e1250f;transform:scale(0);transition:transform .45s cubic-bezier(.2,1.5,.4,1)}
.well[aria-pressed=true]::after{transform:scale(1)}
.well:hover{background:radial-gradient(circle at 35% 30%,#fff,#d6d3ca 70%)}
.readout{margin-top:26px;border:3px solid #000;padding:18px 20px;background:#fff;box-shadow:8px 8px 0 #000;min-height:150px}
.readout .k{font:900 .95rem/1 "Archivo",sans-serif;color:#e1250f}
.readout h3{margin:6px 0 6px;font:900 1.7rem/1.05 "Archivo",sans-serif;font-stretch:80%}
.readout p{margin:0;max-width:64ch}
.split{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:start}
.pubs{list-style:none;margin:34px 0 0;padding:0;border-top:3px solid #000}
.pubs li{padding:11px 0;border-bottom:1px solid #000;font-size:.98rem}
/* slide box */
.slides{display:grid;grid-template-columns:1fr;gap:12px}
.slide{display:grid;grid-template-columns:150px 1fr;align-items:stretch;min-height:62px;border:3px solid #000;background:rgba(255,255,255,.55);text-decoration:none;border-bottom:3px solid #000!important;
  transition:transform .3s cubic-bezier(.2,.9,.2,1),box-shadow .3s;color:#000}
.slide .frost{background:repeating-linear-gradient(45deg,#d9d7cf 0 3px,#e8e6df 3px 6px);border-right:3px solid #000;padding:10px 12px;font:900 .9rem/1.15 "Archivo",sans-serif}
.slide .frost small{display:block;font-weight:500;margin-top:4px}
.slide .title{padding:12px 16px;font:500 1.15rem/1.3 "Newsreader",serif;display:flex;align-items:center}
.slide:hover,.slide:focus-visible{transform:translateX(-22px);box-shadow:22px 0 0 #e1250f;background:#fff!important;color:#000!important}
/* gel */
.gel{position:relative;border:3px solid #000;background:#111;height:420px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:16px 18px;box-shadow:8px 8px 0 #000}
.lane{position:relative;border-top:10px solid #333}
.lane .yr{position:absolute;top:-42px;left:0;right:0;text-align:center;font:900 1rem/1 "Archivo",sans-serif;color:#000}
.band{position:absolute;left:8%;right:8%;height:12px;background:#f2f2f2;border-radius:2px;box-shadow:0 0 14px rgba(255,255,255,.6);cursor:pointer;top:0;transition:top 1.6s cubic-bezier(.2,.8,.2,1),background .2s}
.band:hover,.band.on{background:#e1250f;box-shadow:0 0 16px rgba(225,37,15,.9)}
.gelwrap{margin-top:52px}
.gelread{margin-top:22px;border:3px solid #000;background:#fff;padding:16px 18px;box-shadow:8px 8px 0 #000;min-height:96px}
.honors{list-style:none;margin:30px 0 0;padding:0;border-top:3px solid #000}
.honors li{display:grid;grid-template-columns:64px 1fr;gap:12px;padding:10px 0;border-bottom:1px solid #000}
.honors b{font:900 1.05rem/1.4 "Archivo",sans-serif;color:#e1250f}
/* notebook */
.page{border:3px solid #000;background:#fff;box-shadow:8px 8px 0 #000;padding:26px 28px 30px;
  background-image:linear-gradient(#d9e3ec 1px,transparent 1px),linear-gradient(90deg,#d9e3ec 1px,transparent 1px);background-size:22px 22px;position:relative}
.page .stamp{display:inline-block;border:3px solid #e1250f;color:#e1250f;font:900 .95rem/1 "Archivo",sans-serif;padding:8px 10px 6px;transform:rotate(-3deg);background:#fff}
.page .clock{float:right;font:900 1.4rem/1 "Archivo",sans-serif;font-variant-numeric:tabular-nums}
.page h3{margin:22px 0 4px;font:900 2rem/1 "Archivo",sans-serif;font-stretch:80%}
.page .where{margin:0 0 14px;font-style:italic}
.page ul{margin:0;padding:0;list-style:none}
.page li{padding:9px 0 9px 30px;position:relative;max-width:66ch}
.page li::before{content:"";position:absolute;left:4px;top:15px;width:12px;height:12px;border:2px solid #000;background:#fff}
.page li.done::before{background:#000}
/* terminal */
.term{border:3px solid #000;background:#fff;box-shadow:8px 8px 0 #000;font:400 1rem/1.55 "JetBrains Mono",ui-monospace,monospace}
.term .log{padding:16px 18px;min-height:220px;max-height:46vh;overflow:auto}
.term .log p{margin:0 0 4px}
.term .log .in{font-weight:800}.term .log .in::before{content:"ryan@miami ~ % ";font-weight:400}
.term .log mark{background:#ffef5c}
.term form{display:flex;border-top:3px solid #000}
.term label{padding:10px 12px;border-right:3px solid #000;white-space:nowrap}
.term input{flex:1;font:800 1rem/1 "JetBrains Mono",monospace;border:0;padding:10px 12px;outline:none;background:transparent;min-width:0}
.big{display:inline-block;margin:26px 0 0;font:900 clamp(1.6rem,4vw,3rem)/1 "Archivo",sans-serif;font-stretch:80%;border-bottom:6px solid #e1250f!important}
.links{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.links a{font:900 1.2rem/1 "Archivo",sans-serif;font-stretch:85%;border:3px solid #000!important;padding:12px 14px 10px;box-shadow:5px 5px 0 #000}
@media (max-width:720px){.split{grid-template-columns:1fr}.slide{grid-template-columns:110px 1fr}.gel{height:340px}}
@media (prefers-reduced-motion:reduce){.sheet,.sheet::backdrop,.band,.slide,.well::after{transition:none}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
if (!document.querySelector('link[href*="JetBrains"]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap'; document.head.appendChild(l); }

const research = [
  {w:'A1', y:'2026', t:'A fair test inside one specimen', d:'Testing a therapy on human tissue usually means comparing different donors, and donors vary widely. On a platform engineered from human donor tissue, I showed that each specimen\'s two eyes behave alike, so the comparison can happen inside a single specimen, where the only difference is the treatment.', s:'First author, Frontiers in Ophthalmology'},
  {w:'A2', y:'2026', t:'Seeing force', d:'Gene therapies are delivered with injections under the retina, where a little too much force can damage the tissue. I led development of a hydrogel that changes color under pressure, so a trainee can see how hard they\'re pressing while they inject.', s:'Presenting author, ASRS 2026'},
  {w:'A3', y:'2025', t:'Scaling a cell-free therapy', d:'Tiny vesicles released by heart cells can help an injured heart heal without transplanting the cells themselves, but making enough of them has been a hurdle. I scaled them from human heart organoids to large-animal dose and found that nanowires raised their output 3.5-fold.', s:'Oral, Society for Biomaterials 2025'},
  {w:'B1', y:'2023', t:'More repair from fewer cells', d:'Heart-cell transplants are limited by how many cells it takes to see a benefit. Nanowired human heart organoids restored more function to infarcted hearts at a 20-fold lower cell dose than comparable studies.', s:'Co-first author, <a href="https://pubmed.ncbi.nlm.nih.gov/37540743/" target="_blank" rel="noopener">Science Advances</a>'},
  {w:'B2', y:'2021', t:'Defined chemistry for printed blood vessels', d:'Bioinks built from natural materials vary from batch to batch, which makes printed tissue hard to reproduce. I developed one with fully defined chemistry that printed microvascular networks at over 90% fidelity and viability.', s:'First author, <a href="https://pubmed.ncbi.nlm.nih.gov/33332959/" target="_blank" rel="noopener">Biomacromolecules</a>'},
  {w:'B3', y:'2026', t:'Catching AI at the microscope', d:'AI models are starting to read biology images, and it\'s hard to tell when they\'re confidently wrong. I built microscopy tasks with biology traps from public heart-cell data and ran them as agents on Claude and GPT.', s:'<a href="https://github.com/barrsr/cardiac-microscopy-evals" target="_blank" rel="noopener">Code on GitHub</a>'},
];
const writing = [
  ['MUSC News','2021','A matter of trust: Reengaging communities of color in clinical trials','https://web.musc.edu/about/news-center/2021/08/10/diversifying-clinical-trials'],
  ['EurekAlert!','2019','A new epigenetic brain defense against recurrence of opioid use','https://www.eurekalert.org/news-releases/980910'],
  ['MUSC News','2022','Preventing chemotherapy from overstaying its welcome','https://web.musc.edu/about/news-center/2022/04/06/chemotherapy-filter'],
  ['MUSC News','2019','Defective cilia linked to heart valve defects','https://web.musc.edu/about/news-center/2019/09/17/hearth-valve-birth-defects'],
  ['MUSC News','2021','Kids with COVID-19 or MIS-C have surprisingly high rates of neurological symptoms','https://web.musc.edu/about/news-center/2021/08/18/misc-neurology'],
  ['Progressnotes','2019','Beneath the Surface','https://muschealth.org/health-professionals/progressnotes/2019/fall/beneath-the-surface'],
  ['MUSC News','2023','Cannabis and the oral microbiome: Exploring their impacts on the brain','https://web.musc.edu/about/news-center/2023/01/12/marijuana-microbiome'],
  ['MUSC News','2019','Genetics contribute to racial disparities in vitamin D status of children','https://web.musc.edu/about/news-center/2019/06/20/vitamin-d-deficiency-in-african-american-children'],
  ['MUSC News','2020','New insight into a placental gene pathway and its association with vitamin D','https://web.musc.edu/about/news-center/2020/11/09/maternal-health'],
];
const talks = {
  '2019': [['Oral','Biomedical Engineering Society, Philadelphia','Vascular inductive bioinks with defined chemistry.']],
  '2024': [['Invited seminar','Wichita State University','Nanowired human cardiac organoids for heart repair.']],
  '2025': [['Invited talk','American Association of Extracellular Vesicles','Conductive silicon biointerfaces augment EV-driven heart repair.'],['Oral','Society for Biomaterials, Chicago','Silicon nanowires augment therapeutic EV production from cardiac organoids.']],
  '2026': [['Poster','ASRS Annual Meeting, Montréal','Real-time force feedback training for subretinal gene therapy.'],['Poster','ARVO Annual Meeting, Denver','A platform for standardized assessment of suprachoroidal drug delivery.']],
};

function sheet(id, title, sub, body) {
  const d = document.createElement('dialog'); d.className = 'sheet'; d.id = id; d.setAttribute('aria-labelledby', 'h-' + id);
  d.innerHTML = `<div class="in"><header><div><h2 id="h-${id}" tabindex="-1" autofocus>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div><button class="x" type="button">Close</button></header>${body}</div>`;
  document.body.appendChild(d); return d;
}
const S = {};
S.research = sheet('research', 'Research', 'Click a well to load it.', `
  <div class="split">
    <div class="plate" role="group" aria-label="Projects">
      <span></span><span class="lab">1</span><span class="lab">2</span><span class="lab">3</span>
      <span class="lab">A</span>${research.slice(0,3).map((r,i)=>`<button class="well" type="button" aria-pressed="false" data-i="${i}" aria-label="${r.w}: ${r.t}"></button>`).join('')}
      <span class="lab">B</span>${research.slice(3).map((r,i)=>`<button class="well" type="button" aria-pressed="false" data-i="${i+3}" aria-label="${r.w}: ${r.t}"></button>`).join('')}
    </div>
    <div class="readout" id="readout" aria-live="polite"></div>
  </div>
  <ul class="pubs" aria-label="Selected papers">
    <li>Barrs RW, et al. Biological characterization and bilateral intraocular concordance of near real surgical specimens. <i>Frontiers in Ophthalmology</i> 2026.</li>
    <li>Tan Y, Coyle RC, Barrs RW, et al. Nanowired human cardiac organoid transplantation enables highly efficient and effective recovery of infarcted hearts. <i>Science Advances</i> 2023. <a href="https://pubmed.ncbi.nlm.nih.gov/37540743/" target="_blank" rel="noopener">PubMed</a></li>
    <li>Barrs RW, et al. Engineering a chemically defined hydrogel bioink for direct bioprinting of microvasculature. <i>Biomacromolecules</i> 2021. <a href="https://pubmed.ncbi.nlm.nih.gov/33332959/" target="_blank" rel="noopener">PubMed</a></li>
    <li>Barrs RW, et al. Biomaterials for bioprinting microvasculature. <i>Chemical Reviews</i> 2020. <a href="https://pubmed.ncbi.nlm.nih.gov/32867470/" target="_blank" rel="noopener">PubMed</a></li>
    <li>All papers on <a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>.</li>
  </ul>`);
S.writing = sheet('writing', 'Writing', 'Research news from four years at the Medical University of South Carolina.', `
  <div class="slides">${writing.map(w=>`<a class="slide" href="${w[3]}" target="_blank" rel="noopener"><span class="frost">${w[0]}<small>${w[1]}</small></span><span class="title">${w[2]}</span></a>`).join('')}</div>
  <p style="margin-top:22px">More at <a href="https://www.clippings.me/ryanbarrs" target="_blank" rel="noopener">clippings.me/ryanbarrs</a>.</p>`);
S.talks = sheet('talks', 'Talks', 'Each band is a talk. Hover to read it.', `
  <div class="gelwrap"><div class="gel" id="gel">${Object.keys(talks).map(y=>`<div class="lane"><span class="yr">${y}</span>${talks[y].map((t,i)=>`<span class="band" tabindex="0" data-y="${y}" data-i="${i}" style="--to:${30+i*24+(+y%7)*6}%"></span>`).join('')}</div>`).join('')}</div></div>
  <div class="gelread" id="gelread" aria-live="polite">Run complete. Pick a band.</div>
  <ul class="honors">
    <li><b>2024</b><span>NIH T32 Postdoctoral Fellowship, NIDCR. Renewed for a second year.</span></li>
    <li><b>2022</b><span>Wrote the research strategy for two NIH R01 grants that NHLBI funded.</span></li>
    <li><b>2021</b><span>NIH F31 Individual Predoctoral Fellowship, NHLBI. Funded on first submission.</span></li>
    <li><b>2018</b><span>NSF MADE in SC Research Fellowship.</span></li>
  </ul>`);
S.now = sheet('now', 'Now', '', `
  <div class="page"><span class="stamp" id="stamp"></span><span class="clock" id="clock" title="Miami time"></span>
    <h3>Laboratory Director</h3><p class="where">Miami, since May 2026</p>
    <ul>
      <li class="done">Design and run studies of drug and gene delivery in human tissue.</li>
      <li class="done">Built the laboratory's quality system and wrote its master SOP.</li>
      <li class="done">Wrote the operating procedures and primary safety endpoint for a multisite international clinical trial, then co-led its investigator training.</li>
      <li class="done">Run hands-on surgical training, including a live demonstration at Retina World Congress 2026.</li>
      <li>Writing about science for people outside the lab.</li>
    </ul></div>`);
S.contact = sheet('contact', 'Contact', 'Type a command, or just email me.', `
  <div class="term"><div class="log" id="tlog"><p>Type <mark>help</mark> to look around.</p></div>
    <form id="tform" autocomplete="off"><label for="tcmd">ryan@miami ~ %</label><input id="tcmd" spellcheck="false" autocapitalize="off" placeholder="help"></form></div>
  <a class="big" href="mailto:${mail}">${mail}</a>
  <div class="links"><a href="https://www.linkedin.com/in/ryanbarrs" target="_blank" rel="noopener">LinkedIn</a><a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a><a href="https://github.com/barrsr" target="_blank" rel="noopener">GitHub</a></div>`);

// well plate
const readout = document.getElementById('readout');
const showWell = i => { const r = research[i]; document.querySelectorAll('.well').forEach(w => w.setAttribute('aria-pressed', w.dataset.i == i));
  readout.innerHTML = `<span class="k">Well ${r.w}, ${r.y}</span><h3>${r.t}</h3><p>${r.d}</p><p style="margin-top:8px;font-style:italic">${r.s}</p>`; };
document.querySelectorAll('.well').forEach(w => w.addEventListener('click', () => showWell(+w.dataset.i)));
showWell(0);
// gel: bands migrate when the panel opens
const gelread = document.getElementById('gelread');
const bands = [...document.querySelectorAll('.band')];
const readBand = b => { const t = talks[b.dataset.y][+b.dataset.i]; bands.forEach(x => x.classList.toggle('on', x === b)); gelread.innerHTML = `<b style="font:900 1rem 'Archivo',sans-serif;color:#e1250f">${b.dataset.y} · ${t[0]}</b><br>${t[1]}. <i>${t[2]}</i>`; };
bands.forEach(b => { b.addEventListener('mouseenter', () => readBand(b)); b.addEventListener('focus', () => readBand(b)); b.addEventListener('click', () => readBand(b)); });
function runGel() { bands.forEach(b => { b.style.transition = 'none'; b.style.top = '0'; }); requestAnimationFrame(() => requestAnimationFrame(() => bands.forEach((b, i) => { b.style.transition = still ? 'none' : `top ${1.4 + i * .08}s cubic-bezier(.2,.8,.2,1)`; b.style.top = getComputedStyle(b).getPropertyValue('--to'); }))); }
// notebook clock
const stamp = document.getElementById('stamp'), clock = document.getElementById('clock');
const tick = () => { const now = new Date(); stamp.textContent = now.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric', timeZone:'America/New_York'});
  clock.textContent = now.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', second:'2-digit', timeZone:'America/New_York'}); };
tick(); setInterval(tick, 1000);
// terminal
const C = {
  help: () => ['Commands: <mark>email</mark>, <mark>linkedin</mark>, <mark>scholar</mark>, <mark>github</mark>, <mark>whoami</mark>, <mark>clear</mark>. There are a few others.'],
  whoami: () => ['Ryan Barrs, PhD. Bioengineer and science writer in Miami.'],
  email: () => { location.href = 'mailto:' + mail; return ['Opening your email.']; },
  linkedin: () => { open('https://www.linkedin.com/in/ryanbarrs', '_blank'); return ['Opening LinkedIn.']; },
  scholar: () => { open('https://scholar.google.com/citations?user=jumDAcQAAAAJ&hl=en', '_blank'); return ['Opening Google Scholar.']; },
  github: () => { open('https://github.com/barrsr', '_blank'); return ['Opening GitHub.']; },
  coffee: () => ['Black, no sugar. Fuel for long bench days.'],
  'sudo hire ryan': () => { setTimeout(() => location.href = `mailto:${mail}?subject=${encodeURIComponent('Hello Ryan')}`, 700); return ['Permission granted. Opening your email.']; },
  ls: () => ['research/  writing/  talks/  now.txt  contact.txt'],
  exit: () => ['There is no exit. Only <mark>email</mark>.'],
};
const tlog = document.getElementById('tlog'), tcmd = document.getElementById('tcmd');
document.getElementById('tform').addEventListener('submit', e => { e.preventDefault(); const c = tcmd.value.trim().toLowerCase(); tcmd.value = ''; if (!c) return;
  const add = (h, cls) => { const p = document.createElement('p'); if (cls) p.className = cls; p.innerHTML = h; tlog.appendChild(p); };
  add(c.replace(/</g, '&lt;'), 'in'); if (c === 'clear') { tlog.innerHTML = ''; return; }
  (C[c] ? C[c]() : [`command not found: ${c.replace(/</g, '&lt;')}. Try <mark>help</mark>.`]).forEach(l => add(l)); tlog.scrollTop = tlog.scrollHeight; });

// open, close, history
function openSheet(id, push) { const d = S[id]; if (!d || d.open) return; Object.values(S).forEach(x => x !== d && x.open && x.close());
  if (push) history.pushState({s: id}, '', '#' + id); d.showModal(); d.scrollTop = 0; if (id === 'talks') runGel(); }
function closeSheet(d) { if (location.hash === '#' + d.id) history.back(); else d.close(); }
Object.values(S).forEach(d => { d.querySelector('.x').addEventListener('click', () => closeSheet(d));
  d.addEventListener('cancel', e => { e.preventDefault(); closeSheet(d); });
  d.addEventListener('click', e => { if (e.target === d && e.clientX < d.getBoundingClientRect().left) closeSheet(d); }); });
document.querySelectorAll('nav a[href*="#"]').forEach(a => { const id = a.getAttribute('href').split('#')[1]; if (!S[id]) return; a.href = '#' + id;
  a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openSheet(id, true); }); });
addEventListener('popstate', () => { const id = location.hash.slice(1); Object.values(S).forEach(d => d.id !== id && d.open && d.close()); if (S[id]) openSheet(id, false); });
if (S[location.hash.slice(1)]) openSheet(location.hash.slice(1), false);
})();
