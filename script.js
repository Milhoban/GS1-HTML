// Função para salvar viagem no LocalStorage
function salvarViagemNoLocalStorage(viagem) {
  // Obtém as viagens armazenadas no LocalStorage (ou cria um array vazio se não existir)
  const viagensArmazenadas = JSON.parse(localStorage.getItem('viagens')) || [];

  // Adiciona a nova viagem ao array
  viagensArmazenadas.push(viagem);

  // Atualiza o LocalStorage com o array atualizado
  localStorage.setItem('viagens', JSON.stringify(viagensArmazenadas));
}

// Função para obter viagens do LocalStorage
function getViagensDoLocalStorage() {
  // Obtém as viagens armazenadas no LocalStorage (ou um array vazio se não existir)
  const viagensArmazenadas = JSON.parse(localStorage.getItem('viagens')) || [];
  return viagensArmazenadas;
}

// Função para remover viagem do LocalStorage
function removerViagemDoLocalStorage(idViagem) {
  // Obtém as viagens armazenadas no LocalStorage
  const viagensArmazenadas = getViagensDoLocalStorage();

  // Encontra o índice da viagem a ser removida
  const indiceViagem = viagensArmazenadas.findIndex(viagem => viagem.id === idViagem);

  // Se a viagem for encontrada, remove-a do array
  if (indiceViagem !== -1) {
    viagensArmazenadas.splice(indiceViagem, 1);

    // Atualiza o LocalStorage com o array atualizado
    localStorage.setItem('viagens', JSON.stringify(viagensArmazenadas));
  }
}
// Função para salvar viagem
function salvarViagem() {
  // Obtém os dados do formulário de cadastro
  const data = document.getElementById('data').value; // Data da viagem (formato dd/mm/aaaa)
  const local = document.getElementById('local').value; // Local da viagem (string)
  const tipoViagem = document.getElementById('tipoViagem').value; // Tipo de viagem (string)
  const plastico = parseInt(document.getElementById('plastico').value) || 0; // Quantidade de plástico coletada (número)
  const metal = parseInt(document.getElementById('metal').value) || 0; // Quantidade de metal coletada (número)
  const vidro = parseInt(document.getElementById('vidro').value) || 0; // Quantidade de vidro coletada (número)
  const outro = parseInt(document.getElementById('outro').value) || 0; // Quantidade de outro tipo de lixo coletada (número)

  // Validação dos dados do formulário (opcional, mas recomendada)
  // Verifique se os campos obrigatórios (data, local, tipoViagem) estão preenchidos
  // Verifique se os campos de quantidade (plastico, metal, vidro, outro) são números válidos

  // Gera um ID único para cada viagem
  const id = gerarId();

  // Cria um objeto para armazenar os dados da viagem
  const viagem = {
    id,
    data,
    local,
    tipoViagem,
    plastico,
    metal,
    vidro,
    outro
  };

  // Salva a viagem no LocalStorage
  salvarViagemNoLocalStorage(viagem);

  // Envia mensagem WebSocket para o servidor com a nova viagem
  socket.send(JSON.stringify({ tipo: 'novaViagem', dadosViagem: viagem }));

  // Exibe mensagem de sucesso
  mostrarMensagem('Viagem salva com sucesso!', 'sucesso');

  // Limpa o formulário de cadastro
  limparFormularioCadastro();
}

// Função para gerar ID único
function gerarId() {
  // Gera um ID aleatório entre 1 e 1.000.000
  return Math.floor(Math.random() * 1000000);
}

// Função para mostrar mensagem
function mostrarMensagem(mensagem, tipo) {
  // Cria um elemento HTML para exibir a mensagem
  const mensagemElement = document.createElement('div');
  mensagemElement.classList.add('mensagem', tipo); // Adiciona classes para estilizar a mensagem
  mensagemElement.textContent = mensagem; // Define o conteúdo da mensagem

  // Adiciona a mensagem ao corpo da página
  document.body.appendChild
}
// ... (Funções para Cadastro e Gerenciamento do LocalStorage - já existentes)

// Função para buscar viagens
function buscarViagens() {
  const termoBusca = document.getElementById('busca').value.toLowerCase(); // Termo de busca em minúsculas
  const viagensArmazenadas = getViagensDoLocalStorage();

  // Filtra as viagens de acordo com o termo de busca
  const viagensFiltradas = viagensArmazenadas.filter(viagem => {
    return viagem.local.toLowerCase().includes(termoBusca) ||
           viagem.tipoViagem.toLowerCase().includes(termoBusca);
  });

  // Exibe as viagens filtradas na tabela
  exibirViagensNaTabela(viagensFiltradas);
}

// Função para exibir viagens na tabela
function exibirViagensNaTabela(viagens) {
  const tabelaCorpo = document.getElementById('tabela-viagens').getElementsByTagName('tbody')[0];

  // Limpa o conteúdo da tabela antes de exibir os novos resultados
  tabelaCorpo.innerHTML = '';

  // Percorre cada viagem e cria uma linha na tabela
  viagens.forEach(viagem => {
    const linha = tabelaCorpo.insertRow();

    const celulaData = linha.insertCell();
    celulaData.textContent = viagem.data;

    const celulaLocal = linha.insertCell();
    celulaLocal.textContent = viagem.local;

    const celulaTipo = linha.insertCell();
    celulaTipo.textContent = viagem.tipoViagem;

    const celulaPlastico = linha.insertCell();
    celulaPlastico.textContent = viagem.plastico;

    const celulaMetal = linha.insertCell();
    celulaMetal.textContent = viagem.metal;

    const celulaVidro = linha.insertCell();
    celulaVidro.textContent = viagem.vidro;

    const celulaOutro = linha.insertCell();
    celulaOutro.textContent = viagem.outro;

    // Cria a célula de ações (opcional)
    const celulaAcoes = linha.insertCell();
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = () => removerViagem(viagem.id); // Função para remover viagem
    celulaAcoes.appendChild(botaoExcluir);
  });
}

// ... (Funções para Remover Viagem e Gerar PDF - já existentes)

// Função para inicializar a página (opcional)
function iniciarPagina() {
  // Busca e exibe todas as viagens armazenadas no LocalStorage ao carregar a página
  buscarViagens();
}

// Chama a função de inicialização da página quando o DOM estiver pronto
window.addEventListener('DOMContentLoaded', iniciarPagina);
