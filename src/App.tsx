import React from 'react';
import styled from 'styled-components';
import create from 'zustand';

import { Canvas } from './Canvas';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { GlobalStyles } from './ui';

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

export type ElementsState = {
  elements: Element[];
  setElements: (newElements: Element[]) => void;
  selectedElement: SelectedElement;
  setSelectedElement: (selectedElement: SelectedElement) => void;
  removeSelectedElement: () => void;
};

export const useElementsState = create<ElementsState>((set) => ({
  elements: [],
  setElements: (newElements) => set({ elements: newElements }),
  selectedElement: undefined,
  setSelectedElement: (selectedElement) => set({ selectedElement }),
  removeSelectedElement: () =>
    set((state: ElementsState) => ({
      elements: state.elements.filter(
        (el: Element) => el.id !== state.selectedElement,
      ),
    })),
}));

const App: React.FC = () => {
  return (
    <Container>
      <LeftSidebar />
      <Canvas />
      <RightSidebar />
      <GlobalStyles />
    </Container>
  );
};

function Root() {
  return <App />;
}

export default Root;
