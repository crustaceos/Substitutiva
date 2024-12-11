import { Aluno } from "./Aluno";
export interface IMC{
    id:number;
    alunoId:number;
    aluno:Aluno;
    imcResultado:number;
    classificacao:string;
    peso:number;
    altura:number;  
}