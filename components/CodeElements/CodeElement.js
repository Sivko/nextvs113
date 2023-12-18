export default function CodeElement({ active, setActiveCard, index }) {

  return (<>
    <div onMouseUp={() => setActiveCard(index)} class={`flex w-full flex-col justify-between p-6 gap-4 transition-all rounded-2xl overflow-hidden ${active ? "shadow-xl" : ""} cursor-pointer bg-white`} data-tags="1">
      <h5 class={`text-xl font-medium text-black`}>Показать ссылку на межобъектный сценарий</h5>
      <p class={`text-secondary text-base `}>Теги:
        <span class="bg-main text-white text-sm leading-6 font-medium py-2 ml-3 px-3 rounded-lg">кастомизация</span>
      </p>
    </div>
  </>)
}