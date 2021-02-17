class ListaNegociacoes {

  /*
  Recebendo uma função como parâmetro.
  Essa função exige receber uma instãncia de ListaNegociacoes como parâmetro.
  Essa função irá executar a atualização da view NegociacoesView (acessar
  NegociacaoController para ver isso).
  */
  constructor(armadilha) {
    this._negociacoes = []
    this._armadilha = armadilha;
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    /*
    Toda vez que rodamos isso, estamos execuando o método que atualiza a view de negociação,
    passando como parâmetro a própria instância de ListaNegociacoes.
    Executar this._armadilha(this) seria como executar this._negociacoesView.update(modelo).
    Vale ressaltar que o this em _negociacoesView pertence ao contexto de NegociacaoController e não
    ao contexto de ListaNegociacoes. Por isso usamos arrow function para passar o método para esta classe.
    */
    this._armadilha(this);
  }

  get negociacoes() {
    // Retornando uma cópia de negociações.
    // Dessa forma, evitamos edições indevidas.
    // O resultado de concat é um novo array com todos os elementos de quem realizou o concat e quem foi passado para a função.
    return [].concat(this._negociacoes);
  }

  esvazia() {
    this._negociacoes = [];
    this._armadilha(this);
  }
}
