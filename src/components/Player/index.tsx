import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

import { usePlayer } from '../../context/PlayerContext';
import Image from 'next/image';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {

  const { 
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    playNext,
    playPreview,
    setPlayingState,
    hasNext,
    hasPreview,
    isLooping,
    isShuffling,
    togleLoop,
    toggleShuffle,
    clearPlayerState
   } = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  const audioRef = useRef<HTMLAudioElement>(null)

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }


    if(isPlaying) {
      audioRef.current.play();
    }
    else{
      audioRef.current.pause();
    }

  }, [isPlaying])

  function setupProgressListener(){
    audioRef.current.currentTime = 0; // toda vez que um novo episódio for executado, progresso será zerado

    audioRef.current.addEventListener('timeupdate',() => { // fica escutando evento timeupdate(é atualizado a topo momento)
      setProgress(Math.floor(audioRef.current.currentTime)); // seto o valor do currentTime que esta sendo atualizado no evento, defino esse valor no estado do progress
    } )
  }

  function handleSlider(amount: number) { // essa função recebe como parâmetro o "amount"(já está integrado) que é o número(posição) que é bolinha foi manipulada;
     audioRef.current.currentTime = amount;
     setProgress(amount);
  }

  function handleEpisodeEnded(){
    if(hasNext){
      playNext()
    }else{
      clearPlayerState();
    }
  }

  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando"/>
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}


      <footer className={!episode ?  styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.duration} /* tempo máximo que o slider pode percorrer */
                value={progress} /* tempo atual que o slider esta percorrendo */
                onChange={handleSlider} /* evento disparada quando a bolinha é arrastada */
                trackStyle={{ backgroundColor: '#04d361'}}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onEnded={handleEpisodeEnded} /* função que é executada quando o audio chega no final */
            autoPlay 
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener} /* evento que é disparado assim que o player conseguiu carregar os dados do episódio */
          />
        )}

        <div className={styles.buttons}>
          <button 
            type="button" 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Emparalhar"/>
          </button>
          <button type="button" onClick={playPreview}   disabled={!episode || !hasPreview}>
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>

          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
            >

            { isPlaying 
              ? <img src="/pause.svg" alt="Tocar"/>
              : <img src="/play.svg" alt="Tocar"/>
            }
          </button>

          <button type="button" onClick={playNext}  disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button 
            type="button" 
            disabled={!episode}
            onClick={togleLoop}
            className={isLooping ? styles.isActive : ''}  
          >
            <img src="/repeat.svg" alt="repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}