import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { ColorPicker } from './ColorPicker';
import {
  useRecoilState,
  selector,
  useSetRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { selectedElementIdState, elementState, ElementState } from './Element';
import { elementsIds } from './LeftSidebar';

const InputLabel = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
`;

const Input = styled.input`
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 15px;
  padding: 10px;
  border: 0;
  width: 100%;
  outline: none;
  margin-bottom: 15px;
  color: #fff;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  padding: 12px 24px;
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: 0;
  color: white;
`;

const PropertyInput: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
}> = ({ label, value, onChange }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </>
  );
};

const selectedElementState = selector<ElementState | undefined>({
  key: 'selectedElement',
  get: ({ get }) => {
    const id = get(selectedElementIdState);

    if (id != null) {
      return get(elementState(id));
    }
  },
  set: ({ set, get }, newElementValue) => {
    const id = get(selectedElementIdState);

    if (id != null && newElementValue) {
      set(elementState(id), newElementValue);
    }
  },
});

const Properties: React.FC = () => {
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);
  const selectedId = useRecoilValue(selectedElementIdState);
  const setElementIds = useSetRecoilState(elementsIds);
  const removeSelectedElementState = useResetRecoilState(
    elementState(selectedId),
  );

  if (!selectedElement || !selectedId) return null;

  return (
    <div>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          setSelectedElement({
            ...selectedElement,
            color,
          });
        }}
      />
      <PropertyInput
        label="Top"
        value={selectedElement.top}
        onChange={(top) => {
          setSelectedElement({
            ...selectedElement,
            top,
          });
        }}
      />
      <PropertyInput
        label="Left"
        value={selectedElement.left}
        onChange={(left) => {
          setSelectedElement({
            ...selectedElement,
            left,
          });
        }}
      />
      <RemoveButton
        onClick={() => {
          setElementIds((elementIds) =>
            elementIds.filter((id) => id !== selectedId),
          );
          removeSelectedElementState();
        }}
      >
        Delete
      </RemoveButton>
    </div>
  );
};

export const RightSidebar: React.FC = () => {
  return (
    <Sidebar>
      <Properties />
    </Sidebar>
  );
};
