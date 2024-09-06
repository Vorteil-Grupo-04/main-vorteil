const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

function gerarToken(numCaracteres) {
    return Math.random().toString(36).slice(2, 2 + numCaracteres);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: {
        user: 'vorteilsptech@gmail.com',
        pass: 'crfodnfhtwbnshpw'
    }
});


let token = gerarToken(7);
app.post('/send-email', (req, res) => {
    const destinatario = req.body.email;

    const mailOptions = {
        from: 'vorteilsptech@gmail.com',
        to: destinatario,
        subject: 'Token de acesso a Vorteil',
        text: `Seu token é: ${token}`
    };

    transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            console.error('Erro ao enviar e-mail:', erro);
            return res.status(500).json({ error: erro.toString() });
        }
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    });
});

app.get('/get-token', (req, res) => {
    res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});