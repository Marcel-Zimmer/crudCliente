function enviarFormulario(formulario) {
    const dados = new FormData(formulario);
  
    fetch('index.php', {
      method: 'POST',
      body: dados
    })
    .then(res => res.text())
    .then(data => {
      document.getElementById('resposta').innerHTML = data;
    })
    .catch(error => {
      document.getElementById('resposta').innerHTML = 'Erro: ' + error;
    });
  }