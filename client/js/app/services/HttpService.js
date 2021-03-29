'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
  function HttpService() {
    _classCallCheck(this, HttpService);
  }

  _createClass(HttpService, [{
    key: '_handleErrors',
    value: function _handleErrors(res) {
      if (res.ok) {
        // Se true, significa que o server respondeu e o status está entre 200 e 299
        return res;
      } else {
        throw new Error(res.statusText); // Lançando exceção com o texto do erro
      }
    }

    /*
    Conexão usando fetch
    No ES 2016, foi incluída uma API com o objetivo de simplificar a criação de
    requisições Ajax: Fetch API, uma API de busca do JS.
    */

  }, {
    key: 'get',
    value: function get(url) {
      var _this = this;

      /*
      Qualquer exceção será "pega" pelo catch de quem estiver chamando essa função
      */
      return fetch(url).then(function (res) {
        return _this._handleErrors(res);
      }).then(function (res) {
        return res.json();
      }); // Retornando a resposta como um JSON
    }
  }, {
    key: 'post',
    value: function post(url, dado) {
      var _this2 = this;

      /*
      Similar ao get, qualquer exceção será "pega" por quem estiver chamando esse método.
      Acessar: http://localhost:3000/post.html
      */
      return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(dado) // Precisa enviar os dados como texto
      }).then(function (res) {
        return _this2._handleErrors(res);
      });
    }
  }]);

  return HttpService;
}();
//# sourceMappingURL=HttpService.js.map