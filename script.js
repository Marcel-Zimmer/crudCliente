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
    .then(res => res.text()) // <--- veja como resposta bruta
    .then(text => {
      console.log("Resposta bruta:", text); // 👈 veja o que o PHP realmente respondeu
      const json = JSON.parse(text); // tente transformar em JSON
      console.log("JSON convertido:", json);
      // continue o fluxo aqui...
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
    const modalHTML = `
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
    <div class="card w-100" style="max-width: 600px;">
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
            <button class="btn btn-warning me-2" onclick="editarCliente(${cliente.id},event)">Editar</button>
            <button class="btn btn-danger" onclick="excluirCliente(${cliente.id})">Excluir</button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.appendChild(card);
}