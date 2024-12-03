const { alertar } = require("../src/models/notificacaoModel");

async function pegarDados() { 
    try{
        var response = await fetch(`/notificacao/alertar`, {
            cache: 'no-store'
        });
        var resposta = await response.json();
        // console.log(resposta.numeros);
        return resposta.numeros

    } catch (erro){
        throw new Error(erro);
    }
}



function notificar(resposta){

    var tamanho = sessionStorage.tamanhoListaNotificacao;

    var listaTotal = [];

    var tamanhoMaximo = Number(tamanho) + 50;

   for (let index = tamanho; index < tamanhoMaximo; index++) {
            listaTotal.push(resposta[index])
   }

   listaAtraso = [];

   listaTotal.forEach(elementoAtual => {
        if (elementoAtual > 0) {
            listaAtraso.push(elementoAtual);
        }
   })

   console.log("lista total de dados: " + listaTotal);   
   console.log("lista de atrasos: " + listaAtraso);   

   console.log("Dos " + listaTotal.length + " Voos, " + listaAtraso.length + " são atrasos.");

   const notificacao = document.getElementById('alertaNotify');
   notificacao.style.display = 'flex';
    notificacao.style.animation = 'deslizarbaixo 1s ease-out forwards';

   const textoDentro = document.getElementById('textoDentro');
   textoDentro.innerHTML = "Foram registrados " + listaTotal.length + " novos dados de voos, onde " + listaAtraso.length + " constam como atrasados.";

 
   setTimeout(() => {
    notificacao.style.animation = 'deslizarcima 1s ease-out forwards';
        setTimeout(() => {
            notificacao.style.display = 'none';
        }, 1000);
    }, 5000);


    sessionStorage.tamanhoListaNotificacao = Number(tamanho) + 50;

}

async function chamarNotificar(){
    const dados = await pegarDados();
    notificar(dados);
}