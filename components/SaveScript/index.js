import { Context } from "@/app/page-provider";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";

export default function SaveScript({ webScript }) {

  const { token, address, setModals } = useContext(Context)
  const [constants, setConstants] = useState([]);
  const [name, setName] = useState(`(vs113) Скрипт от ${moment().format('DD.MM HH:mm:ss')}`)

  const [isCreateNewConstant, setIsCreateNewConstant] = useState(false);

  const options = { headers: { 'Content-Type': 'application/vnd.api+json', 'Authorization': 'Bearer ' + token } }

  function createConstant(e) {
    e.preventDefault();
    const data = {
      "data": {
        "type": "constants",
        "attributes": {
          "name": name,
          "value": webScript,
          "numeric": false
        }
      }
    }
    axios.post(`https://${address}/api/v1/constants`, JSON.stringify(data), options)
      .then(e => setModals([(<div key="success" className="w-2/3 p-10 rounded-2xl bg-white relative">
        <h1>Все ок, ID: {e.data.data.id}</h1>
        <p>Теперь надо создать автоматизацию с отправкой веб-хука :)</p>
        <p>{`https://vs113.ru/api/v1/${e.data.data.id}/${token}/${address}`}</p>
      </div>)]))
      .catch(err => setModals([(<div key="error" className="w-2/3 p-10 rounded-2xl bg-white relative">
        <h1>Что-то пошло не так</h1>
        <p>{err.message}</p>
      </div>)]))
    return
  }

  function updateConstant({ id, name }) {
    const input = prompt(`Введите '${id}', чтобы перезаписать константу "${name}"`)
    if (input !== id) {alert(`Не введено ${id}, операция отменена`); return};
    const data = {
      "data": {
        "id": id,
        "type": "constants",
        "attributes": {
          "value": webScript
        }
      }
    }
    axios.patch(`https://${address}/api/v1/constants/${id}`, JSON.stringify(data), options)
      .then(e => setModals([(<div key="success" className="w-2/3 p-10 rounded-2xl bg-white relative">
        <h1>Все ок, ID: {e.data.data.id}</h1>
        <p>{`https://vs113.ru/api/v1/${e.data.data.id}/${token}/${address}`}</p>
        <p>Данные успешно перезаписаны :)</p>
      </div>)]))
      .catch(err => setModals([(<div key="error" className="w-2/3 p-10 rounded-2xl bg-white relative">
        <h1>Что-то пошло не так</h1>
        <p>{err.message}</p>
      </div>)]))
  }

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
      .catch((err) => alert(err.message))
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
      <span className="hover:underline cursor-pointer" onClick={()=>updateConstant({id: e.id, name: e.name})}>
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
    <button id="closeModal" className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true"><IoClose className="pointer-events-none" /></button>

    <h1 className="pb-4">Сохранить скрипт</h1>
    <button
      className={`p-1 px-2 rounded text-white ${isCreateNewConstant ? "bg-red-700 opacity-40" : "bg-main"}`}
      onClick={() => setIsCreateNewConstant(prev => !prev)}
    >
      {isCreateNewConstant ? "Отменить создание" : "Создать новую константу"}
    </button>

    {isCreateNewConstant && (<>
      <form
        className="flex justify-between p-4 border-solid border items-center mt-4"
        onSubmit={createConstant}
      >
        <div>Название: <input required="required" className="" placeholder="Название" onChange={e => {setName(e.target.value)}} value={name} /></div>
        <div>
          <button
            type="submit"
            className={`p-1 px-2 rounded text-white bg-main`}
          >
            Сохранить
          </button>

        </div>
      </form>
    </>)}
    <h2 className="py-4 font-bold">Или перезаписать константу</h2>
    <hr />
    <ol className=" list-decimal px-4">
      {!token && <div>Токен не указан :(</div>}
      {!!token && <List arr={constants} />}
    </ol>
  </div>)
}