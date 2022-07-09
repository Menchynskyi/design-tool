import React, { createContext, useContext } from 'react';
import styled from 'styled-components';
import { destroy, flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

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

const Element = types.model('Element', {
  id: types.number,
  top: types.number,
  left: types.number,
  color: types.string,
});

export type Element = SnapshotOut<typeof Element>;

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
});

const FactStore = types
  .model('FactStore', {
    loading: types.boolean,
    randomFact: types.maybe(types.string),
  })
  .actions((self) => ({
    getRandomFact: flow(function* () {
      self.loading = true;
      try {
        const res = yield fetch(
          `http://uselessfacts.jsph.pl/random.json?language=en`,
        );
        const fact = yield res.json();
        yield new Promise((resolve) => setTimeout(resolve, 1500));
        self.randomFact = fact?.text;
      } catch (e) {
        console.error(e);
      } finally {
        self.loading = false;
      }
    }),
  }));

export const factStore = FactStore.create({
  loading: false,
});

export type FactInstance = Instance<typeof FactStore>;

makeInspectable(elementsStore);

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
        <LeftSidebar factStore={factStore} />
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
