class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');

    let self = this;

    this._listaNegociacoes = ProxyFactory.create(
      new ListaNegociacoes(),
      ['adiciona', 'esvazia'],
      // Aqui usamos arrow function pois _negociacoesView pertence ao contexto de NegociacaoController
      modelo => this._negociacoesView.update(modelo));

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = ProxyFactory.create(
      new Mensagem(),
      ['texto'],
      modelo => this._mensagemView.update(modelo));

    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso';

    this._limpaFormulario();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
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
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }
}
