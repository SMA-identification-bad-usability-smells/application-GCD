import React from 'react';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { InputContainer, Label, InputWrapper } from '../Base/styles';

interface Option {
  label: string;
  value: string;
}

interface SelectProps<T = string | number> extends PickerProps<T> {
  label: string;
  options: Option[];
}

export function Select<T extends string | number>({ label, options, ...rest }: SelectProps<T>) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper>
        <Picker
          {...rest}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 0,
            backgroundColor: '#fff',
            color: '#333',
          }}>
          {options.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value as any} 
              style={{ fontSize: 16 }}
            />
          ))}
        </Picker>
      </InputWrapper>
    </InputContainer>
  );
}
