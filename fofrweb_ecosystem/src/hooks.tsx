import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { debounce, isEqual } from 'lodash';
import { qs } from './utils/utils';

export const useTempAnim = (
  func: Dispatch<SetStateAction<boolean>>,
  delay: number
) => {
  func(true);
  setTimeout(() => {
    func(false);
  }, delay);
};

export const useDevice = () => {
  const [width, setWidth] = useState(0);

  const watchWindow = () => {
    debounce(() => setWidth(window.innerWidth), 500);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', watchWindow);
    return () => {
      window.removeEventListener('resize', watchWindow);
    };
  }, []);
  return {
    isDesktop: width > 500,
    isMobile: width < 500,
  };
};

type cacheType = { x: number; y: number; id: string }[];

type init = {
  transitionSpeed: number;
  transitionType: string;
  stagger: boolean;
  staggerSpeed: number;
} | null;

let cache: cacheType = [];
let cachedEl: Element[] = [];
let init: Partial<init> = {
  transitionSpeed: 700,
  transitionType: 'cubic-bezier(0.16, 1, 0.3, 1)',
  stagger: true,
  staggerSpeed: 30,
};

const flip = (current: HTMLElement[]) => {
  let delay = 0;
  current.forEach(el => {
    el.style.transition = 'none';
    if (current.length > cachedEl.length && el === handleSibling(current)) {
      el.style.transform = `scale(.3)`;
      el.style.opacity = `0`;
    } else {
      el.style.transform = `translate(${calcX(el)}px, ${calcY(el)}px)`;
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el.style.transition = `${init?.transitionSpeed}ms ${init?.transitionType}`;
        el.style.transitionDelay = `${delay}ms`;
        if (current.length > cachedEl.length && el === handleSibling(current)) {
          el.style.transform = `scale(1)`;
          el.style.opacity = `1`;
        } else {
          el.style.transform = `translate(0,0)`;
        }
        if (init?.stagger) delay += init?.staggerSpeed ?? 30;
      });
    });
  });
  setTimeout(() => {
    cache = [...prepareEl(current)];
    cachedEl = [...current];
  }, init?.transitionSpeed ?? 0 + (init?.stagger ? init?.staggerSpeed ?? 30 : 0) * current.length);
};

const handleSibling = (arr: Element[]) => {
  let array = [...arr, ...cachedEl].flat().reduce((prev, curr) => {
    let id: string = curr.getAttribute('transition_id') ?? '';
    if (!prev[id]) {
      prev[id] = 1;
    } else {
      prev[id] += 1;
    }
    return prev;
  }, {} as { [key: string]: number });
  const newID = Object.entries(array).filter(([_, val]) => val === 1)[0][0];
  const finalChild = [...arr, ...cachedEl]
    .flat()
    .filter(ch => ch.getAttribute('transition_id') === newID)[0];
  return finalChild;
};

const prepareEl = (arr: Element[]) => {
  if (!arr.length) return [];
  return arr.reduce<cacheType>(
    (prevEl, el) =>
      (prevEl = [
        ...prevEl,
        {
          x: el.getBoundingClientRect().x,
          y: el.getBoundingClientRect().y,
          id: el.getAttribute('transition_id') ?? '',
        },
      ]),
    []
  );
};

const checkSiblings = (el: Element) => {
  const sibling = (el.previousSibling || el.nextSibling || el) as HTMLElement;
  const { x, y } = sibling.getBoundingClientRect();
  return { x, y };
};
const calcX = (currentChild: Element) => {
  let cachedChild = cache.filter(
    el => el.id === currentChild.getAttribute('transition_id')
  )[0];
  let wOne = currentChild.getBoundingClientRect().x;
  let wTwo = cachedChild?.x || checkSiblings(currentChild).x;
  return wTwo - wOne;
};

const calcY = (currentChild: Element) => {
  let cachedChild = cache.filter(
    el => el.id === currentChild.getAttribute('transition_id')
  )[0];
  let wOne = currentChild.getBoundingClientRect().y;
  let wTwo = cachedChild?.y || checkSiblings(currentChild).y;
  return wTwo - wOne;
};

const makeId = (el: Element, index: number) => {
  if (el.getAttribute('transition_id')) return;
  el.setAttribute(
    'transition_id',
    String(Date.now().toString(36) + Math.random().toString(36) + index)
  );
};

const updateCacheOnScroll = (children: HTMLElement[]) => {
  cache = prepareEl(children);
  cachedEl = children;
};

export const useTransitionList = () => {
  return <T extends HTMLElement>(parent: T, options?: Partial<init>) => {
    if (!parent) return;
    const children = Array.from(parent.children) as HTMLElement[];
    init = { ...init, ...options };
    children.forEach((el, index) => makeId(el, index));
    let el = qs('.sb-show-main') as any;
    if (el) {
      el.onscroll = () => updateCacheOnScroll(children);
    }
    if (!cache.length) {
      cache = prepareEl(children);
      cachedEl = children;
      return;
    }
    if (!isEqual(cachedEl, children)) {
      flip(children);
    }
  };
};
