//cria um array global os clientes 
const clientes = [];

//função que recebe ação de inserir um cliente e envia para o controller 
function inserirCliente(formulario,event) {
  event.preventDefault()
    if(validarFormulario(formulario)){
      const dados = new FormData(formulario);
      dados.append("tipo","inserir")
      fetch('./modulos/Controller.php', {
        method: 'POST',
        body: dados
      })
      .then(res => res.json())
      .then(data => {renderizarClientesCriados(data)
        mostrarToast("cliente criado com suecesso")
      })
      .catch(error => {
        console.error("Erro ao inserir cliente:", error);
      });
    }

  }

  //função que recebe a ação de atualizar do botão e envia para o controller 
  function atualizarCliente(formulario, event) {
    event.preventDefault();
    if(validarFormulario(formulario)){
      const dados = new FormData(formulario);
      dados.append("tipo", "atualizar");
      fetch('./modulos/Controller.php', {
        method: "POST",
        body: dados
      })
      .then(res => res.json()) 
      .then(data => {
        editarHtmlCliente(data)
        fecharModal()
        mostrarToast("cliente atualizado com suecesso")
      })
        .catch(error => {
          console.error("Erro ao atualizar cliente:", error);
        });
    }
  }

  //função que recebe a ação de deletar o botão e envia para o controller
  function deletarCliente(idCliente, event) {
    event.preventDefault();
    const dados = new FormData();
    dados.append('id', idCliente);
    dados.append('tipo', 'deletar');
  
    fetch('./modulos/Controller.php', {
      method: "POST",
      body: dados
    })
    .then(res => res.json())
    .then(data => {
      excluirHtmlCliente(data);
      mostrarToast("cliente deletado com suecesso")
    })
    .catch(error => {
      console.error("Erro ao deletar cliente:", error);
    });
  }

  //função que chama o controller para listar todos os clientes
  function listarClientes(event){
    event.preventDefault();
    const dados = new FormData();
    dados.append('tipo', "listarTodosClientes");
    fetch('./modulos/Controller.php', {
      method: "POST",
      body: dados
    })
    .then(res => res.json())
    .then(data => {
      clientes.length = 0; 
      data.forEach(cliente => {
        renderizarClientesCriados(cliente);
      });
    })
    .catch(error => {
      console.error("Erro ao deletar cliente:", error);
    });
  }

//exlui o html do cliente referenciado pelo id 
function excluirHtmlCliente(idCliente){ 
  const card = document.getElementById(`cliente-${idCliente}`);
  card.remove();
}

//limpa todos os clientes do html 
function limparClientes(event){
  event.preventDefault();
  const container = document.getElementById("resposta");
  container.innerHTML = ""; 
}

//abri o modal do bootstrap com as informações do cliente para edição 
function abrirModalEditar(id,event) {
  event.preventDefault()
  const cliente = clientes.find(c => parseInt(c.id) === id); 
  if (!cliente) return;

  const form = document.getElementById("form-editar-cliente");
  form.id.value = cliente.id;
  form.nome.value = cliente.nome;
  form.telefone.value = cliente.telefone;
  form.email.value = cliente.email;
  form.rua.value = cliente.rua;
  form.numero.value = cliente.numero;

  const modal = new bootstrap.Modal(document.getElementById("editarClienteModal"));
  modal.show();
}

function fecharModal(){
  const modal = document.getElementById("editarClienteModal");
  const instanciaModal =  bootstrap.Modal.getInstance(modal);
  instanciaModal.hide();
}

//edita no html as informações adicionadas no modal 
function editarHtmlCliente(cliente) {
  const card = document.getElementById(`cliente-${cliente.id}`);
  if (!card) return;
  const indice = clientes.findIndex(usuario => parseInt(usuario.id) === parseInt(cliente.id));
  clientes[indice].nome = cliente.nome 
  clientes[indice].telefone = cliente.telefone 
  clientes[indice].email = cliente.email 
  clientes[indice].rua = cliente.rua
  clientes[indice].numero = cliente.numero 
  card.innerHTML = htmlDoCliente(cliente)

}

//adiciona a pagina um card do cliente com suas informações e os botões 
function renderizarClientesCriados(cliente) {
  clientes.push(cliente)
  const container = document.getElementById("resposta");
  const card = document.createElement("div");
  card.className = "d-flex justify-content-center mb-3";
  card.innerHTML = `
    <div class="card w-100" id="cliente-${cliente.id}" style="max-width: 600px;">
      <div class="card-body">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">ID:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.id}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Nome:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.nome}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Telefone:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.telefone}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Email:</label>
            <div class="col-sm-9">
              <input type="email" class="form-control" value="${cliente.email}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Rua:</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" value="${cliente.rua}" disabled>
            </div>
            <label class="col-sm-1 col-form-label text-end">Nº:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" value="${cliente.numero}" disabled>
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-warning me-2" onclick="abrirModalEditar(${cliente.id},event)">Editar</button>
            <button class="btn btn-danger" onclick="deletarCliente(${cliente.id},event)">Excluir</button>
          </div>
        </form>
      </div>
    </div>
  `;
  container.appendChild(card);
}

//função para reutilizar o html 
function htmlDoCliente(cliente){
  return `
    <div class="card w-100" id="cliente-${cliente.id}" style="max-width: 600px;">
      <div class="card-body">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">ID:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.id}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Nome:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.nome}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Telefone:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" value="${cliente.telefone}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Email:</label>
            <div class="col-sm-9">
              <input type="email" class="form-control" value="${cliente.email}" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Rua:</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" value="${cliente.rua}" disabled>
            </div>
            <label class="col-sm-1 col-form-label text-end">Nº:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" value="${cliente.numero}" disabled>
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-warning me-2" onclick="abrirModalEditar(${cliente.id},event)">Editar</button>
            <button class="btn btn-danger" onclick="deletarCliente(${cliente.id},event)">Excluir</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

//valida o formulário antes de passar para o controller 
function validarFormulario(formulario) {
  const telefoneInput = formulario.telefone;
  const telefone = telefoneInput.value.trim();
  const nome = formulario.nome;
  const email = formulario.email;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rua = formulario.rua;
  const numeroRua = formulario.numero;

  if (nome.value.trim() === "") {
    nome.classList.add("is-invalid");
    nome.classList.remove("is-valid");
    return false;
  } else {
    nome.classList.remove("is-invalid");
    nome.classList.add("is-valid");
  }

  if (telefone.length < 8 || telefone.length > 10) {
    telefoneInput.classList.add("is-invalid");
    telefoneInput.classList.remove("is-valid");
    return false;
  } else {
    telefoneInput.classList.remove("is-invalid");
    telefoneInput.classList.add("is-valid");
  }

  if (!regexEmail.test(email.value.trim())) {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    return false;
  } else {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  }

  if (rua.value.trim() === "") {
    rua.classList.add("is-invalid");
    rua.classList.remove("is-valid");
    return false;
  } else {
    rua.classList.remove("is-invalid");
    rua.classList.add("is-valid");
  }
  if (numeroRua.value.trim() === "") {
    numeroRua.classList.add("is-invalid");
    numeroRua.classList.remove("is-valid");
    return false;
  } else {
    numeroRua.classList.remove("is-invalid");
    numeroRua.classList.add("is-valid");
  }

  return true;
}

//função para mostrar uma mensagem para o usuário 
function mostrarToast(mensagem) {
   tipo = "success"
  const toastEl = document.getElementById("toast-feedback");
  const toastBody = document.getElementById("toast-body");

  toastBody.textContent = mensagem;
  toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}