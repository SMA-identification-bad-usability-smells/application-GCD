import React from 'react';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { InputContainer, Label, InputWrapper, PlaceholderColor } from '../Base/styles';

interface Option {
  label: string;
  value: string;
}

interface SelectProps<T = string | number> extends PickerProps<T> {
  label: string;
  options: Option[];
  isFilled?: boolean;
}

export function Select<T extends string | number>({ label, options, isFilled, ...rest }: SelectProps<T>) {
  const textColor = isFilled ? '#000000' : '#757575';
  
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper isFilled={isFilled}>
        <Picker
          {...rest}
          mode="dropdown"
          style={{
            width: '100%',
            height: 50,
            color: textColor,
            backgroundColor: '#FFFFFF',
            // @ts-ignore - Suporte para remover outline no Web
            outline: 'none',
          }}
          dropdownIconColor={textColor}>
          {options.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value as any} 
              color="#000000"
              style={{ 
                fontSize: 16, 
                backgroundColor: '#FFFFFF',
              }}
            />
          ))}
        </Picker>
      </InputWrapper>
    </InputContainer>
  );
}
