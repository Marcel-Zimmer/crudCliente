const clientes = [];

function inserirCliente(formulario) {
    const dados = new FormData(formulario);
    dados.append("tipo","inserir")
  
    fetch('index.php', {
      method: 'POST',
      body: dados
    })
    .then(res => res.json())
    .then(data => renderizarClientes(data))
    .catch(error => {
      document.getElementById('resposta').innerHTML = 'Erro: ' + error;
    });
  }

  function atualizarCliente(formulario, event) {
    event.preventDefault();
    const dados = new FormData(formulario);
    dados.append("tipo", "atualizar");

    fetch("index.php", {
      method: "POST",
      body: dados
    })
    .then(res => res.json()) // <--- veja como resposta bruta
    .then(data => {
      editarHtmlCliente(data)
    })
      .catch(error => {
        console.error("Erro ao atualizar cliente:", error);
      });
  }


  function editarCliente(idCliente, event) {
    event.preventDefault();
    let cliente = clientes.find(cliente =>cliente.id === idCliente)

    const modalExistente = document.getElementById("editarClienteModal");
    if (modalExistente) {
      modalExistente.remove();
    }
    const modalHTML = htmlCliente(cliente)
  
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  
    const modalElement = document.getElementById("editarClienteModal");
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
function excluirCliente(idCliente){
  
}
function renderizarClientes(cliente) {
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

          <!-- Botões de ação -->
          <div class="text-center mt-4">
            <button class="btn btn-warning me-2" onclick="abrirModalEditar(${cliente.id},event)">Editar</button>
            <button class="btn btn-danger" onclick="excluirCliente(${cliente.id})">Excluir</button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.appendChild(card);
}
function abrirModalEditar(id,event) {
  event.preventDefault()
  const cliente = clientes.find(c => c.id === id); // Pega cliente pelo ID
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

function htmlCliente(cliente){
  return `
      <div class="modal fade" id="editarClienteModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <form onsubmit="atualizarCliente(this, event); return false;">
              <div class="modal-header">
                <h5 class="modal-title">Editar Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">ID:</label>
                  <div class="col-sm-9 pt-2">
                    <input type="text" class="form-control" name="id" value="${cliente.id}" readonly>
                    </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Nome:</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" name="nome" value="${cliente.nome}" required>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Telefone:</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" name="telefone" value="${cliente.telefone}" required>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Email:</label>
                  <div class="col-sm-9">
                    <input type="email" class="form-control" name="email" value="${cliente.email}" required>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Rua:</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" name="rua" value="${cliente.rua}" required>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Número:</label>
                  <div class="col-sm-9">
                    <input type="number" class="form-control" name="numero" value="${cliente.numero}" required>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary" >Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
}

function editarHtmlCliente(cliente) {
  const card = document.getElementById(`cliente-${cliente.id}`);
  if (!card) return;

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${cliente.nome}</h5>
      <p class="card-text">
        <strong>Telefone:</strong> ${cliente.telefone}<br>
        <strong>Email:</strong> ${cliente.email}<br>
        <strong>Rua:</strong> ${cliente.rua}, Nº ${cliente.numero}
      </p>
      <button class="btn btn-warning" onclick="abrirModalEditar(${cliente.id})">Editar</button>
      <button class="btn btn-danger" onclick="removerCliente(${cliente.id})">Excluir</button>
    </div>
  `;
}