import React, { memo } from 'react';
import { DraggableCore } from 'react-draggable';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { useDispatch, useSelector } from 'react-redux';
import { editElement, ElementsState, selectElement } from './App';

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
  id: number;
};

export const Element: React.FC<ElementProps> = memo(({ id }) => {
  const element = useSelector((state: ElementsState) =>
    state.elements.find((el) => el.id === id),
  );
  const dispatch = useDispatch();

  if (!element) return null;

  const { top, left, color } = element;
  return (
    <Container
      style={{ top, left, backgroundColor: hexToRgba(color, 0.45) }}
      onMouseDown={() => dispatch(selectElement({ id }))}
    >
      <DraggableCore
        onDrag={(e: any) => {
          dispatch(
            editElement({
              id,
              color,
              top: top + e.movementY,
              left: left + e.movementX,
            }),
          );
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
