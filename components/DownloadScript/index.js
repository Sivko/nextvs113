import { Context } from "@/app/page-provider";
import { recipesData } from "@/regular/recipesData";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";

export default function DownloadScript({ setWebScript }) {
  const { token, address, setModals } = useContext(Context)
  const [constants, setConstants] = useState([]);

  const options = { headers: { 'Content-Type': 'application/vnd.api+json', 'Authorization': 'Bearer ' + token } }

  useEffect(() => {
    if (!token) return
    axios.get(`https://${address}/api/v1/constants`, options)
      .then((e) => {
        if (e?.data?.data) {
          const arr = e?.data?.data.map(e => ({
            name: `${e.attributes.name}`,
            id: e.id,
            create: moment(e.attributes["created-at"]).format("DD.MM.YYYY HH:mm"),
            update: moment(e.attributes["updated-at"]).format("DD.MM.YYYY HH:mm"),
            value: e.attributes.value
          }))
          setConstants(arr)
        }
      })
      .catch((err) => alert(err))
  }, [])

  const ViewCode = ({ code }) => {
    return (<div className="w-2/3 p-10 rounded-2xl bg-white relative overflow-auto">
      <pre>{code}</pre>
    </div>)
  }

  const List = ({ arr }) => {
    if (!arr.length) return (<>Ничего не найдено</>)
    return arr.map((e, index) => (<li
      className="relative group"
      key={index}
    >
      <span className="hover:underline cursor-pointer" onClick={() => { setWebScript(e.value); document.getElementById("closeModal").click() }}>
        {e.name}
      </span>
      {!!e.create && <small className="opacity-50 ml-4">ID: {e.id} создано: {e.create}, обновлено: {e.update}</small>}
      <span
        className="text-2xl group-hover:opacity-100 opacity-0 mb-[-5px] pl-2 inline-block text-secondary z-10 hover:text-black"
        onClick={() => setModals(prev => [...prev, <ViewCode key="ViewCode" code={e.value} />])}
      >
        <RxEyeOpen />
      </span>
    </li>))
  }

  return (<div className="w-2/3 p-10 rounded-2xl bg-white relative">
    <button id="closeModal" className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true">
      <IoClose className="pointer-events-none" />
    </button>
    <h1>Какой скрипт загрузить в редактор</h1>
    <h2 className=" font-bold text-lg pt-2">Рецепты</h2>
    <hr />
    <ol className=" list-decimal p-4">
      <List arr={recipesData} />
    </ol>
    <h2 className=" font-bold text-lg pt-2">Из контстанты в СРМ</h2>
    <hr />
    <ol className=" list-decimal p-4">
      {!token && <div>Токен не указан :(</div>}
      {!!token && <List arr={constants} />}
    </ol>
  </div>)
}