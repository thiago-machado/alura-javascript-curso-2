class NegociacaoService {

  obterNegociacoesDaSemana(cb) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');

    /*
    Toda requisição AJAX passa por estados - um deles nos dará os dados
    retornados do servidor.
    Por isso, precisamos interagir com esses estados e especificar que
    adicionaremos os dados de um deles no nosso model.
    O xhr tem a propriedade onreadystatechange, depois, passaremos uma
    arrow funtion que será chamada sempre que o estado do xhr for modificado.
    */
    xhr.onreadystatechange = () => {

      /*
      0: requisição ainda não iniciada
      1: conexão com o servidor estabelecida
      2: requisição recebida
      3: processando requisição
      4: requisição está concluída e a resposta está pronta
      */
      if(xhr.readyState == 4) {

        if(xhr.status == 200) {
          // Executando função recebida por parâmetro que recebe uma mensagem e a resposta
          cb(null, JSON.parse(xhr.responseText)
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        } else {
          console.log(xhr.responseText);
          // Executando função recebida por parâmetro que recebe uma mensagem e a resposta
          cb('Não foi possível obter as negociações da semana', null);
        }
      }
    }

    xhr.send();
  }


  obterNegociacoesDaSemanaAnterior(cb) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/anterior');
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {

          cb(null, JSON.parse(xhr.responseText)
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

        } else {
          console.log(xhr.responseText);
          cb('Não foi possível obter as negociações da semana', null);
        }
      }
    }

    xhr.send();
  }
  
  obterNegociacoesDaSemanaRetrasada(cb) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/retrasada');
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {

          cb(null, JSON.parse(xhr.responseText)
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

        } else {
          console.log(xhr.responseText);
          cb('Não foi possível obter as negociações da semana', null);
        }
      }
    }

    xhr.send();
  }
}
