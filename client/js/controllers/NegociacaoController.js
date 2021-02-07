class NegociacaoController {

  constructor() {
    /*
    ###SOBRE O QUERY SELECTOR###
    O querySelector é uma função que pertence ao objeto document - chamaremos
    tal função de método.
    Internamente, o querySelector tem uma chamada para o this, que é o contexto pelo
    qual o método é chamado.
    Logo, o this é o document.
    No entanto, quando colocamos o querySelector dentro do $, ele passa a ser
    executado fora do contexto de document e isto não funciona.
    O que devemos fazer, então?
    Queremos tratar o querySelector como uma função separada.
    Nós queremos que ao colocarmos o querySelector para o $, ele mantenha a
    associação com o document. Para isto, usaremos o bind()

    ###SOBRE PERFORMANCE###
    Quando o NegociacaoController for criado pela primeira vez, ele buscará os
    elementos do DOM do document, que serão guardados nas propriedades da classe.
    Agora, mesmo que façamos 300 negociações, ele só fará uma busca no DOM
    pelos elementos. Com isto, conseguimos melhorar a performance.
    */
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._listaNegociacoes);
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
}
