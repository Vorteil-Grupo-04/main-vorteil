function deletarToken() {
    const idEmpresa = sessionStorage.getItem('ID_EMPRESA');
    fetch(`/token/deleteToken`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify({      
        EmpresaServer: idEmpresa,
        codigoServer: codigoToken
  
    })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO enviarForum()!")
  
      if (resposta.ok) {
          console.log(resposta);
          
          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));
                window.location = "forum.html";
  
               
          });
  
      } else {
          console.log("Houve um erro ao tentar realizar o enviarForum!");        
      }
    
  })
  }