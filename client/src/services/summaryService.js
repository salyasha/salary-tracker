// Импортируем HTTP-клиент
import * as api from './api';

// Получить общий баланс за период
// Бэкенд: GET /api/v1/summary
export const getBalance = async (period) => {
  try {
    const response = await api.get('/summary', { period });
    return response;
  } catch (error) {
    console.error('Ошибка при получении баланса:', error);
    throw error;
  }
};

// Получить данные по категориям за период
// Бэкенд: GET /api/v1/summary/by-category
export const getByCategory = async (period, type) => {
  try {
    const response = await api.get('/summary/by-category', { period, type });
    return response;
  } catch (error) {
    console.error('Ошибка при получении данных по категориям:', error);
    throw error;
  }
};

// Получить помесячную сводку за период
// Бэкенд: GET /api/v1/summary/by-month
export const getMonthlySummary = async (period) => {
  try {
    const response = await api.get('/summary/by-month', { period });
    return response;
  } catch (error) {
    console.error('Ошибка при получении месячной сводки:', error);
    throw error;
  }
};