class HttpService {

  _handleErrors(res) {
    if(res.ok) { // Se true, significa que o server respondeu e o status está entre 200 e 299
      return res;
    } else {
      throw new Error(res.statusText); // Lançando exceção com o texto do erro
    }
  }

  /*
  Conexão usando fetch
  No ES 2016, foi incluída uma API com o objetivo de simplificar a criação de
  requisições Ajax: Fetch API, uma API de busca do JS.
  */
  get(url) {
    /*
    Qualquer exceção será "pega" pelo catch de quem estiver chamando essa função
    */
    return fetch(url)
    .then(res => this._handleErrors(res))
    .then(res => res.json()); // Retornando a resposta como um JSON
  }


  post(url, dado) {
    /*
    Similar ao get, qualquer exceção será "pega" por quem estiver chamando esse método.
    Acessar: http://localhost:3000/post.html
    */
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(dado) // Precisa enviar os dados como texto
    })
    .then(res => this._handleErrors(res));
  }
}
