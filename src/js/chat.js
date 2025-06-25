const userList = document.getElementById("userList");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatHeader = document.getElementById("chatHeader");

let currentUserId = null;
let conversations = {};
let currentScriptIndex = 0;

const user1Script = [
  { sender: "you", text: "Olá" },
  { sender: "user1", text: "Olá tudo bem?" },
  { sender: "you", text: "Tudo e você?" },
  { sender: "user1", text: "Nem tanto, esse vício tá acabando comigo..." },
  { sender: "you", text: "Imagino, pra mim também não está fácil" },
  { sender: "user1", text: "Qual o seu problema?" },
  { sender: "you", text: "Aposta em futebol e o seu?" },
  { sender: "user1", text: 'O famoso "tigrinho"' },
  { sender: "you", text: "Sinto muito amigo, esses negócios são um câncer" },
  { sender: "user1", text: "Nem fala, já perdi mais de 5.000 reais" },
  { sender: "you", text: "Você vai se recuperar" },
  { sender: "user1", text: "Tomara que sim..." },
  { sender: "you", text: "Vou nessa, boa sorte" },
  { sender: "user1", text: "Pra você também" },
];

const user2Script = [
  { sender: "you", text: "Opa" },
  { sender: "user2", text: "Eai" },
  { sender: "you", text: "Qual o seu nome?" },
  { sender: "user2", text: "Prefiro não dizer... sou só mais um viciado" },
  { sender: "you", text: "E qual é o seu vício?" },
  { sender: "user2", text: "Aqueles cassinos online" },
  { sender: "you", text: "Tipo blaze?" },
  { sender: "user2", text: "Exatamente ela, tirou tudo de mim, carro, casa..." },
  { sender: "you", text: "Putz, sinto muito" },
  { sender: "user2", text: "Obrigado, e você, o que faz aqui?" },
  { sender: "you", text: "Só procurando alguém pra bater um papo" },
  { sender: "user2", text: "Num site de ajuda à viciados em bet? kkkkk" },
  { sender: "you", text: "Falando assim até soa estranho, também tô procurando ajuda" },
  { sender: "user2", text: "E qual o seu vício?" },
  { sender: "you", text: "Aposta em futebol, eu achei que sabia tudo.." },
  { sender: "user2", text: "Tenho uns amigos assim, é bem triste mesmo" },
  { sender: "you", text: "É, mas enfim. Valeu papo. Boa sorte pra nós" },
  { sender: "user2", text: "Flw" },
];

const user3Script = [
  { sender: "you", text: "Ei, tudo bem com você?" },
  { sender: "user3", text: "Ah... não muito. Na verdade, tá bem difícil." },
  { sender: "you", text: "Difícil como? O que está acontecendo?" },
  { sender: "user3", text: "É que eu não consigo parar com as apostas. Sempre penso que dessa vez vou recuperar o dinheiro que perdi, mas no final sempre acabo pior." },
  { sender: "you", text: "Poxa, isso que você tá passando é muito sério. Já pensou em procurar ajuda?" },
  { sender: "user3", text: "Às vezes penso, mas eu fico com vergonha, sabe? Parece que eu deveria conseguir parar sozinho." },
  { sender: "you", text: "Não precisa lidar com isso sozinho. Muitas pessoas passam por situações assim, e existem recursos pra ajudar, como grupos de apoio e profissionais especializados. Não há vergonha nenhuma em pedir ajuda." },
  { sender: "user3", text: "Você acha mesmo?" },
  { sender: "you", text: "Com certeza. Admitir que precisa de ajuda é o primeiro passo, e já é um ato de coragem. Eu tô aqui pra você se precisar conversar, tá? E juntos podemos procurar alguma ajuda." },
  { sender: "user3", text: "Valeu... Acho que preciso mesmo fazer algo antes que piore." },
  { sender: "you", text: "É isso aí. Qualquer coisa, me chama. Não enfrenta isso sozinho!" },
];

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

function renderUserList() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "user-item";
    if (user.id === currentUserId) userItem.classList.add("active");
    userItem.innerHTML = `
      <i class="bi bi-person-circle user-icon"></i>
      <span>${user.name}</span>
    `;
    userItem.addEventListener("click", () => selectUser(user.id));
    userList.appendChild(userItem);
  });
}

function selectUser(userId) {
  currentUserId = userId;
  chatHeader.innerText = users.find((user) => user.id === userId).name;
  currentScriptIndex = 0;
  renderMessages();
}

function renderMessages() {
  messages.innerHTML = "";
  if (!conversations[currentUserId]) {
    conversations[currentUserId] = [];
  }

  conversations[currentUserId].forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${msg.sender === "you" ? "sent" : "received"}`;
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerText = msg.text;
    messageDiv.appendChild(bubble);
    messages.appendChild(messageDiv);
  });

  messages.scrollTop = messages.scrollHeight;
}

function getCurrentScript() {
  switch (currentUserId) {
    case 1:
      return user1Script;
    case 2:
      return user2Script;
    case 3:
      return user3Script;
    default:
      return [];
  }
}

function sendMessage() {
  if (!currentUserId) return;

  const script = getCurrentScript();
  if (currentScriptIndex >= script.length) return;

  const userMessage = script[currentScriptIndex];
  if (userMessage.sender === "you") {
    conversations[currentUserId].push(userMessage);
    renderMessages();
    currentScriptIndex++;
  }

  setTimeout(() => {
    if (currentScriptIndex < script.length) {
      const userResponse = script[currentScriptIndex];
      if (userResponse.sender !== "you") {
        conversations[currentUserId].push(userResponse);
        renderMessages();
        currentScriptIndex++;
      }
    }
  }, 1000);

  messageInput.value = "";
}

function clearChatData() {
  conversations = {};
  currentScriptIndex = 0;
  renderMessages();
  alert("O cache foi limpado com sucesso!");
}

function goBack() {
  window.location.href = "index.html";
}

function goToExpensePanel() {
  window.location.href = "painel-de-gastos.html";
}

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

document.addEventListener("DOMContentLoaded", () => renderUserList());
