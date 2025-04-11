<?php
require_once 'Cliente.php';
require_once 'Database.php';

$db =  new Database();
// se o metodo de envio dos dados é do tipo post 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    //se operação vai ser do tipo inserir 
    if($_POST['tipo'] === "inserir"){
        $nomeCliente = $_POST['nome'] ?? 'Desconhecido';
        $telefoneCliente = $_POST['telefone'] ?? 'não informada';
        $emailCliente = $_POST['email'] ?? 'Desconhecido';
        $ruaCliente = $_POST['rua'] ?? 'não informada';
        $numeroCliente = $_POST['numero'] ?? 'não informada';
        $cliente = $db -> insertClient($nomeCliente, $emailCliente, $telefoneCliente, $ruaCliente, $numeroCliente);
    }
    
    //operação no caso de atualizar 
    else if($_POST['tipo'] === "atualizar"){
        $idCliente = $_POST['id'] ?? 'Desconhecido';
        $nomeCliente = $_POST['nome'] ?? 'Desconhecido';
        $telefoneCliente = $_POST['telefone'] ?? 'não informada';
        $emailCliente = $_POST['email'] ?? 'Desconhecido';
        $ruaCliente = $_POST['rua'] ?? 'não informada';
        $numeroCliente = $_POST['numero'] ?? 'não informada';
        $cliente = $db -> updateCliente($idCliente,$nomeCliente, $emailCliente, $telefoneCliente, $ruaCliente, $numeroCliente);
    }

    //operação para deletar um cliente 
    else if($_POST['tipo'] === "deletar"){
        $idCliente = $_POST['id'] ?? 'Desconhecido';
        $cliente = $db -> deleteCliente($idCliente);
    }

    //operação para listar todos os clientes 
    else{
        $db -> getAllClientes();
    }
} 
?>