export function toPx(value: number) {
  return (value + 'px').toString();
}
export function qs(selector: string, parent = document) {
  return parent.querySelector(selector);
}
export function qsa(selector: string, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}
export function setSpaces(price: number | string) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export function subString(val: string, size: number): string {
  if (!val) return '';
  if (val.length > size) return val.substring(0, size) + '...';
  return val;
}
export function isApiError(data: { code: number }) {
  return !(data.code >= 200 && data.code <= 299);
}
