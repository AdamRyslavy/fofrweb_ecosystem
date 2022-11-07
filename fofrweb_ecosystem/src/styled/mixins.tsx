import { css } from 'styled-components';

export const mixins = {
  toCenter: (pos?: 'absolute' | 'fixed' | 'flex' | 'grid'): any =>
    handlePos(pos),
};

const handlePos = (pos: Parameters<typeof mixins.toCenter>[0]): any => {
  switch (pos) {
    case 'flex':
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    case 'grid':
      return css`
        display: grid;
        place-items: center;
      `;
    default:
      return css`
        position: ${pos ?? 'absolute'};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
  }
};
