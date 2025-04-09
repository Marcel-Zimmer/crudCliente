<?php
class Cliente{
    public $id;
    public $nome;
    public $telefone;
    public $rua;
    public $numero;

    function __construct($id, $nome, $telefone, $rua, $numero){
        $this->id = $id;
        $this->nome = $nome;
        $this->telefone = $telefone;
        $this->rua = $rua;
        $this->numero = $numero;
    }
}   
?>