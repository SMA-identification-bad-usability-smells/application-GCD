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
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const extractTargetId = (target: any) => {
    return typeof target === 'object' && target !== null 
      ? target._nativeTag || 'unknown' 
      : target;
  };

  const addLog = (log: InteractionLog) => {
    console.log(log);

    logsQueue.current.push(log);

    if (logsQueue.current.length >= 5) {
      const batchToSend = [...logsQueue.current];
      logsQueue.current = [];
      sendLogs(batchToSend);
    }
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { pageX, pageY, target } = event.nativeEvent;
    const timestamp = new Date().toISOString();
    const targetId = extractTargetId(target);

    touchStartPos.current = { x: pageX, y: pageY };

    const newLog: InteractionLog = {
      type: 'press',
      timestamp,
      coordinates: { x: pageX, y: pageY },
      targetElementId: targetId,
    };

    addLog(newLog);

    return false;
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (!touchStartPos.current) return;

    const { pageX, pageY, target } = event.nativeEvent;
    const deltaX = pageX - touchStartPos.current.x;
    const deltaY = pageY - touchStartPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Consideramos um gesto de arrasto se o deslocamento for maior que 20 pixels
    if (distance > 20) {
      const timestamp = new Date().toISOString();
      const targetId = extractTargetId(target);
      
      let direction: 'up' | 'down' | 'left' | 'right';
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      const dragLog: InteractionLog = {
        type: 'drag',
        timestamp,
        coordinates: touchStartPos.current,
        targetElementId: targetId,
        direction,
      };

      addLog(dragLog);
    }

    touchStartPos.current = null;
  };

  return (
    <CaptureContainer
      onStartShouldSetResponderCapture={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStartPos.current = null; }}
      {...rest}
    >
      {children}
    </CaptureContainer>
  );
};
