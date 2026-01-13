import { useState } from "react"
export default function URLInput() {
    const [url, setURL] = useState("");

    const canConvert = url.trim().length > 0;   //need to add checking
    return (
       
        <div className="w-full max-w-xl">
        <label className="mb-2 block text-sm font-medium text-white/80">
            YouTube URL
        </label>

        <div className="flex gap-2">
            <input
                value={url}
                onChange={(e) => setURL(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="
                    w-full rounded-2xl bg-white/5 px-4 py-3
                    text-base text-white placeholder:text-white/40
                    ring-1 ring-white/10 shadow-lg shadow-black/20
                    outline-none transition duration-200 ease-out
                    focus:bg-white/10 focus:ring-2 focus:ring-red-500/60
                    focus:shadow-xl focus:shadow-red-500/10 focus:-translate-y-0.5
                    active:scale-[0.99]
                    "
            />
            <button 
                disabled={!canConvert}
                className="
                    shrink-0 rounded-2xl px-5 py-3 font-semibold text-white
                    bg-red-600/90 shadow-lg shadow-red-600/20
                    transition duration-200 ease-out
                    hover:bg-red-600 hover:shadow-red-600/30
                    disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-[0.97]                
                "    
            >
                Convert
            </button>
        </div>

        <p className="mt-2 text-xs text-white/50">
            Paste a full YouTube link. We'll validate it before downloading.
        </p>
        </div>



    );

}


