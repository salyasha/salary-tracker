import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../services/incomeService";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

// Контекст для данных
const DataContext = createContext(null);

/**
 * Хук для использования контекста данных
 * @returns {Object} Объект с данными и методами управления
 */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

/**
 * Провайдер контекста данных
 */
export const DataProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка данных при монтировании (теперь с await)
  useEffect(() => {
    const loadData = async () => {
      try {
        // Извлекаем массив .data из ответа API
        const incomesResponse = await getIncomes();
        const expensesResponse = await getExpenses();
        
        setIncomes(incomesResponse.data || []);
        setExpenses(expensesResponse.data || []);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Методы для доходов
  const handleAddIncome = async (incomeData) => {
    const response = await addIncome(incomeData);
    const newIncome = response.data;
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  const handleUpdateIncome = async (id, incomeData) => {
    const response = await updateIncome(id, incomeData);
    const updatedIncome = response.data;
    if (updatedIncome) {
      setIncomes((prev) =>
        prev.map((inc) => (inc.id === id ? updatedIncome : inc)),
      );
    }
    return updatedIncome;
  };

  const handleDeleteIncome = async (id) => {
    try {
      // Если ошибки нет, значит удаление прошло успешно
      await deleteIncome(id);
      setIncomes((prev) => prev.filter((inc) => inc.id !== id));
      return true;
    } catch (error) {
      console.error("Ошибка при удалении дохода:", error);
      return false;
    }
  };

  // Методы для расходов
  const handleAddExpense = async (expenseData) => {
    const response = await addExpense(expenseData);
    const newExpense = response.data;
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const handleUpdateExpense = async (id, expenseData) => {
    const response = await updateExpense(id, expenseData);
    const updatedExpense = response.data;
    if (updatedExpense) {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? updatedExpense : exp)),
      );
    }
    return updatedExpense;
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      return true;
    } catch (error) {
      console.error("Ошибка при удалении расхода:", error);
      return false;
    }
  };

  // Универсальные методы (теперь тоже асинхронные)
  const addTransaction = async (transactionData) => {
    if (transactionData.type === "income") {
      return await handleAddIncome(transactionData);
    } else {
      return await handleAddExpense(transactionData);
    }
  };

  const updateTransaction = async (id, transactionData) => {
    if (transactionData.type === "income") {
      return await handleUpdateIncome(id, transactionData);
    } else {
      return await handleUpdateExpense(id, transactionData);
    }
  };

  const deleteTransaction = async (id, type) => {
    if (type === "income") {
      return await handleDeleteIncome(id);
    } else {
      return await handleDeleteExpense(id);
    }
  };

  const value = {
    incomes,
    expenses,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};