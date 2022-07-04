import React, { createContext, useContext } from 'react';
import styled from 'styled-components';
import { destroy, Instance, types } from 'mobx-state-tree';

import { Canvas } from './Canvas';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { GlobalStyles } from './ui';
// @ts-ignore
import randomMC from 'random-material-color';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

export type Element = {
  id: number;
  top: number;
  left: number;
  color: string;
};

const Element = types.model('Element', {
  id: types.number,
  top: types.number,
  left: types.number,
  color: types.string,
});

// const SelectedElement = types.model('SelectedElement', types.number);

const ElementsStore = types
  .model('ElementsStore', {
    elements: types.array(Element),
    selectedElementId: types.maybe(types.number),
  })
  .actions((self) => ({
    createNewElement() {
      self.elements.push({
        id: (self.elements[self.elements.length - 1]?.id || 0) + 1,
        top: 0,
        left: 0,
        color: randomMC.getColor(),
      });
    },

    editElement(element: Element) {
      const elementIndex = self.elements.findIndex(
        ({ id }) => id === element.id,
      );
      if (elementIndex !== -1) self.elements[elementIndex] = element;
    },

    removeSelectedElement() {
      const elementIndex = self.elements.findIndex(
        ({ id }) => id === self.selectedElementId,
      );
      if (elementIndex !== -1) destroy(self.elements[elementIndex]);
    },

    setSelectedElement(id: number) {
      self.selectedElementId = id;
    },
  }))
  .views((self) => ({
    get selectedElement() {
      return self.elements.find(({ id }) => id === self.selectedElementId);
    },
  }));

export const elementsStore = ElementsStore.create({
  elements: [],
  selectedElementId: undefined,
});

type ElementInstance = Instance<typeof ElementsStore>;

const ElementStoreContext = createContext<null | ElementInstance>(null);

export const Provider = ElementStoreContext.Provider;

export const useElementStore = () => {
  const store = useContext(ElementStoreContext);

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return store;
};

const App: React.FC = () => {
  return (
    <Provider value={elementsStore}>
      <Container>
        <LeftSidebar />
        <Canvas />
        <RightSidebar />
        <GlobalStyles />
      </Container>
    </Provider>
  );
};

function Root() {
  return <App />;
}

export default Root;
