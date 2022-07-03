import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import styled from 'styled-components';
// @ts-ignore
import randomMC from 'random-material-color';

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

type Element = {
  id: number;
  top: number;
  left: number;
  color: string;
};

export type ElementsState = {
  elements: Element[];
  selectedElementId?: number;
};

const initialState: ElementsState = {
  elements: [],
  selectedElementId: undefined,
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    createElement: (state) => {
      state.elements.push({
        id: (state.elements[state.elements.length - 1]?.id || 0) + 1,
        top: 0,
        left: 0,
        color: randomMC.getColor(),
      });
    },
    editElement: (state, { payload }: PayloadAction<Element>) => {
      state.elements = state.elements.map((element) =>
        element.id !== payload.id ? element : payload,
      );
    },
    removeSelectedElement: (state) => {
      state.elements = state.elements.filter(
        ({ id }) => id !== state.selectedElementId,
      );
    },
    selectElement: (state, { payload }: PayloadAction<{ id?: number }>) => {
      state.selectedElementId = payload.id;
    },
  },
});

export const {
  createElement,
  editElement,
  removeSelectedElement,
  selectElement,
} = elementsSlice.actions;

const store = configureStore({
  reducer: elementsSlice.reducer,
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
