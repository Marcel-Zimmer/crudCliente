<?php
require_once 'Cliente.php';
require_once 'databaseCredentials.php';

class Database{    
    private $db;
    
    //quando a classe é instancia é criado uma instancia da conexão do banco de dados com as informações do bd 
    function __construct(){
        global $servername, $username, $password, $dbname;
        $this->db = new mysqli($servername, $username, $password, $dbname);
        $this->createDb();
    }

    //cria o banco de dados caso ainda não esteja criado 
    public function createDb(){
        $this->db -> query("CREATE TABLE IF NOT EXISTS clientes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100),
        telefone VARCHAR(20),
        rua VARCHAR(100),
        numero INT)");
    }

    //insere o cliente no banco de dados e retorna o cliente 
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
    
    //atualiza o cliente no bd e retorna o cliente atualizado 
    public function updateCliente($id, $nome, $email, $telefone, $rua, $numero) {
        $update = $this->db->prepare("UPDATE clientes SET nome = ?, email = ?, telefone = ?, rua = ?, numero = ? WHERE id = ?");
        $update->bind_param("ssssii", $nome, $email, $telefone, $rua, $numero, $id);
        $update->execute();
        $cliente = new Cliente($id, $nome, $telefone, $email, $rua, $numero);
        header('Content-Type: application/json');
        echo json_encode($cliente);
        exit; 
    }

    //deleta o cliente passado via id e retorna o id deletado
    public function deleteCliente($id){
        $delete  = $this ->db ->prepare("DELETE FROM clientes WHERE id = ?");
        $delete->bind_param("i", $id);
        $delete -> execute();
        header('Content-Type: application/json');
        echo json_encode($id);
        exit; 
    }

    //retorna todos os cliente do banco 
    public function getAllClientes(){
        $clientes = [];
        $result = $this->db->query("SELECT * FROM clientes");
        
        while ($row = $result->fetch_assoc()) {
            $clientes[] = new Cliente(
                $row['id'],
                $row['nome'],
                $row['telefone'],
                $row['email'],
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