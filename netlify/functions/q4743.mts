function absBig(x: bigint): bigint { return x < 0n ? -x : x; }
function gcd(a: bigint, b: bigint): bigint {
  a = absBig(a); b = absBig(b);
  while (b !== 0n) { const r = a % b; a = b; b = r; }
  return a === 0n ? 1n : a;
}

class Rat {
  readonly n: bigint;
  readonly d: bigint;
  constructor(n: bigint, d: bigint = 1n) {
    if (d === 0n) throw new Error("zero denominator");
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d); this.n = n / g; this.d = d / g;
  }
  add(o: Rat): Rat { return new Rat(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o: Rat): Rat { return new Rat(this.n * o.d - o.n * this.d, this.d * o.d); }
  div(o: Rat): Rat { return new Rat(this.n * o.d, this.d * o.n); }
  mulInt(k: bigint): Rat { return new Rat(this.n * k, this.d); }
  exact(): string { return this.d === 1n ? this.n.toString() : `${this.n}/${this.d}`; }
  decimal(digits = 45): string {
    const sign = this.n < 0n ? "-" : "";
    const n = absBig(this.n), whole = n / this.d, rem = n % this.d;
    const scale = 10n ** BigInt(digits);
    const frac = ((rem * scale) / this.d).toString().padStart(digits, "0");
    return `${sign}${whole}.${frac}`;
  }
}

function a0(n: bigint): bigint {
  return 41218n*n**3n - 48459n*n**2n + 20010n*n - 2871n;
}
function a1(n: bigint): bigint {
  return 2n*(48802112n*n**9n + 89030880n*n**8n + 36002654n*n**7n
    -24317344n*n**6n -19538418n*n**5n +1311365n*n**4n
    +3790503n*n**3n +460056n*n**2n -271701n*n -60291n);
}
function a2(n: bigint): bigint {
  return 3874492n*n**8n -2617900n*n**7n -3144314n*n**6n
    +2947148n*n**5n +647130n*n**4n -1182926n*n**3n
    +115771n*n**2n +170716n*n -44541n;
}
function nextTerm(s: Rat[], j: number): Rat {
  const n = BigInt(j);
  const num = s[j].mulInt(-a1(n))
    .add(s[j-1].mulInt(4n*(2n*n-1n)*a2(n)))
    .add(s[j-2].mulInt(4n*(n-1n)**4n*(2n*n-1n)*(2n*n-3n)*a0(n+1n)));
  return num.div(new Rat((n+1n)**6n*a0(n)));
}
function residual(s: Rat[], j: number): Rat {
  const n = BigInt(j);
  return s[j+1].mulInt((n+1n)**6n*a0(n)).add(s[j].mulInt(a1(n)))
    .sub(s[j-1].mulInt(4n*(2n*n-1n)*a2(n)))
    .sub(s[j-2].mulInt(4n*(n-1n)**4n*(2n*n-1n)*(2n*n-3n)*a0(n+1n)));
}
function dominantRoot(): number {
  let x = -2368.3;
  for (let i=0;i<30;i++) {
    const f=x*x*x+2368*x*x-752*x-16, fp=3*x*x+4736*x-752;
    x -= f/fp;
  }
  return x;
}
function compute() {
  const q=[new Rat(-1n),new Rat(42n),new Rat(-17934n)];
  const p=[new Rat(0n),new Rat(87n,2n),new Rat(-1190161n,64n)];
  for (let n=2;n<=28;n++) { q.push(nextTerm(q,n)); p.push(nextTerm(p,n)); }
  for (let n=2;n<=28;n++) if (residual(q,n).n!==0n || residual(p,n).n!==0n) throw new Error(`bad residual ${n}`);
  const z5=new Rat(BigInt("10369277551433699263313654864570341680570809195015"),10n**49n);
  const table=q.map((qn,n)=>{ const rr=p[n].div(qn); return {n,q:qn.exact(),p:p[n].exact(),ratio:rr.decimal(50),error:rr.sub(z5).decimal(32)}; });
  const mobius=[];
  for(let n=2;n<=5;n++) {
    const vals=[q[n-1].div(q[n]),q[n-2].div(q[n]),p[n].div(q[n]),p[n-1].div(q[n]),p[n-2].div(q[n])];
    mobius.push({n,sigma1:vals[0].decimal(40),sigma2:vals[1].decimal(40),r:vals[2].decimal(40),u:vals[3].decimal(40),v:vals[4].decimal(40),exact:vals.map(x=>x.exact())});
  }
  const mu=dominantRoot(), z=1.0369277551433699263;
  return {verified:"all recurrence residuals exactly zero for n=2..28",zeta5:"1.0369277551433699263313654864570341680570809195015...",table,mobius,mu,predicted:{sigma1:1/mu,sigma2:1/(mu*mu),r:z,u:z/mu,v:z/(mu*mu)}};
}
export default async () => new Response(JSON.stringify(compute(),null,2),{headers:{"content-type":"application/json; charset=utf-8"}});
export const config={path:"/api/q4743"};
