class NegociacaoController {

  constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade =  $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia');

      this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($('#mensagemView')),
        'texto');
      }

      adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';

        this._limpaFormulario();
      }

      _criaNegociacao() {
        return new Negociacao(
          DateHelper.textoParaData(this._inputData.value),
          this._inputQuantidade.value,
          this._inputValor.value
        );
      }

      // Criar um método começando com underline, indica que é um método privado e que deveria ser
      // acessado somente por essa classe
      _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
      }

      // Limpa a tabela caso o usuário clique no botão Apagar
      apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
      }

      importaNegociacoes() {

        let service = new NegociacaoService();

        /*
        Se observarmos o método obterNegociacoesDaSemana(), veremos que este
        não recebe mais o callback - apenas nos devolverá um valor.
        Parecerá ser um método síncrono.
        No entanto, ele não é. Porque ele não devolverá a lista de negociações,
        mas, sim, uma promise - que não poderá encontrar o que busca.
        A promessa é o resultado futuro de uma operação.
        Quando pensamos no conceito de uma promessa, nos vem a ideia de que
        "se você cumprir a promessa, então algo irá acontecer...".
        Seguindo está relação com então, chamaremos o método then() na promise.

        Se a promessa for cumprida, receberemos a lista de negociação e,
        com esta, poderemos fazer o forEach(). O método obterNegociacoesDaSemana()
        devolve uma promessa de que tentará obter os dados.
        Caso a promessa seja cumprida, receberemos uma lista de negociações e
        exibiremos a mensagem para o usuário.
        Para o caso de ocorrer um erro, vamos encadear uma função catch(), na promise.
        */
        service.obterNegociacoesDaSemana()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
          });
          this._mensagem.texto = 'Negociações importadas com sucesso'
        })
        .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
          });
          this._mensagem.texto = 'Negociações importadas com sucesso'
        })
        .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
          });
          this._mensagem.texto = 'Negociações importadas com sucesso'
        })
        .catch(erro => this._mensagem.texto = erro);
      }
    }
