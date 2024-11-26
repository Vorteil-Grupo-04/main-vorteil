const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o CORS

const app = express();
const port = 3000;

// Usar o middleware CORS
app.use(cors());  // Permite que o servidor aceite requisições de qualquer origem
app.use(bodyParser.json());

// Função para gerar o token
function gerarToken(numCaracteres) {
    return Math.random().toString(36).slice(2, 2 + numCaracteres);
}

// Configuração do transporter Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'vorteilsptech@gmail.com',
        pass: 'crfodnfhtwbnshpw'
    }
});

// Rota para enviar o e-mail
app.post('/enviar-email', (req, res) => {
    const token = gerarToken(8);

    const htmlBody = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fc;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          .header {
            text-align: center;
            padding: 20px;
            background-color: #1e3c72;
            color: #ffffff;
            border-radius: 8px;
            font-size: 32px;
            font-weight: bold;
          }
          .airplane {
            text-align: center;
            font-size: 60px;
            color: #ffcc00;
            margin-top: 20px;
          }
          .content {
            font-size: 18px;
            color: #333;
            text-align: center;
          }
          .content p {
            margin-bottom: 20px;
          }
          .token-box {
            background-color: #f49c42;
            color: white;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px;
            display: inline-block;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 30px;
          }
          .footer a {
            color: #1e3c72;
            text-decoration: none;
          }
          .footer p {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Vorteil
          </div>
          <div class="airplane">
            ✈️
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Obrigado por confiar em nós. Seu token de autenticação é:</p>
            <div class="token-box">${token}</div>
            <p>Utilize este código para concluir a autenticação em nossa plataforma.</p>
          </div>
          <div class="footer">
            <p>Este é um e-mail automático. Por favor, não responda.</p>
            <p>Se você tiver algum problema, entre em contato conosco através do nosso <a href="https://www.exemplo.com/contato">suporte</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;


    const mailOptions = {
        from: 'vorteilsptech@gmail.com',
        to: 'melooliveirajuan2@gmail.com',
        subject: 'Seu Token de Autenticação',
        html: htmlBody
    };
    transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            return res.status(500).send('Erro ao enviar e-mail: ' + erro);
        }
        res.status(200).send('E-mail enviado com sucesso: ' + info.response);
        fetch("../empresa/cadastrarEmpresa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tokenServer: token,
              idEmpresaServer: sessiontorage.ID_EMPRESA 
            }),
          })
            .then(function (resposta) {
              console.log("resposta: ", resposta);
        
              if (resposta.ok) {
                setTimeout(() => {
                  alert("Empresa Cadastrada!")
                }, "2000");
       
              } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
              }
            })
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
