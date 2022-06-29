import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { elementsStore, ElementsStore } from './App';
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

const Properties: React.FC<{ store: ElementsStore }> = observer(({ store }) => {
  const selectedElement = store.elements.find(
    (element) => element.id === store.selectedElement,
  );

  if (!selectedElement) return null;

  return (
    <>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          store.setElementState({
            ...selectedElement,
            color,
          });
        }}
      />
      <PropertyInput
        label="Top"
        value={selectedElement.top}
        onChange={(top) => {
          store.setElementState({
            ...selectedElement,
            top,
          });
        }}
      />
      <PropertyInput
        label="Left"
        value={selectedElement.left}
        onChange={(left) => {
          store.setElementState({
            ...selectedElement,
            left,
          });
        }}
      />
      <RemoveButton
        onClick={() =>
          store.setElements(
            store.elements.filter((el) => el.id !== store.selectedElement),
          )
        }
      >
        Delete
      </RemoveButton>
    </>
  );
});

export const RightSidebar: React.FC = () => {
  return (
    <Sidebar>
      <Properties store={elementsStore} />
    </Sidebar>
  );
};
