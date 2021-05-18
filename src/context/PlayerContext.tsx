import { createContext, ReactNode, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
  isPlaying: boolean;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData); //hack para forçar que meu objeto vazio é do tipo PlayerContextData

type PlayerContextProviderProps = {
  children: ReactNode; //ReactNode é uma tipagem de dentro do React é qualquer elemento que eu colocaria dentro de um tsx
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
   const [episodeList, setEpisodeList] = useState([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
 
   function play(episode: Episode) {
     setEpisodeList([episode]);
     setCurrentEpisodeIndex(0);
     setIsPlaying(true);
   }
 
   function togglePlay() {
     setIsPlaying(!isPlaying);
   }
 
   //Função criada para pegar o evento dos teclados multmidia de pause e play
   function setPlayingState(state: boolean) {
     setIsPlaying(state);
   }
 
   return (
     <PlayerContext.Provider 
        value={{
          episodeList,
          currentEpisodeIndex, 
          play, 
          isPlaying, 
          togglePlay, 
          setPlayingState}}
        >
        {children}
     </PlayerContext.Provider>
   )

}

