import React from 'react';
import styled from 'styled-components';
import { Element } from './Element';
import { useRecoilValue } from 'recoil';
import { elementsIds } from './LeftSidebar';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC = () => {
  const elementsIdsList = useRecoilValue(elementsIds);
  console.log(elementsIdsList);

  return (
    <CanvasContainer>
      {elementsIdsList.map((elementId) => {
        return <Element key={elementId} id={elementId} />;
      })}
    </CanvasContainer>
  );
};
