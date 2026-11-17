// Shared brutalist panels for the C-series home screens.
// Each panel has its own lab interaction: well plate, slide box, gel, notebook, terminal.
(() => {
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mail = 'barrsr' + '@' + 'icloud.com';
const css = `
.sheet{position:fixed;inset:0 0 0 auto;margin:0;width:min(1000px,100vw);height:100svh;max-height:none;max-width:none;padding:0;border:0;
  background:#f4f2ed;color:#111;overflow:auto;overscroll-behavior:contain;font:400 1.1rem/1.55 "Times New Roman",Times,"Tinos",serif;user-select:text;-webkit-user-select:text;box-shadow:-40px 0 90px rgba(0,0,0,.14);
  transition:transform .6s cubic-bezier(.16,1,.3,1),overlay .6s allow-discrete,display .6s allow-discrete}
.sheet:not([open]){transform:translateX(104%)}
@starting-style{.sheet[open]{transform:translateX(104%)}}
.sheet::backdrop{background:rgba(0,0,0,.18);transition:opacity .5s,overlay .5s allow-discrete,display .5s allow-discrete}
.sheet:not([open])::backdrop{opacity:0}
@starting-style{.sheet[open]::backdrop{opacity:0}}
.sheet .in{padding:clamp(28px,4.5vw,64px) clamp(22px,4.5vw,64px) 80px}
.sheet header{display:flex;justify-content:space-between;align-items:baseline;gap:18px;margin-bottom:clamp(26px,4vh,44px)}
.sheet h2{margin:0;font:700 clamp(3rem,7vw,5.4rem)/.9 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.025em;outline:none}
.sheet .sub{margin:10px 0 0;font-style:italic;color:#615c55}
.sheet .x{all:unset;cursor:pointer;font:700 1.05rem/1 "Times New Roman",Times,"Tinos",serif;color:#615c55;padding:6px 0}
.sheet .x:hover,.sheet .x:focus-visible{color:#d8361e}
.sheet a{color:#111;text-decoration:underline;text-decoration-color:#d8361e;text-decoration-thickness:2px;text-underline-offset:3px}
.sheet a:hover{color:#d8361e}
.sheet :focus-visible{outline:2px solid #d8361e;outline-offset:3px}
/* well plate: the plate is a soft tray, the wells are glass */
.plate{display:inline-grid;grid-template-columns:24px repeat(3,minmax(64px,96px));gap:14px;padding:22px 24px;border-radius:22px;background:linear-gradient(160deg,#fbfaf7,#e9e6df)}
.plate .lab{font:700 1rem/1 "Times New Roman",Times,"Tinos",serif;color:#615c55;display:flex;align-items:center;justify-content:center}
.well{aspect-ratio:1;border-radius:50%;border:0;background:radial-gradient(circle at 36% 30%,#fff 0,#f1efe9 38%,#d9d5cc 72%,#c9c4ba 100%);box-shadow:inset 0 3px 8px rgba(0,0,0,.18),0 1px 0 #fff;cursor:pointer;position:relative;padding:0;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.well:hover{transform:scale(1.05)}
.well::after{content:"";position:absolute;inset:20%;border-radius:50%;background:radial-gradient(circle at 38% 32%,#f0634c,#d8361e 55%,#a8240f);transform:scale(0);transition:transform .5s cubic-bezier(.2,1.5,.4,1)}
.well[aria-pressed=true]::after{transform:scale(1)}
.readout{min-height:160px}
.readout .k{font:italic 400 1rem/1.3 "Times New Roman",Times,"Tinos",serif;color:#d8361e}
.readout h3{margin:6px 0 8px;font:700 1.9rem/1.08 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.01em}
.readout p{margin:0;max-width:62ch}
.split{display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:start}
.pubs{list-style:none;margin:40px 0 0;padding:0}
.pubs li{padding:12px 0;border-top:1px solid #d9d5cc;font-size:1rem}
/* slide box: frosted labels, no frames */
.slides{display:grid;gap:10px}
.slide{display:grid;grid-template-columns:150px 1fr;align-items:center;min-height:64px;text-decoration:none!important;color:#111;border-radius:10px;overflow:hidden;background:rgba(255,255,255,.5);transition:transform .35s cubic-bezier(.16,1,.3,1),background .3s}
.slide .frost{align-self:stretch;display:flex;flex-direction:column;justify-content:center;background:repeating-linear-gradient(45deg,#dedbd3 0 3px,#ebe8e1 3px 6px);padding:10px 14px;font:700 .95rem/1.15 "Times New Roman",Times,"Tinos",serif}
.slide .frost small{display:block;font-weight:400;font-style:italic;margin-top:3px}
.slide .title{padding:12px 18px;font:400 1.15rem/1.3 "Times New Roman",Times,"Tinos",serif}
.slide:hover,.slide:focus-visible{transform:translateX(-14px);background:#fff;color:#111}
.slide:hover .title{color:#d8361e}
/* gel */
.gel{position:relative;border-radius:14px;background:linear-gradient(#1b1a19,#0f0e0e);height:420px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:18px 20px}
.lane{position:relative;border-top:9px solid #2d2b29;border-radius:2px}
.lane .yr{position:absolute;top:-44px;left:0;right:0;text-align:center;font:700 1.05rem/1 "Times New Roman",Times,"Tinos",serif;color:#111}
.band{position:absolute;left:9%;right:9%;height:11px;background:#f3f1ec;border-radius:3px;box-shadow:0 0 14px rgba(255,255,255,.55);cursor:pointer;top:0;transition:top 1.6s cubic-bezier(.2,.8,.2,1),background .2s}
.band:hover,.band.on{background:#e8462c;box-shadow:0 0 18px rgba(232,70,44,.9)}
.gelwrap{margin-top:54px}
.gelread{margin-top:22px;min-height:80px}
.honors{list-style:none;margin:34px 0 0;padding:0}
.honors li{display:grid;grid-template-columns:64px 1fr;gap:12px;padding:10px 0;border-top:1px solid #d9d5cc}
.honors b{font:700 1.05rem/1.45 "Times New Roman",Times,"Tinos",serif;color:#d8361e}
/* notebook: ruled page */
.page{position:relative;border-radius:6px;padding:28px 30px 32px;background:#fdfcf9 linear-gradient(transparent 31px,#dfe6ec 31px) 0 6px/100% 32px;box-shadow:0 18px 50px rgba(0,0,0,.08)}
.page .stamp{display:inline-block;color:#d8361e;font:italic 700 1.05rem/1 "Times New Roman",Times,"Tinos",serif;transform:rotate(-3deg)}
.page .clock{float:right;font:700 1.4rem/1 "Times New Roman",Times,"Tinos",serif;font-variant-numeric:tabular-nums}
.page h3{margin:22px 0 2px;font:700 2rem/1 "Times New Roman",Times,"Tinos",serif}
.page .where{margin:0 0 12px;font-style:italic;color:#615c55}
.page ul{margin:0;padding:0;list-style:none}
.page li{padding:4px 0 4px 26px;position:relative;max-width:66ch;line-height:32px}
.page li::before{content:"";position:absolute;left:4px;top:13px;width:9px;height:9px;border-radius:50%;background:#111}
.page li.open::before{background:transparent;box-shadow:inset 0 0 0 1.5px #111}
/* terminal */
.term{border-radius:12px;background:#151413;color:#efece6;font:400 1.05rem/1.55 "Times New Roman",Times,"Tinos",serif;overflow:hidden}
.term .log{padding:18px 20px;min-height:200px;max-height:42vh;overflow:auto}
.term .log p{margin:0 0 4px}
.term .log .in{font-weight:700}.term .log .in::before{content:"ryan@miami ~ % ";font-weight:400;color:#9c968c}
.term .log mark{background:none;color:#ff6a4f;font-weight:700}
.term form{display:flex;background:#1f1d1c}
.term label{padding:12px 14px;white-space:nowrap;color:#9c968c}
.term input{flex:1;font:700 1.05rem/1 "Times New Roman",Times,"Tinos",serif;color:#fff;border:0;padding:12px 14px;outline:none;background:transparent;min-width:0}
.big{display:inline-block;margin:28px 0 0;font:700 clamp(1.7rem,4.2vw,3.1rem)/1.1 "Times New Roman",Times,"Tinos",serif;text-decoration:none!important;background:linear-gradient(#d8361e,#d8361e) 0 100%/0 3px no-repeat;transition:background-size .5s cubic-bezier(.16,1,.3,1)}
.big:hover{background-size:100% 3px}
.links{display:flex;flex-wrap:wrap;gap:26px;margin-top:24px}
.links a{font:700 1.2rem/1 "Times New Roman",Times,"Tinos",serif}
.paperlist{margin:0;padding:0 0 0 1.5em;display:grid;gap:14px;line-height:1.55}
.paperlist li::marker{color:#d8361e;font-weight:700}
.paperlist .au{font-weight:700}.paperlist .pos{font-style:italic;color:#615c55}.paperlist .pos::before{content:"("}.paperlist .pos::after{content:")"}
.grp{margin:34px 0 14px;font:700 1.1rem/1 "Times New Roman",Times,"Tinos",serif;color:#d8361e}.grp:first-child{margin-top:0}
.dl{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:18px}
.dl .meta{color:#615c55;font-style:italic}
.preview{display:block;width:100%;height:min(1100px,130vw);margin-top:26px;border:0;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.12);background:#fff}
@media (max-width:720px){.split{grid-template-columns:1fr}.slide{grid-template-columns:110px 1fr}.gel{height:340px}.preview{display:none}}
@media (prefers-reduced-motion:reduce){.sheet,.sheet::backdrop,.band,.slide,.well::after,.well{transition:none}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

const research = [
  {w:'A1', y:'2026', t:'A fair test inside one specimen', d:'Testing a therapy on human tissue usually means comparing different donors, and donors vary widely. On a platform engineered from human donor tissue, I showed that each specimen\'s two eyes behave alike, so the comparison can happen inside a single specimen, where the only difference is the treatment.', s:'First author, Frontiers in Ophthalmology'},
  {w:'A2', y:'2026', t:'Seeing force', d:'Gene therapies are delivered with injections under the retina, where a little too much force can damage the tissue. I led development of a hydrogel that changes color under pressure, so a trainee can see how hard they\'re pressing while they inject.', s:'Presenting author, ASRS 2026'},
  {w:'A3', y:'2025', t:'Scaling a cell-free therapy', d:'Tiny vesicles released by heart cells can help an injured heart heal without transplanting the cells themselves, but making enough of them has been a hurdle. I scaled them from human heart organoids to large-animal dose and found that nanowires raised their output 3.5-fold.', s:'Oral, Society for Biomaterials 2025'},
  {w:'B1', y:'2023', t:'More repair from fewer cells', d:'Heart-cell transplants are limited by how many cells it takes to see a benefit. Nanowired human heart organoids restored more function to infarcted hearts at a 20-fold lower cell dose than comparable studies.', s:'Co-first author, <a href="https://pubmed.ncbi.nlm.nih.gov/37540743/" target="_blank" rel="noopener">Science Advances</a>'},
  {w:'B2', y:'2021', t:'Defined chemistry for printed blood vessels', d:'Bioinks built from natural materials vary from batch to batch, which makes printed tissue hard to reproduce. I developed one with fully defined chemistry that printed microvascular networks at over 90% fidelity and viability.', s:'First author, <a href="https://pubmed.ncbi.nlm.nih.gov/33332959/" target="_blank" rel="noopener">Biomacromolecules</a>'},
  {w:'B3', y:'2026', t:'Catching AI at the microscope', d:'AI models are starting to read biology images, and it\'s hard to tell when they\'re confidently wrong. I built microscopy tasks with biology traps from public heart-cell data and ran them as agents on Claude and GPT.', s:'<a href="https://github.com/barrsr/cardiac-microscopy-evals" target="_blank" rel="noopener">Code on GitHub</a>'},
];
const rcat = {A1:'Eye drug and gene delivery',A2:'Eye drug and gene delivery',A3:'Heart repair',B1:'Heart repair',B2:'Engineering tissue',B3:'Evaluating AI in biology'};
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

const papers = [["Accepted and under review", ["<span class=\"au\">Barrs RW</span>, Kadmiel M, Ehrensing EA, Barak Y, Mahajan VB, Arhontoulis DC, Almeida DRP. Biological characterization and bilateral intraocular concordance of near real surgical specimens. A human ex vivo platform for controlled intraocular research. <em>Frontiers in Ophthalmology</em> 2026;6:1917720. Accepted September 28, 2026. <span class=\"pos\">first author</span>", "Arhontoulis DC, <span class=\"au\">Barrs RW</span>, Kadmiel M, Singer M, Mahajan VB, Almeida DRP. Needle dead space and penetration depth in anterior chamber paracentesis. A three-configuration bench comparison on near-real surgical specimens. <em>Clinical Ophthalmology</em>, under review."]], ["Peer-reviewed", ["Tan Y*, Coyle RC*, <span class=\"au\">Barrs RW</span>*, Silver SE, Li M, Richards DJ, et al. Nanowired human cardiac organoid transplantation enables highly efficient and effective recovery of infarcted hearts. <em>Science Advances</em> 2023;9(31):eadf2898. PMID 37540743. <span class=\"pos\">co-first author &middot; top 1% field-weighted citation impact</span>", "<span class=\"au\">Barrs RW</span>, Jia J, Ward M, Richards DJ, Yao H, Yost MJ, Mei Y. Engineering a chemically defined hydrogel bioink for direct bioprinting of microvasculature. <em>Biomacromolecules</em> 2021;22(2):275&ndash;288. PMID 33332959. <span class=\"pos\">first author</span>", "<span class=\"au\">Barrs RW</span>, Jia J, Silver SE, Yost M, Mei Y. Biomaterials for bioprinting microvasculature. <em>Chemical Reviews</em> 2020;120(19):10887&ndash;10949. PMID 32867470. <span class=\"pos\">first author</span>", "Bain JD, <span class=\"au\">Barrs RW</span>, Mei Y. Progress and challenges in transplantation of human pluripotent stem cell derived cardiomyocytes for cardiac therapy. <em>npj Biomedical Innovations</em> 2026;3(1):2. PMID 41522237.", "Coyle RC, <span class=\"au\">Barrs RW</span>, Richards DJ, Ladd EP, Menick DR, Mei Y. Targeting HIF-alpha for robust prevascularization of human cardiac organoids. <em>Journal of Tissue Engineering and Regenerative Medicine</em> 2021;15(2):189&ndash;202. PMID 33868541.", "Silver SE, <span class=\"au\">Barrs RW</span>, Mei Y. Transplantation of human pluripotent stem cell-derived cardiomyocytes for cardiac regenerative therapy. <em>Frontiers in Cardiovascular Medicine</em> 2021;8:707890. PMID 34820426.", "Jia J, Jeon EJ, Li M, Richards DJ, Lee S, Jung Y, <span class=\"au\">Barrs RW</span>, et al. Evolutionarily conserved sequence motif analysis guides development of chemically defined hydrogels for therapeutic vascularization. <em>Science Advances</em> 2020;6(28):eaaz5894. PMID 32923589.", "Schroeder LW, Buckley JR, Stroud RE, Martin RH, Nadeau EK, <span class=\"au\">Barrs RW</span>, Graham EM. Plasma neutrophil gelatinase-associated lipocalin is associated with acute kidney injury and clinical outcomes in neonates undergoing cardiopulmonary bypass. <em>Pediatric Critical Care Medicine</em> 2019;20(10):957&ndash;962. PMID 31206501.", "Akerman AW, Stroud RE, <span class=\"au\">Barrs RW</span>, et al. Elevated wall tension initiates interleukin-6 expression and abdominal aortic dilation. <em>Annals of Vascular Surgery</em> 2018;46:193&ndash;204. PMID 29107003.", "Jia J, Coyle RC, Richards DJ, Berry CL, <span class=\"au\">Barrs RW</span>, et al. Development of peptide-functionalized synthetic hydrogel microarrays for stem cell and tissue engineering applications. <em>Acta Biomaterialia</em> 2016;45:110&ndash;120. PMID 27612960."]], ["Preprints", ["Silver SE, Howells AR, Arhontoulis DC, Randolph LN, Hyams NA, <span class=\"au\">Barrs RW</span>, et al. Hypoimmunogenic hPSC-derived cardiac organoids for immune evasion and heart repair. <em>bioRxiv</em> 2025. doi:10.1101/2025.04.09.648007. PMID 40291708.", "Maddumala M, Sambuchino J, Arhontoulis D, <span class=\"au\">Barrs R</span>, Pereira D, Marcantonio G, Almeida DRP. aVOLTA, a bounded autonomous operating layer for operational communication in an investigator-led clinical research group. System design study. <em>JMIR Preprints</em> 2026. doi:10.2196/preprints.113028."]]];
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
S.papers = sheet('papers', 'Papers', '', `${papers.map(([g, list]) => `<div class="grp">${g}</div><ol class="paperlist">${list.map(x => `<li>${x}</li>`).join('')}</ol>`).join('')}
  <p style="margin-top:40px;color:#615c55">Citations and the full record are on <a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>.</p>`);
S.resume = sheet('resume', 'Resume and CV', '', `<div class="dl"><a class="big" style="margin:0" href="files/ryan-barrs-resume.pdf?v=2" download>One-page resume</a><span class="meta">PDF</span></div>
  <div class="dl"><a class="big" style="margin:0" href="files/ryan-barrs-cv.pdf?v=3" download>Full CV</a><span class="meta">PDF</span></div>
  <object class="preview" data="files/ryan-barrs-resume.pdf?v=2#view=FitH&amp;toolbar=0" type="application/pdf" aria-label="Resume preview"></object>`);
S.writing = sheet('writing', 'Writing', 'Research stories I wrote for the Medical University of South Carolina newsroom.', `
  <div class="slides">${writing.map(w=>`<a class="slide" href="${w[3]}" target="_blank" rel="noopener"><span class="frost">${w[0]}<small>${w[1]}</small></span><span class="title">${w[2]}</span></a>`).join('')}</div>`);
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
      <li class="open">Explaining science so anyone can understand it.</li>
    </ul></div>`);
S.contact = sheet('contact', 'Contact', 'Type a command, or just email me.', `
  <div class="term"><div class="log" id="tlog"><p>Type <mark>help</mark> to look around.</p></div>
    <form id="tform" autocomplete="off"><label for="tcmd">ryan@miami ~ %</label><input id="tcmd" spellcheck="false" autocapitalize="off" placeholder="help"></form></div>
  <a class="big" href="mailto:${mail}">${mail}</a>
  <div class="links"><a href="https://www.linkedin.com/in/ryanbarrs" target="_blank" rel="noopener">LinkedIn</a><a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a><a href="https://github.com/barrsr" target="_blank" rel="noopener">GitHub</a></div>`);

// well plate
const readout = document.getElementById('readout');
const showWell = i => { const r = research[i]; document.querySelectorAll('.well').forEach(w => w.setAttribute('aria-pressed', w.dataset.i == i));
  readout.innerHTML = `<span class="k">${rcat[r.w]} &middot; well ${r.w}, ${r.y}</span><h3>${r.t}</h3><p>${r.d}</p><p style="margin-top:8px;font-style:italic">${r.s}</p>`; };
document.querySelectorAll('.well').forEach(w => w.addEventListener('click', () => showWell(+w.dataset.i)));
showWell(0);
// gel: bands migrate when the panel opens
const gelread = document.getElementById('gelread');
const bands = [...document.querySelectorAll('.band')];
const readBand = b => { const t = talks[b.dataset.y][+b.dataset.i]; bands.forEach(x => x.classList.toggle('on', x === b)); gelread.innerHTML = `<b style="font:700 1.05rem ${'"Times New Roman"'},serif;color:#d8361e">${b.dataset.y} · ${t[0]}</b><br>${t[1]}. <i>${t[2]}</i>`; };
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
  whoami: () => ['Ryan Barrs, PhD. Bioengineer based in Miami.'],
  email: () => { location.href = 'mailto:' + mail; return ['Opening your email.']; },
  linkedin: () => { open('https://www.linkedin.com/in/ryanbarrs', '_blank'); return ['Opening LinkedIn.']; },
  scholar: () => { open('https://scholar.google.com/citations?user=jumDAcQAAAAJ&hl=en', '_blank'); return ['Opening Google Scholar.']; },
  github: () => { open('https://github.com/barrsr', '_blank'); return ['Opening GitHub.']; },
  'sudo hire ryan': () => { setTimeout(() => location.href = `mailto:${mail}?subject=${encodeURIComponent('Hello Ryan')}`, 700); return ['Permission granted. Opening your email.']; },
  ls: () => ['research/  papers/  writing/  talks/  resume.pdf  now.txt  contact.txt'],
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
