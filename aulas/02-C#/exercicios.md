# EXERCÍCIOS

## 1 – Classe `Livro`
Crie uma classe chamada `Livro` com as seguintes propriedades:
- `Titulo` (string)
- `Autor` (string)
- `NumeroPaginas` (int)

Crie um método chamado `ExibirDetalhes` que exibe as informações do livro.

## 2 – Classe `ContaBancaria`
Crie uma classe `ContaBancaria` com:
- `Numero` (string)
- `Titular` (string)
- `Saldo` (double) – iniciar com 0

Crie métodos:
- `Depositar(double valor)`
- `Sacar(double valor)` – só permitir saque se houver saldo suficiente
- `ExibirSaldo()`

## 3 – Composição: `Aluno` e `Endereco`
Crie duas classes:

#### Classe `Endereco`:
- `Rua` (string)
- `Numero` (int)
- `Cidade` (string)

#### Classe `Aluno`:
- `Nome` (string)
- `Matricula` (string)
- `Endereco` (propriedade do tipo `Endereco`)

Crie um método `ExibirDados()` em `Aluno` que mostre nome, matrícula e o endereço completo.

## 4 – Classe `Tabuada`
Crie uma classe chamada `Tabuada` com a seguinte propriedade:
- `Numero` (int)

Crie um método chamado `ExibirTabuada()` que exibe a tabuada de 1 a 10 do número armazenado na propriedade, utilizando o **`for`**.