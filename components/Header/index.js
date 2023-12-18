import Image from "next/image";
import Link from "next/link";
// import { useRouter } from 'next/router';

export default function Header() {

  // const { pathname } = useRouter();
  const pathname = "/";

  const menu = [
    { name: "Главная", link: "/" },
    { name: "Рецепты вебхуков", link: "/recipes" },
  ]


  return (
    <div className="bg-black">
      <nav class="container m-auto w-full flex flex-nowrap items-center justify-between overflow-auto py-2 whitespace-nowrap ">
        <Link class="min-w-max" href="/">
          <Image className="mr-2 min-w-min" src="/image/logo.png" width={140} height={40} alt="" />
        </Link>
        <div class="py-2">
          {menu.map((e, index) => (<Link key={index} class={`text-white py-3 px-3 opacity-50 hover:opacity-100 transition-all ${pathname == e.link ? 'opacity-100' : 'opacity-50'}`} href={e.link}>{e.name}</Link>))}
        </div>
      </nav>
    </div>)
}