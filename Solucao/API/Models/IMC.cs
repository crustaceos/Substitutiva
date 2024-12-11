using Microsoft.Net.Http.Headers;

namespace API.Models;


public class IMC{
    public int id{get;set;}
    public int alunoId{get;set;}
    public Aluno? aluno{get;set;}
    public double imcResultado{get;set;}
    public string? classificacao{get;set;}
    public double peso{get;set;}
    public double altura{get;set;}

}