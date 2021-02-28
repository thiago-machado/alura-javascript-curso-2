class NegociacoesView extends View {

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
        Observe que utilizamos a função reduce(), que irá processar o array e no fim, disponibiliza um único resultado.

        Optamos por passar uma função com as variáveis total e n(elementos da lista) - ambas receberam esses nomes,
        mas poderíamos ter definido outros.
        O return que criamos ainda não será suficiente. Qual será o valor inicial de total?
        Ele deve iniciar de 0 para conseguirmos somá-lo com volume.
        Por isso, o segundo parâmetro da função reduce() será a inicialização da variável total.

        Basicamente, nós pedimos que negociacoes reduzisse. Em seguida, executamos a função para cada item da lista.
        A variável total começou com o valor igual a 0 e foi somado com o volume.
        Quando passamos para o segundo item da lista, este pega o valor anterior e o
        soma com o volume atual. No fim, a função retorna um valor único, que será o resultado de total.
         -->
        <td>${ modelo.volumeTotal }
        </td>
    </tfoot>
    </table>
    `;
  }

}
