/**
 * Este script é responsável por gerenciar o estado de autenticação do usuário.
 * Pode ser importado em todos os arquivos HTML do projeto.
 */

/**
 * Esta função retorna o usuário logado atualmente.
 * @returns {Object|null} O usuário logado ou null se nenhum usuário estiver logado.
 */
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("userLoggedIn"));
}

/**
 * Esta função remove o usuário logado do localStorage e redireciona para
 * tela de login.
 */
function logout() {
  localStorage.removeItem("userLoggedIn");
  window.location.href = "login.html";
}
