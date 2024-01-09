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
import DataList from "./DataList";


export default function Testing({ options }) {

  const [data, setData] = useState({});
  const [webScript, setWebScript] = useState("return newData;");
  const [computeResult, setComputeResult] = useState({});
  const [activeData, setActiveData] = useState(0);
  const [userData, setUserData] = useState([]);



  useEffect(() => {
    setUserData(localStorage.getItem("userData"))
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
      setComputeResult(String(err));
    }
  }, [webScript, activeData, options, data])

  return (
    <div className="p-6 bg-white rounded-2xl w-full flex gap-4 h-[500px]">
      <DataList setData={setData} setActiveData={setActiveData} activeData={activeData} />
      <div className="w-fit rounded-2xl overflow-hidden">
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

      <div className="flex-1 bg-slate-50 p-4 rounded-2xl overflow-scroll">
        <pre>{JSON.stringify(computeResult, null, " ")}</pre>
      </div>
    </div>
  );
}