class ListaNegociacoes {

  constructor() {
    this._negociacoes = []
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  get negociacoes() {
    // Retornando uma cópia de negociações.
    // Dessa forma, evitamos edições indevidas.
    // O resultado de concat é um novo array com todos os elementos de quem realizou o concat e quem foi passado para a função.
    return [].concat(this._negociacoes);
  }

  esvazia() {
    this._negociacoes = [];
  }

  get volumeTotal() {
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }

  ordena(criterio) {
    this._negociacoes.sort(criterio);
  }

  inverteOrdem() {
    this._negociacoes.reverse();
  }
}
