<?php
require_once 'Cliente.php';

class Database{    
    private $db;

    function __construct(){
        $this->db = new PDO('sqlite:banco.sqlite');
        $this->createDb();
    }
    
    public function createDb(){
        $this->db -> exec("CREATE TABLE IF NOT EXISTS clientes(
        id INTEGER PRIMARY KEY, 
        nome TEXT, 
        telefone TEXT,
        rua TEXT, 
        numero INTEGER)");
    }

    public function insertClient($nome, $telefone, $rua, $numero) : Cliente{
        error_log("teste");
        $statement = $this->db->prepare("INSERT INTO clientes (nome, telefone, rua, numero) VALUES (:nome, :telefone, :rua, :numero)");
        $statement->bindValue(':nome', $nome);
        $statement->bindValue(':telefone', $telefone);
        $statement->bindValue(':rua', $rua);
        $statement->bindValue(':numero', $numero);
        $statement->execute();
        $cliente = new Cliente($this->db->lastInsertId(),$nome, $telefone, $rua, $numero);
        return $cliente;
    }

    public function updateCliente(Cliente $cliente){
        $update = $this->db->prepare("UPDATE clientes SET nome = :nome, telefone = :telefone, rua = :rua, numero =:numero WHERE id = :id");
        $update->bindValue(':id', $cliente->id);
        $update->bindValue(':nome', $cliente->nome);
        $update->bindValue(':telefone', $cliente->telefone);
        $update->bindValue(':rua', $cliente->rua);
        $update->bindValue(':numero', $cliente->numero);
        $update->execute();
    }

    public function deleteCliente($id){
        $delete  = $this ->db ->prepare("DELETE FROM clientes WHERE id = :id");
        $delete->bindValue(':id', $id);
        $delete -> execute();
    }

    public function getAllClientes(){
        $statement = $this->db->query("SELECT * FROM clientes");
        $clientes = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $clientes[] = new Cliente(
                $row['id'],
                $row['nome'],
                $row['telefone'],
                $row['rua'],
                $row['numero']
            );
        }
    
        return $clientes;

    }
}   
?>