import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { rubles } from "rubles";
import { webhooksData } from "@/regular/webhooksData";
import { FiPlusCircle } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";
import DataList from "./DataList";
import moment from "moment";
import { IoCloudDownload, IoCloudDownloadOutline, IoCloudUploadOutline, IoSaveOutline, IoSaveSharp } from "react-icons/io5";
import { Context } from "@/app/page-provider";
import DownloadScript from "../DownloadScript";
import { RiFormatClear } from "react-icons/ri";
import { AiOutlineFormatPainter } from "react-icons/ai";
import SaveScript from "../SaveScript";


export default function Testing({ options }) {

  const [data, setData] = useState({});
  const [webScript, setWebScript] = useState("return newData;");
  const [computeResult, setComputeResult] = useState({});
  const [activeData, setActiveData] = useState('webhook_0');
  const [userData, setUserData] = useState([]);

  const { setModals } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("userData"))
      setUserData(JSON.parse(localStorage.getItem("userData")))
    if (localStorage.getItem("webScript"))
      setWebScript(localStorage.getItem("webScript"));
  }, [])

  useEffect(() => {
    let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {} } };
    localStorage.setItem("webScript", webScript);
    localStorage.setItem("userData", JSON.stringify(userData));
    try {
      let compute = new Function('data', 'newData', 'rubles', 'moment', 'axios', 'options', webScript);
      setComputeResult(compute(data, newData, rubles, moment, axios, options));
    } catch (err) {
      // debugger
      setComputeResult(String(err));
    }
  }, [webScript, activeData, options, data, userData])

  return (
    <div className="p-6 bg-white rounded-2xl w-full flex gap-4 h-[600px] overflow-hidden">
      <DataList setData={setData} userData={userData} setUserData={setUserData} setActiveData={setActiveData} activeData={activeData} />
      <div className="rounded-2xl overflow-hidden relative">
        <AceEditor
          height="100%"
          value={webScript}
          onChange={(e) => setWebScript(e)}
          mode="javascript"
          theme="twilight"
          fontSize="16px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
        <div className="absolute text-2xl text-white bottom-4 left-4 z-10 flex gap-4">
          <div
            title="Добавить перенос строки после ;"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={() => setWebScript(prev => prev.replaceAll(';', ';\n').replaceAll('{', '{\n').replaceAll('}', '\n}\n'))}
          >
            <AiOutlineFormatPainter />
          </div>
          <div
            title="Удалить все переносы строк"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={() => setWebScript(prev => prev.replaceAll('\n', ''))}
          >
            <RiFormatClear />
          </div>
        </div>
        <div className="absolute text-2xl text-white bottom-4 right-4 z-10 flex gap-4">
          <div
            title="Загрузить скрипт в редактор"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={() => setModals([<DownloadScript setWebScript={setWebScript} key="downloadScript" />])}
          ><IoCloudDownload />
          </div>
          <div
            title="Загрузить скрипт в СРМ"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={() => setModals([<SaveScript webScript={webScript} key="saveScript" />])}
          >
            <IoSaveOutline />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 p-4 rounded-2xl overflow-scroll scroll">
        <pre>{JSON.stringify(computeResult, null, " ")}</pre>
      </div>
    </div>
  );
}