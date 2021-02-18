class ProxyFactory {

  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {

        if(props.includes(prop) && typeof(target[prop]) == typeof(Function)) {
          return function() {
            console.log(`A propriedade "${prop}" foi interceptada`);

            // Relembrando que arguments é uma variável implícita que possui todos os valores
            // passados por parâmtro na execução da função original

            Reflect.apply(target[prop], target, arguments); // Prossegue com o método original

            // Execução da ação desejada após a execução original
            // Estamos usando return pois não sabemos se a função possuirá, ou não, um retorno
            return acao(target);
          }
        }
        return Reflect.get(target, prop, receiver);
      },


      /*
      Interceptando as atribuições.
      Isso resolverá a atualização da view de Mensagens.
      */
      set(target, prop, value, receiver) {
        if(props.includes(prop)) {
          console.log(`A propriedade "${prop}" foi interceptada`);

          // Precisamos atualizar a propriedade com o novo valor antes de chamar a ação
          target[prop] = value;
          acao(target);
        }
        
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }
}
