
let token = '';  

async function enviarEmail() {
    const email = document.getElementById('email').value;
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
            body: JSON.stringify({ email })
            
            
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



