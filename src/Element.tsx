import React, { memo } from 'react';
import { DraggableCore } from 'react-draggable';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { elementsSubject, selectedElementIdSubject } from './App';

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
  top: number;
  left: number;
  color: string;
  id: number;
};

export const Element: React.FC<ElementProps> = memo(
  ({ top, left, color, id }) => {
    return (
      <Container
        style={{ top, left, backgroundColor: hexToRgba(color, 0.45) }}
        onMouseDown={() => selectedElementIdSubject.next(id)}
      >
        <DraggableCore
          onDrag={(e: any) => {
            elementsSubject.next(
              elementsSubject.value.map((el) => {
                if (el.id === id) {
                  return {
                    ...el,
                    top: el.top + e.movementY,
                    left: el.left + e.movementX,
                  };
                } else {
                  return el;
                }
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
  },
);
