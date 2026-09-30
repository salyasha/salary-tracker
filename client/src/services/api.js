// Базовый URL из .env с префиксом API
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1` 
  : 'http://localhost:3001/api/v1';

// Вспомогательная функция для формирования query-строки в GET-запросах
const buildQueryString = (params) => {
  if (!params) return '';
  const searchParams = new URLSearchParams(params);
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

// Базовая функция для выполнения всех запросов
const request = async (path, options = {}) => {
  const { method = 'GET', body, params } = options;
  
  // Формируем полный URL
  const queryString = method === 'GET' ? buildQueryString(params) : '';
  const url = `${BASE_URL}${path}${queryString}`;

  // Настраиваем заголовки
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Парсим ответ
    const result = await response.json();

    // Если HTTP-статус не успешный или бэкенд вернул поле error, пробрасываем ошибку
    if (!response.ok || result.error) {
      const errorData = result.error || { code: 'HTTP_ERROR', message: 'Произошла ошибка сети или сервера' };
      throw new Error(errorData.message || `Ошибка HTTP: ${response.status}`);
    }

    // Возвращаем данные (data) и пагинацию, если она есть
    return {
      data: result.data,
      pagination: result.pagination || null,
    };
  } catch (error) {
    // Перехватываем ошибки сети и парсинга JSON
    console.error('API Request Error:', error);
    throw error;
  }
};

// Экспортируемые методы для использования в сервисах
export const get = (path, params) => request(path, { method: 'GET', params });
export const post = (path, body) => request(path, { method: 'POST', body });
export const put = (path, body) => request(path, { method: 'PUT', body });
export const del = (path) => request(path, { method: 'DELETE' });