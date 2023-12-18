"use client";

import Card from '@/components/CodeElements'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoLogoJavascript } from "react-icons/io";
import { PiGearSixFill } from "react-icons/pi";


const options = (token) => ({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${token}`,
    'S2-Allow-Websockets': true
  },
  validateStatus: () => true
});

export default function Recipes() {

  const [tokenValue, setTokenValue] = useState("");
  const [debouncedTokenValue, setDebounceTokenValue] = useState("");
  const [address, setAddress] = useState("app.salesap.ru")
  const [debouncedAddressValue, setDebounceAddressValue] = useState("");
  const [user, setUser] = useState({});

  const handleInputTokenChange = (event) => {
    setTokenValue(event.target.value);
  };

  const handleInputAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceTokenValue(tokenValue);
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

    const currentToken = await axios.get(`https://${debouncedAddressValue}/api/v1/current-token`, options(debouncedTokenValue))
    setUser({});
    if (currentToken?.data?.data?.attributes) {
      const user = await axios.get(`https://${debouncedAddressValue}/api/v1/users/${currentToken?.data?.data?.attributes["user-id"]}`, options(debouncedTokenValue))
      setUser(user.data.data);
    }
  }

  useEffect(() => {
    if (window) {
      let token = localStorage.getItem("token");
      if (token) setTokenValue(token)
      let site = localStorage.getItem("address")
      if (site) setAddress(site)
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
            <span>Рецепты вебхуков</span>
            <span></span>
          </div>
        </div>
        <div className='p-6 rounded-2xl border border-[#00000007] bg-white flex gap-4 group overflow-hidden relative'>
          <div className='flex-col flex justify-between z-10'>
            <div className='text-sm text-secondary'>Укажите адрес СРМ и токен</div>
            <input type="text" placeholder='app.salesap.ru' className='text-sm overflow-hidden text-ellipsis' value={address} onChange={handleInputAddressChange} />
            <input type="text" className='text-sm overflow-hidden text-ellipsis' value={tokenValue} onChange={handleInputTokenChange} />
            <div className='text-sm'>Нужен для автоматического добавления скрипта в систему</div>
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
          <a className='text-center text-sm underline mt-4' href="#">Напишите что добавить еще </a>
        </div>
      </div>
    </div >

    <div className='container m-auto gap-4 flex mt-4 items-start'>

      <div className='flex-1 flex flex-col gap-4'>
        <div className='p-6 rounded-2xl border border-[#00000007] bg-white '>
          <div className='font-bold text-3xl mb-4'>Цифры прописью</div>
          <p className='text-secondary text-sm'> rubles(12.10) // двенадцать рублей 10 копеек</p>
          <p>Данный скрипт преобразовывает цифры в прописной варинт</p>
          <pre className='text-sm mb-4'>{`
newData.type = "deals";
let text = rubles(data.amount);
newData.attributes.description = text;
return newData
`}
          </pre>
        <p>Здесь мы берем информацию, которую вернул вебхук, в данном случае <span className='underline'>data.amount</span> - сумму из сделки и записываем эту сумму в <span className='underline'>newData.attributes.description</span> - в поле Описание.</p>
        <p className='mt-4'>Вы можете указать какие поля используете Вы и автоматически вставить скрипт в систему</p>
        <div>
          <p>Выберите объект, который Вы используете 
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            </p></div>
        </div>
      </div>


      <div className='bg-black w-1/3 p-6 rounded-2xl text-white sticky top-4'>
        <div className='text-xl mb-4'>Как это работает?</div>
        <div className='mb-2'>1. Вы описываете скрипт на JS и вставляете его в константу, либо можете взять готовый скрипт из списка</div>
        <div className='mb-2'>2. Вызываете действие автоматизации <b>отправить вебхук</b> с параметрами POST JSON по адресу  https://vs113.ru/api/v1/idконстанты/токен </div>
        <div className='mb-2'>Можно посмотреть <a href="#" className='underline'>видосик</a></div>
      </div>
    </div>
  </>);

}
