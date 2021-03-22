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

    this._service = new NegociacaoService();

    this._init();
  }

  _init() {
    this._service
      .lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
      .catch(erro => this._mensagem.texto = erro);

      setInterval(() => { this.importaNegociacoes() }, 5000);
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();
    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);
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

    this._service
      .apaga()
      .then(mensagem => {
          this._mensagem.texto = mensagem;
          this._listaNegociacoes.esvazia();
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  importaNegociacoes() {
    /*
    Esse método antes era dessa maneira como está comentado.
    Mas o professor resolver colocar todo esse código dentro de NegociacaoService,
    com leves alterações. E essa alteração não foi mostrada em aula.
    */
    /*Promise.all([
      service.obterNegociacoesDaSemana(),
      service.obterNegociacoesDaSemanaAnterior(),
      service.obterNegociacoesDaSemanaRetrasada()]
    ).then(negociacoes => {
      negociacoes
      .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
      .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso';
    })
    .catch(erro => this._mensagem.texto = erro);*/
    
    this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações importadas'
        }))
        .catch(erro => this._mensagem.texto = erro);
  }



}
