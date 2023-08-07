import Card from '@/components/Card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <nav class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div class="container m-auto w-full flex flex-nowrap items-center justify-between overflow-auto py-2 whitespace-nowrap">
          <Link class="min-w-max" href="/">
            <Image className="mr-2 min-w-min" src="/image/logo.png" width={140} height={40} alt="" />
          </Link>
          <div class="py-2">
            <Link class="text-blue-400 hover:text-blue-900 focus:text-blue-900 mt-2 lg:mt-0 mr-5" href="/">Главная</Link>
            <Link class="text-blue-400 hover:text-blue-900 focus:text-blue-900 mt-2 lg:mt-0 mr-5" href="#" onclick="alert('Данный раздел в работе')">API штуки</Link>
          </div>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className='w-full flex'>
          <h1 className='text-2xl'>Cейчас небольшой переезд и апргрейд</h1>
          {/* <Card />
          <Card />
          <Card />
          <Card /> */}
        </section>
      </main>
    </>
  )
}
