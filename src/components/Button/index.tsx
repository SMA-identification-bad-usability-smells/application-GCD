import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { StyledButtonContainer, StyledButtonText } from '../Base/styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <StyledButtonContainer {...rest}>
      <StyledButtonText>{children}</StyledButtonText>
    </StyledButtonContainer>
  );
};
