import { makeAutoObservable } from 'mobx';
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

type SelectedElement = number | undefined;

export class ElementsStore {
  elements: Element[] = [];
  selectedElement?: SelectedElement;

  constructor() {
    makeAutoObservable(this);
  }

  setElements = (newElements: Element[]) => {
    this.elements = newElements;
  };

  setSelectedElement = (id: SelectedElement) => {
    this.selectedElement = id;
  };

  setElementState = (newState: Element) => {
    let elementState = this.elements.find((el) => el.id === newState.id);
    if (elementState) {
      elementState.left = newState.left;
      elementState.top = newState.top;
      elementState.color = newState.color;
    }
  };

  createNewElement = () => {
    this.elements[this.elements.length] = {
      id: (this.elements[this.elements.length - 1]?.id || 0) + 1,
      top: 0,
      left: 0,
      color: randomMC.getColor(),
    };
  };
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
