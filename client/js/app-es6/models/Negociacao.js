// Definindo a Classe Negociacao
class Negociacao {

  // Método construtor
  constructor(data, quantidade, valor) {
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
  get volume() {
    return this._quantidade * this._valor;
  }

  // Como data é um Objeto, retornamos sempre uma cópia da mesma
  // Assim, evitamos que alguém altere o valor da data através de seus métodos
  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }
}
