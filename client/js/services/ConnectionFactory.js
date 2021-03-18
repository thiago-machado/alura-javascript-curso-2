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
var ConnectionFactory = (function () {

  /*
  const define as variáveis como constantes e proíbe que uma alteração seja feita nelas
  */
  const stores = ['negociacoes'];
  const version = 4;
  const dbName = 'aluraframe';
  var connection = null;
  var close = null;

  // Essa função autoinvocada retornará a classe ConnectionFactory
  return class ConnectionFactory {

    constructor() {
      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {

      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = e => {
          if(!connection) {
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
            connection.close = function() {
              throw new Error('Você não pode fechar diretamente a conexão');
            };
          }

          // recebe conexão já existente ou uma que acabou de ser criada
          resolve(connection);
        };

        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };
      });
    }

    static _createStores(connection) {

      // criando nossos stores!

      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store)) {
          connection.deleteObjectStore(store);
        }
        connection.createObjectStore(store, { autoIncrement: true });
      });
    }

    static closeConnection(){
      if(connection){
          close(); // Executando a função close original (lembrandi que é necessário o bind() passando connection).
          //Reflect.apply(close, connection, []) // Também poderíamos fazer assim, sem precisar usar o bind()
          connection = null;
      }
    }
  }
})();
