import React from 'react';
import { DraggableCore } from 'react-draggable';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { observer } from 'mobx-react-lite';
import { Element as ElementState, useElementStore } from './App';

const Container = styled.div`
  position: absolute;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 200px;
  height: 170px;
  background-color: rgba(17, 17, 17, 0.45);
  backdrop-filter: blur(30px);
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type ElementProps = {
  element: ElementState;
};

export const Element: React.FC<ElementProps> = observer(({ element }) => {
  const { setSelectedElementId, editElement } = useElementStore();
  const { top, left, color, id } = element;

  return (
    <Container
      style={{ top, left, backgroundColor: hexToRgba(color, 0.45) }}
      onMouseDown={() => setSelectedElementId(id)}
    >
      <DraggableCore
        onDrag={(e: any) => {
          editElement({
            id,
            color,
            top: top + e.movementY,
            left: left + e.movementX,
          });
        }}
      >
        <InnerContainer>
          <div>Top: {top}</div>
          <div>Left: {left}</div>
        </InnerContainer>
      </DraggableCore>
    </Container>
  );
});
