<?php
require_once 'Cliente.php';
require_once 'databaseCredentials.php';

class Database{    
    private $db;
    

    function __construct(){
        global $servername, $username, $password, $dbname;
        $this->db = new mysqli($servername, $username, $password, $dbname);
        $this->createDb();
    }
    
    public function createDb(){
        $this->db -> query("CREATE TABLE IF NOT EXISTS clientes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        telefone VARCHAR(20),
        rua VARCHAR(100),
        numero INT)");
    }

    public function insertClient($nome,$email, $telefone, $rua, $numero) : Cliente{

        $statement = $this->db->prepare("INSERT INTO clientes (nome,email, telefone, rua, numero) VALUES (?, ?, ?, ?, ?)");
        $statement->bind_param("ssssi", $nome, $email, $telefone, $rua, $numero);
        $statement->execute();
        $id = $this->db->insert_id;
        $cliente = new Cliente($id,$nome, $telefone,$email, $rua, $numero);
        header('Content-Type: application/json');
        echo json_encode($cliente);
        exit; 
    }
 
    public function updateCliente($id, $nome, $email, $telefone, $rua, $numero) {
        $update = $this->db->prepare("UPDATE clientes SET nome = ?, email = ?, telefone = ?, rua = ?, numero = ? WHERE id = ?");
        $update->bind_param("ssssii", $nome, $email, $telefone, $rua, $numero, $id);
        $update->execute();
        $cliente = new Cliente($id, $nome, $telefone, $email, $rua, $numero);
        header('Content-Type: application/json');
        echo json_encode($cliente);
        exit; 
    }

    public function deleteCliente($id){
        $delete  = $this ->db ->prepare("DELETE FROM clientes WHERE id = ?");
        $delete->bind_param("i", $id);
        $delete -> execute();
    }

    public function getAllClientes(){
        $clientes = [];
        $result = $this->db->query("SELECT * FROM clientes");
        
        while ($row = $result->fetch_assoc()) {
            $clientes[] = new Cliente(
                $row['id'],
                $row['nome'],
                $row['email'],
                $row['telefone'],
                $row['rua'],
                $row['numero']
            );
        }
        header('Content-Type: application/json');
        echo json_encode($clientes);
        exit; 

    }
}   
?>