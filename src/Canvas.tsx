import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import { ElementsState } from './App';
import { useSelector } from 'react-redux';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC = () => {
  const elements = useSelector((state: ElementsState) => state.elements);

  return (
    <CanvasContainer>
      {elements.map((element) => {
        return <Element key={element.id} id={element.id} />;
      })}
    </CanvasContainer>
  );
};
