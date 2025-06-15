// Seleciona os botões
const btnTelaInicial = document.querySelectorAll('.btn')[0];
const btnLogout = document.querySelectorAll('.btn')[1];

// Evento para botão Tela Inicial
btnTelaInicial.addEventListener('click', () => {
  window.location.href = 'index.html'; // Altere conforme necessário
});

// Evento para botão Logout
btnLogout.addEventListener('click', () => {
  const confirmar = confirm('Você realmente deseja sair?');
  if (confirmar) {
    window.location.href = 'login.html'; // Altere conforme necessário
  }
});

// Links úteis com URLs reais
const linksUteis = [
  {
    texto: 'Jogadores Anônimos - Brasil',
    url: 'https://jogadoresanonimos.com.br'
  },
  {
    texto: 'Gamblers Anonymous - Internacional',
    url: 'https://gamblersanonymous.org/international-meetings'
  }
];

// Aplicar comportamento nos links do HTML
document.querySelectorAll('.card a').forEach(link => {
  link.setAttribute('target', '_blank'); // Abrir em nova aba
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    console.log(`Usuário clicou no link: ${href}`);
  });
});

// Garantir que os links estão corretos (opcional: segurança ou fallback)
linksUteis.forEach(linkData => {
  const link = [...document.querySelectorAll('a')].find(a =>
    a.textContent.includes(linkData.texto)
  );
  if (link) {
    link.href = linkData.url;
    link.target = '_blank';
  }
});
