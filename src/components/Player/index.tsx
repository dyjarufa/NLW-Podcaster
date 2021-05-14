import { useContext } from 'react';
import styles from './styles.module.scss';

import { PlayerContext } from '../../context/PlayerContext';

export function Player() {

  const player = useContext(PlayerContext);

  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando"/>
        <strong>Tocando agora {player}</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>


      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Emparalhar"/>
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>

          <button type="button">
            <img src="/play.svg" alt="Tocar"/>
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}