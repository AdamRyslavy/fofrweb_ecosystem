import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  let debounce = () =>
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 500);
  const watchWindow = () => {
    debounce();
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', watchWindow);
    return () => {
      clearTimeout(debounce());
      window.removeEventListener('resize', watchWindow);
    };
  }, []);
  return {
    isDesktop: width > 500,
    isMobile: width < 500,
  };
};
