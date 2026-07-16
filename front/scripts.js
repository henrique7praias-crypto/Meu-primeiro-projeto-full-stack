const formulario = document.getElementById("SuaMensagemForm");

    formulario.addEventListener("submit",(event) => {
        event.preventDefault();
        
        const nome = event.target.nome.value;
        const email = event.target.email.value;
        const mensagem = event.target.mensagem.value;
            

        const dados = { 
            nome: nome,
            email: email,
            mensagem: mensagem
        };
            
        const dadosJson = JSON.stringify(dados);
        fetch("http://localhost:3000/mensagem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dadosJson
                
        })
        .then(response => response.json())
        .then(data => {
                alert(data.message);
                event.target.reset();
            })
            .catch(error =>{
            console.error("Erro ao enviar os dados:", error);
    });
});