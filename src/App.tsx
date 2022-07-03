import { action, computed, makeAutoObservable, observable } from 'mobx';
import React from 'react';
import styled from 'styled-components';

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

export class ElementsStore {
  elements: Element[] = [];
  selectedElementId?: number;

  constructor() {
    makeAutoObservable(this, {
      elements: observable,
      selectedElementId: observable,
      setSelectedElement: action,
      createNewElement: action,
      editElement: action,
      removeSelectedElement: action,
      selectedElement: computed,
    });
  }

  createNewElement = () => {
    this.elements.push({
      id: (this.elements[this.elements.length - 1]?.id || 0) + 1,
      top: 0,
      left: 0,
      color: randomMC.getColor(),
    });
  };

  editElement = (element: Element) => {
    this.elements = this.elements.map((el) =>
      el.id !== element.id ? el : element,
    );
  };

  removeSelectedElement = () => {
    this.elements = this.elements.filter(
      ({ id }) => id !== this.selectedElementId,
    );
  };

  setSelectedElement = (id: number) => {
    this.selectedElementId = id;
  };

  get selectedElement() {
    return this.elements.find(({ id }) => id === this.selectedElementId);
  }
}

export const elementsStore = new ElementsStore();

const App: React.FC = () => {
  return (
    <Container>
      <LeftSidebar store={elementsStore} />
      <Canvas store={elementsStore} />
      <RightSidebar />
      <GlobalStyles />
    </Container>
  );
};

function Root() {
  return <App />;
}

export default Root;
