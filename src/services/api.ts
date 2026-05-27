import axios from 'axios';
import { Platform } from 'react-native';

/**
 * Configuração da URL base para ambiente local:
 * - Emulador Android: 10.0.2.2
 * - iOS Simulator / Web / Outros: localhost
 */
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
