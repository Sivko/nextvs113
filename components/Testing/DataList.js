import { Context } from "@/app/page-provider";
import { webhooksData } from "@/regular/webhooksData";
import { useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { MdModeEdit } from "react-icons/md";
import EditData from "./EditData";

export default function DataList({ setData, setActiveData, activeData, userData, setUserData }) {

  const { setModals } = useContext(Context);


  return (
    <div className="overflow-y-auto h-full scroll overflow-x-hidden select-none">
      <span className="whitespace-nowrap" title="Данные из вебхука">Данные из вебхука</span>
      <div className="max-w-[150px]">
        <div className="flex gap-2 flex-col ">
          <div className="w-full text-ellipsis overflow-hidden">
          </div>
          <div
            className={`bg-slate-50 p-4 text-sm rounded-2xl w-full text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex gap-2 items-center`}
            onClick={() => setModals([<EditData setUserData={setUserData} key={"editData"} data={{data: {}}} />])}
          >
            <FiPlusCircle />
            Свои данные
          </div>


          {!!userData.length && userData.map((e, index) => (
            <div key={index} className="group relative">
              <div
                onClick={() => { setData(userData[index].data); setActiveData(`userData_${index}`) }}
                className={`${activeData == `userData_${index}` ? "bg-main text-white" : "bg-slate-50"} p-4 text-sm rounded-2xl w-full text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer`}>
                {userData[index].date}
              </div>
              <div
                onClick={() => setUserData(prev => prev.filter((e, idx) => index !== idx))}
                className="absolute p-2 cursor-pointer right-0 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-50 text-black">
                <FaRegTrashAlt />
              </div>
            </div>
          )
          )}

          {webhooksData.map((e, index) => (
            <div key={index} className="group relative">
              <div
                onClick={() => { setData(webhooksData[index].data.data); setActiveData(`webhook_${index}`) }}
                className={`${activeData == `webhook_${index}` ? "bg-main text-white" : "bg-slate-50"} p-4 text-sm rounded-2xl w-full text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer`}>
                {e.name}
              </div>
              <div
                onClick={() => setModals([<EditData setUserData={setUserData} key={"editData"} data={webhooksData[index].data} />])}
                className="absolute p-2 cursor-pointer right-0 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-50 text-black">
                <MdModeEdit />
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div >
  )
}