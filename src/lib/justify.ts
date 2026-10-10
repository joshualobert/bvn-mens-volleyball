/**
 * Split items into rows for a justified gallery: every row fills the full
 * width at a shared height, so the gallery always ends as a clean rectangle.
 * Uses a linear partition so rows are as even as possible (no lonely last row).
 */
export function justifyRows<T>(items: T[], ratio: (item: T) => number, targetRowRatio = 3.4): T[][] {
  const ratios = items.map(ratio);
  const total = ratios.reduce((a, b) => a + b, 0);
  const k = Math.max(1, Math.min(items.length, Math.round(total / targetRowRatio)));
  const n = items.length;

  // cost[i][j]: best max-row-sum splitting first i items into j rows
  const prefix = [0];
  for (const r of ratios) prefix.push(prefix[prefix.length - 1] + r);
  const sum = (a: number, b: number) => prefix[b] - prefix[a];
  const cost: number[][] = Array.from({ length: n + 1 }, () => Array(k + 1).fill(Infinity));
  const cut: number[][] = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
  cost[0][0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      for (let x = j - 1; x < i; x++) {
        // minimise squared deviation from the ideal row width
        const c = cost[x][j - 1] + (sum(x, i) - total / k) ** 2;
        if (c < cost[i][j]) {
          cost[i][j] = c;
          cut[i][j] = x;
        }
      }
    }
  }
  const rows: T[][] = [];
  let i = n;
  for (let j = k; j > 0; j--) {
    const x = cut[i][j];
    rows.unshift(items.slice(x, i));
    i = x;
  }
  return rows;
}
