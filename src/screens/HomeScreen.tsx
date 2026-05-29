import { useState } from 'react';
import { Alert } from 'react-native';

import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { ResultDisplay } from '../components/ResultDisplay';

import * as S from './HomeScreen.styles';
import { InteractionTracker } from '../components/InteractionTracker';
import { calculateTDEE, Sex, ActivityLevel } from '../services/tdeeService';

export default function HomeScreen() {
  const [sex, setSex] = useState<Sex | ''>('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('');
  
  const [tdee, setTdee] = useState<number | null>(null);

  const sexOptions = [
    { label: "Selecione o sexo", value: "" },
    { label: "Masculino", value: "male" },
    { label: "Feminino", value: "female" },
  ];

  const activityOptions = [
    { label: "Selecione o nível de atividade", value: "" },
    { label: "Sedentário (pouco ou nenhum exercício)", value: "sedentary" },
    { label: "Levemente Ativo (1-3 dias/semana)", value: "lightly_active" },
    { label: "Moderadamente Ativo (3-5 dias/semana)", value: "moderately_active" },
    { label: "Muito Ativo (6-7 dias/semana)", value: "very_active" },
    { label: "Extremamente Ativo (trabalho físico ou treino 2x)", value: "extra_active" },
  ];

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    
    if (!weightNum || !heightNum || !ageNum || !sex || !activityLevel) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    const result = calculateTDEE({
      sex: sex as Sex,
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      activityLevel: activityLevel as ActivityLevel
    });

    setTdee(result);
  };

  return (
    <S.Container>
      <InteractionTracker>
        <S.Content>
          <S.Title>Calculadora de Gasto Energético Diário</S.Title>
          <S.Subtitle>Descubra quantas calorias seu corpo gasta por dia com base no seu metabolismo basal e nível de atividade física.</S.Subtitle>
          
          <Select
            label="Sexo"
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue as Sex | '')}
            options={sexOptions}
            isFilled={sex !== ''}
          />

          <Input
            label="Idade"
            placeholder="Ex: 25"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            isFilled={age.length > 0}
          />

          <Input
            label="Peso (kg)"
            placeholder="Ex: 75.5"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            isFilled={weight.length > 0}
          />

          <Input
            label="Altura (cm ou m)"
            placeholder="Ex: 175 ou 1.75"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            isFilled={height.length > 0}
          />

          <Select
            label="Nível de Atividade Física"
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue as ActivityLevel | '')}
            options={activityOptions}
            isFilled={activityLevel !== ''}
          />

          <Button onPress={handleCalculate}>
            Calcular Gasto Energético
          </Button>

          {tdee !== null && (
            <ResultDisplay 
              label="Seu Gasto Energético Total é:"
              value={`${Math.round(tdee)} kcal/dia`}
              description="Esta é a quantidade estimada de calorias que você queima por dia, considerando seu nível de atividade."
            />
          )}
        </S.Content>
      </InteractionTracker>
    </S.Container>
  );
}
