// Smooth dividing cells. Shared engine for the soft home screens.
// Cells grow, pinch into two daughters, jostle, and occasionally fade, so the plate never fills.
window.Cells = function (o) {
  const MAX = o.max || 140, cv = o.canvas, gl = cv.getContext('webgl2', { antialias: false, premultipliedAlpha: false });
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!gl) { cv.style.background = o.fallback || '#eee'; return; }
  const RS = o.scale || 0.6;
  const vs = `#version 300 es
in vec2 a;void main(){gl_Position=vec4(a,0,1);}`;
  const fs = `#version 300 es
precision highp float;
uniform vec4 C[${MAX}];uniform int N;uniform vec2 S;uniform float P,T,K;out vec4 o;
${o.prelude || ''}
float smin(float a,float b,float k){float h=max(k-abs(a-b),0.)/k;return min(a,b)-h*h*k*.25;}
float hash(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}
float vnoise(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
void main(){vec2 p=vec2(gl_FragCoord.x,S.y*P-gl_FragCoord.y)/P;vec2 pr=p;${o.snap ? `p=(floor(p/${o.snap}.)+.5)*${o.snap}.;` : ''}
  float d=1e5,d1=1e5,d2=1e5,r1=1.,s1=0.,ws=1e-4,ss=0.;vec2 c1=vec2(-1e4);
  for(int i=0;i<${MAX};i++){if(i>=N)break;vec4 c=C[i];float di=length(p-c.xy)-c.z;d=smin(d,di,K);float wv=exp(-max(di,0.)/22.)*smoothstep(2.,10.,c.z);ws+=wv;ss+=wv*c.w;di+=(1.-smoothstep(5.,14.,c.z))*60.;
    if(di<d1){d2=d1;d1=di;r1=c.z;s1=c.w;c1=c.xy;}else if(di<d2)d2=di;}
  float g=hash(gl_FragCoord.xy+fract(T)*0.);vec2 q=p/S-.5;
  float sa=ss/ws;
  vec3 col;
  ${o.style}
  o=vec4(col,1);}`;
  function sh(t, s) { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(x)); return x; }
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const al = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(al); gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(pr, n), uC = U('C'), uN = U('N'), uS = U('S'), uP = U('P'), uT = U('T'), uK = U('K');
  let W, H, ratio;
  function size() { W = innerWidth; H = innerHeight; ratio = Math.min(2, devicePixelRatio || 1) * RS; cv.width = Math.round(W * ratio); cv.height = Math.round(H * ratio); gl.viewport(0, 0, cv.width, cv.height); }
  let zones = [];
  function measure() { zones = (o.avoid ? [...document.querySelectorAll(o.avoid)] : []).map(e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; }); }
  size(); addEventListener('resize', () => { size(); measure(); }); measure(); document.fonts && document.fonts.ready.then(measure);

  const R0 = o.r || [16, 34], rnd = (a, b) => a + Math.random() * (b - a);
  const cells = [];
  const make = (x, y, r) => { const rmax = rnd(R0[0], R0[1]); return { x, y, vx: 0, vy: 0, r: r ?? rnd(rmax * .7, rmax), rmax, g: rmax * rnd(.025, .05), seed: Math.random(), dying: false }; };
  const n0 = o.start || Math.round(MAX * .6);
  for (let i = 0; i < n0; i++) cells.push(make(rnd(-20, W + 20), rnd(-20, H + 20)));

  let mx = -1e4, my = -1e4;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { mx = my = -1e4; });
  const room = (x, y, k) => { while (cells.length > MAX - k) { let far = 0, fd = -1; for (let i = 0; i < cells.length; i++) { const d = Math.hypot(cells[i].x - x, cells[i].y - y); if (d > fd) { fd = d; far = i; } } cells.splice(far, 1); } };
  const shove = (x, y, R, P) => { for (const c of cells) { const dx = c.x - x, dy = c.y - y, d = Math.hypot(dx, dy); if (d < R && d > .5) { const f = (R - d) / R * P / d; c.vx += dx * f; c.vy += dy * f; } } };
  window.addEventListener('pointerdown', e => { if (e.button !== 0 || e.target.closest('a,button,dialog') || document.querySelector('dialog[open]')) return;
    const x = e.clientX, y = e.clientY; let hit = null;
    for (const c of cells) if (!c.dying && Math.hypot(c.x - x, c.y - y) < c.r) { hit = c; break; }
    room(x, y, 2);
    if (hit) { hit.r = Math.max(hit.r, hit.rmax * .9); divide(hit); shove(x, y, hit.r * 3, 90); }
    else { const c = make(x, y, 0); c.r = c.rmax * .8; cells.push(c); shove(x, y, c.r * 3.2, 160); }
  });

  const clear = () => { for (let i = cells.length - 1; i >= 0; i--) { const c = cells[i]; if (zones.some(z => c.x > z[0] - c.r * 1.2 - 34 && c.x < z[2] + c.r * 1.2 + 34 && c.y > z[1] - c.r * 1.2 - 34 && c.y < z[3] + c.r * 1.2 + 34)) cells.splice(i, 1); } };
  clear(); document.fonts && document.fonts.ready.then(() => { measure(); clear(); });
  const STIFF = o.stiff || 7, DAMP = o.damp || 3.2, OVER = o.overlap || .92, JIT = o.jitter || 18;
  function divide(c) {
    const a = Math.random() * Math.PI * 2, ux = Math.cos(a), uy = Math.sin(a), nr = c.r * .74;
    const k = make(c.x + ux, c.y + uy, nr); k.rmax = Math.max(k.rmax, nr * 1.3); k.seed = (c.seed + rnd(-.08, .08) + 1) % 1;
    c.r = nr; c.rmax = Math.max(rnd(R0[0], R0[1]), nr * 1.3); c.vx -= ux * 40; c.vy -= uy * 40; k.vx += ux * 40; k.vy += uy * 40; cells.push(k);
  }
  function step(dt) {
    const n = cells.length;
    for (let i = n - 1; i >= 0; i--) {
      const c = cells[i];
      if (c.dying) { c.r -= dt * (c.r > 14 ? 10 : 40); if (c.r < 1) { cells.splice(i, 1); continue; } }
      else if (c.r < c.rmax) c.r = Math.min(c.rmax, c.r + c.g * dt);
      else if (cells.length < MAX && Math.random() < dt * .6) divide(c);
    }
    if (cells.length > MAX * .85 && Math.random() < dt * .5) { const c = cells[Math.random() * cells.length | 0]; if (c) c.dying = true; }
    if (cells.length < MAX * .35) cells.push(make(rnd(0, W), rnd(0, H), 2));
    const m = cells.length;
    for (let i = 0; i < m; i++) { const a = cells[i];
      for (let j = i + 1; j < m; j++) { const c = cells[j], dx = c.x - a.x, dy = c.y - a.y, d2 = dx * dx + dy * dy, mn = (a.r + c.r) * OVER;
        if (d2 < mn * mn && d2 > 1e-6) { const d = Math.sqrt(d2), f = (mn - d) * STIFF * dt / d; a.vx -= dx * f; a.vy -= dy * f; c.vx += dx * f; c.vy += dy * f; } }
      const px = a.x - mx, py = a.y - my, pd = Math.hypot(px, py), PR = 150;
      if (pd < PR && pd > 1) { const f = (PR - pd) / PR * 260 * dt / pd; a.vx += px * f; a.vy += py * f; }
      for (const z of zones) { const m = a.r * 1.2 + 34, l = z[0] - m, t = z[1] - m, rr = z[2] + m, bb = z[3] + m;
        if (a.x > l && a.x < rr && a.y > t && a.y < bb) { const dl = a.x - l, dr = rr - a.x, dt2 = a.y - t, db = bb - a.y, mn = Math.min(dl, dr, dt2, db), F = 900 * dt;
          if (mn === dl) a.vx -= F; else if (mn === dr) a.vx += F; else if (mn === dt2) a.vy -= F; else a.vy += F;
        } }
      a.vx += (Math.random() - .5) * JIT * dt; a.vy += (Math.random() - .5) * JIT * dt;
      const e = Math.exp(-DAMP * dt); a.vx *= e; a.vy *= e;
      a.x += a.vx * dt; a.y += a.vy * dt;
      const pad = a.r * .5;
      if (a.x < -pad) a.vx += 30 * dt; if (a.x > W + pad) a.vx -= 30 * dt; if (a.y < -pad) a.vy += 30 * dt; if (a.y > H + pad) a.vy -= 30 * dt;
    }
  }
  const buf = new Float32Array(MAX * 4);
  function draw(t) {
    const n = Math.min(cells.length, MAX);
    for (let i = 0; i < n; i++) { const c = cells[i]; buf[i * 4] = c.x; buf[i * 4 + 1] = c.y; buf[i * 4 + 2] = c.r; buf[i * 4 + 3] = c.seed; }
    gl.uniform4fv(uC, buf); gl.uniform1i(uN, n); gl.uniform2f(uS, W, H); gl.uniform1f(uP, ratio); gl.uniform1f(uT, t / 1000); gl.uniform1f(uK, o.k || 14);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  if (still) { for (let i = 0; i < 300; i++) step(1 / 30); draw(0); return; }
  let last = performance.now();
  (function loop(t) { const dt = Math.min(.05, (t - last) / 1000); last = t; step(dt); draw(t); requestAnimationFrame(loop); })(last);
};
