import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { InputContainer, Label, InputWrapper, PlaceholderColor } from '../Base/styles';

const DateButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: center;
`;

const DateButtonText = styled.Text<{ isPlaceholder: boolean }>`
  font-size: 16px;
  color: ${props => props.isPlaceholder ? PlaceholderColor : '#333'};
`;

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, placeholder = "Selecione a data" }) => {
  const [show, setShow] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper>
        <DateButton onPress={() => setShow(true)} activeOpacity={0.7}>
          <DateButtonText isPlaceholder={!value}>
            {value ? value.toLocaleDateString('pt-BR') : placeholder}
          </DateButtonText>
        </DateButton>
      </InputWrapper>
      
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </InputContainer>
  );
};
