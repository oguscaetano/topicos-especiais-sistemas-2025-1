# 1. Introdução e Preparação do Ambiente em C#

1. **Instalar o SDK do .NET (se necessário)**
   - Site: https://dotnet.microsoft.com/en-us/download
   - Instalar o **.NET 8 SDK (LTS)**

2. **Instalar o VS Code**
   - Extensões recomendadas:
     - C#
     - C# Dev Kit
     - C# Extensions

3. **Verificar instalação do .NET no terminal:**
   ```bash
   dotnet --version
   ```

4. **Criar um projeto console:**
   ```bash
   dotnet new console -n OlaMundo
   cd OlaMundo
   code .
   ```
   Para visualizar uma lista de todas as possibilidades de criação de projetos dotnet, execute:
   ```
   dotnet new --list
   ```

## 2. Aplicação Console e Sintaxe do C#

```csharp
using System;

class Program
{
    static void Main() // svm
    {
        Console.WriteLine("Qual seu nome?"); // cw
        string nome = Console.ReadLine();
        Console.WriteLine($"Olá, {nome}!");

        Console.WriteLine("Digite sua idade:");
        int idade = int.Parse(Console.ReadLine());

        if (idade >= 18)
        {
            Console.WriteLine("Você é maior de idade.");
        }
        else
        {
            Console.WriteLine("Você é menor de idade.");
        }

        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"Contando: {i}");
        }
    }
}
```

## 3. Programação Orientada a Objetos

### Exemplo de classe:

Arquivo `Pessoa.cs`

```csharp
public class Pessoa
{
    public string Nome { get; set; }
    public int Idade { get; set; }

    public void Apresentar()
    {
        Console.WriteLine($"Olá, meu nome é {Nome} e tenho {Idade} anos.");
    }
}
```

### Uso no `Main`:
```csharp
Pessoa p1 = new Pessoa();
p1.Nome = "João";
p1.Idade = 30;
p1.Apresentar();
```

## 4. Relacionamento entre Classes

### Exemplo:

```csharp
public class Endereco
{
    public string Rua { get; set; }
    public string Cidade { get; set; }
}

public class Cliente
{
    public string Nome { get; set; }
    public Endereco EnderecoCliente { get; set; }

    public void MostrarDados()
    {
        Console.WriteLine($"Nome: {Nome}");
        Console.WriteLine($"Endereço: {EnderecoCliente.Rua}, {EnderecoCliente.Cidade}");
    }
}
```

Program.cs:  

```csharp
public class Program
    {
        static void Main() {
            Endereco endereco = new Endereco {
                Rua = "Rua 1", 
                Cidade = "Curitiba"
                };
            Cliente cliente = new Cliente {
                Nome = "Gustavo",
                EnderecoCliente = endereco
            };

            cliente.MostrarDados();
        }
    }
```