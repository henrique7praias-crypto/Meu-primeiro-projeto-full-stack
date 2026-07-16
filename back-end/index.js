const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

mongoose.connect("mongodb+srv://henrique7praias_db_user:Henriq25@projetin.rkwepjp.mongodb.net/projetin?retryWrites=true&w=majority")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(error => console.error("Erro ao conectar ao MongoDB", error));
    
const usuarioSchema= new mongoose.Schema({
    nome: String,
    email: String,
    mensagem: String
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

const app = express();
app.use(express.json());

app.use(cors());

app.post("/mensagem_feedback", (req, res) => {
    const { nome, email, mensagem } = req.body;
    Usuario.findOne({ email })
        .then(emailexistente => {
            if (emailexistente)
                return res.status(400).json({ mensagem: "Feedback já enviado" });
            const novoUsuario = new Usuario({ nome, email, mensagem });
            return novoUsuario.save()
                .then(() => res.status(200).json({ mensagem: "Mensagem enviada com sucesso" }));
        })
        .catch(error => {
            console.error("Erro ao enviar a mensagem",error);
            return res.status(500).json({ mensagem: "Erro no servidor."});
        });
});

app.post("/mensagem", (req, res) => {
    const { nome, email, mensagem } = req.body;
    if (!nome || !email || !mensagem) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    console.log("Mensagem recebida:", { nome, email, mensagem });
    return res.status(200).json({ message: "Mensagem recebida com sucesso" });
});

app.listen(3000, () => {
    console.log(`API rodando na porta http://localhost:3000`)
});