import React from 'react';
import { TextInputProps } from 'react-native';
import { InputContainer, Label, StyledTextInput, PlaceholderColor } from '../Base/styles';

interface InputProps extends TextInputProps {
  label: string;
  isFilled?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, isFilled, ...rest }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledTextInput 
        isFilled={isFilled}
        placeholderTextColor={isFilled ? '#666' : PlaceholderColor} 
        {...rest} 
      />
    </InputContainer>
  );
};
