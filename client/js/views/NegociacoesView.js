class NegociacoesView {

  constructor(elemento) {
    this._elemento = elemento;
  }

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
  _template(modelo) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
        ${modelo.negociacoes.map(n => {
          return `
            <tr>
                <td>${DateHelper.dataParaTexto(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
            </tr>
          `
        }).join('')}
      </tbody>
      <tfoot>
        <td colspan="3">TOTAL</td>
        <!--
        Para imprimir o total, utilizaremos uma Immediately-invoked function expression (IIFE) ou a função imediata.
        Trata-se de um recurso usado na criação de escopo em JavaScript, que nos ajudará a colocar um bloco na
        expressão, sendo executado imediatamente. No caso, o $ receberá o total.
         -->
        <td>${
            (function() {
                let total = 0;
                modelo.negociacoes.forEach(n => total += n.volume);
                return total;
           })()
          }
        </td>
    </tfoot>
    </table>
    `;
  }

  update(modelo) {
    this._elemento.innerHTML = this._template(modelo);
  }
}
