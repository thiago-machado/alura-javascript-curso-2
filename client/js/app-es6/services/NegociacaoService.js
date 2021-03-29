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
  obterNegociacoes() {

    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ]).then(periodos => {

      let negociacoes = periodos
      .reduce((dados, periodo) => dados.concat(periodo), [])
      .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

      return negociacoes;
    }).catch(erro => {
      console.log(erro);
      throw new Error(erro);
    });

  }


  cadastra(negociacao) {
    return ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(negociacao))
    .then(() => 'Negociação cadastrada com sucesso')
    .catch(erro => {
      console.log(erro);
      throw new Error("Não foi possível adicionar a negociação")
    });
  }

  lista() {

    return ConnectionFactory
      .getConnection()
      .then(conexao => new NegociacaoDao(conexao))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações')
      });
  }

  apaga() {

    return ConnectionFactory
      .getConnection()
      .then(conexao => new NegociacaoDao(conexao))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações')
      });
  }

  /*
  Para evitar que a importação informe na tela as mesmas negociações que já
  foram impotadas, nós utilizaremos o método some().
  Todo array possui a função some(), com ela identificamos se o item buscado
  faz parte da lista, varrendo cada um deles de forma semelhante a um forEach().

  A função some() vai varrer cada item da lista verificando se os elementos
  são iguais ao critério estabelecido.
  Enquanto o item for diferente, ele seguirá para o próximo.
  Quando o elemento for equivalente ao critério, a lista retornará TRUE e não
  seguirá iterando no array até o fim.
  Basta encontrar um item que seja correspondente ao critério para que o
  retorno de some() seja "verdadeiro".
  No entanto, quando buscamos um elemento que não existe, o retorno será "falso".

  Contudo, nossa validação deve ser "invertida". Caso encontre algum elemento,
  deve retornar falso e vice-versa. Pois, somente aqueles que não estão
  sendo exibidos na tela é que podem passar para a próxima etapa.
  Por isso estamos usando "!".

  E estamos usando a comparação com stringify() pois negociação é um objeto.
  A função stringify() converterá um objeto em string e por isso conseguimos
  verificar se uma negociação é igual a outra.

  Para verificar que realmente somente as novas segociações são listadas quando
  apertado novamente o botão IMPORTAR, fazer o seguinte:
  Acessar http://localhost:3000 e importar todas as negociações;
  Abrir nova aba, acessar http://localhost:3000/post.html e incluir uma negociação;
  Depois, retornar a aba que está aberto o endereço http://localhost:3000,
  e apertar para importar de novo.
  */
  importa(listaAtual) {
    return this.obterNegociacoes()
      .then(negociacoes =>
      // Somente vamos manter na lista de negociacoes os itens que não estão na tela
        negociacoes.filter(negociacao =>
          !listaAtual.some(negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
      ).catch(erro => {
        console.log(erro);
        throw new Error("Não foi possível importar as negociações");
      });
  }
}
