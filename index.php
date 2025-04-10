<?php
require_once 'Cliente.php';
require_once 'Database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$db =  new Database();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if($_POST['tipo'] === "inserir"){
        $nomeCliente = $_POST['nome'] ?? 'Desconhecido';
        $telefoneCliente = $_POST['telefone'] ?? 'não informada';
        $emailCliente = $_POST['email'] ?? 'Desconhecido';
        $ruaCliente = $_POST['rua'] ?? 'não informada';
        $numeroCliente = $_POST['numero'] ?? 'não informada';
        $cliente = $db -> insertClient($nomeCliente, $emailCliente, $telefoneCliente, $ruaCliente, $numeroCliente);
    }
    else if($_POST['tipo'] === "atualizar"){
        $idCliente = $_POST['id'] ?? 'Desconhecido';
        $nomeCliente = $_POST['nome'] ?? 'Desconhecido';
        $telefoneCliente = $_POST['telefone'] ?? 'não informada';
        $emailCliente = $_POST['email'] ?? 'Desconhecido';
        $ruaCliente = $_POST['rua'] ?? 'não informada';
        $numeroCliente = $_POST['numero'] ?? 'não informada';
        $cliente = $db -> updateCliente($idCliente,$nomeCliente, $emailCliente, $telefoneCliente, $ruaCliente, $numeroCliente);
    }

} 
?>