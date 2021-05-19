/* Arquivo app é usado quando um preciso compartilhar um componente entre todas as telas da aplicação*/

import { useState } from 'react';

import { Header } from '../components/Header'
import { Player } from '../components/Player';

import { PlayerContextProvider } from '../context/PlayerContext'   

import styles from  '../styles/app.module.scss';

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {

  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
        <Header />
        <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
