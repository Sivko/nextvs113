'use client';

import { useContext, useState } from "react"
import CodeElement from "./CodeElement";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdInstallDesktop, MdOpenInFull } from "react-icons/md";
import { Context } from "@/app/page-provider";
import HowInstall from "../HowInstall";

export default function CodeElements({ data }) {

  const [fullPage, setFullPage] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const { setModals } = useContext(Context);


  return (
    <div className={`gap-4 items-start justify-end mt-4 flex select-none`}>
      <section className={`flex-col gap-4 transition-all ${fullPage ? 'hidden' : 'flex'}`}>
        {data.map((e, index) => (<CodeElement {...e} key={index} index={index} setActiveCard={setActiveCard} active={activeCard == index} />))}
      </section>

      <div className={`${fullPage ? "basis-full" : "basis-1/2"} sticky top-4 transition-all  flex flex-col gap-4`}>
        <div className={` bg-white p-6 rounded-2xl text-dark flex flex-col gap-6`}>
          <div className="absolute z-10 p-6 top-0 right-0 text-secondary cursor-pointer hover:text-main" onClick={() => setFullPage(prev => !prev)}>
            <MdOpenInFull />
          </div>

          {/* <div className={`w-full`}> */}
          <div className={` min-h-[300px] flex items-center flex-col justify-center w-full relative`}>
            <div className='text-xl mb-4 pr-6'>{activeCard + 1}. {data[activeCard].title}</div>
            {data[activeCard]?.preview && (<video key={data[activeCard]?.preview} className="rounded-2xl" controls="controls" width="100%" loop="loop" autoplay="autoplay" muted="muted">
              <source src={data[activeCard]?.preview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>)}

            {/* {data[activeCard]?.preview && <Image src={`/images/${data[activeCard]?.preview}`} className='rounded-2xl w-full' width={400} height={500} alt='' />} */}
            {/* {data[activeCard]?.preview && <img src={data[activeCard].preview} className='rounded-2xl w-full' width={400} height={500} alt='' />} */}
            {/* {data[activeCard]?.preview && <iframe width="1201" height="722" src="https://www.youtube.com/embed/2YawwWH98ag?autoplay=1&loop=10" title="Открыть настройки поля из карточки объекта" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>} */}
            {/* {data[activeCard]?.preview && <iframe width="100%" height={fullPage ? 700 : 250} src="http://www.youtube.com/embed/2YawwWH98ag?autoplay=1&loop=1&playlist=2YawwWH98ag" frameborder="0" allowfullscreen></iframe>} */}
            <div className=" absolute inset-0 flex justify-between h-2/3">
              <div onClick={() => setActiveCard(prev => prev - 1 < 0 ? data.length - 1 : prev - 1)} className={`${!fullPage && "hidden"} text-5xl p-6 text-secondary hover:text-main transition-all cursor-pointer flex items-end w-1/2`}>
                <SlArrowLeft />
              </div>
              <div onClick={() => setActiveCard(prev => prev + 1 > data.length - 1 ? 0 : prev + 1)} className={`${!fullPage && "hidden"} text-5xl p-6 text-secondary hover:text-main transition-all cursor-pointer flex items-end justify-end w-1/2`}>
                <SlArrowRight />
              </div>
            </div>
          </div>
        </div>


        <div className={` bg-white p-6 rounded-2xl text-dark flex flex-col gap-6`}>

          <div className='p-6 rounded-2xl text-white bg-secondary flex justify-between items-center cursor-pointer' onClick={() => setModals([<HowInstall key="inst" />])}>
            <div className='text-xl whitespace-nowrap'>Как установить</div>
            <div className='text-5xl text-right'>
              <MdInstallDesktop />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}