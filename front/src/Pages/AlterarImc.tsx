import React from "react";
import { useEffect, useState } from "react";
import { IMC } from "../Models/IMC";
import { Aluno } from "../Models/Aluno";

function AlterarImc() {
    const[id, setId] = useState<number>(0);
    const[peso, setPeso] = useState<number>(0);
    const[altura, setAltura] = useState<number>(0);


    function buscarImc(e: React.FormEvent) {
        e.preventDefault(); 
    
        fetch("http://localhost:5142/api/listar/imcPorAluno/id:" + id)
        .then((resposta) => {
            if (!resposta.ok) {
              throw new Error("IMC não encontrado");
            }
            return resposta.json();
          })

          .catch((error) => {
            throw new Error("IMC não encontrado");
          })
       
      }
    
    
      function imcAlterar(e: React.FormEvent){
    
          const imcAtualizado = {peso, altura};
    
          fetch("http://localhost:5142/api/alterar/imc/id:" + id ,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(imcAtualizado)
          })
          .then((resposta) => {
              if(!resposta.ok){
                  throw new Error ("Erro ao atualizar o IMC")
              }
              return resposta.json();
          })
          .then(()=> {
              setPeso(0);
              setAltura(0);
          })
          .catch(()=>{
              throw new Error ("Erro ao atualizar o IMC")
          });
    
        }
    
    
    




  return (
    <div className="conteiner">
      <h2>Digite o ID do Aluno que terá o IMC alterado</h2>
      <form onSubmit={buscarImc}>
        <label>
            Digite o ID:
            <input 
             type = "number" 
             value={id}
             onChange={e => setId(Number(e.target.value))}
             required
             />
        </label>
        <button type = "submit">Procurar</button>
      </form>

      <form onSubmit={imcAlterar}>
        <label>
            Digite as informações a serem mudadas no IMC:
            <input 
             type = "number" 
             value={peso}
             onChange={e => setPeso(Number(e.target.value))}
             required
             />
             <input 
             type = "number" 
             value={altura}
             onChange={e => setAltura(Number(e.target.value))}
             required
             />
        </label>
        <button type = "submit">Alterar</button>
      </form>
    </div>
  );
}


export default AlterarImc;