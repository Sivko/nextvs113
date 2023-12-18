import CodeElements from '@/components/CodeElements';
import Image from 'next/image'
import Link from 'next/link'
import { FaCode } from "react-icons/fa6";

export default function Home() {

  return (
    <>
      <main className="container m-auto my-extra ">
        <div className='gap-4 flex'>
          <div className='p-6 rounded-2xl flex border border-[#00000007] items-center gap-4 bg-black text-white'>
            <FaCode color='secondary' size={`4em`} />
            <div className='flex flex-col'>
              <span>Главная</span>
            </div>
          </div>

          <div className='p-6 rounded-2xl border border-[#00000007] bg-white flex gap-4 group overflow-hidden relative flex-1'>
            <div className='flex-col flex justify-between'>
              <div className='text-sm text-secondary'>Информация</div>
              <div className=''>Данный скрипт работает для S2 CRM и позволяет быстрее проверить настройки и немного помогает в тестировании системы</div>
              <div />
            </div>
            <div className='absolute bottom-0 right-0 translate-x-[7em] translate-y-[7em]'>
            </div>
          </div>

          <div className='p-6 rounded-2xl border border-[#00000007] bg-white flex gap-4 group overflow-hidden relative flex-1'>
            <div className='flex-col flex justify-between'>
              <div className='text-sm text-secondary'>Чего-то не хватает?</div>
              <div className=''>
                <p>Напишите в эту группу, чтобы добавить свой скрипт, или напишите в ней предложение</p>
              </div>
              <div />
            </div>
            <div className='absolute bottom-0 right-0 translate-x-[7em] translate-y-[7em]'>
            </div>
          </div>


          <div className='p-6 rounded-2xl border border-[#00000007] bg-white justify-between flex flex-col'>
            <div className='text-secondary text-sm mb-2 whitespace-nowrap'>Активных скриптов</div>
            <div className='text-center text-8xl'>14</div>
            <div></div>
          </div>

        </div>

        <CodeElements data={Array.from("1234512345", Number)} />

      </main>
    </>
  )
}
