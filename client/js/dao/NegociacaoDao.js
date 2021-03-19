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
class NegociacaoDao {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {

    return new Promise((resolve, reject) => {
      let request = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .add(negociacao);

      // Quando o evento onsuccess é chamado a transação é fechada, ou seja, as
      // transações do IndexedDB são auto commited

      // CANCELAR UMAA TRANSAÇÃO. O evento onerror será chamado.
      //transaction.abort();

      // Trata os eventos de transação abortada
      /*transaction.onabort = e => {
        console.log(e);
        console.log('Transação abortada');
      };*/

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível adicionar a negociação');
      };

    });
  }

  listaTodos() {

    return new Promise((resolve, reject) => {

      let cursor = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .openCursor();

      let negociacoes = [];

      cursor.onsuccess = e => {
        let atual = e.target.result;
        if(atual) {
          let dado = atual.value;
          negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      }

      cursor.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível listar as negociações');
      }
    });
  }

  apagaTodos() {

    return new Promise((resolve, reject) => {
      let request = this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .clear(); // Apaga todos os itens da store

      request.onsuccess = e => resolve('Negociações apagadas com sucesso');

      request.onerror = e => {
        console.log(e.target.error);
        reject('Não foi possível apagar as negociações');
      };
    });
  }
}
