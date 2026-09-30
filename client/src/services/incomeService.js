// Импортируем HTTP-клиент
import * as api from './api';

// Получить список доходов с фильтрами и пагинацией
export const getIncomes = async (filters = {}) => {
  try {
    const response = await api.get('/incomes', filters);
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка доходов:', error);
    throw error;
  }
};

// Получить доход по ID
export const getIncomeById = async (id) => {
  try {
    const response = await api.get(`/incomes/${id}`);
    return response;
  } catch (error) {
    console.error('Ошибка при получении дохода:', error);
    throw error;
  }
};

// Добавить новый доход
export const addIncome = async (incomeData) => {
  try {
    const response = await api.post('/incomes', incomeData);
    return response;
  } catch (error) {
    console.error('Ошибка при добавлении дохода:', error);
    throw error;
  }
};

// Обновить существующий доход
export const updateIncome = async (id, data) => {
  try {
    const response = await api.put(`/incomes/${id}`, data);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении дохода:', error);
    throw error;
  }
};

// Удалить доход
export const deleteIncome = async (id) => {
  try {
    await api.del(`/incomes/${id}`);
  } catch (error) {
    console.error('Ошибка при удалении дохода:', error);
    throw error;
  }
};