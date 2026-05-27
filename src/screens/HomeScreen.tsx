import { useState } from 'react';

import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { DatePicker } from '../components/DatePicker';
import { Button } from '../components/Button';

import * as S from './HomeScreen.styles';
import { InteractionTracker } from '../components/InteractionTracker';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [activityLevel, setActivityLevel] = useState('sedentary');
  
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const activityOptions = [
    { label: "Sedentário", value: "sedentary" },
    { label: "Levemente Ativo", value: "lightly_active" },
    { label: "Moderadamente Ativo", value: "moderately_active" },
    { label: "Muito Ativo", value: "very_active" },
    { label: "Extremamente Ativo", value: "extra_active" },
  ];

  return (
    <S.Container>
      <InteractionTracker>
        <S.Content>
          <S.Title>Calculadora de IMC</S.Title>
          
          <Input
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />

          <DatePicker
            label="Data de Nascimento"
            placeholder="Ex: 01/01/2000"
            value={birthDate}
            onChange={setBirthDate}
          />

          <Select
            label="Nível de Atividade Física"
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue as string)}
            options={activityOptions}
          />

          <Input
            label="Peso (kg)"
            placeholder="Ex: 75.5"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          <Input
            label="Altura (m)"
            placeholder="Ex: 1.75"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <Button onPress={() => {}}>
            Calcular
          </Button>

          {bmi !== null && (
            <S.ResultContainer>
              <S.ResultLabel>Olá {name.split(' ')[0]}, seu IMC é:</S.ResultLabel>
              <S.ResultValue>{bmi.toFixed(2)}</S.ResultValue>
              <S.ResultCategory>{category}</S.ResultCategory>
              <S.InfoText>Atividade: {
                activityOptions.find(opt => opt.value === activityLevel)?.label
              }</S.InfoText>
            </S.ResultContainer>
          )}
        </S.Content>
      </InteractionTracker>
    </S.Container>
  );
}
