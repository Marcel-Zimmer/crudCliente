<?php
class Cliente{
    public $id;
    public $nome;
    public $email;
    public $telefone;
    public $rua;
    public $numero;

    function __construct($id, $nome, $telefone, $email, $rua, $numero){
        $this->id = $id;
        $this->nome = $nome;
        $this->telefone = $telefone;
        $this->rua = $rua;
        $this->numero = $numero;
        $this->email = $email;
    }
}   
?>