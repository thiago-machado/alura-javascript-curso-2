class NegociacaoController {

  constructor() {

    this._ordemAtual = '';
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto');

    console.log(ConnectionFactory);
    ConnectionFactory
    .getConnection()
    .then(connection => {
        new NegociacaoDao(connection)
            .listaTodos()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                });
            });
      });

      // Esse código comentado faz a mesma coisa que o código acima, mas de forma resumida
      /*ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection)) // mesmo que eu não esteja chamando uma promise aqui, eu posso retornar um objeto e pegá-lo no then abaixo
        .then(dao => dao.listaTodos()) // esse dao do then anterior
        .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))*/
  }

  adiciona(event) {
    event.preventDefault();

    ConnectionFactory
    .getConnection()
    .then(conexao => {
      let negociacao = this._criaNegociacao();
      new NegociacaoDao(conexao)
      .adiciona(negociacao)
      .then(() => {
        this._listaNegociacoes.adiciona(negociacao);
      });
    })
    .catch(erro => this._mensagem.texto = erro);
    //this._listaNegociacoes.adiciona(this._criaNegociacao());
  }

  ordena(coluna) {
    /*
    Ordenando as colunas da tabela quando clicadas.
    Podemos acessar o atributo de um objeto usando colchetes.
    Quando fazemos a[coluna], na verdade, estamos querendo acessar algum atriburo do objeto.
    Se por acaso, coluna for "data", então estaríamos acessando a propriedade "data" do objeto "a".
    */
    if(this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  // Criar um método começando com underline, indica que é um método privado e que deveria ser
  // acessado somente por essa classe
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0
    this._inputData.focus();
  }

  // Limpa a tabela caso o usuário clique no botão Apagar
  apaga() {
    ConnectionFactory
    .getConnection()
    .then(connection => new NegociacaoDao(connection))
    .then(dao => dao.apagaTodos())
    .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
    });
  }

  importaNegociacoes() {

    let service = new NegociacaoService();

    /*
    A promise possui um recurso com o qual temos uma sequência de operações
    assíncronas, que será executada em uma determinada ordem.

    Uma maneira de executarmos todas as promises em ordem e obtermos todos
    os resultado de uma vez só é usar a função Promise.all, que receberá
    um array com as promises.

    Pedimos para que o Promise.all() resolvesse todas as promises na ordem
    indicada.
    Iremos obter os dados da Promise com o then().
    Caso ocorra um erro, trataremos com o catch().
    E se der uma mensagem de erro específica de obterNegociacoesDaSemana(),
    o catch() será chamado - sem precisar ser chamado diversas vezes.

    A grande vantagem da função Promise.all() é que todas as promises do
    array serão exibidos na sequência e o resultado estará em negociacoes,
    e em caso de erro, ele será capturado uma única vez.
    No entanto, a negociacao retornada não é equivalente à lista de
    negociações, mas sim, cada posição do array será uma lista de negociações.
    Ex.: [arrayDeNegociacoes, arrayDeNegociacoes, arrayDeNegociacoes].

    Antes de chegarmos até o forEach() para iterar cada negociação,
    executaremos uma transformação do array que possui outros três dentro
    de si.
    Com o reduce(), criaremos um array que contem apenas um elemento,
    contendo todos as negociações.
    Nós faremos flatten - achatar - o array.

    No fim, o reduce devolverá uma única lista cheia de negociações e o
    forEach() será executado sem problemas.
    */
    Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()]
    ).then(negociacoes => {
      negociacoes
      .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
      .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso';
    })
    .catch(erro => this._mensagem.texto = erro);
  }



}
