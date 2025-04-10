# Construindo uma Minimal API com .NET 8 via CLI – Primeiros passos + Integração com SQLite

## 🏀 **Pré-requisitos para a aula**
- VS Code instalado
- .NET SDK 8 instalado
- Postman (para testar as requisições)
- Extensões no VS Code:
    - [C#](https://marketplace.visualstudio.com/items/?itemName=ms-dotnettools.csharp)
    - [C# Dev Kit](https://marketplace.visualstudio.com/items/?itemName=ms-dotnettools.csdevkit)
    - [C# Extensions](https://marketplace.visualstudio.com/items/?itemName=kreativ-software.csharpextensions)
    - [.NET Install Tool](https://marketplace.visualstudio.com/items/?itemName=ms-dotnettools.vscode-dotnet-runtime)
    - [SQLite](https://marketplace.visualstudio.com/items/?itemName=alexcvzz.vscode-sqlite)
    - [SQLite Viewer](https://marketplace.visualstudio.com/items/?itemName=qwtel.sqlite-viewer)

## 🏀 **Introdução rápida a arquitetura da aplicação**
> 🎓 **Conceito**: O que é uma Minimal API?  

Uma Minimal API é como montar um food truck em vez de abrir um restaurante com várias salas, cardápios e garçons. É o básico para entregar comida rápido. Em vez de montar todo o MVC, rotas, controllers e views, você liga o motor e começa a atender pedidos HTTP direto no código principal. Com isso temos o código mais enxuto, rápido para testes e ideal para APIs simples ou microserviços.

## 🏀 **Criando o projeto via CLI (*Command Line Interface*)**

```bash
dotnet new webapi -n MinimalApi
cd MinimalApi
```

> 🎓 **Explicação**:
- `dotnet new webapi`: Gera um projeto base com suporte à Web API.
- `-n MinimalApi`: Nome do projeto/pasta.
- `cd MinimalApi`: Entramos na pasta do projeto recém-criado.

## 🏀 **Entendendo a estrutura do projeto**

- `Program.cs`: onde a mágica começa. É como o "motor de partida" da aplicação.
- `app.MapGet(...)`: já temos uma rota mínima aqui!
- `Properties/`, `obj/`, `bin/`: infraestrutura da casa – não mexemos muito aqui, mas ela sustenta tudo.

Bora ver rodando?

```bash
dotnet run
```

Abra no navegador: http://localhost:{porta}

## 🏀 Criando um modelo simples

No projeto, crie um arquivo chamado `Produto.cs`:

```csharp
namespace MinimalApi
{
    public class Produto
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public decimal Preco { get; set; }
    }
}
```

> 🎓 **Explicação**:
- Isso é uma **entidade**, que vai representar nossa tabela no banco.
- Pense na `classe Produto` como um "molde de biscoito" — toda vez que você quiser registrar um produto, você usa esse molde.

## 🏀 **Adicionando o Entity Framework Core + SQLite**
Você pode adicionar dependências ao projeto de duas formas:  
1. Via CLI
2. Via NUGET (Ctrl + Shift + P)

Via CLI:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 7.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.0
```

> 🎓 **Por que isso?**
- EF Core é nosso "tradutor" entre código e banco.
- SQLite é o banco que usaremos por ser leve, prático e sem necessidade de instalação de servidor.

## 🏀 Criando o `DbContext`

Crie o arquivo `AppDbContext.cs`

```csharp
using Microsoft.EntityFrameworkCore;

namespace MinimalApi
{
    public class AppDbContext : DbContext
    {
        // Construtor padrão utilizado pelo ASP.NET via injeção de dependência
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Representa a tabela Produto no banco
        public DbSet<Produto> TabelaProdutos => Set<Produto>();
    }
}
```

### Explicação detalhada 

👉 `public class AppDbContext : DbContext`

- **`public`**: indica que essa classe é **pública**, ou seja, pode ser acessada de qualquer outro lugar do código. É como dizer "essa porta está aberta, qualquer um pode entrar e usar".
  
- **`class`**: palavra-chave usada para declarar uma **classe** em C#. Uma classe é como um molde para criar objetos.

- **`AppDbContext`**: é o **nome da classe**. Escolhemos esse nome porque ela vai representar o **contexto do banco de dados da nossa aplicação**.

- **`: DbContext`**: isso significa que **AppDbContext está herdando** da classe `DbContext`, que faz parte do **Entity Framework Core**.

👉 `public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}`

Essa é uma **construtora**, ou seja, é chamada sempre que criamos uma nova instância da classe `AppDbContext`.

Vamos quebrar em partes:

👉 `public AppDbContext(...)`

- Declara o **construtor** da classe.
- **`public`**: qualquer lugar do sistema pode criar um `AppDbContext`.
- **`AppDbContext(...)`**: o nome da função tem que ser igual ao nome da classe, isso define que é um construtor.

👉 `(DbContextOptions<AppDbContext> options)`

- Isso é um **parâmetro** do tipo `DbContextOptions<AppDbContext>`.
- Esse `options` é passado pelo ASP.NET na hora de rodar a aplicação.
- Ele contém **informações de configuração**, como: qual banco será usado, string de conexão, etc.

> Pense no `options` como um "pacote de instruções" para o EF Core, explicando **como se conectar ao banco**, **qual provedor usar (SQLite, SQL Server etc)** e **como se comportar**.

👉 `: base(options)`

- Esse `: base(options)` chama o **construtor da classe base**, ou seja, do `DbContext`.
- Estamos dizendo: "Ei, `DbContext`, aqui estão suas opções para você funcionar!"

👉 `{}`

- Corpo vazio do construtor. Aqui você poderia fazer outras configurações, mas nesse caso, só estamos repassando o `options`.

👉 `public DbSet<Produto> Produtos => Set<Produto>();`

Agora vamos entender essa linha que **cria o "acesso à tabela" Produto**:

👉 `public`

- Queremos que essa propriedade esteja acessível fora da classe. Isso é necessário para que o Entity Framework saiba que essa "tabela" existe.

👉 `DbSet<Produto>`

- `DbSet<T>` é um tipo especial do EF Core que representa uma **tabela** no banco de dados.
- O `T` é o tipo de entidade que essa "tabela" vai armazenar – neste caso, a **classe `Produto`**.

👉 `Produtos`

- Nome da propriedade. Vai ser usada no código como `context.Produtos` para acessar essa "tabela virtual".

👉 `=> Set<Produto>();`

- Isso é uma **expression-bodied property** (abreviação para escrever funções ou propriedades em uma única linha).
- `Set<Produto>()` é um método do `DbContext` que retorna um `DbSet<Produto>`.

## 🏀 **Configurando o banco no `Program.cs`**

Atualize seu `Program.cs` para incluir o SQLite:

```csharp
using Microsoft.EntityFrameworkCore;
using MinimalApi;

var builder = WebApplication.CreateBuilder(args);

// Configurando o EF Core com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=produtos.db"));

var app = builder.Build();

// Rota de teste
app.MapGet("/produtos", () => "Minimal API rodando! 😎");

app.Run();
```

## 🏀 **Executando a migração inicial e criando o banco**

```bash
dotnet ef migrations add Inicial
dotnet ef database update
```

> 🎓 **Explicação**:
- `dotnet ef migrations add Inicial`: Gera o "roteiro" para criar a estrutura no banco.
- `dotnet ef database update`: Executa esse roteiro e cria o arquivo `.db`.

## 🏀 **Adicionando alguns produtos no banco de dados**
Para adicionar novos elementos no banco de dados de forma manual, vamos utilizar a extensão `SQLite`.

Para isso, digite: `Ctrl + Shift + P`  
Depois: `SQLite: Quick Query`   
Depois escolha o banco de dados: `produtos.db` 

Adicione essa query:
```sql
INSERT INTO TabelaProdutos (Nome, Preco)
VALUES 
  ('Mouse Gamer', 159.90),
  ('Teclado Mecânico', 289.00),
  ('Monitor 27"', 1299.99),
  ('Headset RGB', 199.50),
  ('Webcam Full HD', 349.90);
```

Agora nosso banco de dados possui 5 produtos cadastrados.

## 🏀 **Testando a aplicação**

Vamos fazer um endpoint simples para trazer todos os produtos.

No arquivo `Program.cs` adicione o método `get`.

```csharp
// GET: lista todos os produtos
app.MapGet("/produtos", (AppDbContext db) =>
{
    var produtos = db.TabelaProdutos.ToList();
    return Results.Ok(produtos);
});
```
Suba o seu serviço.

```
dotnet run
```

Abra o `Postman` e execute uma requisição `GET` no endpoint `/produtos`.

Você deve receber um JSON igual a esse:

```json
[
    {
        "id": 1,
        "nome": "Mouse Gamer",
        "preco": 159.9
    },
    {
        "id": 2,
        "nome": "Teclado Mecânico",
        "preco": 289.0
    },
    {
        "id": 3,
        "nome": "Monitor 27\"",
        "preco": 1299.99
    },
    {
        "id": 4,
        "nome": "Headset RGB",
        "preco": 199.5
    },
    {
        "id": 5,
        "nome": "Webcam Full HD",
        "preco": 349.9
    }
]
```