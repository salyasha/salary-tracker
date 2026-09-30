// Импортируем HTTP-клиент
import * as api from './api';

// Получить список расходов с фильтрами и пагинацией
export const getExpenses = async (filters = {}) => {
  try {
    const response = await api.get('/expenses', filters);
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка расходов:', error);
    throw error;
  }
};

// Получить расход по ID
export const getExpenseById = async (id) => {
  try {
    const response = await api.get(`/expenses/${id}`);
    return response;
  } catch (error) {
    console.error('Ошибка при получении расхода:', error);
    throw error;
  }
};

// Добавить новый расход
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post('/expenses', expenseData);
    return response;
  } catch (error) {
    console.error('Ошибка при добавлении расхода:', error);
    throw error;
  }
};

// Обновить существующий расход
export const updateExpense = async (id, data) => {
  try {
    const response = await api.put(`/expenses/${id}`, data);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении расхода:', error);
    throw error;
  }
};

// Удалить расход
export const deleteExpense = async (id) => {
  try {
    await api.del(`/expenses/${id}`);
  } catch (error) {
    console.error('Ошибка при удалении расхода:', error);
    throw error;
  }
};