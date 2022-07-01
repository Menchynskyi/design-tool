import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import { elements$ } from './App';
import { useObservableState } from 'observable-hooks';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC = () => {
  const elements = useObservableState(elements$);

  return (
    <CanvasContainer>
      {elements.map((element) => {
        return (
          <Element
            id={element.id}
            key={element.id}
            top={element.top}
            left={element.left}
            color={element.color}
          />
        );
      })}
    </CanvasContainer>
  );
};
