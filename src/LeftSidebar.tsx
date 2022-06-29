import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { FiSquare } from 'react-icons/fi';
import { ElementsStore } from './App';
import { observer } from 'mobx-react-lite';

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

export const LeftSidebar: React.FC<{ store: ElementsStore }> = observer(
  ({ store }) => {
    return (
      <Sidebar>
        <Title>Insert</Title>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <InsertButton onClick={store.createNewElement}>
            <FiSquare color="white" size={35} />
          </InsertButton>
          <div style={{ width: 15 }} />
        </div>
      </Sidebar>
    );
  },
);
