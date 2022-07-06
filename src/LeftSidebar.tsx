import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { FiSquare, FiGift } from 'react-icons/fi';
import { observer } from 'mobx-react-lite';
import { useElementStore, useFactStore } from './App';

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

const FactBlock = styled.div`
  padding-right: 20px;
  margin-top: 20px;
`;

export const LeftSidebar = observer(() => {
  const { createNewElement } = useElementStore();
  const { loading, getRandomFact, randomFact } = useFactStore();

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
        <InsertButton onClick={createNewElement}>
          <FiSquare color="white" size={35} />
        </InsertButton>
        <InsertButton
          disabled={loading}
          style={{ marginLeft: '12px' }}
          onClick={getRandomFact}
        >
          <FiGift color="white" size={35} />
        </InsertButton>
        <div style={{ width: 15 }} />
      </div>
      <FactBlock>
        <span>{loading ? 'Generating useless fact...' : randomFact}</span>
      </FactBlock>
    </Sidebar>
  );
});
