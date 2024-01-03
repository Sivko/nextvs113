'use client'


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaVine } from "react-icons/fa";
import { TbLetterS } from "react-icons/tb";

export default function Header() {
  const pathname = usePathname()
  const menu = [
    { name: "Главная", link: "/" },
    { name: "Вебхуки", link: "/webhooks" },
  ]

  return (
    <div className="bg-black">
      <nav className="container m-auto w-full flex flex-nowrap items-center justify-between overflow-auto py-2 whitespace-nowrap ">
        <Link className="min-w-max" href="/">
          <div className="text-secondary text-xl flex items-center relative hover:text-white transition-all">
            <FaVine />
            ine Script
            <div className="absolute top-0 right-[-2em] text-[10px]">113</div>
          </div>
        </Link>
        <div className="py-2">
          {menu.map((e, index) => (<Link key={index} class={`text-white py-3 px-3 hover:opacity-100 transition-all ${pathname == e.link ? 'opacity-100' : 'opacity-50'}`} href={e.link}>{e.name}</Link>))}
        </div>
      </nav>
    </div>)
}