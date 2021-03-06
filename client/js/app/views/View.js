'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(elemento) {
    _classCallCheck(this, View);

    this._elemento = elemento;
  }

  /*
  Se algum DEV extender dessa classe e não implementar seu próprio _template,
  uma exceção será lançada caso ele tente usar o _template dessa classe.
  */


  _createClass(View, [{
    key: '_template',
    value: function _template() {
      throw new Error('O método template deve ser implementado');
    }
  }, {
    key: 'update',
    value: function update(model) {
      this._elemento.innerHTML = this._template(model);
    }
  }]);

  return View;
}();
//# sourceMappingURL=View.js.map