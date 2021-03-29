'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

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


  _createClass(NegociacaoService, [{
    key: 'obterNegociacoesDaSemana',
    value: function obterNegociacoesDaSemana() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._http.get('negociacoes/semana').then(function (negociacoes) {
          return resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          return reject('Não foi possível obter as negociações da semana');
        });
      });
    }
  }, {
    key: 'obterNegociacoesDaSemanaAnterior',
    value: function obterNegociacoesDaSemanaAnterior(cb) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
          return resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          return reject('Não foi possível obter as negociações da semana anterior');
        });
      });
    }
  }, {
    key: 'obterNegociacoesDaSemanaRetrasada',
    value: function obterNegociacoesDaSemanaRetrasada(cb) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
          return resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          return reject('Não foi possível obter as negociações da semana retrasada');
        });
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

  }, {
    key: 'obterNegociacoes',
    value: function obterNegociacoes() {

      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

        var negociacoes = periodos.reduce(function (dados, periodo) {
          return dados.concat(periodo);
        }, []).map(function (dado) {
          return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
        });

        return negociacoes;
      }).catch(function (erro) {
        console.log(erro);
        throw new Error(erro);
      });
    }
  }, {
    key: 'cadastra',
    value: function cadastra(negociacao) {
      return ConnectionFactory.getConnection().then(function (conexao) {
        return new NegociacaoDao(conexao);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociação cadastrada com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: 'lista',
    value: function lista() {

      return ConnectionFactory.getConnection().then(function (conexao) {
        return new NegociacaoDao(conexao);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações');
      });
    }
  }, {
    key: 'apaga',
    value: function apaga() {

      return ConnectionFactory.getConnection().then(function (conexao) {
        return new NegociacaoDao(conexao);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações');
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

  }, {
    key: 'importa',
    value: function importa(listaAtual) {
      return this.obterNegociacoes().then(function (negociacoes) {
        return (
          // Somente vamos manter na lista de negociacoes os itens que não estão na tela
          negociacoes.filter(function (negociacao) {
            return !listaAtual.some(function (negociacaoExistente) {
              return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
            });
          })
        );
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível importar as negociações");
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map