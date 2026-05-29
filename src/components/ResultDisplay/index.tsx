import React from 'react';
import * as S from './styles';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  description?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, description }) => {
  return (
    <S.ResultContainer>
      <S.ResultLabel>{label}</S.ResultLabel>
      <S.ResultValue>{value}</S.ResultValue>
      {description && <S.InfoText>{description}</S.InfoText>}
    </S.ResultContainer>
  );
};
