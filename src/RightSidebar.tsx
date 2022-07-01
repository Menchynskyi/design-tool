import React from 'react';
import { Sidebar, Title } from './ui';
import styled from 'styled-components';
import {
  elementsSubject,
  selectedElementIdSubject,
  selectedElementSubject,
} from './App';
import { ColorPicker } from './ColorPicker';
import { useObservableState } from 'observable-hooks';

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
  const selectedElementId = useObservableState(selectedElementIdSubject);
  const selectedElement = useObservableState(selectedElementSubject);

  if (!selectedElement) return null;

  return (
    <>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          elementsSubject.next(
            elementsSubject.value.map((el) => {
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
          elementsSubject.next(
            elementsSubject.value.map((el) => {
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
          elementsSubject.next(
            elementsSubject.value.map((el) => {
              if (el.id === selectedElement.id) {
                return { ...el, left };
              } else {
                return el;
              }
            }),
          );
        }}
      />
      <RemoveButton
        onClick={() =>
          elementsSubject.next(
            elementsSubject.value.filter((el) => el.id !== selectedElementId),
          )
        }
      >
        Delete
      </RemoveButton>
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
