import React, { useState } from 'react';
import { PressableProps } from 'react-native';
import { StyledButtonContainer, StyledButtonText } from '../Base/styles';

interface ButtonProps extends PressableProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledButtonContainer 
      {...rest}
      isHovered={isHovered}
      // @ts-ignore - Propriedades específicas para Web
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledButtonText isHovered={isHovered}>{children}</StyledButtonText>
    </StyledButtonContainer>
  );
};
