# PokéDex Project

Uma aplicação React moderna e responsiva que consome a [PokeAPI](https://pokeapi.co/) para listar e detalhar os 151 Pokémons originais.
Este projeto foi desenvolvido como parte de um estudo sobre consumo de APIs, gerenciamento de estados no React e navegação entre rotas. O design foi planejado no **Figma** e implementado buscando uma interface limpa e intuitiva

## 🛠️ Tecnologias Utilizadas
* **React** (v18+)
* **TypeScript** (Tipagem estática para maior segurança)
* **Tailwind CSS** (Estilização base e utilitários)
* **React Router** (Navegação entre páginas)
* **PokeAPI** (Fonte dos dados)

## Funcionalidades Principais

* **Listagem Dinâmica:** Busca dos 151 Pokémons com carregamento via `useEffect`.
* **Busca em Tempo Real:** Filtro de busca por nome sem necessidade de novas requisições.
* **Página de Detalhes:** Rota dinâmica (`/pokemon/:id`) para exibir informações específicas (altura, peso, habilidades e tipos).
* **Tratamento de Erros:** Sistema de fallback para imagens quebradas e tratamento de erros em requisições de API.
* **Design Responsivo:** Adaptável para dispositivos móveis e desktop.

## 🚀 Como Executar

1.  Clone o repositório:
    ```bash
    git clone [LINK_DO_SEU_REPOSITORIO]
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🧠 Aprendizados

Durante o desenvolvimento, foquei em:
* Substituição de cadeias de `.then()` por **Async/Await** para um código mais assíncrono e limpo.
* Uso de **Interfaces no TypeScript** para mapear os dados da API.
* Gerenciamento de **Estados Derivados** para a lógica de busca (search).
* Implementação de um componente de **Image Fallback** para melhorar a experiência do usuário.