import { MagnifyingGlassPlus } from "phosphor-react";

import "./styles/main.css";

import logoImg from "./assets/logo-nlw.svg";
import { useEffect, useState } from "react";
import { Game } from "./model/Game";
import GameBanner from "./GameBanner";

function App() {
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    loadGames();
  }, [])

  function loadGames() {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGamesList(data)
        console.log(data);
      })
      .catch(error => console.log("Deu BO aqui: " + error))
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="NLW eSports" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      {/* Carroussel of images from twitch */}
      <div className="grid grid-cols-6 gap-6 mt-16">

        {gamesList?.map(game => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
          
        ))}

      </div>

      <div className="pt-1 bg-nlw-gradient w-full max-w-[1200px] justify-center rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          {/* Left side banner text */}
          <div>
            <strong className="text-white text-2xl font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button type="button" className="px-3 py-4 bg-violet-500 hover:bg-violet-600 text-white items-center gap-3 rounded flex">
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
