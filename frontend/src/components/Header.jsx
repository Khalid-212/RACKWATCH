"use client";

import React from "react";
import Image from "next/image";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

function Header({ image }) {
  const { user } = useUser();
  return (
    <div>
      <main className="flex flex-col items-center justify-between p-10">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.png"
                alt="Vercel Logo"
                width={50}
                height={24}
                priority
              />
            </a>
          </div>
          {user ? (
            <div className="flex">
              <Link
                className="btn-header mr-2 m-auto cursor-pointer font-bold px-4 md:px-[25px] py-2.5 rounded-xl bg-transparent dark:text-white text-stone-900  border-stone-100 dark:border-stone-700 hover:dark:text-white  border w-max hover:bg-stone-100 dark:hover:bg-stone-700"
                href="/api/auth/logout"
              >
                Logout
              </Link>
              {image && (
                <Image
                  unoptimized
                  src={user.picture}
                  alt="Profile"
                  width={50}
                  height={20}
                  className="rounded-full"
                />
              )}
            </div>
          ) : (
            <Link href="/api/auth/login">
              <button className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Login
              </button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default Header;
