import styled, { css } from 'styled-components';
import { Easing } from '../enums/css';
import { btnProps } from '../types/props';

export enum btnVariants {
  primary,
  secondary,
}

const handleVariant = (variant?: keyof typeof btnVariants) => {
  if (variant === 'primary' || !variant) {
    return css`
      background-color: var(--clrMain);
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      color: white;
    `;
  }
  if (variant === 'secondary') {
    return css`
      background-color: var(--bgColor, white);
      color: var(--clrMain);
      border: 1px solid var(--clrMain) !important;
      font-weight: 500;
    `;
  }
  return null;
};
export const StyledBaseButton = styled.button<btnProps>`
  ${props => handleVariant(props.variant)}
  border: 0;
  padding: 0.7rem 1.5rem;
  width: fit-content;
  border-radius: 100vw;
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
  transition: 350ms ${Easing.EASE_OUT_EXPO};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  span.clicked {
    position: absolute;
    pointer-events: none !important;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 50%;
    animation: rippleClick 500ms cubic-bezier(0.61, 1, 0.88, 1) forwards;
  }

  &:active {
    transform: scale(0.95);
  }

  @keyframes rippleClick {
    from {
      width: 0px;
      opacity: 0.5;
      height: 0px;
    }
    to {
      width: var(--rippleHeight);
      opacity: 0;
      height: var(--rippleHeight);
    }
  }

  ${props =>
    props.disabled &&
    css`
      box-shadow: none;
      opacity: 0.4;
    `}

  &.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;
