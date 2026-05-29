import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #121214;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
})``;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #A8A8B3;
  margin-bottom: 24px;
  text-align: center;
  line-height: 20px;
`;
