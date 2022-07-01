import React from 'react';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import styled from 'styled-components';

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

export const elementsSubject = new BehaviorSubject<Element[]>([]);

export const selectedElementIdSubject = new BehaviorSubject<number | null>(
  null,
);

export const selectedElementSubject = elementsSubject.pipe(
  combineLatestWith(selectedElementIdSubject),
  map(([elements, elId]) => elements.find((el) => el.id === elId)),
);

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
