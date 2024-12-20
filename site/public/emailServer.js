const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Usar o middleware CORS
app.use(cors());
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

    const destinatario = req.body.destinatario;
    console.log('Destinatário recebido do front-end:', destinatario);

    const htmlBody = `
 <html>
  <head>
    <style>
      /* Resetando margens e padding */
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        background-color: black;
        
      }

      /* Container principal */
      .container {
        color: #f2f2f2;
        width: 100%;
        max-width: 100%;
        margin: 0;
        background-color: #ffffff;
        padding: 0;
        font-family: Arial, sans-serif;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-image: linear-gradient(to bottom, #2f2f2f, #ffffff, #2f2f2f);
        background-position: center;
        height: 90%;
      }

      /* Cabeçalho */
      .header {
        background-color: #2c2c2c; /* Preto */
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 2px;
      }

      /* Conteúdo principal */
      .content {
        padding: 40px 20px;
        color: #ffffff;
        text-shadow: 2px 2px 3px #000000;
        font-size: 18px;
        line-height: 1.6;
        text-align: center;
      }

      /* Caixa de token */
      .token-box {
        background-color: #2c2c2c; /* Preto */
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
        padding: 20px;
        text-align: center;
        border-radius: 8px;
        margin: 30px 0;
        display: inline-block;
      }

      /* Rodapé */
      .footer {
        background-color: #2c2c2c;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        height: 10%;
        background-color: black;
      }

      /* Estilo do link de ajuda */
      .footer a {
        color: #ffffff;
        text-decoration: none;
        font-weight: bold;
      }

      .footer a:hover {
        text-decoration: underline;
      }

      /* Estilo do botão */
      .button {
        display: inline-block;
        padding: 12px 30px;
        background-color: #2c2c2c;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }

      .button:hover {
        background-color: #444;
      }

      /* Responsividade para dispositivos móveis */
      @media screen and (max-width: 600px) {
        .header {
          font-size: 22px;
          padding: 15px;
        }

        .content {
          padding: 20px 10px;
          font-size: 16px;
        }

        .token-box {
          font-size: 28px;
          padding: 15px;
        }

        .footer {
          font-size: 12px;
        }

        .button {
          padding: 10px 25px;
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container" style="background-color: #ffffff;">
      <div class="header">
        Vorteil
      </div>
      <div class="content">
        <p>Olá,</p>
        <p>Obrigado por confiar em nós! Seu token de autenticação é:</p>
        <div class="token-box" >${token}</div>
        <p>Utilize este código para o cadastro de funcionários da sua empresa.</p>
        <p>Se não foi você quem solicitou, por favor, ignore este e-mail.</p>
      </div>
      <div class="footer">
        <p>Este é um e-mail automático. Por favor, não responda.</p>
        <p><a href="#">Ajuda e Suporte</a></p>
      </div>
    </div>
  </body>
</html>

  `;
    
    const mailOptions = {
        from: 'vorteilsptech@gmail.com',
        to: destinatario,
        subject: 'Seu Token de Autenticação',
        html: htmlBody
    };

    transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            return res.status(500).send('Erro ao enviar e-mail: ' + erro);
        }
        // Resposta com o token gerado
        res.status(200).send({
            message: 'E-mail enviado com sucesso',
            token: token
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
