import { MagnifyingGlassPlus } from "phosphor-react";

function CreateAdBanner() {
    return (
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
    );
}

export default CreateAdBanner;