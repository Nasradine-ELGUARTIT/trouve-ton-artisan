export function paginate(page=1, limit=12) {
const p = Math.max(parseInt(page, 10) || 1, 1);
const l = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
const offset = (p - 1) * l;
return { limit: l, offset };
}