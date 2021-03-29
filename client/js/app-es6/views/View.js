class View {

  constructor(elemento) {
    this._elemento = elemento;
  }

  /*
  Se algum DEV extender dessa classe e não implementar seu próprio _template,
  uma exceção será lançada caso ele tente usar o _template dessa classe.
  */
  _template() {
    throw new Error('O método template deve ser implementado');
  }

  update(model) {
    this._elemento.innerHTML = this._template(model);
  }
}
