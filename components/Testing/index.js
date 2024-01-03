import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useState } from "react";
import axios from "axios";
import { rubles } from "rubles";
import { webhooksData } from "@/regular/webhooksData";
import { FiPlusCircle } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";


export default function Testing({ options }) {

  const [data, setData] = useState({});
  const [webScript, setWebScript] = useState("return newData;");
  const [computeResult, setComputeResult] = useState({});
  const [activeData, setActiveData] = useState(0);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    setWebScript(localStorage.getItem("webScript"))
  }, [])

  useEffect(() => {
    let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {} } };
    localStorage.setItem("webScript", webScript);
    try {
      let compute = new Function('data', 'newData', 'rubles', 'axios', 'options', webScript);
      setComputeResult(compute(data, newData, rubles, axios, options));
    } catch (err) {
      // debugger
      // console.log("AAAA?",err)
      setComputeResult(String(err));
    }
  }, [webScript, activeData, options, data])

  return (
    <div className="p-6 bg-white rounded-2xl w-full flex gap-4 flex-wrap">
      
      <div className="p-6 bg-white rounded-2xl w-full flex gap-4">
        <div className="">
          <span className="whitespace-nowrap" title="Данные из вебхука">Данные из вебхука</span>
          <div className="max-w-[150px] max-h-[400px] overflow-y-auto">
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
                  <div className="absolute p-2 cursor-pointer right-0 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-50 text-black"><MdModeEdit /></div>

                </div>
              )
              )}
            </div>
          </div>
        </div>
        <div className="w-fit h-[500px] rounded-2xl overflow-hidden">
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
        </div>

        <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
          <pre>{JSON.stringify(computeResult, null, " ")}</pre>
        </div>
      </div>
    </div>
  );
}