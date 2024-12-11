import React from "react";
import { useEffect, useState } from "react";


function ImcCadastrar() {

const[alunoId, setAlunoId] = useState<number>(0);
const[peso, setPeso] = useState<number>(0);
const[altura, setAltura] = useState<number>(0);


function handleSubmit(e: any){
e.preventDefault();


  const novoImc = {
    alunoId,
    peso,
    altura
  };

  

  fetch("http://localhost:5142/api/cadastrar/IMC" ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoImc)
  
    })

    .then(resposta => {
      if(!resposta.ok){
        throw new Error('Erro na requisição');
      }
      return resposta.json();
    })
    
    .then(data => {
      setPeso(0);
      setAltura(0);
      setAlunoId(0);
    })
    
    .catch(error => {
      console.error('Erro', error);
    })

}


  return (
    <div>
      <h2>Cadastrar novo IMC</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Difite o ID do aluno que quer atribuir o IMC:
          <input type = "number" value={alunoId} onChange = {e => setAlunoId(Number(e.target.value))} required/>
        </label>
        <label>
          Peso:
          <input type = "number" value={peso} onChange = {e => setPeso(Number(e.target.value))} required/>
        </label>
      <label>
        Altura:
        <input type= "number" value={altura} onChange={e => setAltura(Number(e.target.value))} required/>
      </label>

      <button type = "submit">Cadastrar IMC</button>
      </form>
    </div>
  );
}

export default ImcCadastrar;