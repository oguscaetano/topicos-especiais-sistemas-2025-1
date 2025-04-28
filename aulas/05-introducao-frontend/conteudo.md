# Primeira conexão do Back-end (API) com o Front-end

## Código HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Pokédex Simples</title>
</head>

<body>

    <h1>Pokédex Coisa Linda</h1>
    <ul id="pokemon-list"></ul>

    <script src="./script.js"></script>
</body>

</html>

```

## Código JavaScript

```js
const lista = document.getElementById('pokemon-list');
const apiUrl = 'http://localhost:5255/pokemons';

const buscarPokemons = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os pokémons.');
        }

        const pokemons = await response.json();

        pokemons.forEach(pokemon => {

            const newLi = document.createElement('li');
            newLi.innerHTML = `<strong>Nome:</strong> ${pokemon.nome} | <strong>Peso:</strong> ${pokemon.peso}`;
            lista.appendChild(newLi);
        });

    } catch (error) {
        console.error(error);
        lista.innerText = `${error.message}`;
    }
}

buscarPokemons();

```

## Código CSS

```css
* {
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    padding: 20px;
}

h1 {
    color: #e63946;
}

ul {
    margin-top: 20px;
    list-style: none;
}

li {
    background: #f1f1f1;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    width: 250px;
}
```

## Program.cs [Correção do erro de CORS]

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors();
```