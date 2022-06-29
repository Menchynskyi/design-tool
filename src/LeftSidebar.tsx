import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { FiSquare } from 'react-icons/fi';
import { ElementsState, useElementsState } from './App';
// @ts-ignore
import randomMC from 'random-material-color';

const InsertButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const LeftSidebar: React.FC = () => {
  const { elements, setElements } = useElementsState(
    (state: ElementsState) => ({
      elements: state.elements,
      setElements: state.setElements,
    }),
  );

  return (
    <Sidebar>
      <Title>Insert</Title>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <InsertButton
          onClick={() => {
            setElements([
              ...elements,
              {
                id: (elements[elements.length - 1]?.id || 0) + 1,
                top: 0,
                left: 0,
                color: randomMC.getColor(),
              },
            ]);
          }}
        >
          <FiSquare color="white" size={35} />
        </InsertButton>
        <div style={{ width: 15 }} />
      </div>
    </Sidebar>
  );
};
