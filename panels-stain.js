// Borderless panels for the Stain home screen. Frosted sheets that slide over the tissue.
(() => {
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mail = 'barrsr' + '@' + 'icloud.com';
const css = `
.sheet{position:fixed;inset:0 0 0 auto;margin:0;width:min(880px,100vw);height:100svh;max-height:none;max-width:none;padding:0;border:0;
  background:color-mix(in srgb,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(22px) saturate(1.1);backdrop-filter:blur(22px) saturate(1.1);color:var(--ink);
  overflow:auto;overscroll-behavior:contain;user-select:text;-webkit-user-select:text;box-shadow:-30px 0 80px rgba(42,22,51,.10);
  transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .5s,overlay .7s allow-discrete,display .7s allow-discrete}
.sheet:not([open]){transform:translateX(40px);opacity:0}
@starting-style{.sheet[open]{transform:translateX(40px);opacity:0}}
.sheet::backdrop{background:rgba(42,22,51,0);transition:background .6s,overlay .6s allow-discrete,display .6s allow-discrete}
.sheet[open]::backdrop{background:color-mix(in srgb,var(--ink) 8%,transparent)}
@starting-style{.sheet[open]::backdrop{background:rgba(42,22,51,0)}}
.sheet .in{padding:clamp(28px,5vw,72px) clamp(24px,5vw,72px) 80px}
.sheet header{display:flex;justify-content:space-between;align-items:baseline;gap:20px;margin-bottom:clamp(28px,5vh,56px)}
.sheet h2{margin:0;font:750 clamp(3rem,7vw,5.6rem)/.9 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.04em;outline:none}
.sheet .x{background:none;border:0;padding:6px 0;font:600 1.05rem/1 "Times New Roman",Times,"Tinos",serif;color:var(--soft);cursor:pointer}
.sheet .x:hover,.sheet .x:focus-visible{color:var(--accent);outline:none}
.sheet .sub{margin:12px 0 0;color:var(--soft);font-size:1.05rem}
.sheet a{color:var(--ink);text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px}
.sheet a:hover{color:var(--accent)}
.cellmark{position:relative;display:inline-block;width:20px;height:20px;flex:none;margin-top:.35em}
.cellmark::before,.cellmark::after{content:"";position:absolute;inset:2px;border-radius:50%;background:var(--tint);box-shadow:inset 0 0 0 5px var(--tint),inset 0 0 0 9px var(--tint2);transition:transform .6s cubic-bezier(.34,1.56,.64,1)}
.item:hover .cellmark::before{transform:translate(-5px,0) scale(.72)}.item:hover .cellmark::after{transform:translate(5px,0) scale(.72)}
.items{list-style:none;margin:0;padding:0;display:grid;gap:clamp(26px,4vh,40px)}
.item{display:grid;grid-template-columns:20px 1fr;gap:18px}
.item .k{font:600 .85rem/1 "Times New Roman",Times,"Tinos",serif;letter-spacing:.02em;color:var(--accent)}
.item h3{margin:6px 0 8px;font:700 clamp(1.4rem,2.2vw,1.85rem)/1.12 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.02em}
.item p{margin:0;max-width:62ch;font-size:1.06rem;line-height:1.6}
.item .s{margin-top:8px;color:var(--soft);font-size:.95rem}
.stories .item h3{font-size:clamp(1.2rem,1.8vw,1.5rem)}
.stories .item h3 a{text-decoration:none}.stories .item h3 a:hover{text-decoration:underline;text-decoration-color:var(--accent)}
.yr{margin:clamp(30px,5vh,48px) 0 18px;font:750 clamp(2rem,4vw,3rem)/1 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.03em;color:var(--tint)}
.yr:first-of-type{margin-top:0}
.honors{margin-top:56px}
.now .when{font:600 1rem/1 "Times New Roman",Times,"Tinos",serif;color:var(--accent)}
.now .clock{font:300 clamp(2.6rem,6vw,4.6rem)/1 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.03em;font-variant-numeric:tabular-nums;margin:10px 0 36px}
.big{display:inline-block;font:700 clamp(1.8rem,4.6vw,3.4rem)/1.1 "Times New Roman",Times,"Tinos",serif;letter-spacing:-.03em;text-decoration:none!important;word-break:break-word}
.copy{margin-left:14px;background:none;border:0;font:600 1rem/1 "Times New Roman",Times,"Tinos",serif;color:var(--accent);cursor:pointer;vertical-align:middle}
.paperlist{margin:0;padding:0 0 0 1.4em;display:grid;gap:16px;font-size:1.06rem;line-height:1.55}
.paperlist li::marker{color:var(--tint);font-weight:700}
.paperlist .au{font-weight:700}
.paperlist .pos{color:var(--soft);font-style:italic}.paperlist .pos::before{content:"("}.paperlist .pos::after{content:")"}
.dl{display:flex;align-items:baseline;gap:18px;flex-wrap:wrap;margin-bottom:22px}
.dl .meta{color:var(--soft);font-size:1.05rem}
.preview{display:block;width:100%;height:min(1100px,130vw);margin-top:30px;border:0;border-radius:6px;box-shadow:0 20px 60px rgba(42,22,51,.12);background:#fff}
@media (max-width:720px){.preview{display:none}}
.links{display:flex;flex-wrap:wrap;gap:28px;margin-top:40px;font:600 1.25rem/1 "Times New Roman",Times,"Tinos",serif}
@media (prefers-reduced-motion:reduce){.sheet,.sheet::backdrop,.cellmark::before,.cellmark::after{transition:none}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

const research = [
  ['2026', 'A fair test inside one specimen', 'Testing a therapy on human tissue usually means comparing different donors, and donors vary widely. On a platform engineered from human donor tissue, I showed that each specimen\'s two eyes behave alike, so the comparison can happen inside a single specimen, where the only difference is the treatment.', 'First author, Frontiers in Ophthalmology'],
  ['2026', 'Seeing force', 'Gene therapies are delivered with injections under the retina, where a little too much force can damage the tissue. I led development of a hydrogel that changes color under pressure, so a trainee can see how hard they\'re pressing while they inject.', 'Presenting author, ASRS 2026'],
  ['2026', 'Catching AI at the microscope', 'AI models are starting to read biology images, and it\'s hard to tell when they\'re confidently wrong. I built microscopy tasks with biology traps from public heart-cell data and ran them as agents on Claude and GPT.', '<a href="https://github.com/barrsr/cardiac-microscopy-evals" target="_blank" rel="noopener">Code and results on GitHub</a>'],
  ['2025', 'Scaling a cell-free therapy', 'Tiny vesicles released by heart cells can help an injured heart heal without transplanting the cells themselves, but making enough of them has been a hurdle. I scaled them from human heart organoids to large-animal dose and found that nanowires raised their output 3.5-fold.', 'Oral, Society for Biomaterials 2025'],
  ['2023', 'More repair from fewer cells', 'Heart-cell transplants are limited by how many cells it takes to see a benefit. Nanowired human heart organoids restored more function to infarcted hearts at a 20-fold lower cell dose than comparable studies.', 'Co-first author, <a href="https://pubmed.ncbi.nlm.nih.gov/37540743/" target="_blank" rel="noopener">Science Advances</a>'],
  ['2021', 'Defined chemistry for printed blood vessels', 'Bioinks built from natural materials vary from batch to batch, which makes printed tissue hard to reproduce. I developed one with fully defined chemistry that printed microvascular networks at over 90% fidelity and viability.', 'First author, <a href="https://pubmed.ncbi.nlm.nih.gov/33332959/" target="_blank" rel="noopener">Biomacromolecules</a>'],
];
const rcat = {'A fair test inside one specimen':'Eye drug and gene delivery','Seeing force':'Eye drug and gene delivery','More repair from fewer cells':'Heart repair','Scaling a cell-free therapy':'Heart repair','Defined chemistry for printed blood vessels':'Engineering tissue','Catching AI at the microscope':'Evaluating AI in biology'};
const rorder = ['Eye drug and gene delivery','Heart repair','Engineering tissue','Evaluating AI in biology'];
const writing = [
  ['MUSC News', '2021', 'A matter of trust: Reengaging communities of color in clinical trials', 'https://web.musc.edu/about/news-center/2021/08/10/diversifying-clinical-trials'],
  ['EurekAlert!', '2019', 'A new epigenetic brain defense against recurrence of opioid use', 'https://www.eurekalert.org/news-releases/980910'],
  ['MUSC News', '2022', 'Preventing chemotherapy from overstaying its welcome', 'https://web.musc.edu/about/news-center/2022/04/06/chemotherapy-filter'],
  ['MUSC News', '2019', 'Defective cilia linked to heart valve defects', 'https://web.musc.edu/about/news-center/2019/09/17/hearth-valve-birth-defects'],
  ['MUSC News', '2021', 'Kids with COVID-19 or MIS-C have surprisingly high rates of neurological symptoms', 'https://web.musc.edu/about/news-center/2021/08/18/misc-neurology'],
  ['Progressnotes', '2019', 'Beneath the Surface', 'https://muschealth.org/health-professionals/progressnotes/2019/fall/beneath-the-surface'],
  ['MUSC News', '2023', 'Cannabis and the oral microbiome: Exploring their impacts on the brain', 'https://web.musc.edu/about/news-center/2023/01/12/marijuana-microbiome'],
  ['MUSC News', '2019', 'Genetics contribute to racial disparities in vitamin D status of children', 'https://web.musc.edu/about/news-center/2019/06/20/vitamin-d-deficiency-in-african-american-children'],
  ['MUSC News', '2020', 'New insight into a placental gene pathway and its association with vitamin D', 'https://web.musc.edu/about/news-center/2020/11/09/maternal-health'],
];
const talks = [
  ['2026', [['Poster, presenting author', 'ASRS Annual Meeting, Montréal', 'Real-time force feedback training for subretinal gene therapy.'], ['Poster', 'ARVO Annual Meeting, Denver', 'A platform for standardized assessment of suprachoroidal drug delivery.']]],
  ['2025', [['Invited talk', 'American Association of Extracellular Vesicles', 'Conductive silicon biointerfaces augment EV-driven heart repair.'], ['Oral', 'Society for Biomaterials, Chicago', 'Silicon nanowires augment therapeutic EV production from cardiac organoids.']]],
  ['2024', [['Invited seminar', 'Wichita State University', 'Nanowired human cardiac organoids for heart repair.']]],
  ['2019', [['Oral', 'Biomedical Engineering Society, Philadelphia', 'Vascular inductive bioinks with defined chemistry.']]],
];
const papers = [["Accepted and under review", ["<span class=\"au\">Barrs RW</span>, Kadmiel M, Ehrensing EA, Barak Y, Mahajan VB, Arhontoulis DC, Almeida DRP. Biological characterization and bilateral intraocular concordance of near real surgical specimens. A human ex vivo platform for controlled intraocular research. <em>Frontiers in Ophthalmology</em> 2026;6:1917720. Accepted September 28, 2026. <span class=\"pos\">first author</span>", "Arhontoulis DC, <span class=\"au\">Barrs RW</span>, Kadmiel M, Singer M, Mahajan VB, Almeida DRP. Needle dead space and penetration depth in anterior chamber paracentesis. A three-configuration bench comparison on near-real surgical specimens. <em>Clinical Ophthalmology</em>, under review."]], ["Peer-reviewed", ["Tan Y*, Coyle RC*, <span class=\"au\">Barrs RW</span>*, Silver SE, Li M, Richards DJ, et al. Nanowired human cardiac organoid transplantation enables highly efficient and effective recovery of infarcted hearts. <em>Science Advances</em> 2023;9(31):eadf2898. PMID 37540743. <span class=\"pos\">co-first author &middot; top 1% field-weighted citation impact</span>", "<span class=\"au\">Barrs RW</span>, Jia J, Ward M, Richards DJ, Yao H, Yost MJ, Mei Y. Engineering a chemically defined hydrogel bioink for direct bioprinting of microvasculature. <em>Biomacromolecules</em> 2021;22(2):275&ndash;288. PMID 33332959. <span class=\"pos\">first author</span>", "<span class=\"au\">Barrs RW</span>, Jia J, Silver SE, Yost M, Mei Y. Biomaterials for bioprinting microvasculature. <em>Chemical Reviews</em> 2020;120(19):10887&ndash;10949. PMID 32867470. <span class=\"pos\">first author</span>", "Bain JD, <span class=\"au\">Barrs RW</span>, Mei Y. Progress and challenges in transplantation of human pluripotent stem cell derived cardiomyocytes for cardiac therapy. <em>npj Biomedical Innovations</em> 2026;3(1):2. PMID 41522237.", "Coyle RC, <span class=\"au\">Barrs RW</span>, Richards DJ, Ladd EP, Menick DR, Mei Y. Targeting HIF-alpha for robust prevascularization of human cardiac organoids. <em>Journal of Tissue Engineering and Regenerative Medicine</em> 2021;15(2):189&ndash;202. PMID 33868541.", "Silver SE, <span class=\"au\">Barrs RW</span>, Mei Y. Transplantation of human pluripotent stem cell-derived cardiomyocytes for cardiac regenerative therapy. <em>Frontiers in Cardiovascular Medicine</em> 2021;8:707890. PMID 34820426.", "Jia J, Jeon EJ, Li M, Richards DJ, Lee S, Jung Y, <span class=\"au\">Barrs RW</span>, et al. Evolutionarily conserved sequence motif analysis guides development of chemically defined hydrogels for therapeutic vascularization. <em>Science Advances</em> 2020;6(28):eaaz5894. PMID 32923589.", "Schroeder LW, Buckley JR, Stroud RE, Martin RH, Nadeau EK, <span class=\"au\">Barrs RW</span>, Graham EM. Plasma neutrophil gelatinase-associated lipocalin is associated with acute kidney injury and clinical outcomes in neonates undergoing cardiopulmonary bypass. <em>Pediatric Critical Care Medicine</em> 2019;20(10):957&ndash;962. PMID 31206501.", "Akerman AW, Stroud RE, <span class=\"au\">Barrs RW</span>, et al. Elevated wall tension initiates interleukin-6 expression and abdominal aortic dilation. <em>Annals of Vascular Surgery</em> 2018;46:193&ndash;204. PMID 29107003.", "Jia J, Coyle RC, Richards DJ, Berry CL, <span class=\"au\">Barrs RW</span>, et al. Development of peptide-functionalized synthetic hydrogel microarrays for stem cell and tissue engineering applications. <em>Acta Biomaterialia</em> 2016;45:110&ndash;120. PMID 27612960."]], ["Preprints", ["Silver SE, Howells AR, Arhontoulis DC, Randolph LN, Hyams NA, <span class=\"au\">Barrs RW</span>, et al. Hypoimmunogenic hPSC-derived cardiac organoids for immune evasion and heart repair. <em>bioRxiv</em> 2025. doi:10.1101/2025.04.09.648007. PMID 40291708.", "Maddumala M, Sambuchino J, Arhontoulis D, <span class=\"au\">Barrs R</span>, Pereira D, Marcantonio G, Almeida DRP. aVOLTA, a bounded autonomous operating layer for operational communication in an investigator-led clinical research group. System design study. <em>JMIR Preprints</em> 2026. doi:10.2196/preprints.113028."]]];
const item = (k, h, p, s) => `<li class="item"><span class="cellmark" aria-hidden="true"></span><div><span class="k">${k}</span><h3>${h}</h3>${p ? `<p>${p}</p>` : ''}${s ? `<p class="s">${s}</p>` : ''}</div></li>`;

function sheet(id, title, sub, body) {
  const d = document.createElement('dialog'); d.className = 'sheet'; d.id = id; d.setAttribute('aria-labelledby', 'h-' + id);
  d.innerHTML = `<div class="in"><header><div><h2 id="h-${id}" tabindex="-1" autofocus>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div><button class="x" type="button">Close</button></header>${body}</div>`;
  document.body.appendChild(d); return d;
}
const S = {};
S.research = sheet('research', 'Research', '', `${rorder.map(c => `<div class="yr">${c}</div><ul class="items">${research.filter(r => rcat[r[1]] === c).map(r => item(r[0], r[1], r[2], r[3])).join('')}</ul>`).join('')}
  <p class="s" style="margin-top:44px;color:var(--soft)">Every paper is on <a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>.</p>`);
S.papers = sheet('papers', 'Papers', '', `${papers.map(([g, list]) => `<div class="yr">${g}</div><ol class="paperlist">${list.map(x => `<li>${x}</li>`).join('')}</ol>`).join('')}
  <p class="s" style="margin-top:44px;color:var(--soft)">Citations and the full record are on <a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>.</p>`);
S.resume = sheet('resume', 'Resume and CV', '', `<div class="dl"><a class="big" href="files/ryan-barrs-resume.pdf?v=2" download>One-page resume</a><span class="meta">PDF</span></div>
  <div class="dl"><a class="big" href="files/ryan-barrs-cv.pdf?v=2" download>Full CV</a><span class="meta">PDF</span></div>
  <object class="preview" data="files/ryan-barrs-resume.pdf?v=2#view=FitH&amp;toolbar=0" type="application/pdf" aria-label="Resume preview"></object>`);
S.writing = sheet('writing', 'Writing', 'Research stories I wrote for the Medical University of South Carolina newsroom.', `<ul class="items stories">${writing.map(w => item(`${w[0]}, ${w[1]}`, `<a href="${w[3]}" target="_blank" rel="noopener">${w[2]}</a>`)).join('')}</ul>`);
S.talks = sheet('talks', 'Talks', '', `${talks.map(([y, list]) => `<div class="yr">${y}</div><ul class="items">${list.map(t => item(t[0], t[1], t[2])).join('')}</ul>`).join('')}
  <div class="yr honors">Honors</div><ul class="items">
    ${item('2024', 'NIH T32 Postdoctoral Fellowship, NIDCR', 'Renewed for a second year.')}
    ${item('2022', 'Research strategy for two NIH R01 grants', 'Both funded by NHLBI.')}
    ${item('2021', 'NIH F31 Individual Predoctoral Fellowship, NHLBI', 'Funded on first submission.')}
    ${item('2018', 'NSF MADE in SC Research Fellowship', '')}</ul>`);
S.now = sheet('now', 'Now', '', `<div class="now"><span class="when">In Miami</span><div class="clock" id="clock"></div>
  <ul class="items">
    ${item('Since May 2026', 'Laboratory Director', 'Design and run studies of drug and gene delivery in human tissue.')}
    ${item('Built', 'A laboratory quality system', 'The master SOP and the records that make every specimen and procedure traceable.')}
    ${item('Wrote', 'Procedures for a multisite clinical trial', 'The operating procedures and primary safety endpoint, then co-led its investigator training.')}
    ${item('Teaching', 'Hands-on surgical training', 'Including a live demonstration at Retina World Congress 2026.')}
    ${item('Always', 'Writing about science', 'For people outside the lab.')}</ul></div>`);
S.contact = sheet('contact', 'Contact', '', `<a class="big" href="mailto:${mail}">${mail}</a><button class="copy" type="button" id="copy">Copy</button>
  <div class="links"><a href="https://www.linkedin.com/in/ryanbarrs" target="_blank" rel="noopener">LinkedIn</a><a href="https://scholar.google.com/citations?user=jumDAcQAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a><a href="https://github.com/barrsr" target="_blank" rel="noopener">GitHub</a></div>`);

const clock = document.getElementById('clock');
const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZone: 'America/New_York' }); };
tick(); setInterval(tick, 1000);
const cp = document.getElementById('copy');
cp.addEventListener('click', () => { (navigator.clipboard ? navigator.clipboard.writeText(mail) : Promise.reject()).then(() => { cp.textContent = 'Copied'; setTimeout(() => cp.textContent = 'Copy', 1600); }, () => { cp.textContent = mail; }); });

function openSheet(id, push) { const d = S[id]; if (!d || d.open) return; Object.values(S).forEach(x => x !== d && x.open && x.close());
  if (push) history.pushState({ s: id }, '', '#' + id); d.showModal(); d.scrollTop = 0; }
function closeSheet(d) { if (location.hash === '#' + d.id) history.back(); else d.close(); }
Object.values(S).forEach(d => { d.querySelector('.x').addEventListener('click', () => closeSheet(d));
  d.addEventListener('cancel', e => { e.preventDefault(); closeSheet(d); });
  d.addEventListener('click', e => { if (e.target === d && e.clientX < d.getBoundingClientRect().left) closeSheet(d); }); });
document.querySelectorAll('nav a[href^="#"]').forEach(a => { const id = a.getAttribute('href').slice(1); if (!S[id]) return;
  a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openSheet(id, true); }); });
addEventListener('popstate', () => { const id = location.hash.slice(1); Object.values(S).forEach(d => d.id !== id && d.open && d.close()); if (S[id]) openSheet(id, false); });
if (S[location.hash.slice(1)]) openSheet(location.hash.slice(1), false);
})();
