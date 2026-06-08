const API_URL = 'https://seashell-viper-936585.hostingersite.com';

let historico = [];
let chatAberto = false;
let saudacaoEnviada = false;

function criarWidget() {

  // CSS da animação
  if (!document.getElementById('dguardian-style')) {
    const style = document.createElement('style');
    style.id = 'dguardian-style';

    style.textContent = `
      @keyframes pulseGlow {
        0% {
          transform: scale(1);
          filter: drop-shadow(0 0 5px #ffdd00);
        }

        50% {
          transform: scale(1.08);
          filter: drop-shadow(0 0 20px #ffdd00);
        }

        100% {
          transform: scale(1);
          filter: drop-shadow(0 0 5px #ffdd00);
        }
      }
    `;

    document.head.appendChild(style);
  }

  const widget = document.createElement('div');

  widget.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  `;

  // Balão DÚVIDAS?
  const bubble = document.createElement('div');

  bubble.textContent = 'DÚVIDAS?';

  bubble.style.cssText = `
    background: #ffdd00;
    color: #000;
    font-weight: bold;
    font-size: 13px;
    padding: 8px 14px;
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(255,221,0,.7);
    animation: pulseGlow 2s infinite;
    cursor: pointer;
  `;

  bubble.onclick = toggleChat;

  // Logo principal
  const assistantIcon = document.createElement('img');

  assistantIcon.src = 'img/simb2.png'; // sua logo

  assistantIcon.alt = 'Assistente D-Guardian';

  assistantIcon.onclick = toggleChat;

  assistantIcon.style.cssText = `
    width: 90px;
    height: 90px;
    object-fit: contain;
    cursor: pointer;
    animation: pulseGlow 2s infinite;
  `;

  // Caixa do chat
  const chatBox = document.createElement('div');

  chatBox.id = "chat-box";

  chatBox.style.cssText = `
    display: none;
    position: fixed;
    bottom: 140px;
    right: 24px;
    z-index: 9999;
    width: 340px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    flex-direction: column;
    overflow: hidden;
  `;

  // Cabeçalho
  const header = document.createElement('div');

  header.style.cssText = `
    background: #000000;
    color: #ffdd00;
    padding: 14px 16px;
    font-weight: bold;
    font-size: 15px;
  `;

  header.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      gap:10px;
    ">
      <img
        src="img/simb2.png"
        style="
          width:32px;
          height:32px;
          object-fit:contain;
        "
      >
      <span>Pergunta ao ÁguIA</span>
    </div>
  `;

  // Área de mensagens
  const mensagens = document.createElement('div');

  mensagens.id = "chat-mensagens";

  mensagens.style.cssText = `
    height: 300px;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #f9f9f9;
  `;

  
  
  // Área de input
  const inputArea = document.createElement('div');

  inputArea.style.cssText = `
    padding: 10px;
    background: white;
    display: flex;
    gap: 8px;
    border-top: 1px solid #eee;
  `;

  const input = document.createElement('input');

  input.id = "chat-input";
  input.type = "text";
  input.placeholder = "Digite sua dúvida...";

  input.style.cssText = `
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
  `;

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      enviarMensagem();
    }
  });

  const sendBtn = document.createElement('button');

  sendBtn.textContent = "➤";

  sendBtn.onclick = enviarMensagem;

  sendBtn.style.cssText = `
    background: #000000;
    color: #ffdd00;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
    font-size: 16px;
  `;

  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);

  chatBox.appendChild(header);
  chatBox.appendChild(mensagens);
  chatBox.appendChild(inputArea);

  widget.appendChild(bubble);
  widget.appendChild(assistantIcon);

  document.body.appendChild(widget);
  document.body.appendChild(chatBox);
}

