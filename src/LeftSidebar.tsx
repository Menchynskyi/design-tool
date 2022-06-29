import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { FiSquare } from 'react-icons/fi';
import { atom, useSetRecoilState } from 'recoil';

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

export const elementsIds = atom<number[]>({
  key: 'elementsIds',
  default: [],
});

export const LeftSidebar: React.FC = () => {
  const setElementsIds = useSetRecoilState(elementsIds);

  return (
    <Sidebar>
      <Title>Insert</Title>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <InsertButton
          onClick={() => {
            setElementsIds((elementsIds) => [
              ...elementsIds,
              (elementsIds[elementsIds.length - 1] || 0) + 1,
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
