'use client';

import { useState } from "react"
import CodeElement from "./CodeElement";
import Image from "next/image";

export default function CodeElements({ data }) {

  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='flex gap-4 items-start mt-4'>
      <section className='w-full flex flex-col gap-4'>
        {data.map((e, index) => (<CodeElement key={index} index={index} setActiveCard={setActiveCard} active={activeCard == index} />))}
      </section>

      <div className='bg-white w-5/12 p-6 rounded-2xl text-dark sticky top-4'>
        <div className='text-xl mb-4'>Показать ссылку на межобъектный сценарий</div>
        <Image src={`/images/5.jpg`} className='rounded-2xl w-full' width={400} height={500} alt='' />
        <div className='mb-2'>1. Вы описываете скрипт на JS и вставляете его в константу, либо можете взять готовый скрипт из списка</div>
        <div className='mb-2'>2. Вызываете действие автоматизации <b>отправить вебхук</b> с параметрами POST JSON по адресу  https://vs113.ru/api/v1/idконстанты/токен </div>
        <div className='mb-2'>Можно посмотреть <a href="#" className='underline'>видосик</a></div>
      </div>


    </div>
  )
}