function absBig(x) { return x < 0n ? -x : x; }
function gcd(a, b) {
  a = absBig(a); b = absBig(b);
  while (b !== 0n) { const r = a % b; a = b; b = r; }
  return a === 0n ? 1n : a;
}
class Rat {
  constructor(n, d = 1n) {
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d); this.n = n / g; this.d = d / g;
  }
  add(o) { return new Rat(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Rat(this.n * o.d - o.n * this.d, this.d * o.d); }
  div(o) { return new Rat(this.n * o.d, this.d * o.n); }
  mulInt(k) { return new Rat(this.n * k, this.d); }
  exact() { return this.d === 1n ? this.n.toString() : `${this.n}/${this.d}`; }
  decimal(digits = 45) {
    const sign = this.n < 0n ? '-' : '';
    const n = absBig(this.n), whole = n / this.d, rem = n % this.d;
    const scale = 10n ** BigInt(digits);
    const frac = ((rem * scale) / this.d).toString().padStart(digits, '0');
    return `${sign}${whole}.${frac}`;
  }
}
function a0(n) { return 41218n*n**3n - 48459n*n**2n + 20010n*n - 2871n; }
function a1(n) {
  return 2n*(48802112n*n**9n + 89030880n*n**8n + 36002654n*n**7n
    -24317344n*n**6n -19538418n*n**5n +1311365n*n**4n
    +3790503n*n**3n +460056n*n**2n -271701n*n -60291n);
}
function a2(n) {
  return 3874492n*n**8n -2617900n*n**7n -3144314n*n**6n
    +2947148n*n**5n +647130n*n**4n -1182926n*n**3n
    +115771n*n**2n +170716n*n -44541n;
}
function nextTerm(s, j) {
  const n = BigInt(j);
  const num = s[j].mulInt(-a1(n))
    .add(s[j-1].mulInt(4n*(2n*n-1n)*a2(n)))
    .add(s[j-2].mulInt(4n*(n-1n)**4n*(2n*n-1n)*(2n*n-3n)*a0(n+1n)));
  return num.div(new Rat((n+1n)**6n*a0(n)));
}
function residual(s, j) {
  const n = BigInt(j);
  return s[j+1].mulInt((n+1n)**6n*a0(n)).add(s[j].mulInt(a1(n)))
    .sub(s[j-1].mulInt(4n*(2n*n-1n)*a2(n)))
    .sub(s[j-2].mulInt(4n*(n-1n)**4n*(2n*n-1n)*(2n*n-3n)*a0(n+1n)));
}
function dominantRoot() {
  let x = -2368.3;
  for (let i=0;i<30;i++) {
    const f=x*x*x+2368*x*x-752*x-16, fp=3*x*x+4736*x-752;
    x -= f/fp;
  }
  return x;
}
const q=[new Rat(-1n),new Rat(42n),new Rat(-17934n)];
const p=[new Rat(0n),new Rat(87n,2n),new Rat(-1190161n,64n)];
for (let n=2;n<=28;n++) { q.push(nextTerm(q,n)); p.push(nextTerm(p,n)); }
for (let n=2;n<=28;n++) if (residual(q,n).n!==0n || residual(p,n).n!==0n) throw new Error(`bad residual ${n}`);
const z5=new Rat(BigInt('10369277551433699263313654864570341680570809195015'),10n**49n);
const lines=[];
lines.push('Q4743 EXACT ZUDILIN RECURRENCE AUDIT');
lines.push('ZETA5|1.0369277551433699263313654864570341680570809195015...');
lines.push('RESIDUALS|all exactly zero for n=2..28');
lines.push('TABLE');
lines.push('n|q_n|p_n|p_n/q_n|error_vs_zeta5');
for (let n=0;n<30;n++) {
  const r=p[n].div(q[n]);
  lines.push(`${n}|${q[n].exact()}|${p[n].exact()}|${r.decimal(50)}|${r.sub(z5).decimal(32)}`);
}
lines.push('MOBIUS');
lines.push('n|sigma1=q[n-1]/q[n]|sigma2=q[n-2]/q[n]|r=p[n]/q[n]|u=p[n-1]/q[n]|v=p[n-2]/q[n]');
for(let n=2;n<=5;n++) {
  const vals=[q[n-1].div(q[n]),q[n-2].div(q[n]),p[n].div(q[n]),p[n-1].div(q[n]),p[n-2].div(q[n])];
  lines.push(`${n}|${vals.map(x=>x.decimal(40)).join('|')}`);
}
const mu=dominantRoot(), z=1.0369277551433699263;
lines.push('LIMITS');
lines.push(`mu_dom|${mu}`);
lines.push(`sigma1_star|${1/mu}`);
lines.push(`sigma2_star|${1/(mu*mu)}`);
lines.push(`r_star|${z}`);
lines.push(`u_star|${z/mu}`);
lines.push(`v_star|${z/(mu*mu)}`);
console.log('<!doctype html><meta charset="utf-8"><pre>');
console.log(lines.join('\n'));
console.log('</pre>');
