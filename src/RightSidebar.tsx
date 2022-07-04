import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { useElementStore } from './App';
import { ColorPicker } from './ColorPicker';
import { observer } from 'mobx-react-lite';

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

const Properties = observer(() => {
  const { editElement, selectedElement, removeSelectedElement } =
    useElementStore();

  if (!selectedElement) return null;

  return (
    <>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          editElement({
            ...selectedElement,
            color,
          });
        }}
      />
      <PropertyInput
        label="Top"
        value={selectedElement.top}
        onChange={(top) => {
          editElement({
            ...selectedElement,
            top,
          });
        }}
      />
      <PropertyInput
        label="Left"
        value={selectedElement.left}
        onChange={(left) => {
          editElement({
            ...selectedElement,
            left,
          });
        }}
      />
      <RemoveButton onClick={removeSelectedElement}>Delete</RemoveButton>
    </>
  );
});

export const RightSidebar: React.FC = () => {
  return (
    <Sidebar>
      <Properties />
    </Sidebar>
  );
};
