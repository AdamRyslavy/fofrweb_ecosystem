import React, {
  FormEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';
import styled, { css } from 'styled-components';
import { Easing } from '../enums/css';

interface Iinput extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  type: HTMLInputTypeAttribute;
  id: string;
  variant?: 'one' | 'two';
  isError?: { error: any; message: string };
  numbersOnly?: boolean;
}

export const FofrInput = React.forwardRef<HTMLInputElement, Iinput>(
  ({ label, type, id, value, variant, isError, numbersOnly, ...rest }, ref) => {
    const handleInput = (e: FormEvent<HTMLInputElement>) => {
      if (numbersOnly) {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/[^0-9.]/g, '');
      }
    };
    return (
      <StyledFilled variant={variant}>
        {variant === 'two' && (
          <label htmlFor={id}>
            {label} {isError?.error && <i>- {isError.message}</i>}
          </label>
        )}
        <input
          type={type}
          id={id}
          value={value}
          placeholder=" "
          ref={ref}
          onInput={e => handleInput(e)}
          {...rest}
        />
        {variant !== 'two' && (
          <label htmlFor={id}>
            {label} {isError?.error && <i>- {isError.message}</i>}
          </label>
        )}
      </StyledFilled>
    );
  }
);

const StyledFilled = styled.div<{ variant?: string }>`
  display: grid;
  gap: 0.4rem;
  width: 100%;
  position: relative;

  input {
    padding: 0.7rem 1rem;
    border: 0;
    outline: none;
    transition: 350ms ${Easing.EASE_OUT_EXPO};
    border-radius: 5px;
  }

  label i {
    color: #791a1a;
    font-size: 0.9rem;
  }
  ${({ variant }) =>
    variant !== 'two' &&
    css`
      label {
        position: absolute;
        pointer-events: none;
        top: 13px;
        left: 0.3rem;
        background-color: white;
        padding: 0 0.7rem;
        display: block;
        transition: 350ms ${Easing.EASE_OUT_EXPO};
      }

      input {
        border: 1px solid rgb(230, 220, 220);
        &:focus {
          border-color: var(--clrMain);
        }
      }

      &:focus-within label,
      input:not(:placeholder-shown) + label {
        transform: translate(5px, -23px);
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
      }
    `}
  ${({ variant }) =>
    variant === 'two' &&
    css`
      overflow: hidden;
      input {
        background-color: #f7f2f2;
        border-radius: 8px;
      }
      &::before {
        position: absolute;
        content: '';
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: var(--clrMain);
        transform: scaleX(0);
        transition: 350ms ${Easing.EASE_OUT_EXPO};
      }

      &:focus-within {
        & input {
          border-radius: 8px 8px 0 0;
        }
        &::before {
          transform: scaleX(1);
        }
      }
    `}
`;
