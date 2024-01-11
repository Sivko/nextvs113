"use client";

import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { IoLogoJavascript } from "react-icons/io";
import { PiGearSixFill } from "react-icons/pi";
import { FaCookieBite } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaFileCode } from "react-icons/fa6";

import HowItsWork from '@/components/HowItsWork';
import Recepts from '@/components/Recepts';
import Testing from '@/components/Testing';
import Logs from '@/components/Logs';
import { Context } from '../page-provider';


const options = (token) => ({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${token}`,
    'S2-Allow-Websockets': true
  },
  validateStatus: () => true
});

export default function Webhooks() {

  const [tokenValue, setTokenValue] = useState("");
  const [debouncedTokenValue, setDebounceTokenValue] = useState("");
  const [address, _setAddress] = useState("app.salesap.ru")
  const [debouncedAddressValue, setDebounceAddressValue] = useState("");
  const [user, setUser] = useState({});
  const [activeComponent, setActiveComponent] = useState(0);

  const {setToken, setAddress} = useContext(Context);

  const handleInputTokenChange = (event) => {
    setTokenValue(event.target.value);
  };

  const handleInputAddressChange = (event) => {
    _setAddress(event.target.value);
    setAddress(event.target.value)
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceTokenValue(tokenValue);
      setToken(tokenValue)
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tokenValue, 500]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceAddressValue(address);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [address, 500]);

  async function getUserInfo() {
    setUser({});
    const currentToken = await axios.get(`https://${debouncedAddressValue || "app.salesap.ru" }/api/v1/current-token`, options(debouncedTokenValue))
    if (currentToken?.data?.data?.attributes) {
      const user = await axios.get(`https://${debouncedAddressValue || "app.salesap.ru" }/api/v1/users/${currentToken?.data?.data?.attributes["user-id"]}`, options(debouncedTokenValue))
      setUser(user.data.data);
    }
  }

  useEffect(() => {
    if (window) {
      let token = localStorage.getItem("token");
      if (token) setTokenValue(token)
      let site = localStorage.getItem("address")
      if (site) _setAddress(site)
    }
  }, [])

  useEffect(() => {
    if (!debouncedTokenValue) return;
    getUserInfo();
    if (window) {
      localStorage.setItem("token", debouncedTokenValue)
    }
  }, [debouncedTokenValue])

  useEffect(() => {
    if (!debouncedAddressValue) return;
    getUserInfo();
    if (window) {
      localStorage.setItem("address", debouncedAddressValue)
    }
  }, [debouncedAddressValue])

  return (<>
    <div className='container m-auto mt-extra'>
      <div className='gap-4 flex'>
        <div className='p-6 rounded-2xl flex border border-[#00000007] items-center gap-4 bg-black text-white'>
          <IoLogoJavascript color='secondary' size={`4em`} />
          <div className='flex flex-col'>
            <span>Вебхуки</span>
            <span></span>
          </div>
        </div>
        <div className='p-6 rounded-2xl border border-[#00000007] bg-white flex gap-4 group overflow-hidden relative'>
          <div className='flex-col flex justify-between z-10'>
            <div className='text-sm text-secondary'>Укажите адрес СРМ (без https) и токен</div>
            <input type="text" placeholder='app.salesap.ru' className='text-sm overflow-hidden text-ellipsis' value={address} onChange={handleInputAddressChange} />
            <input type="text" placeholder='token' className='text-sm overflow-hidden text-ellipsis' value={tokenValue} onChange={handleInputTokenChange} />
          </div>
          <div className='absolute bottom-0 right-0 translate-x-[7em] translate-y-[7em]'>
            <PiGearSixFill className='group-hover:rotate-180 transition-all duration-700 opacity-20' size={`14em`} />
          </div>
        </div>

        <div className='p-6 rounded-2xl border border-[#00000007] bg-white flex-1 items-center'>
          <div className='text-secondary text-sm mb-2'>Владелец токена </div>
          <div>ID: {user?.id ? user?.id : "-"}</div>
          <div>ФИО: {user?.id ? user.attributes['first-name'] : "-"} {user?.id ? user.attributes['last-name'] : "-"} {user?.id ? user.attributes['middle-name'] : "-"}</div>
          <div>Email: {user?.id ? user.attributes['email'] : "-"}</div>
          <div>Роль: {user?.id ? user.attributes['role'] : "-"}</div>
        </div>

        <div className='p-6 rounded-2xl border border-[#00000007] bg-white justify-between flex flex-col'>
          <div className='text-secondary text-sm mb-2'>Используемые библиотеки </div>
          <div>
            <div>1. <a href="https://github.com/meritt/rubles" target='_blank'>Rubles</a></div>
            <div>2. <a href="https://github.com/moment/moment/" target='_blank'>Moment JS</a></div>
          </div>
          <a className='text-center text-sm underline mt-4' href="https://t.me/vineScript113" target='_blank'>Напишите что добавить еще </a>
        </div>
      </div>
    </div >

    <div className='container m-auto gap-4 flex my-4 items-start'>
    
      <div className='p-6 rounded-2xl bg-white sticky top-4'>
        <ul className='flex flex-col gap-6'>
          <li onClick={()=>setActiveComponent(0)} className={`flex gap-4 cursor-pointer items-center ${activeComponent == 0 ? "text-main" : "text-secondary"}`}><FaQuestionCircle size={`1.5em`} /><span className={`${activeComponent == 0 ? "text-black" : "text-secondary"} whitespace-nowrap`}> Как это работает</span></li>
          <li onClick={()=>setActiveComponent(1)} className={`flex gap-4 cursor-pointer items-center ${activeComponent == 1 ? "text-main" : "text-secondary"}`}><FaCookieBite size={`1.5em`} /><span className={`${activeComponent == 1 ? "text-black" : "text-secondary"} whitespace-nowrap`}> Рецепты Вебхуков</span></li>
          <li onClick={()=>setActiveComponent(2)} className={`flex gap-4 cursor-pointer items-center ${activeComponent == 2 ? "text-main" : "text-secondary"}`}><FaFileCode size={`1.5em`} /><span className={`${activeComponent == 2 ? "text-black" : "text-secondary"} whitespace-nowrap`}> Тестирование </span></li>
          <li onClick={()=>setActiveComponent(3)} className={`flex gap-4 cursor-pointer items-center ${activeComponent == 3 ? "text-main" : "text-secondary"}`}><FaListAlt size={`1.5em`} /><span className={`${activeComponent == 3 ? "text-black" : "text-secondary"} whitespace-nowrap`}> Логи</span></li>
        </ul>
      </div>

      {activeComponent == 0 && <HowItsWork />}
      {activeComponent == 1 && <Recepts options={options(debouncedTokenValue)} />}
      {activeComponent == 2 && <Testing options={options(debouncedTokenValue)} />}
      {activeComponent == 3 && <Logs token={debouncedTokenValue} />}

      
    </div>
  </>);

}
