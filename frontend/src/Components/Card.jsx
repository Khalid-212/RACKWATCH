import React from "react";

function Card({ status, name, link }) {
  return (
    <div>
      <div class="bg-card text-card-foreground rounded-lg border dark:border-stone-800 @container/card border-stone-400/20 bg-gradient-to-tr shadow-sm shadow-orange-800/40 dark:from-black dark:to-stone-900/30">
        <div class="card__layer1"></div>
        <div class="card__layer2"></div>
        <div class="flex flex-col space-y-1.5 p-6">
          <div class=" flex items-center justify-between">
            <h3 class=" font-heading text-2xl font-bold">{name}</h3>
          </div>
          <p className="">{link}</p>
        </div>
        <div className="p-6 pt-0 flex flex-col @[320px]/card:flex-row @[320px]/card:items-center justify-between gap-2">
          <div>
            <div className=" flex items-center gap-2 ">
              <p
                className={`font-bold ${
                  status == "Active" ? "text-green-600" : "text-red-500"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
          <a class=" w-full @[320px]/card:w-fit " href="/s/rtm-survey_web">
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 w-full @[320px]/card:w-fit">
              View
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
