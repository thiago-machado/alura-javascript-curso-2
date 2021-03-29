'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = function (_View) {
  _inherits(NegociacoesView, _View);

  function NegociacoesView() {
    _classCallCheck(this, NegociacoesView);

    return _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).apply(this, arguments));
  }

  _createClass(NegociacoesView, [{
    key: '_template',


    // Por padrão, quando uma classe herda outra, ela também herda seu construtor.
    // Caso eu quisesse chamar o construtor da classe pai, eu deveria fazer o que está programado abaixo
    /*constructor(elemento) {
      super(elemento); // Chamando o construtor de View
    }*/

    /*
    Dentro da template string, adicionamos as tags <tr> e <td>, e usamos várias
    expressões para definirmos a exibição de data, quantidade, valor e volume.
    Quando o _template() for retornar a string, terá que processar o trecho
    do return primeiramente, e depois retornar a template string.
      Para cada negociação será criada uma lista - cada uma com as tags <tr> e os dados cadastrados.
    Estamos varrendo a lista e para um objeto Negociacao, estamos criando um array, mas o
    novo elemento será uma string com os dados.
    No entanto, por enquanto, o retorno será um array. Por isso, adicionaremos o join('').
    Com o JOIN, todos os elementos da lista serão concatenados por uma string vazia,
    criando dessa forma uma grande String com todo o conteúdo HTML.
    */
    value: function _template(modelo) {
      return '\n    <table class="table table-hover table-bordered">\n      <thead>\n      <tr>\n        <th onclick="negociacaoController.ordena(\'data\')">DATA</th>\n        <th onclick="negociacaoController.ordena(\'quantidade\')">QUANTIDADE</th>\n        <th onclick="negociacaoController.ordena(\'valor\')">VALOR</th>\n        <th onclick="negociacaoController.ordena(\'volume\')">VOLUME</th>\n      </tr>\n      </thead>\n      <tbody>\n        ' + modelo.negociacoes.map(function (n) {
        return '\n            <tr>\n                <td>' + DateHelper.dataParaTexto(n.data) + '</td>\n                <td>' + n.quantidade + '</td>\n                <td>' + n.valor + '</td>\n                <td>' + n.volume + '</td>\n            </tr>\n          ';
      }).join('') + '\n      </tbody>\n      <tfoot>\n        <td colspan="3">TOTAL</td>\n        <!--\n        Observe que utilizamos a fun\xE7\xE3o reduce(), que ir\xE1 processar o array e no fim, disponibiliza um \xFAnico resultado.\n\n        Optamos por passar uma fun\xE7\xE3o com as vari\xE1veis total e n(elementos da lista) - ambas receberam esses nomes,\n        mas poder\xEDamos ter definido outros.\n        O return que criamos ainda n\xE3o ser\xE1 suficiente. Qual ser\xE1 o valor inicial de total?\n        Ele deve iniciar de 0 para conseguirmos som\xE1-lo com volume.\n        Por isso, o segundo par\xE2metro da fun\xE7\xE3o reduce() ser\xE1 a inicializa\xE7\xE3o da vari\xE1vel total.\n\n        Basicamente, n\xF3s pedimos que negociacoes reduzisse. Em seguida, executamos a fun\xE7\xE3o para cada item da lista.\n        A vari\xE1vel total come\xE7ou com o valor igual a 0 e foi somado com o volume.\n        Quando passamos para o segundo item da lista, este pega o valor anterior e o\n        soma com o volume atual. No fim, a fun\xE7\xE3o retorna um valor \xFAnico, que ser\xE1 o resultado de total.\n         -->\n        <td>' + modelo.volumeTotal + '\n        </td>\n    </tfoot>\n    </table>\n    ';
    }
  }]);

  return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map