// Espera o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {

  // Referências para os elementos do formulário
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const confirmarInput = document.getElementById('confirmar');
  const dataInput = document.getElementById('data');
  const gastoInput = document.getElementById('gasto');
  const contadorInput = document.getElementById('contador');
  const submitBtn = document.querySelector('.submit-btn');
  
  // Função para validar se as senhas são iguais
  function validarSenhas() {
    return senhaInput.value === confirmarInput.value;
  }

  // Função para verificar se todos os campos obrigatórios estão preenchidos
  function validarCampos() {
    return nomeInput.value !== '' && emailInput.value !== '' && senhaInput.value !== '' && confirmarInput.value !== '';
  }

  // Função para salvar os dados no localStorage
  function salvarCadastro() {
    // Checa se todos os campos obrigatórios estão preenchidos
    if (!validarCampos()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Checa se as senhas são iguais
    if (!validarSenhas()) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    // Cria um objeto com os dados do formulário
    const novoUsuario = {
      name: nomeInput.value,
      email: emailInput.value,
      password: senhaInput.value,
      dataInicio: dataInput.value || null, // Pode ser null se não informado
      gasto: gastoInput.value,
      contadorAtivo: contadorInput.checked
    };
    // Recupera os usuários existentes do localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Adiciona o novo usuário ao array de usuários
    users.push(novoUsuario);
    // Salva o array de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Limpa os campos após o cadastro
  nomeInput.value = '';
  emailInput.value = '';
  senhaInput.value = '';
  confirmarInput.value = '';
  dataInput.value = '';
  gastoInput.value = '';
  contadorInput.checked = false;
    
    // Alerta de sucesso e redirecionamento ou atualização da página
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Substitua por uma URL de tela inicial ou login
  }

  // Adiciona o evento de clique no botão "Criar minha conta"
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário
    salvarCadastro();
  });

  // Função para carregar os dados se já existirem no localStorage (para um futuro login ou redirecionamento)
  function carregarDados() {
    const usuarioStored = localStorage.getItem('users');
    if (usuarioStored) {
      const users = JSON.parse(usuarioStored);
      nomeInput.value = users[0].nome; // Acesse o primeiro usuário da lista
      emailInput.value = users[0].email;
      gastoInput.value = users[0].gasto;
      dataInput.value = users[0].dataInicio || '';
      contadorInput.checked = users[0].contadorAtivo;
    }
  }

  // Carrega os dados armazenados se já houver
 // carregarDados();

  // **Parte para navegação (botões "Tela Inicial" e "Login")**
  // Navegar para a Tela Inicial  
document.getElementById('tela-inicial').addEventListener('click', function() {
  window.location.href = 'index.html'; // Redirecionar para a tela inicial ou home
});
  
 // Navegar para a Tela de Login
document.getElementById('login-btn').addEventListener('click', function() {
  window.location.href = 'login.html'; // Redirecionar para a tela de login
});

});
