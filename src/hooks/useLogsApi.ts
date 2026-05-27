import { useCallback } from 'react';
import api from '../services/api';
import axios from 'axios';

export interface InteractionLog {
  type: string;
  timestamp: string;
  coordinates: { x: number; y: number };
  targetElementId: number | string;
}

export const useLogsApi = () => {
  const sendLogs = useCallback(async (logs: InteractionLog[]) => {
    try {
      console.log(`[API] Enviando lote de ${logs.length} logs...`);
      
      const response = await api.post('/api/logs/', {
        content: `${logs}`,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('[API SUCCESS] Logs enviados com sucesso.');
        return true;
      }
      
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('[API ERROR] Erro na requisição:', error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dados:', error.response.data);
        }
      } else {
        console.error('[API ERROR] Erro inesperado:', error);
      }
      return false;
    }
  }, []);

  return { sendLogs };
};
