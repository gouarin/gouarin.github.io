// Hand-drawn line helpers: deterministic jitter so every build draws the same sketch.

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Rand = () => number;

const jit = (r: Rand, amount: number) => (r() - 0.5) * 2 * amount;
const f = (n: number) => n.toFixed(1);

/** A slightly bowed pencil stroke that overshoots its ends a little, as a hand does. */
export function line(r: Rand, x1: number, y1: number, x2: number, y2: number, wobble = 1.2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const over = Math.min(3, len * 0.04);
  const ux = dx / len;
  const uy = dy / len;
  const sx = x1 - ux * over * r() + jit(r, wobble * 0.4);
  const sy = y1 - uy * over * r() + jit(r, wobble * 0.4);
  const ex = x2 + ux * over * r() + jit(r, wobble * 0.4);
  const ey = y2 + uy * over * r() + jit(r, wobble * 0.4);
  const bow = jit(r, wobble) * Math.min(1, len / 60);
  const cx = (sx + ex) / 2 - uy * bow;
  const cy = (sy + ey) / 2 + ux * bow;
  return `M${f(sx)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`;
}

/** A circle drawn in one loose stroke that does not quite close on itself. */
export function circle(r: Rand, cx: number, cy: number, radius: number, wobble = 0.06) {
  const start = r() * Math.PI * 2;
  const sweep = Math.PI * 2 + 0.25 + r() * 0.2;
  const steps = 18;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const a = start + (sweep * i) / steps;
    const rr = radius * (1 + jit(r, wobble));
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    d += i === 0 ? `M${f(x)} ${f(y)}` : `L${f(x)} ${f(y)}`;
  }
  return d;
}

/** An arrow: a stroke plus two short flicks for the head. */
export function arrow(r: Rand, x1: number, y1: number, x2: number, y2: number, head = 7) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h1 = a + Math.PI - 0.45 + jit(r, 0.08);
  const h2 = a + Math.PI + 0.45 + jit(r, 0.08);
  return [
    line(r, x1, y1, x2, y2, 0.8),
    line(r, x2, y2, x2 + Math.cos(h1) * head, y2 + Math.sin(h1) * head, 0.3),
    line(r, x2, y2, x2 + Math.cos(h2) * head, y2 + Math.sin(h2) * head, 0.3),
  ];
}
