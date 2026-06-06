const API_URL = 'https://seashell-viper-936585.hostingersite.com';

let historico = [];
let chatAberto = false;

function criarWidget() {
  const widget = document.createElement('div');

  // Botão do chat
  const chatBtn = document.createElement('div');
  chatBtn.id = "chat-btn";
  chatBtn.textContent = "💬";
  chatBtn.onclick = toggleChat;
  chatBtn.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:#e63946; color:white; border-radius:50%;
    width:60px; height:60px; display:flex; align-items:center;
    justify-content:center; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3);
    font-size:26px;
  `;

  // Caixa do chat
  const chatBox = document.createElement('div');
  chatBox.id = "chat-box";
  chatBox.style.cssText = `
    display:none; position:fixed; bottom:96px; right:24px; z-index:9999;
    width:320px; background:white; border-radius:16px;
    box-shadow:0 8px 32px rgba(0,0,0,0.2); flex-direction:column; overflow:hidden;
  `;

  // Cabeçalho
  const header = document.createElement('div');
  header.textContent = "🔒 Assistente de Segurança";
  header.style.cssText = "background:#e63946; color:white; padding:14px 16px; font-weight:bold; font-size:15px;";

  // Área de mensagens
  const mensagens = document.createElement('div');
  mensagens.id = "chat-mensagens";
  mensagens.style.cssText = `
    height:300px; overflow-y:auto; padding:12px;
    display:flex; flex-direction:column; gap:8px; background:#f9f9f9;
  `;

  // Área de input
  const inputArea = document.createElement('div');
  inputArea.style.cssText = "padding:10px; background:white; display:flex; gap:8px; border-top:1px solid #eee;";

  const input = document.createElement('input');
  input.id = "chat-input";
  input.type = "text";
  input.placeholder = "Digite sua dúvida...";
  input.style.cssText = "flex:1; padding:8px 12px; border:1px solid #ddd; border-radius:8px; outline:none; font-size:14px;";
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") enviarMensagem();
  });

  const sendBtn = document.createElement('button');
  sendBtn.textContent = "➤";
  sendBtn.onclick = enviarMensagem;
  sendBtn.style.cssText = "background:#e63946; color:white; border:none; border-radius:8px; padding:8px 14px; cursor:pointer; font-size:16px;";

  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);

  // Montagem final
  chatBox.appendChild(header);
  chatBox.appendChild(mensagens);
  chatBox.appendChild(inputArea);

  widget.appendChild(chatBtn);
  widget.appendChild(chatBox);

  document.body.appendChild(widget);
}


function toggleChat() {
  const box = document.getElementById('chat-box');
  chatAberto = !chatAberto;
  box.style.display = chatAberto ? 'flex' : 'none';

  if (chatAberto && historico.length === 0) {
    adicionarMensagem('bot', 'Olá! 👋 Como posso ajudar com sua segurança hoje?');
  }
}

function adicionarMensagem(tipo, texto) {
  const div = document.getElementById('chat-mensagens');
  const msg = document.createElement('div');
  msg.style.cssText = `
    padding:8px 12px; border-radius:10px; max-width:85%;
    word-wrap:break-word; font-size:14px; line-height:1.4;
    ${tipo === 'user'
      ? 'background:#e63946; color:white; align-self:flex-end;'
      : 'background:white; color:#333; align-self:flex-start; border:1px solid #eee;'}
  `;
  msg.textContent = texto;
  div.appendChild(msg);
  div.scrollTop = div.scrollHeight;
}

async function enviarMensagem() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem('user', texto);
  input.value = '';
  adicionarMensagem('bot', '...');

  try {
    const res = await fetch(`${API_URL}/mensagem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem: texto, historico }),
    });

    const data = await res.json();

    const msgs = document.getElementById('chat-mensagens');
    msgs.removeChild(msgs.lastChild);

    adicionarMensagem('bot', data.resposta);
    historico = data.historico;

  } catch (e) {
    const msgs = document.getElementById('chat-mensagens');
    msgs.removeChild(msgs.lastChild);
    adicionarMensagem('bot', 'Erro ao conectar. Tente novamente.');
  }
}

document.addEventListener('DOMContentLoaded', criarWidget);