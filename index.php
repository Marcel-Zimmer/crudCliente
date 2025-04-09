<?php
require_once 'Cliente.php';
require_once 'Database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nomeCliente = $_POST['nome'] ?? 'Desconhecido';
    $telefoneCliente = $_POST['telefone'] ?? 'não informada';
    $ruaCliente = $_POST['rua'] ?? 'não informada';
    $numeroCliente = $_POST['numero'] ?? 'não informada';

    $db =  new Database();
    $cliente = $db -> insertClient($nomeCliente,$telefoneCliente, $ruaCliente, $numeroCliente);

    echo "<h1> id : {$cliente->id}</h1>";
    echo "<h1> id : {$cliente->nome}</h1>";
    echo "<h1> id : {$cliente->telefone}</h1>";
    echo "<h1> id : {$cliente->rua}</h1>";
    echo "<h1> id : {$cliente->numero}</h1>";
} 
?>