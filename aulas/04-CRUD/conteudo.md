# Construção de CRUD completo

## Método GET por ID
```csharp
app.MapGet("/pokemons/{id}", async (int id, AppDbContext db) =>
{
    var pokemon = await db.pokemons.FindAsync(id);
    return pokemon is not null ? Results.Ok(pokemon) : Results.NotFound("Pokemon não encontrado!");
});
```

## Método POST

```csharp
app.MapPost("/pokemons", async (Pokemon pokemon, AppDbContext db) =>
{
    db.pokemons.Add(pokemon);
    await db.SaveChangesAsync();
    return Results.Created($"/pokemons/{pokemon.Id}", pokemon);
});
```

## Método PUT

```csharp
app.MapPut("/pokemons/{id}", async (int id, Pokemon updatedPokemon, AppDbContext db) =>
{
    var existing = await db.pokemons.FindAsync(id);
    if (existing == null)
        return Results.NotFound("Pokemon não encontrado!");

    existing.Nome = updatedPokemon.Nome;
    existing.Peso = updatedPokemon.Peso;

    await db.SaveChangesAsync();
    return Results.Ok(existing);
});
```

## Método DELETE

```csharp
app.MapDelete("/pokemons/{id}", async (int id, AppDbContext db) =>
{
    var pokemon = await db.pokemons.FindAsync(id);
    if (pokemon == null)
        return Results.NotFound("Pokemon não encontrado!");

    db.pokemons.Remove(pokemon);
    await db.SaveChangesAsync();
    return Results.Ok("Pokemon deletado com sucesso!");
});
```

## Testes de rotas com o POSTMAN

Antes de tudo, certifique-se de que:

- Sua aplicação ASP.NET com Minimal API está **rodando localmente** (normalmente em `https://localhost:5001` ou `http://localhost:5000`).
- O banco de dados está criado (via EF migrations).
- O [Postman](https://www.postman.com/downloads/) está instalado no seu computador.

### 🟢 Passo 1: Abrir o Postman

1. Abra o Postman.
2. Clique em **"New" > "Request"**.
3. Dê um nome para o teste, como `Listar Pokémons`.
4. Selecione ou crie uma **Collection**.
5. Clique em **"Save to..."**.

### 🟢 Passo 2: Testar o GET `/pokemons`

1. Selecione o método `GET`.
2. No campo de URL, insira:

   ```
   https://localhost:5001/pokemons
   ```

3. Clique em **"Send"**.
4. Você verá a lista de Pokémons cadastrados (ou um array vazio `[]` se ainda não houver nenhum).

⚠️ **Importante**: se estiver usando HTTPS com `localhost`, talvez você precise clicar em **"Disable SSL Verification"** no Postman para evitar erro de certificado.

### 🟢 Passo 3: Testar o POST `/pokemons`

1. Mude o método para `POST`.
2. URL:

   ```
   https://localhost:5001/pokemons
   ```

3. Vá até a aba **"Body"**, selecione **"raw"**, e escolha **JSON** no menu suspenso.
4. Cole o seguinte JSON:

```json
{
  "nome": "Xablau",
  "peso": 78
}
```

5. Clique em **"Send"**.
6. Você deve receber um código **201 Created** e o JSON com o Pokémon criado, incluindo o `id`.

### 🟢 Passo 4: Testar o GET `/pokemons/{id}`

1. Mude o método para `GET`.
2. URL:

   ```
   https://localhost:5001/pokemons/1
   ```

(Substitua `1` pelo ID de um Pokémon existente)

3. Clique em **"Send"**.
4. Você verá os dados do Pokémon com aquele ID.

### 🟢 Passo 5: Testar o PUT `/pokemons/{id}`

1. Mude o método para `PUT`.
2. URL:

   ```
   https://localhost:5001/pokemons/1
   ```

3. Vá na aba **"Body" > "raw" > JSON**, e envie:

```json
{
  "id": 1,
  "nome": "Ivysaur",
  "peso": 50
}
```

4. Clique em **"Send"**.
5. Você receberá os dados atualizados do Pokémon.

### 🟢 Passo 6: Testar o DELETE `/pokemons/{id}`

1. Mude o método para `DELETE`.
2. URL:

   ```
   https://localhost:5001/pokemons/1
   ```

3. Clique em **"Send"**.
4. Você deve receber um status **204 No Content**.
5. Se fizer um `GET` novamente nesse ID, verá um `404 Not Found`.