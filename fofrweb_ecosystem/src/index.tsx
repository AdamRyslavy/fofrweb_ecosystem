import { uniqueId } from 'lodash';
import React, { useLayoutEffect, useRef, useState, useTransition } from 'react';
import styled from 'styled-components';
import { FofrButton } from './components/FofrButton';
import { FofrInput } from './components/FofrInput';
import { FofrSelect } from './components/FofrSelect';
import { useTransitionList } from './hooks';
import { appInit } from './utils/init';

// Nepoužívat default import/export !!
export * from './components/FofrSkeleton';
export * from './components/FofrButton';
export * from './components/FofrInput';
export * from './components/FofrSelect';
export * from './utils/utils';
export * from './utils/init';
export * from './enums/css';
export * from './styled/mixins';
export * from './hooks';

appInit({
  globalCSSVars: {
    clrBg: 'rgb(250, 244, 244)',
    clrMain: '#971a1a',
    clrGrey: 'rgb(230, 220, 220)',
  },
});

//test
//konflikt

export const Thing = () => {
  const [data, setData] = useState<string[]>([]);
  const transition = useTransitionList();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      transition(ref.current);
    }
  });

  return (
    <>
      <button onClick={() => setData([...data, uniqueId()])}>fill</button>
      <GridStyled ref={ref}>
        {data.map((el, index) => (
          <div
            key={el}
            onClick={() => {
              setData([...data.filter(el => data.indexOf(el) !== index)]);
            }}
          >
            {el}
          </div>
        ))}
      </GridStyled>
    </>
  );
};

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  padding: 1rem;
  gap: 1rem;

  & > * {
    height: 150px;
    border: 1px solid black;
  }
`;
