class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }
  /*
  Aplicando padrão de projeto chamado Promessa (Promise, em inglês).
  O ES6 suporta a promise nativamente, então, o método deverá retornar
  uma Promise(), que receberá dois parâmetros ( resolve e reject).

  Em que momento sabemos que os dados são retornados?
  O resolve passará diretamente o resultado de JSON.parse().
  Nós passamos direto para o resolve o resultado que será disponibilizado para
  a função then.
  E se tivermos algum tipo de erro, chamaremos a função reject().
  O que está no resolve, pegaremos dentro do método then() do arquivo
  NegociacaoController.js e o erro passado para o reject, pegaremos no catch.
  */
  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this._http.get('negociacoes/semana')
      .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
      .catch(erro => reject('Não foi possível obter as negociações da semana'))
    });
  }


  obterNegociacoesDaSemanaAnterior(cb) {
    return new Promise((resolve, reject) => {
      this._http.get('negociacoes/anterior')
      .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
      .catch(erro => reject('Não foi possível obter as negociações da semana anterior'))
    });
  }

  obterNegociacoesDaSemanaRetrasada(cb) {
    return new Promise((resolve, reject) => {
      this._http.get('negociacoes/retrasada')
      .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
      .catch(erro => reject('Não foi possível obter as negociações da semana retrasada'))
    });
  }
}
