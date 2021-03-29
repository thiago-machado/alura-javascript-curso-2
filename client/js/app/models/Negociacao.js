"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Definindo a Classe Negociacao
var Negociacao = function () {

  // Método construtor
  function Negociacao(data, quantidade, valor) {
    _classCallCheck(this, Negociacao);

    // Definindo os atributos e seus valores padrões
    /*
    A linguagem JavaScript - até a atual data - não nos permite usar modificadores
    de acesso.
    Não podemos dizer que uma propriedade seja apenas leitura (ou gravação).
    O que podemos é utilizar a convenção de que nos atributos das propriedades
    de uma classe que não pode ser modificada, usaremos um underline (_).
    Novamente, isso é uma convenção! Ou seja, não impede que alguém,
    ou nós mesmos, alteremos os valores utilizando o nome da propriedade diretamente!!!
    */
    this._data = new Date(data.getTime()); // Guardamos uma cópia da data para evitar modificações futuras
    this._quantidade = quantidade;
    this._valor = valor;

    // Isso vai impedir que a instância dessa classe tenha seus aributos alterados posteriomente
    Object.freeze(this);
  }

  // Métodos GET que retornam os valores dos atributos


  _createClass(Negociacao, [{
    key: "volume",
    get: function get() {
      return this._quantidade * this._valor;
    }

    // Como data é um Objeto, retornamos sempre uma cópia da mesma
    // Assim, evitamos que alguém altere o valor da data através de seus métodos

  }, {
    key: "data",
    get: function get() {
      return new Date(this._data.getTime());
    }
  }, {
    key: "quantidade",
    get: function get() {
      return this._quantidade;
    }
  }, {
    key: "valor",
    get: function get() {
      return this._valor;
    }
  }]);

  return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map