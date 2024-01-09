import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { IoClose } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";

export default function EditData({data}) {


  return (<div className="w-2/3 p-10 rounded-2xl bg-white relative">
    <button className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true"><IoClose className="pointer-events-none" /></button>
    <button className="absolute top-10 p-4 right-10 text-white opacity-50 hover:opacity-100 transition-all text-4xl z-10"><FaRegSave /></button>
    <AceEditor
      height="500px"
      width="100%"
      value={JSON.stringify(data, null, "  ")}
      // onChange={(e) => setWebScript(e)}
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
  </div>)
}