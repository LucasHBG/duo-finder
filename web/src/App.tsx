import "./styles/main.css";

import { useEffect, useState } from "react";
import logoImg from "./assets/logo-nlw.svg";
import CreateAdBanner from "./CreateAdBanner";
import GameBanner from "./GameBanner";
import { Game } from "./model/Game";

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

      <CreateAdBanner />
    </div>
  );
}

export default App;
