import { Header } from "../components/Header";

export default function Home(props) {
  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
    )
}

// Exemplo de SPA


// Exemplo chamada SSR
// Nexte já indentifica precisa chamar essa função antes de exibir a página.
// Usado TODA VEZ que o usário usar a Home da aplicação
/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes');

  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
} */



// Exemplo de SSG

//A diferença está na chamada do método StaticSiteProps e a opção revalidate que informa o tempo que a página irá sofrer uma atualização
// Precisa gerar uam build em produção
export async function StaticSiteProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return { 
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }

}

