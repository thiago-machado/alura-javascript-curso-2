class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');

    /*
    Estou passando para o construtor de ListaNegociacoes uma function.
    Essa function irá executar o método update() de _negociacoesView.
    Essa function recebe um modelo, que nada mais é que a própria lista de negociações
    (acessar classe ListaNegociacoes para ver o parametro sendo passado).

    Ou seja, toda vez que o método adiciona() ou apaga() de this._listaNegociacoes
    for executado, essa função será executada (acessar ListaNegociacoes para ver isso).


    A arrow function não é apenas uma maneira sucinta de escrever uma função,
    ela também tem um característica peculiar: o escopo de this é léxico, em vez de
    ser dinâmico como a outra função.

    Isto significa que o this não mudará de acordo com o contexto.
    Da maneira como estruturamos o código, o this será NegociacaoController - esta condição será
    mantida independente do local em que chamemos a arrow function, porque ela está
    amarrada a um escopo imutável.
    O this de uma arrow function não pode ser alterado, mesmo se usarmos recursos da linguagem, como a API Reflect.
    */
    this._listaNegociacoes = new ListaNegociacoes(
      // Passando uma função como parâmetro.
      // Como estamos usando arrow function, o this aqui é da própria instância de NegociacaoController
      modelo => this._negociacoesView.update(modelo)
    );

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    // A atualização da view será feita dentro do adicona()
    // this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._mensagemView.update(this._mensagem);

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
    // A atualização da view será feita dentro do esvazia()
    //this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociações apagadas com sucesso';
    this._mensagemView.update(this._mensagem);
  }
}
