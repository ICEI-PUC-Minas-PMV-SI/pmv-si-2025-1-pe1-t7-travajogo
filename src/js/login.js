/**
 * @fileoverview Script para gerenciamento de autenticação de usuários usando localStorage.
 * Este script inicializa um banco de dados simulado de usuários, valida credenciais de login
 * e gerencia o estado de usuário logado.
 */

/**
 * Inicializa o banco de dados de usuários no localStorage se ele ainda não existir.
 * Cria uma lista inicial com um usuário padrão.
 * @function initializeUsers
 */
function initializeUsers() {
  if (!localStorage.getItem("users")) {
    /** @type {Array<{name: string, email: string, password: string}>} */
    const initialUsers = [
      {
        name: "Jessica Santos",
        email: "jeehgasai@email.com",
        password: "teste@123",
      },
    ];

    localStorage.setItem("users", JSON.stringify(initialUsers));
  }
}

/**
 * Obtém a lista de usuários armazenada no localStorage.
 * @function getUsers
 * @returns {Array<{name: string, email: string, password: string}>} Lista de usuários ou array vazio se não houver usuários.
 */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

/**
 * Valida as credenciais de login de um usuário.
 * @function validateLogin
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {{success: boolean, message: string, user: {name: string, email: string, password: string}}} Objeto com o resultado da validação.
 */
function validateLogin(email, password) {
  if (!email || !password) {
    return { success: false, message: "Email e senha são obrigatórios." };
  }

  const users = getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return { success: false, message: "Usuário não encontrado." };
  }

  if (user.password !== password) {
    return { success: false, message: "Senha incorreta." };
  }

  return { success: true, user };
}

/**
 * Armazena as informações do usuário logado no localStorage.
 * @function setUserLoggedIn
 * @param {{name: string, email: string, password: string}} user - O objeto do usuário a ser armazenado.
 */
function setUserLoggedIn(user) {
  localStorage.setItem("userLoggedIn", JSON.stringify(user));
}

// Inicializa o banco de dados de usuários ao carregar o script.
initializeUsers();
