import React from 'react';
import { TextInputProps } from 'react-native';
import { InputContainer, Label, StyledTextInput, PlaceholderColor } from '../Base/styles';

interface InputProps extends TextInputProps {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledTextInput 
        placeholderTextColor={PlaceholderColor} 
        {...rest} 
      />
    </InputContainer>
  );
};
