import { IoClose } from "react-icons/io5";
import { copyCode, copyText } from "./CustomScript";

export default function GoogleChrome() {
  return (
    <div className="w-2/3 p-10 rounded-2xl bg-white relative">
      <button className="absolute top-2 right-2 text-2xl text-black opacity-30 hover:opacity-100 transition-all" onClick={(e) => e.preventDefault()} data-close="true"><IoClose className="pointer-events-none" /></button>
      <h1>Установка в Google Chrome</h1>
      <ol className=" list-decimal p-5">
        <li>Перейдите на страницу плагина <a className="underline text-main" href="https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld" target="_blank">https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld</a></li>
        <li>Установите его и перейдите в настройки - Добавить новый сайт</li>
        <li>В адресе укажите <a className="text-main underline" href="#" onClick={()=>copyText(`https://app.salesap.ru/`)}>https://app.salesap.ru/</a>, а в поле script укажите скопированный <a href="#" className="text-main underline" onClick={copyCode}>скрипт</a></li>
        <li>Нажмите сохранить</li>
      </ol>
      <iframe width="100%" height="500" src="https://www.youtube.com/embed/qAr8CodtuwE" title="Установка скрипта в Yandex браузере" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>
    </div>
  )
}