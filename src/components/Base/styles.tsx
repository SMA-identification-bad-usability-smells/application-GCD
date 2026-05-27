import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

export const PlaceholderColor = '#999';

export const BaseInputStyles = `
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #333;
`;

export const StyledTextInput = styled.TextInput`
  ${BaseInputStyles}
  padding: 10px;
`;

export const InputWrapper = styled.View`
  ${BaseInputStyles}
  justify-content: center;
  overflow: hidden;
`;

export const StyledButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #007bff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const StyledButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
