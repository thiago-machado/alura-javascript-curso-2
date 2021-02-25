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
              JSON.parse(xhr.responseText) // pegando o resultando e convertendo em JSON
              .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) // mapeando cada objeto da lista em uma instância de negociação
              .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)) // iterando a lista de negociações que foi criada com o map e adcionando cada negociação em _listaNegociacoes
              this._mensagem.texto = 'Negociações importadas com sucesso.';
            } else {
              console.log(xhr.responseText);
              this._mensagem.texto = 'Não foi possível obter as negociações do servidor.';
            }
          }
        }
        xhr.send();
      }
    }
