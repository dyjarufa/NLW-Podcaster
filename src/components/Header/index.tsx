import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react';

import { PlayerContext } from '../../context/PlayerContext';

import styles from './styles.module.scss';

export function Header() {

  const player = useContext(PlayerContext)

  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
    locale: ptBR
  });

  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="PodCaster"/>

      <p>O melhor para você ouvir, sempre! {player}</p>
      <span>{currentDate}</span>
    </header>
  );
}