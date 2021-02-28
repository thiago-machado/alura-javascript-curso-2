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
        Quando o nosso servidor, via AJAX, buscar a negociação e estiver tudo pronto,
        ele chamará a função que adicionamos no parâmetro.
        */
        service.obterNegociacoesDaSemana((erro, negociacoes) => {

          /*
          Em casos de erro, ele será descoberto sempre no primeiro parâmetro e
          o resultado da operação virá no segundo.
          Estamos aplicando um padrão que vem do mundo NodeJS,
          e que recebe o nome de Error-First-Callback.
          */
          if(erro) {
            this._mensagem.texto = erro;
            return;
          }

          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociações importadas com sucesso';
        });
      }
    }
