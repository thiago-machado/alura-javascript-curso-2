class ListaNegociacoes {

  /*
  Recebendo uma função como parâmetro.
  Essa função exige receber uma instãncia de ListaNegociacoes como parâmetro.
  Essa função irá executar a atualização da view NegociacoesView (acessar
  NegociacaoController para ver isso).
  */
  constructor(contexto, armadilha) {
    this._negociacoes = []
    this._armadilha = armadilha;
    this._contexto = contexto;
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    /*
    Toda vez que rodamos isso, estamos execuando o método que atualiza a view de negociação,
    passando como parâmetro a própria instância de ListaNegociacoes
    A função comentada abaixo não funciona pois precisa ser executada no contexto de NegociacaoController.
    Por isso usamos Reflect.apply.
    */
    //this._armadilha(this);

    /*
    O Reflect.apply recebeu o this._armadilha como primeiro parâmetro e o segundo
    é this._contexto.
    O terceiro parâmetro é o [this], que será a própria ListaNegociacoes.
    Em resumo: a armadilha recebida pelo construtor deve ser executada no contexto de NegociacaoController.
    Por isso, quando NegociacaoController instancia ListaNegociacoes, ele "se" passa por parâmetro.
    Logo, o método abaixo executará armadilha (método), dentro do contexto desejado.

    A armadilha vai executar a função this._negociacoesView.update(modelo).
    O this é o _contexto, pois a chamada a _negociacoesView pertence a uma instância de NegociacaoController.
    O modelo usado como parâmetro é a própria instância de ListaNegociacoes, por isso o this no último parâmetro.
    */
    Reflect.apply(this._armadilha, this._contexto, [this]);
  }

  get negociacoes() {
    // Retornando uma cópia de negociações.
    // Dessa forma, evitamos edições indevidas.
    // O resultado de concat é um novo array com todos os elementos de quem realizou o concat e quem foi passado para a função.
    return [].concat(this._negociacoes);
  }

  esvazia() {
    this._negociacoes = [];
    //this._armadilha(this);
    Reflect.apply(this._armadilha, this._contexto, [this]);
  }
}
