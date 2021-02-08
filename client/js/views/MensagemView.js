/*
Utilizando herança.
MensagemView estende de View.
Logo, os métodos em View são herdados por MensagemView.
No caso do construtor, caso queiramos utilizar o construtor do "pai",
devemos usar super(valores);
*/
class MensagemView extends View {

  // Por padrão, quando uma classe herda outra, ela também herda seu construtor.

  /*
  Em JavaScript, uma String NULL, vazia ou undefined é considerada FALSE
  */
  _template(modelo) {
    return modelo.texto ? `<p class="alert alert-info">${modelo.texto}</p>` : `<p></p>`;
  }

}
