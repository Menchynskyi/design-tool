import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import { ElementsState, useElementsState, Element } from './App';
import { ColorPicker } from './ColorPicker';

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

const Properties: React.FC = () => {
  const { elements, setElements, selectedElementId, removeSelectedElement } =
    useElementsState((state: ElementsState) => ({
      elements: state.elements,
      setElements: state.setElements,
      selectedElementId: state.selectedElement,
      removeSelectedElement: state.removeSelectedElement,
    }));

  const selectedElement = elements.find(
    (element: Element) => element.id === selectedElementId,
  );

  if (!selectedElement) return null;

  return (
    <>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          setElements(
            elements.map((el: Element) => {
              if (el.id === selectedElement.id) {
                return { ...el, color };
              } else {
                return el;
              }
            }),
          );
        }}
      />
      <PropertyInput
        label="Top"
        value={selectedElement.top}
        onChange={(top) => {
          setElements(
            elements.map((el: Element) => {
              if (el.id === selectedElement.id) {
                return { ...el, top };
              } else {
                return el;
              }
            }),
          );
        }}
      />
      <PropertyInput
        label="Left"
        value={selectedElement.left}
        onChange={(left) => {
          setElements(
            elements.map((el: Element) => {
              if (el.id === selectedElement.id) {
                return { ...el, left };
              } else {
                return el;
              }
            }),
          );
        }}
      />
      <RemoveButton onClick={removeSelectedElement}>Delete</RemoveButton>
    </>
  );
};

export const RightSidebar: React.FC = () => {
  return (
    <Sidebar>
      <Properties />
    </Sidebar>
  );
};
