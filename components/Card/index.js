import Image from "next/image";

export default function Card() {
  return (<>
    <div class="md:w-1/3 sm:width-full py-3 md:px-3 sm:px-0 mb-5 flex flex-col" data-tags="1">
      <div class="max-w-none  bg-white shadow-lg relative min-h-full">
        {/* <Image width="488px" height="311px" class="cursor-pointer border overflow-hidden h-[311px] object-cover" src="https://vs113.ru/img/5.jpg" alt="" data-video="https://vs113.ru/img/5.gif" data-preview="https://vs113.ru/img/5.jpg" onmouseover="this.src=this.getAttribute('data-video')" onmouseout="this.src=this.getAttribute('data-preview')" onclick="openScreen(this.getAttribute('data-video'))" /> */}
          <div class="relative overflow-hidden p-6 w-full">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Показать ссылку на межобъектный сценарий</h5>
            <p class="text-gray-700 text-base mb-4">Выводится ссылка на сценарий, который будет вызван по объекту</p>
            <p class="text-gray-700 text-base ">Теги:
              <span class="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 ml-3 px-3 rounded-lg">кастомизация</span>
            </p>
          </div>
      </div>
    </div>
  </>)
}