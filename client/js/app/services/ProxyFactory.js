"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
  function ProxyFactory() {
    _classCallCheck(this, ProxyFactory);
  }

  _createClass(ProxyFactory, null, [{
    key: "create",
    value: function create(objeto, props, acao) {
      return new Proxy(objeto, {
        get: function get(target, prop, receiver) {

          if (props.includes(prop) && _typeof(target[prop]) == (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {
            return function () {
              console.log("A propriedade \"" + prop + "\" foi interceptada");

              // Relembrando que arguments é uma variável implícita que possui todos os valores
              // passados por parâmtro na execução da função original

              Reflect.apply(target[prop], target, arguments); // Prossegue com o método original

              // Execução da ação desejada após a execução original
              // Estamos usando return pois não sabemos se a função possuirá, ou não, um retorno
              return acao(target);
            };
          }
          return Reflect.get(target, prop, receiver);
        },


        /*
        Interceptando as atribuições.
        Isso resolverá a atualização da view de Mensagens.
        */
        set: function set(target, prop, value, receiver) {
          if (props.includes(prop)) {
            console.log("A propriedade \"" + prop + "\" foi interceptada");

            // Precisamos atualizar a propriedade com o novo valor antes de chamar a ação
            // Senão, a execução da ação não terá nenhum valor novo
            target[prop] = value;
            acao(target);
          }

          return Reflect.set(target, prop, value, receiver);
        }
      });
    }
  }]);

  return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map