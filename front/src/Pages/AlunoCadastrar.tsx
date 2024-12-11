import React from "react";
import { useEffect, useState } from "react";


function AlunoCadastrar() {
  
const[nome, setNome] = useState<string>('');
const[sobrenome, setSobrenome] = useState<string>('');


function handleSubmit(e: any){
e.preventDefault();


  const novoAluno = {
    nome,
    sobrenome
  };

  

  fetch("http://localhost:5142/api/cadastrar/aluno" ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoAluno)
  
    })

    .then(resposta => {
      if(!resposta.ok){
        throw new Error('Erro na requisição');
      }
      return resposta.json();
    })
    
    .then(data => {
      setNome('');
      setSobrenome('');
    })
    
    .catch(error => {
      console.error('Erro', error);
    })

}


  return (
    <div>
      <h2>Cadastrar novo Aluno</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type = "text" value={nome} onChange = {e => setNome(e.target.value)} required/>
        </label>
      <label>
        Sobrenome:
        <input type= "text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} required/>
      </label>

      <button type = "submit">Cadastrar Aluno</button>
      </form>
    </div>
  );
}

export default AlunoCadastrar;