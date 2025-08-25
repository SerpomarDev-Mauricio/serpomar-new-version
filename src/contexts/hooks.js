// src/contexts/authHooks.js
import { useContext } from 'react';
import { AuthContext } from './constants'; // Importa el contexto creado

// Hooks Personalizados para Consumir el Contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
