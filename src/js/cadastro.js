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
    return nomeInput.value.trim() !== '' && emailInput.value.trim() !== '' && senhaInput.value.trim() !== '' && confirmarInput.value.trim() !== '';
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
    };

    // Recupera os usuários existentes do localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o email já foi cadastrado
    if (users.some(user => user.email === novoUsuario.email)) {
        alert('Este endereço de e-mail já está em uso. Por favor, utilize outro.');
        return;
    }

    users.push(novoUsuario);
    // Salva o array de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Remove todos os caracteres não numéricos e converte para o valor correto, para salvar valor
    // no campo de gasto médio diário caso preenchido ao cadastrar
    const gastoValorLimpo = gastoInput.value.replace(/[^\d]/g, '');
    const gastoNumerico = parseFloat(gastoValorLimpo) / 100 || 0.0;

    // Cria o objeto de dados inicial para o painel do usuário com o valor correto
    const initialUserData = {
      transactions: [],
      sobrietyStartDate: dataInput.value || null,
      dailyAverageSpending: gastoNumerico // Agora 'gastoNumerico' terá o valor correto
    };

    // Salva os dados iniciais com uma chave única baseada no email do usuário
    localStorage.setItem(`userData_${novoUsuario.email}`, JSON.stringify(initialUserData));

    // Limpa os campos após o cadastro
    nomeInput.value = '';
    emailInput.value = '';
    senhaInput.value = '';
    confirmarInput.value = '';
    dataInput.value = '';
    gastoInput.value = 'R$ 0,00';
    contadorInput.checked = true;
    
    // Alerta de sucesso e redirecionamento ou atualização da página
    alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
    window.location.href = 'login.html'; // Substitua por uma URL de tela inicial ou login
  }

  // Adiciona o evento de clique no botão "Criar minha conta"
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário
    salvarCadastro();
  });
  
  gastoInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value === '') {
      e.target.value = 'R$ 0,00';
      return;
    }
    value = (parseInt(value, 10) / 100).toFixed(2);
    e.target.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  });
  
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