function toggleChat() {
  const box = document.getElementById('chat-box');
  chatAberto = !chatAberto;
  box.style.display = chatAberto ? 'flex' : 'none';

  if (chatAberto && historico.length === 0 && !saudacaoEnviada) {
    saudacaoEnviada = true;
    adicionarMensagem('bot', 'Digitando...');
    setTimeout(() => {
      const mensagens = document.getElementById('chat-mensagens');
      const lastMessage = mensagens.lastElementChild;
      if (lastMessage && lastMessage.textContent === 'Digitando...') {
        mensagens.removeChild(lastMessage);
        adicionarMensagem('bot', 'Olá! Sou o ÁguIA, seu assistente virtual. Em que posso ajudar?');

criarOpcoesRapidas();;
      }
    }, 2000);
  }
}

 // opçoes do menu rápido para dúvidas comuns, pode ser expandido conforme necessidade

function criarOpcoesRapidas() {

  const mensagens =
    document.getElementById('chat-mensagens');

  const container =
    document.createElement('div');

  container.style.cssText = `
  display:flex;
  flex-direction:column;
  gap:8px;
  margin-top:8px;
  width:100%;
`;
  const opcoes = [
    {
      titulo: '📹 Câmeras',
      mensagem:
        'Tenho interesse em câmeras de segurança.'
    },
    {
      titulo: '🚨 Alarmes',
      mensagem:
        'Tenho interesse em alarmes.'
    },
    {
      titulo: '⚡ Cercas',
      mensagem:
        'Tenho interesse em cercas elétricas.'
    },
    {
      titulo: '🔐 Controle',
      mensagem:
        'Tenho interesse em controle de acesso.'
    },
    {
      titulo: '🚓 Rondas',
      mensagem:
        'Tenho interesse em rondas preventivas.'
    },
    {
      titulo: '🛠️ Manutenção',
      mensagem:
        'Preciso de manutenção de equipamentos.'
    }
  ];

  opcoes.forEach(opcao => {

    const btn =
      document.createElement('button');

    btn.textContent = opcao.titulo;

    btn.style.cssText = `
  width:42%;
  background:#ffdd00;
  color:#000000;
  border:none;
  border-radius:8px;
  padding:8px 12px;
  cursor:pointer;
  font-size:13px;
  font-weight:600;
  text-align:left;
  box-shadow:0 2px 6px rgba(0,0,0,0.15);
  transition:all .2s ease;
  text-align:center;
  mouse:hover {
    background:#e6c500;
  }
`;

    btn.onclick = () => {

      const input =
        document.getElementById('chat-input');

      input.value =
        opcao.mensagem;

      enviarMensagem();

      container.remove();
    };

    container.appendChild(btn);

  });

  mensagens.appendChild(container);

}

function adicionarMensagem(tipo, texto) {
  const div = document.getElementById('chat-mensagens');
  const msg = document.createElement('div');
  msg.style.cssText = `
    padding:8px 12px; border-radius:10px; max-width:85%;
    word-wrap:break-word; font-size:14px; line-height:1.4;
    ${tipo === 'user'
      ? 'background:#000000; color:#ffdd00; align-self:flex-end;'
      : 'background:#ffdd00; color:#000000; align-self:flex-start; border:1px solid #e6c500;'}
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

    // 🔥 NOVA CAMADA (SEGURA, NÃO QUEBRA NADA)
    if (!res.ok) {

      if (res.status === 429) {
        adicionarMensagem(
          'bot',
          '⏳ Você atingiu o limite de mensagens. Aguarde alguns minutos e tente novamente.'
        );
        return;
      }

      adicionarMensagem(
        'bot',
        data.error || data.erro || 'Erro ao processar mensagem.'
      );
      return;
    }

    // fluxo normal (igual ao seu original)
    adicionarMensagem('bot', data.resposta);
    historico = data.historico;

  } catch (e) {
    const msgs = document.getElementById('chat-mensagens');
    msgs.removeChild(msgs.lastChild);
    adicionarMensagem('bot', 'Erro ao conectar. Tente novamente.');
  }
}

document.addEventListener('DOMContentLoaded', criarWidget);