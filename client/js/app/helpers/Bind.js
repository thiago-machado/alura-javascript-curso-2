"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 Quando criamos um Proxy da _listaNegociacoes e _mensagem, nosso objetivo é
 realizar um Data binding (que traduzido para o português, significa "ligação de dados").

 Nós queremos fazer uma associação entre o modelo e a View, ou seja, sempre que
 alterarmos o modelo, queremos disparar a atualização da View.
 Damos o nome disso de Data binding unidirecional.
*/
var Bind =

/*
ProxyFactory precisa receber um array, por isso, as propriedades eram passadas
entre [] (colchetes).
Contudo, quando o último parâmetro de um construtor, função ou método é
variável, podemos usar o parâmetro REST operator (...).
*/
function Bind(model, view) {
  _classCallCheck(this, Bind);

  for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    props[_key - 2] = arguments[_key];
  }

  /*
  Criando um proxy com base no modelo (model) recebido como parâmetro.
  Esse modelo pode ser uma instância de ListaNegociacoes, ou Mensagem.
  A view nada mais é do que a classe que cuida da atualização da interface.
  As props são os atirbutos/funções que desejamos interceptar no proxy.
  */
  var proxy = ProxyFactory.create(model, props, function (model) {
    return view.update(model);
  });

  view.update(model); // Realiza a primeira atualização mesmo sem ainda existir dados.
  return proxy; // O construtor pode retornar um valor
};
//# sourceMappingURL=Bind.js.map