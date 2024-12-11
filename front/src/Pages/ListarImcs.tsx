import React from "react";
import { useEffect, useState } from "react";
import { IMC } from "../Models/IMC";
import { Aluno } from "../Models/Aluno";
import "../styles.css"

function ListarImcs() {
    const[imcs, setImcs] = useState<IMC[]>([]);


    useEffect(() => {
        
        fetch("http://localhost:5142/api/listar/imcs")
          .then((resposta) => resposta.json())
          .then((imc) => {
            console.log("IMC recebido:", imc);
            setImcs(imc);
          })
          .catch((error) => console.error("Erro ao buscar IMC's:", error));
      }, []); 



  return (
    <div className="tabela">
      <h2>Lista de IMCS/Alunos</h2>
      <table>
        <thead>
            <tr>
                <th>Id IMC</th>
                <th>Id Aluno</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>IMC</th>
                <th>Classificação</th>
            </tr>
        </thead>
        <tbody>
            {imcs.map((imc)=>(
                <tr key = {imc.id}> 
                <td>{imc.id}</td>
                <td>{imc.alunoId}</td>
                <td>{imc.peso}</td>
                <td>{imc.altura}</td>
                <td>{imc.imcResultado}</td>
                <td>{imc.classificacao}</td>
                </tr>

            ))}
        
        </tbody>
      </table>

      
            
    </div>
  );
}


export default ListarImcs;