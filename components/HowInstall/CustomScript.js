import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import { IoClose, IoCopyOutline } from "react-icons/io5";
import { useEffect } from "react";


const code = `function addScript(src){
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
}

addScript('https://vs113.ru/vine/main.js');
addScript('https://vs113.ru/vine/costumize.js');
addScript('https://vs113.ru/vine/testing.js');
addScript('https://vs113.ru/vine/other.js');`


export const copyText = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Скопировано в буфер обмена")
    })
    .catch(err => {
      alert("Что-то пошло не так, скопируйте текст обычным способом")
    });
}

export const copyCode = () => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert("Скопировано в буфер обмена")
    })
    .catch(err => {
      alert("Что-то пошло не так, скопируйте код обычным способом")
    });
}

export default function CustomScript() {

  return (<div className="w-2/3 p-10 rounded-2xl bg-white overflow-hidden relative">
    <button className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true"><IoClose className="pointer-events-none" /></button>
    <button onClick={copyCode} className="text-8xl text-white z-10 absolute right-10 top-10">
      <IoCopyOutline />

    </button>
    <AceEditor
      height="250px"
      width="100%"
      value={code}
      mode="javascript"
      theme="twilight"
      fontSize="16px"
      readOnly={true}
      highlightActiveLine={true}
      setOptions={{
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  </div>)
}