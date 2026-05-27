import React, { useRef } from 'react';
import { GestureResponderEvent, ViewProps } from 'react-native';
import styled from 'styled-components/native';

const CaptureContainer = styled.View`
  flex: 1;
`;

interface InteractionLog {
  type: string;
  timestamp: string;
  coordinates: { x: number; y: number };
  targetElementId: number | string;
}

interface InteractionTrackerProps extends ViewProps {
  children: React.ReactNode;
}

// URL da API a ser definida posteriormente
const API_URL = 'https://sua-api-aqui.com/v1/logs';

export const InteractionTracker: React.FC<InteractionTrackerProps> = ({ children, ...rest }) => {
  const logsQueue = useRef<InteractionLog[]>([]);

  const sendLogsToApi = async (logsToSend: InteractionLog[]) => {
    try {
      console.log(`[API] Enviando lote de ${logsToSend.length} logs para ${API_URL}...`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceInfo: {
            platform: 'mobile', // Podemos expandir isso depois
          },
          logs: logsToSend,
        }),
      });

      if (response.ok) {
        console.log('[API SUCCESS] Lote de logs enviado com sucesso.');
      } else {
        console.warn(`[API WARNING] Falha ao enviar logs. Status: ${response.status}`);
        // Opcional: Aqui poderíamos re-adicionar os logs à fila ou salvar localmente para tentar depois
      }
    } catch (error) {
      console.error('[API ERROR] Erro de rede ao enviar logs:', error);
    }
  };

  const handleGlobalTouch = (event: GestureResponderEvent) => {
    const { pageX, pageY, target } = event.nativeEvent;
    const timestamp = new Date().toISOString();

    const newLog: InteractionLog = {
      type: 'press',
      timestamp,
      coordinates: { x: pageX, y: pageY },
      targetElementId: target,
    };

    logsQueue.current.push(newLog);

    // Se atingir 5 itens, envia para a API e limpa a fila
    if (logsQueue.current.length >= 5) {
      const batchToSend = [...logsQueue.current];
      logsQueue.current = []; // Limpa a fila
      sendLogsToApi(batchToSend);
    }

    return false;
  };

  return (
    <CaptureContainer
      onStartShouldSetResponderCapture={handleGlobalTouch}
      {...rest}
    >
      {children}
    </CaptureContainer>
  );
};
