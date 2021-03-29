'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Padrão de projeto JavaScript chamado Module Pattern.
Um módulo é uma unidade código confinada e que ninguém tem acesso ao conteúdo
dentro dele.
Uma maneira de criarmos um escopo privado no JavaScript é colocando o código em uma função.

Nós estamos criando uma função autoinvocada.
Simultaneamente, ela será carregada e executada. Estamos enganando o compilador do
JavaScript, porque o conteúdo do parênteses é uma função anônima...
Em seguida, criaremos a variável ConnectionFactory no escopo global, mas o restante
do código não estará.
*/
var ConnectionFactory = function () {

  /*
  const define as variáveis como constantes e proíbe que uma alteração seja feita nelas
  */
  var stores = ['negociacoes'];
  var version = 4;
  var dbName = 'aluraframe';
  var connection = null;
  var close = null;

  // Essa função autoinvocada retornará a classe ConnectionFactory
  return function () {
    function ConnectionFactory() {
      _classCallCheck(this, ConnectionFactory);

      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    _createClass(ConnectionFactory, null, [{
      key: 'getConnection',
      value: function getConnection() {

        return new Promise(function (resolve, reject) {
          var openRequest = window.indexedDB.open(dbName, version);

          openRequest.onupgradeneeded = function (e) {
            ConnectionFactory._createStores(e.target.result);
          };

          openRequest.onsuccess = function (e) {
            if (!connection) {
              connection = e.target.result;

              /*
              Toda conexão possui o método close, mas o programador não pode chamá-lo,
              porque a conexão é a mesma para a aplicação inteira.
                O desenvolvedor não poderá obter uma conexão e a partir desta, fechar,
              porque assim pode ocorrer um problema geral na aplicação.
              Para isto, vamos utilizar o Monkey Patch, que consiste forçarmos a
              modificação de uma API. No caso, nós iremos alterar o método close().
                Se o desenvolvedor tentar chamar o connection.close, ele receberá essa
              mensagem de erro.
                Contudo, antes de editarmos a função close(), nós precisamos guadar a
              função original em uma variável para que essa possa ser chamada pelo método
              closeConnection().
                Ou seja, nós informamos que a variável close receberá a função
              close() - que será sobrescrita a seguir.
              Com isso, chamaremos o método close() em closeConnection().
              Vale ressaltar que quando estivermos copiando o close no onsuccess,
              faremos já associado com o connection utilizando o bind.
              */
              close = connection.close.bind(connection);
              connection.close = function () {
                throw new Error('Você não pode fechar diretamente a conexão');
              };
            }

            // recebe conexão já existente ou uma que acabou de ser criada
            resolve(connection);
          };

          openRequest.onerror = function (e) {
            console.log(e.target.error);
            reject(e.target.error.name);
          };
        });
      }
    }, {
      key: '_createStores',
      value: function _createStores(connection) {

        // criando nossos stores!

        stores.forEach(function (store) {
          if (connection.objectStoreNames.contains(store)) {
            connection.deleteObjectStore(store);
          }
          connection.createObjectStore(store, { autoIncrement: true });
        });
      }
    }, {
      key: 'closeConnection',
      value: function closeConnection() {
        if (connection) {
          close(); // Executando a função close original (lembrandi que é necessário o bind() passando connection).
          //Reflect.apply(close, connection, []) // Também poderíamos fazer assim, sem precisar usar o bind()
          connection = null;
        }
      }
    }]);

    return ConnectionFactory;
  }();
}();
//# sourceMappingURL=ConnectionFactory.js.map