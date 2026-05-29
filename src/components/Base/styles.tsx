import styled from 'styled-components/native';
import { Pressable } from 'react-native';

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #E1E1E6;
  margin-bottom: 8px;
`;

export const PlaceholderColor = '#7C7C8A';

export const StyledTextInput = styled.TextInput<{ isFilled?: boolean }>`
  width: 100%;
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E1E1E6;
  font-size: 16px;
  color: #000000;
  padding: 12px;
`;

export const InputWrapper = styled.View<{ isFilled?: boolean }>`
  width: 100%;
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E1E1E6;
  justify-content: center;
  overflow: hidden;
`;

export const StyledButtonContainer = styled(Pressable)<{ isHovered?: boolean }>`
  width: 100%;
  height: 50px;
  background-color: ${({ isHovered }) => isHovered ? '#042A23' : '#29E0A9'};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border: 1px solid #323238;
`;

export const StyledButtonText = styled.Text<{ isHovered?: boolean }>`
  color: ${({ isHovered }) => isHovered ? '#FFFFFF' : '#000000'};
  font-size: 18px;
  font-weight: bold;
`;
