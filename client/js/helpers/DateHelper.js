class DateHelper {

  // Lançando exceção caso alguém tente instanciar essa classe
  constructor() {
    throw new Error('DateHelper não pode ser instanciada');
  }

  /*
  Os métodos são estáticos. Dessa forma, podemos usar os métodos sem
  instanciar a classe.
  */
  static dataParaTexto(data) {
    // Formatando data usando template string
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }

  static textoParaData(texto) {
    // Verificando se a data está no formato yyyy-mm-dd através do uso de uma expressão regular
    if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
      throw new Error('Deve estar no formato yyyy-mm-dd');
    }

    return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
  }
}
