import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 20,
  },
})``;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const ResultContainer = styled.View`
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  align-items: center;
  border: 1px solid #eee;
`;

export const ResultLabel = styled.Text`
  font-size: 18px;
  color: #444;
`;

export const ResultValue = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
`;

export const ResultCategory = styled.Text`
  font-size: 20px;
  color: #555;
  margin-top: 5px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 10px;
  text-align: center;
`;
