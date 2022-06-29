import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import { elementsStore, ElementsStore } from './App';
import { observer } from 'mobx-react-lite';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC<{ store: ElementsStore }> = observer(
  ({ store }) => {
    return (
      <CanvasContainer>
        {store.elements.map((element) => {
          return (
            <Element key={element.id} id={element.id} store={elementsStore} />
          );
        })}
      </CanvasContainer>
    );
  },
);
