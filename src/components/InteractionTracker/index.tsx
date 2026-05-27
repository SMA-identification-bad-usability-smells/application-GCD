import React, { useRef } from 'react';
import { GestureResponderEvent, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { useLogsApi, InteractionLog } from '../../hooks/useLogsApi';

const CaptureContainer = styled.View`
  flex: 1;
`;

interface InteractionTrackerProps extends ViewProps {
  children: React.ReactNode;
}

export const InteractionTracker: React.FC<InteractionTrackerProps> = ({ children, ...rest }) => {
  const { sendLogs } = useLogsApi();
  const logsQueue = useRef<InteractionLog[]>([]);

  const handleGlobalTouch = (event: GestureResponderEvent) => {
    const { pageX, pageY, target } = event.nativeEvent;
    const timestamp = new Date().toISOString();

    // Extrai apenas o ID para evitar referências circulares
    const targetId = typeof target === 'object' && target !== null 
      ? (target as any)._nativeTag || 'unknown' 
      : target;

    const newLog: InteractionLog = {
      type: 'press',
      timestamp,
      coordinates: { x: pageX, y: pageY },
      targetElementId: targetId,
    };

    logsQueue.current.push(newLog);

    if (logsQueue.current.length >= 5) {
      const batchToSend = [...logsQueue.current];
      logsQueue.current = [];
      sendLogs(batchToSend);
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
