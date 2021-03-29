class Mensagem {

  /*
  O ES6 permite atribuir um valor padrão para parâmetros do constructor(),
  ou de funções do JS.
  Se não passarmos no construtor da Mensagem() um texto, ele adotará como padrão
  uma string em branco.
  */
  constructor(texto='') {
    this._texto = texto;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    this._texto = texto;
  }
}
