import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import {
  Element as ElementState,
  ElementsState,
  useElementsState,
} from './App';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC = () => {
  const { elements, setElements, setSelectedElement } = useElementsState(
    (state: ElementsState) => ({
      elements: state.elements,
      setElements: state.setElements,
      setSelectedElement: state.setSelectedElement,
    }),
  );

  return (
    <CanvasContainer>
      {elements.map((element: ElementState) => {
        return (
          <Element
            key={element.id}
            top={element.top}
            left={element.left}
            color={element.color}
            onDrag={(top, left) => {
              setElements(
                elements.map((el: ElementState) => {
                  if (el.id === element.id) {
                    return {
                      ...el,
                      top,
                      left,
                    };
                  } else {
                    return el;
                  }
                }),
              );
            }}
            onSelect={() => setSelectedElement(element.id)}
          />
        );
      })}
    </CanvasContainer>
  );
};
