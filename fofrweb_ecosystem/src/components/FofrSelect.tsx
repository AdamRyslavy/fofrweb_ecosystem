import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Easing, Shadow } from '../enums/css';
import { qsa, toPx } from '../utils/utils';

interface ISelect {
  label: string;
  items: { value: string; return: string }[];
  stickHeight?: number;
  onSelect?: (val: string) => void;
  clearOnSubmit?: boolean;
}

export const FofrSelect = ({
  label,
  items,
  onSelect,
  stickHeight,
  clearOnSubmit,
}: ISelect) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as Element)?.classList.contains('frfdrp')) {
        setOpen(!open);
        return;
      }
      setOpen(false);
    },
    [open]
  );
  const handleSubmit = () => {
    //reset all
    setSelected(null);
  };

  useEffect(() => {
    if (clearOnSubmit) {
      qsa('form').forEach(form =>
        form.addEventListener('submit', handleSubmit)
      );
    }
    return () => {
      qsa('form').forEach(form =>
        form.removeEventListener('submit', handleSubmit)
      );
    };
  }, [clearOnSubmit]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <>
      <FofrSelectStyled className="frfdrp">
        <p className="pN">{!selected ? label : selected}</p>
        <FofrStyledClose
          stickHeight={stickHeight}
          selected={selected}
          onClick={() => setSelected(null)}
          className={`${!selected ? 'pN' : ''}`}
        >
          <div></div>
          <div></div>
        </FofrStyledClose>
        <FofrDropDownStyled
          ref={nodeRef}
          className={open ? 'frfdrp--show' : ''}
        >
          {items.map(el => (
            <span
              key={el.value}
              onClick={() => {
                setSelected(el.value);
                onSelect?.(el.return);
              }}
            >
              {el.value}
            </span>
          ))}
        </FofrDropDownStyled>
      </FofrSelectStyled>
    </>
  );
};

const calcWidth = (width: number | string) => {
  const w = Number(width);
  return Math.sqrt(Math.pow(w, 2) + Math.pow(w, 2));
};

const FofrStyledClose = styled.div<{
  selected: string | null;
  stickHeight?: number;
}>`
  height: ${({ stickHeight = 0 }) => toPx(stickHeight || 18)};
  width: ${({ stickHeight = 4 }) => toPx(stickHeight - 4 || 14)};
  position: relative;
  cursor: pointer;
  transform: ${({ selected }) =>
    !selected ? 'translateY(5px)' : 'translateY(0px)'};
  transition: 350ms ${Easing.EASE_OUT_EXPO};

  div {
    width: ${({ stickHeight = -0.5 }) =>
      toPx(calcWidth(stickHeight + 0.5 || 14.5))};
    height: 2px;
    background-color: black;
    transform-origin: top left;
    position: absolute;
    transition: 350ms ${Easing.EASE_OUT_EXPO};

    &:first-child {
      transform: rotate(45deg) scaleX(0.55);
    }

    &:last-child {
      right: 0;
      transform-origin: top right;
      transform: rotate(-45deg) scaleX(0.55);
    }

    ${({ selected }) =>
      selected &&
      css`
        &:first-child {
          transform: rotate(45deg) scaleX(1);
        }

        &:last-child {
          right: 0;
          transform-origin: top right;
          transform: rotate(-45deg) scaleX(1);
        }
      `}
  }
`;

const FofrSelectStyled = styled.div`
  box-shadow: ${Shadow.SHADOW_ONE};
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  position: relative;

  .pN {
    pointer-events: none;
  }
`;

const FofrDropDownStyled = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  bottom: -0.5rem;
  left: 0;
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(calc(100% - 0.5rem));
  transition: transform 350ms ${Easing.EASE_OUT_EXPO};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: white;
    box-shadow: ${Shadow.SHADOW_TWO};
    border-radius: inherit;
    z-index: -1;
    transform-origin: top;
    transform: scaleY(0.5);
    transition: 350ms ${Easing.EASE_OUT_EXPO};
  }

  & > * {
    padding: 0.7rem 1rem;
    cursor: pointer;
    transition: opacity 450ms ${Easing.EASE_OUT_EXPO};
    transition-delay: 50ms;
    opacity: 0;

    &:hover {
      background-color: #f7f2f2;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
    }

    &:first-child {
      border-radius: 5px 5px 0 0;
    }
  }

  &.frfdrp--show {
    pointer-events: all;
    transform: translateY(100%);
    opacity: 1;

    &::before {
      transform: scaleY(1);
    }

    & > * {
      opacity: 1;
    }
  }
`;
