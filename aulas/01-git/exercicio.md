# EXERCÍCIO - Criando e Gerenciando um Repositório Git no GitHub
**Objetivo:** Criar um repositório no GitHub, configurar localmente, adicionar um arquivo `README.md`, criar uma nova branch, enviar um Pull Request e realizar um Merge com a main.

1. **Criar um repositório no GitHub**  
   - Acesse [GitHub](https://github.com/) e crie um novo repositório chamado `meu-primeiro-repo`.  
   - Marque a opção "Add a README file" para incluir um `README.md`.

2. **Clonar o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/meu-primeiro-repo.git
   cd meu-primeiro-repo
   code .
   ```

3. **Verificar o status do repositório**  
   ```bash
   git status
   ```

4. **Criar uma nova branch chamada `nova-branch`**  
   ```bash
   git branch nova-branch
   git checkout nova-branch

   ou

   git checkout -b nova-branch
   ```

5. **Modificar o `README.md` (adicione uma linha como "Aprendendo Git!")**  
   - Edite o arquivo `README.md` e salve-o.  

6. **Adicionar o arquivo ao staging**  
   ```bash
   git add README.md

   ou

   git add .
   ```

7. **Criar um commit com uma mensagem descritiva**  
   ```bash
   git commit -m "Atualiza README.md com mensagem de aprendizado"
   ```

8. **Atualizar o repositório local com mudanças remotas (caso existam)**  
   ```bash
   git pull
   ```

9. **Enviar a nova branch para o GitHub**  
   ```bash
   git push -u origin nova-branch
   ```

10. **Criar um Pull Request**  
    - Acesse o link do Pull Request gerado com o comando anterior.  
    - Complete o Pull Request e execute o `merge` com a branch `main`.  