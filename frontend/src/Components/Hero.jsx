import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div>
      <div className=" flex place-items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {/*  */}
        <h2 className={`mb-3 text-2xl font-bold`}>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col items-center gap-3">
              <div className="flex  font-normal items-center gap-3">
                <Image
                  src="/github.svg"
                  alt="Vercel Logo"
                  width={30}
                  height={30}
                  priority
                  className="invert"
                />
                <h2 className="font-heading text-lg leading-[1.1] md:text-xl  ">
                  Proudly Open Source
                </h2>
              </div>
              <div className="hero_magicText__g6a0K">
                Wellcome To 0% downtime
              </div>
            </div>
            <div>
              {/* <div className="graph">
                <Image
                  src="/graph.svg"
                  alt="Vercel Logo"
                  width={150}
                  height={24}
                  priority
                />
              </div> */}
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col justify-center align-middle">
            <h3 className="bg-gradient-to-br md:text-6xl xl:text-7xl 2xl:text-8xl lg:text-6xl text-5xl from-blue-700 to-gray-200 bg-clip-text uppercase text-transparent dark:from-gray-200 dark:to-blue-700">
              Api MONITORING TOOL.
            </h3>
            {/* <button className="btn-home flex justify-center place-self-center border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-max  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Get Started
            </button> */}
            <a
              className="m-auto mt-10 cursor-pointer font-bold transition-all duration-[0.3s] ease-[ease] relative inline-block shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.1),3px_3px_5px_0px_rgba(26, 35, 126, 0.3),2px_2px_3px_0px_rgba(0,0,0,0.1)] px-4 md:px-[25px] py-2.5 rounded-[5px] bg-transparent dark:text-white text-stone-900 after:absolute after:content-[''] after:w-0 after:h-full after:z-[-1] after:shadow-[-7px_-7px_20px_0px_#1a237e,-4px_-4px_5px_0px_#000,7px_7px_20px_0px_#0002,4px_4px_5px_0px_#0001] after:transition-all after:duration-[0.3s] after:ease-[ease] after:left-0 after:top-0 hover:text-black hover:after:w-full border-stone-100 dark:border-stone-700 hover:dark:text-white hover:after:left-auto hover:after:right-0 active:top-0.2 border w-max"
              href="/dashboard"
            >
              Get Started
            </a>
          </div>
        </h2>
      </div>
    </div>
  );
}

export default Hero;
