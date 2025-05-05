const listaPokemons = document.getElementById('lista-pokemons');
const btnTodos = document.getElementById('btn-todos');
const formBuscaId = document.getElementById('form-busca-id');
const inputId = document.getElementById('input-id-busca');
const formPost = document.getElementById('form-post');
const inputNome = document.getElementById('input-nome-novo');
const inputPeso = document.getElementById('input-peso-novo');
const formPut = document.getElementById('form-put');
const formDelete = document.getElementById('form-delete');
const apiURL = 'http://localhost:5255/pokemons';

const getPokemons = async () => {
    listaPokemons.innerHTML = '';

    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os pokemons!");         
        }

        const pokemons = await response.json();

        pokemons.forEach(pokemon => {
            const newLi = document.createElement('li');
            newLi.innerText = `ID: ${pokemon.id} | Nome: ${pokemon.nome} | Peso: ${pokemon.peso}`;
            newLi.id = pokemon.nome;
            newLi.className = 'xalala';
            listaPokemons.appendChild(newLi);
        });
        

    } catch (error) {
        console.log(error.message);
        listaPokemons.innerText = `${error.message}`;
    }
}

const getPokemonPorId = async (id) => {
    listaPokemons.innerHTML = '';

    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const pokemon = await response.json();

        const newLi = document.createElement('li');
        newLi.innerText = `ID: ${pokemon.id} | Nome: ${pokemon.nome} | Peso: ${pokemon.peso}`;
        listaPokemons.appendChild(newLi);

    } catch (error) {
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        listaPokemons.appendChild(newLi);
    }
}

const postPokemon = async (novoPokemon) => {
    listaPokemons.innerHTML = '';
    
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPokemon)
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar Pokémon");
        }

        const pokemonAdicionado = await response.json();

        alert(`Pokémon "${pokemonAdicionado.nome}" adicionado com sucesso!`);
    } catch (error) {
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        listaPokemons.appendChild(newLi);
    }
}

const putPokemon = async () => {
    const id = document.getElementById('input-id-update').value;
    const nome = document.getElementById('input-nome-update').value;
    const peso = document.getElementById('input-peso-update').value;

    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, peso: parseFloat(peso) })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar Pokémon.");
        }

        const pokemonAtualizado = await response.json();
        alert(`Pokémon atualizado: ${pokemonAtualizado.nome}`);
    } catch (error) {
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        listaPokemons.appendChild(newLi);
    }
}

const deletePokemon = async () => {
    const id = document.getElementById('input-id-delete').value;

    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar Pokémon.");
        }

        const mensagem = await response.text();
        alert(`${mensagem}`);
    } catch (error) {
        const newLi = document.createElement('li');
        newLi.innerText = `${error.message}`;
        listaPokemons.appendChild(newLi);
    }
}

btnTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getPokemons();
});

formBuscaId.addEventListener('submit', (event) => {
    event.preventDefault();
    getPokemonPorId(inputId.value);
});

formPost.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemon = {
        nome: `${inputNome.value}`,
        peso: `${inputPeso.value}`
    }
    postPokemon(pokemon);
});

formPut.addEventListener('submit', (event) => {
    event.preventDefault();
    putPokemon();
});

formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    deletePokemon();
});
