/*
 Quando criamos um Proxy da _listaNegociacoes e _mensagem, nosso objetivo é
 realizar um Data binding (que traduzido para o português, significa "ligação de dados").

 Nós queremos fazer uma associação entre o modelo e a View, ou seja, sempre que
 alterarmos o modelo, queremos disparar a atualização da View.
 Damos o nome disso de Data binding unidirecional.
*/
class Bind {

  constructor(model, view, props) {

    /*
    Criando um proxy com base no modelo (model) recebido como parâmetro.
    Esse modelo pode ser uma instância de ListaNegociacoes, ou Mensagem.
    A view nada mais é do que a classe que cuida da atualização da interface.
    As props são os atirbutos/funções que desejamos interceptar no proxy.
    */
    let proxy = ProxyFactory.create(model, props, model => view.update(model));

    view.update(model); // Realiza a primeira atualização mesmo sem ainda existir dados.
    return proxy; // O construtor pode retornar um valor
  }
}
