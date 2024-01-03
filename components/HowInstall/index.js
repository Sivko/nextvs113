"use client";
import { Context } from "@/app/page-provider";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import Opera from "./Opera";
import CustomScript from "./CustomScript";
import GoogleChrome from "./GoogleChrome";
import Firefox from "./Firefox";

export default function HowInstall() {

  const { setModals } = useContext(Context);

  return (<div className="w-2/3 p-10 rounded-2xl bg-white relative">
    <button className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true"><IoClose className="pointer-events-none" /></button>
    <div>
      <div className="text-2xl pt-2 pb-2 hover:text-main cursor-pointer" onClick={() => setModals(prev => [...prev, (<GoogleChrome key="googleChrome" />)])}>Google Chrome</div>
    </div>
    <div>
      <div className="text-2xl pt-2 pb-2 hover:text-main cursor-pointer" onClick={() => setModals(prev => [...prev, (<Opera key="opera" />)])}>Opera / Yandex Browser</div>
    </div>
    <div>
      <div className="text-2xl pt-2 pb-2 hover:text-main cursor-pointer" onClick={() => setModals(prev => [...prev, (<Firefox key="firefox" />)])}>Mozilla Firefox</div>
    </div>
    <div>
      <div className="text-2xl pt-2 pb-2 hover:text-main cursor-pointer" onClick={() => setModals(prev => [...prev, (<CustomScript key="script" />)])}>Посмотреть скрипт</div>
    </div>
  </div>)
}