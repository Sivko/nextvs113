import { Context } from "@/app/page-provider";
import { webhooksData } from "@/regular/webhooksData";
import { useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";
import EditData from "./EditData";

export default function DataList({ setData, setActiveData, activeData }) {

  const { setModals } = useContext(Context);

  return (
    <div className="overflow-y-auto h-full">
      <span className="whitespace-nowrap" title="Данные из вебхука">Данные из вебхука</span>
      <div className="max-w-[150px]">
        <div className="flex gap-2 flex-col ">
          <div className="w-full text-ellipsis overflow-hidden">
          </div>
          <div className={`bg-slate-50 p-4 text-sm rounded-2xl w-full text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex gap-2 items-center`}><FiPlusCircle /> Свои данные</div>
          {webhooksData.map((e, index) => (
            <div key={index} className="group relative">
              <div
                onClick={() => { setData(webhooksData[index].data.data); setActiveData(index) }}
                className={`${activeData == index ? "bg-main text-white" : "bg-slate-50"} p-4 text-sm rounded-2xl w-full text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer`}>
                {e.name}
              </div>
              <div
              onClick={()=>setModals([<EditData key={"editData"} data={webhooksData[index].data.data} />])}
              className="absolute p-2 cursor-pointer right-0 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-50 text-black">
                <MdModeEdit />
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  )
}