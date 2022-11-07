import { qsa } from './utils';

let setTime: any;

function getBoundingX(el: HTMLElement) {
  let wOne = el.getBoundingClientRect().right;
  let wTwo = el.getBoundingClientRect().width;
  return wOne - wTwo;
}
function getBoundingY(el: HTMLElement) {
  let wOne = el.getBoundingClientRect().bottom;
  let wTwo = el.getBoundingClientRect().height;
  return wOne - wTwo;
}
function clearRipples() {
  const arr = qsa('span.clicked');
  if (arr.length) {
    arr.forEach(el => el.remove());
  }
}
export function bubble(e: any, color: string) {
  clearRipples();
  let target = e.target;
  if (e) {
    clearInterval(setTime);
    let width = target.getBoundingClientRect().width;
    const root = document.documentElement;
    root.style.setProperty('--rippleHeight', width * 2.5 + 'px');
    let x = e.clientX - getBoundingX(target);
    let y = e.clientY - getBoundingY(target);
    let ripple = document.createElement('span');
    ripple.classList.add('clicked');
    ripple.style.backgroundColor = color;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    target.appendChild(ripple);
    setTime = setTimeout(() => ripple.remove(), 500);
  }
}
