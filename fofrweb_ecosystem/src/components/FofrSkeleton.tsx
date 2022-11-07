import React from 'react';
import styled, { css } from 'styled-components';
import { toPx } from '../utils/utils';

interface ISkeleton {
  count?: number;
  width?: number;
  height?: number;
}
export const Skeleton = ({ count, width, height }: ISkeleton) => {
  return (
    <SkeletonGridStyled width={width} height={height}>
      {Array(count ? count : 3)
        .fill('')
        .map((_key, index) => (
          <SkeletonStyled key={index} height={height}></SkeletonStyled>
        ))}
    </SkeletonGridStyled>
  );
};

const SkeletonGridStyled = styled.div<ISkeleton>`
  display: grid;
  gap: 1rem;
  ${({ width }) =>
    css`
      grid-template-columns: ${`repeat(auto-fill, ${toPx(width ?? 250)})`};
    `};
  justify-content: center;
  padding: 1rem;
  text-align: center;
  margin-top: 5rem;
`;

const SkeletonStyled = styled.div<ISkeleton>`
  height: ${({ height }) => toPx(height ?? 200)};
  border-radius: 5px;
  background-color: #e7e5e5;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    #e7e5e5;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;

  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;
