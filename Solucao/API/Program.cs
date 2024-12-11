using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapPost("/api/cadastrar/aluno", ([FromBody] Aluno aluno, [FromServices] AppDbContext ctx) =>{
    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created("",aluno);
});

app.MapPost("/api/cadastrar/IMC", ([FromBody] IMC imc, [FromServices] AppDbContext ctx) => {
    Aluno? alunoIMC = ctx.Alunos.FirstOrDefault(a => a.id == imc.alunoId);

    if (alunoIMC is null){
        return Results.NotFound("Aluno não possui cadastro");
    }

    imc.aluno = alunoIMC;

    imc.imcResultado = imc.peso / (imc.altura * imc.altura);

    if(imc.imcResultado < 18.5) imc.classificacao = "Magreza -- Obesidade (Grau) 0";
    if(imc.imcResultado >= 18.6) imc.classificacao = "Normal -- Obesidade (Grau) 0";
    if(imc.imcResultado>= 25.0) imc.classificacao = "Sobrepeso -- Obesidade (Grau) I";
    if(imc.imcResultado>= 30.0) imc.classificacao = "Obesidade -- Obesidade (Grau) II";
    if(imc.imcResultado>= 40.0) imc.classificacao = "Obesidade Grave -- Obesidade (Grau) III";
    

    ctx.IMCs.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);
});

app.MapGet("/api/listar/imcs", ([FromServices] AppDbContext ctx) => {
    if (ctx.IMCs.Any())
    {
        return Results.Ok(
            ctx.IMCs
                .Include(c => c.aluno)
                .ToList()
            );
    }
    return Results.NotFound("Não há nenhum IMC cadastrado");
});

app.MapGet("/api/listar/alunos", ([FromServices] AppDbContext ctx) => {
    if (ctx.Alunos.Any())
    {
        return Results.Ok(
            ctx.Alunos
                .ToList()
            );
    }
    return Results.NotFound("Não há nenhum Aluno cadastrado");
});

app.MapGet("/api/listar/imcPorAluno/id:{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx ) => {
    IMC? imc = ctx.IMCs.Include(a => a.aluno).FirstOrDefault(b => b.alunoId == id);

    if (imc == null){
        return Results.NotFound("Não há um IMC cadastrado para o usuário");
    }
    
    return Results.Ok(imc);
});

app.MapPut("/api/alterar/imc/id:{id}", ([FromRoute] int id, [FromBody] IMC imcAlterado, [FromServices] AppDbContext ctx) => {
     IMC? Imc = ctx.IMCs.FirstOrDefault(a => a.alunoId == id);
    
    if (Imc is null){
        return Results.NotFound("Não há IMC cadastrado apra alteração");
    }
    
    Aluno? alunoAlterado = ctx.Alunos.Find(Imc.alunoId);

    Imc.aluno = alunoAlterado;
    Imc.peso = imcAlterado.peso;
    Imc.altura = imcAlterado.altura;
    Imc.imcResultado = imcAlterado.peso/(imcAlterado.altura * imcAlterado.altura);
    
    if(Imc.imcResultado < 18.5) Imc.classificacao = "Magreza - GRAU 0";
    if(Imc.imcResultado >= 18.6) Imc.classificacao = "Normal - GRAU 0";
    if(Imc.imcResultado>= 25.0) Imc.classificacao = "Sobrepeso - GRAU I";
    if(Imc.imcResultado>= 30.0) Imc.classificacao = "Obesidade - GRAU II";
    if(Imc.imcResultado>= 40.0) Imc.classificacao = "Obesidade Grave - GRAU III";
    
    ctx.IMCs.Update(Imc);
    ctx.SaveChanges();
    return Results.Created("", Imc);
    
});



app.UseCors("Acesso Total");
app.Run();

