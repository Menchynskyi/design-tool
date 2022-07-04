import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import { useElementStore } from './App';
import { observer } from 'mobx-react-lite';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas = observer(() => {
  const { elements } = useElementStore();

  return (
    <CanvasContainer>
      {elements.map((element) => {
        return <Element key={element.id} element={element} />;
      })}
    </CanvasContainer>
  );
});
