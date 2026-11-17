const temas = {
  inatel: {
    '--cor-click':'#126ae2','--cor-sombra':'#0a599b','--cor-text':'#1b2430',
    '--cor-text-secondary':'#596a7d','--cor-back1':'#edf2f4','--cor-back2':'#6a937a',
    '--cor-surface':'#ffffff','--cor-surface-alt':'#f7f9fc','--cor-border':'#dce4ed',
    '--cor-shadow':'#152b451a','--cor-icon-bg':'#eaf2ff','--cor-on-primary':'#ffffff',
    '--md-sys-color-primary':'#126ae2','--md-sys-color-on-primary':'#ffffff',
    '--md-sys-color-primary-container':'#eaf2ff','--md-sys-color-on-primary-container':'#1b2430',
    '--frequencia':'#126ae2','--nota':'#126ae2','--prova':'#126ae2'
  },
  limao: {
    '--cor-click':'#526814','--cor-sombra':'#3d500f','--cor-text':'#263018',
    '--cor-text-secondary':'#5b6646','--cor-back1':'#f4f7e8','--cor-back2':'#e9efcf',
    '--cor-surface':'#ffffff','--cor-surface-alt':'#f8faef','--cor-border':'#d9e2bd',
    '--cor-shadow':'#3a48120f','--cor-icon-bg':'#edf2d8','--cor-on-primary':'#ffffff',
    '--md-sys-color-primary':'#526814','--md-sys-color-on-primary':'#ffffff',
    '--md-sys-color-primary-container':'#e9efcf','--md-sys-color-on-primary-container':'#263018',
    '--frequencia':'#526814','--nota':'#526814','--prova':'#526814'
  },
  dark: {
    '--cor-click':'#8ab8ff','--cor-sombra':'#b5d1f8','--cor-text':'#f2f5fa',
    '--cor-text-secondary':'#b7c2d0','--cor-back1':'#111827','--cor-back2':'#202d3e',
    '--cor-surface':'#1b2635','--cor-surface-alt':'#222f40','--cor-border':'#364458',
    '--cor-shadow':'#00000050','--cor-icon-bg':'#293c56','--cor-on-primary':'#142236',
    '--md-sys-color-primary':'#8ab8ff','--md-sys-color-on-primary':'#142236',
    '--md-sys-color-primary-container':'#293c56','--md-sys-color-on-primary-container':'#f2f5fa',
    '--frequencia':'#8ab8ff','--nota':'#8ab8ff','--prova':'#8ab8ff'
  }
};
function openMenu() { document.getElementById("menu_aba").style.display = "block"; }
function closeMenu() { document.getElementById("menu_aba").style.display = "none"; }
function aplicarTema(nome, salvar=true) {
  const escolha = temas[nome] ? nome : 'inatel';
  const root = document.documentElement;
  root.dataset.tema = escolha;
  for (const [variavel, valor] of Object.entries(temas[escolha])) root.style.setProperty(variavel, valor);
  document.querySelectorAll('[data-theme-option]').forEach(opcao => {
    opcao.classList.toggle('active-theme', opcao.dataset.themeOption === escolha);
    opcao.setAttribute('aria-pressed', String(opcao.dataset.themeOption === escolha));
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = escolha === 'dark' ? '#111827' : escolha === 'limao' ? '#526814' : '#126ae2';
  if (salvar) { try { localStorage.setItem('inatel-theme', escolha); } catch (_) {} }
}
function temaLim() { aplicarTema('limao'); }
function temaInatel() { aplicarTema('inatel'); }
function temaDark() { aplicarTema('dark'); }
try { aplicarTema(localStorage.getItem('inatel-theme') || 'inatel', false); } catch (_) { aplicarTema('inatel', false); }

const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

let index = 0;
function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

setInterval(nextCard, 5000);

let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

createCards();

// Componente Aulas
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.aulas = [
      { id: 1, disciplina: 'S05 - Interface Homem-máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: false, prova: '12/05', frequencia: '10/25', nota: '10' },
      { id: 2, disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '5' },
      { id: 3, disciplina: 'M02 - Álgebra e Geometria Analítica', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '7' }
    ];
    this.hoje = "ter"; 
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); 
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: var(--cor-surface); border:1px solid var(--cor-border); box-shadow:0 4px 14px var(--cor-shadow);
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 14px var(--cor-shadow);
      }
      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-weight: bold;
        font-size: 15px;
        color: var(--cor-text);
        padding: 0 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        font-family: "Arimo", sans-serif;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        padding: 0 5px;
      }
      .lables { display: flex; }
      .lable-prova { background-color: var(--prova); padding: 7px 15px; margin-bottom: 10px; border-radius: 500px; text-align: center; }
      .lable-frequencia { background-color: var(--frequencia); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota { background-color: var(--prova); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota-vermelho { background-color: #e53935; padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota-laranja { background-color: #fb8c00; padding: 7px 15px; margin-right: 10px; border-radius: 500px; color: white; }
      .lable-nota-verde { background-color: #43a047; padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .p_lable { font-family: "Arimo", sans-serif; font-size: 11px; color: var(--cor-on-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      </style>
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          const nota = Number(a.nota);
          const classeNota = nota < 6 ? 'lable-nota-vermelho' : nota < 8 ? 'lable-nota-laranja' : 'lable-nota-verde';
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable ${classeNota}">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
customElements.define('aulas-component', AulasComponent);

// RESERVA ARMÁRIO
const usuario = { nome: "Ana", matricula: "473", pendencia: false, acessibilidade: true };

const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

let tipoSelecionado = null;

document.querySelectorAll('.tipo').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.tipo').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    tipoSelecionado = div.dataset.value;
  });
});

function reservarArmario() {
  const resultado = document.getElementById("resultado");
  const armarioNumero = document.getElementById("armarioNumero");

  if (!tipoSelecionado) {
    resultado.innerText = "Por favor, selecione um tipo de armário antes de reservar.";
    armarioNumero.style.display = "none";
    return;
  }

  let armariosDisponiveis = armarios.filter(a => 
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );

  if (armariosDisponiveis.length === 0) {
    resultado.innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    armarioNumero.style.display = "none";
    return;
  }

  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString("pt-BR");

  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString("pt-BR");

  usuario.pendencia = true;

  armarioNumero.innerText = `Armário Nº ${armarioEmprestado.id}`;
  armarioNumero.style.display = "block";

  resultado.innerText = 
    `Data da reserva: ${armarioEmprestado.dataReserva}\n` +
    `Data de entrega: ${armarioEmprestado.dataEntrega}`;
}

