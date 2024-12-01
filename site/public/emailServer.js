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

    const htmlBody = `
    <html>
      <head>
        <style>
          /* Estilos do e-mail */
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Vorteil
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Obrigado por confiar em nós. Seu token de autenticação é:</p>
            <div class="token-box">${token}</div>
            <p>Utilize este código para concluir a autenticação em nossa plataforma.</p>
          </div>
          <div class="footer">
            <p>Este é um e-mail automático. Por favor, não responda.</p>
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
