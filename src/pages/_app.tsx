/* Arquivo app é usado quando um preciso compartilhar um componente entre todas as telas da aplicação*/

import { Header } from '../components/Header'
import { Player } from '../components/Player';

import styles from  '../styles/app.module.scss';

import '../styles/global.scss'

import { PlayerContext } from '../context/PlayerContext'

function MyApp({ Component, pageProps }) {
  return(
    <PlayerContext.Provider value={"Jady"}>
    <div className={styles.wrapper}>
      <main>
       <Header />
       <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
