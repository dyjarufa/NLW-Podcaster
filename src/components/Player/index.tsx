import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

import { usePlayer } from '../../context/PlayerContext';
import Image from 'next/image';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    toggleShuffle
   } = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  const audioRef = useRef<HTMLAudioElement>(null)

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
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#04d361'}}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
            <span>00:00</span>
          </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay 
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
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