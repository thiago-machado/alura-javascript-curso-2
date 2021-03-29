'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Criamos nossa própria solução de persistência aplicando padrões de projeto e
combinando um pouco de tudo que vimos nos módulos anteriores, Procuramos
esconder a complexidade de se lidar com o IndexedDB através das classes
ConnectionFactory e NegociacaoDao. Contudo, repare que isso é um problema que
todos aqueles que utilizaram o IndexedDB terão que lidar em algum ponto da aplicação.

Para lidar também com o o IndexedDB outros desenvolvedores tornaram públicas
suas bibliotecas. Por exemplo, há o Dexie e o Db.js, este último utiliza promises
assim como fizemos.

Como a ideia deste treinamento é que você se torne cangaceiro em JavaScript,
não usamos nenhum biblioteca externa e fizemos tudo na mão!
*/
var NegociacaoDao = function () {
  function NegociacaoDao(connection) {
    _classCallCheck(this, NegociacaoDao);

    this._connection = connection;
    this._store = 'negociacoes';
  }

  _createClass(NegociacaoDao, [{
    key: 'adiciona',
    value: function adiciona(negociacao) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

        // Quando o evento onsuccess é chamado a transação é fechada, ou seja, as
        // transações do IndexedDB são auto commited

        // CANCELAR UMAA TRANSAÇÃO. O evento onerror será chamado.
        //transaction.abort();

        // Trata os eventos de transação abortada
        /*transaction.onabort = e => {
          console.log(e);
          console.log('Transação abortada');
        };*/

        request.onsuccess = function (e) {
          resolve();
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível adicionar a negociação');
        };
      });
    }
  }, {
    key: 'listaTodos',
    value: function listaTodos() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

        var negociacoes = [];

        cursor.onsuccess = function (e) {
          var atual = e.target.result;
          if (atual) {
            var dado = atual.value;
            negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
            atual.continue();
          } else {
            resolve(negociacoes);
          }
        };

        cursor.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível listar as negociações');
        };
      });
    }
  }, {
    key: 'apagaTodos',
    value: function apagaTodos() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear(); // Apaga todos os itens da store

        request.onsuccess = function (e) {
          return resolve('Negociações apagadas com sucesso');
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível apagar as negociações');
        };
      });
    }
  }]);

  return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map