
let token = '';  
let emailUsuarioTrocaDeSenha = ''
async function enviarEmail() {
    emailUsuarioTrocaDeSenha = document.getElementById('email').value;
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');

    div1.style.display = "none";
    div2.style.display = "flex";
    

    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailUsuarioTrocaDeSenha })
            
            
        });
    
        const data = await response.json();
        alert(data.message);
        await receberToken();

    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        alert('Erro ao enviar e-mail.');
    }
}

const blocks = document.querySelectorAll('.input-block');
const resultDisplay = document.getElementById('result');

function checkAllBlocks() {
    let allFilled = true;
    let result = '';

    blocks.forEach(block => {
        if (block.value === '') {
            allFilled = false;
        } else {
            result += block.value;
        }
    });

    const div2 = document.getElementById('div2');
    const div3 = document.getElementById('div3');

    if (allFilled) {
        if (token === result) {
            div2.style.display = "none";
            div3.style.display = "flex";
        } else {
            resultDisplay.textContent = 'Erro';
        }
    }
}

blocks.forEach((block, index) => {
    block.addEventListener('input', () => {
        if (block.value.length === 1 && index < blocks.length - 1) {
            blocks[index + 1].focus();
        }
        checkAllBlocks();
    });
});

async function receberToken() {
    try {
        const response = await fetch('http://localhost:3000/get-token');
        const data = await response.json();
        token = data.token;
        console.log('Token recebido:', token);
    } catch (error) {
        console.error('Erro ao obter token:', error);
    }
}


function atualizarSenha(params) {
    const senha = new_senha_input.value
    const confirmar_senha = new_confirmar_senha_input.value
    if (senha != confirmar_senha) {
       return alert("As senhas não são iguais")
    }

    fetch("../usuarios/atualizarSenha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senhaServer: senha,
          emailServer: emailUsuarioTrocaDeSenha,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
    
          if (resposta.ok) {
            setTimeout(() => {
              alert("Senha trocada com sucesso")
            }, 1000);
          } else {
            throw new Error("Houve um erro ao tentar realizar a troca de avatar!");
          }
        })
        .catch(function (erro) {
          console.error("#ERRO: ", erro);
        });
  
}


