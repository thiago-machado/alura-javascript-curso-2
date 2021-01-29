class NegociacaoController {

  constructor() {
    /*
    ###SOBRE O QUERY SELECTOR###
    O querySelector é uma função que pertence ao objeto document - chamaremos
    tal função de método.
    Internamente, o querySelector tem uma chamada para o this, que é o contexto pelo
    qual o método é chamado.
    Logo, o this é o document.
    No entanto, quando colocamos o querySelector dentro do $, ele passa a ser
    executado fora do contexto de document e isto não funciona.
    O que devemos fazer, então?
    Queremos tratar o querySelector como uma função separada.
    Nós queremos que ao colocarmos o querySelector para o $, ele mantenha a
    associação com o document. Para isto, usaremos o bind()

    ###SOBRE PERFORMANCE###
    Quando o NegociacaoController for criado pela primeira vez, ele buscará os
    elementos do DOM do document, que serão guardados nas propriedades da classe.
    Agora, mesmo que façamos 300 negociações, ele só fará uma busca no DOM
    pelos elementos. Com isto, conseguimos melhorar a performance.
    */
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    // A função typeof serve para saber qual o tipo de um valor.
    console.log(typeof(this._inputData.value));

    // Convertendo uma data em string para um objeto do tipo Date
    // Date também pode ser criado da seguinte forma: new Date(2020, 08, 15)
    // Contudo, os meses vão de 0 a 11, logo, se queremos Agosto, devemos usar o valor 7
    //let data = new Date(this._inputData.value.split('-'));

    /*
    Adicionamos ... (reticências) posicionado antes do this.
    Com este spread operator, indicamos que o array será
    desmembrado - e o primeiro item do array, e cada parâmetro do Date será
    posicionado na mesma ordem no construtor.
    A função map irá percorrer cada item da lista. Além disso, ela nos passa o item e o index.
    */
    /*let data = new Date(...this._inputData.value.split('-')
    .map(function(item, indice) {
      // Irá realizar a subtração usando módulo
      return item - (indice % 2);
    }));*/

    /*
    O resultado dessa função é o mesmo obtido acima.
    A diferença está no uso da arrow functions.
    Com isso, podemos otimir a palavra function e chaves.
    Além disso, podemos omitir o return já que temos uma única instrução.
    */
    let data = new Date(...this._inputData.value.split('-')
      .map((item, indice) => item - indice % 2));
    console.log(data);

    // Podemos também  converter uma string em um date usando expressão regular.
    // Basta substituir todos os hífens por vírgula
    // let data = new Date(this._inputData.value.replace(/-/g, ','));

    let negociacao = new Negociacao(
      data,
      this._inputQuantidade.value,
      this._inputValor.value
    );

    console.log(negociacao);
  }
}
