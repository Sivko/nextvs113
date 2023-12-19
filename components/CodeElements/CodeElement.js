export default function CodeElement({title, tags, active, setActiveCard, index }) {

  const tagName = {
    1: "кастомизация",
    2: "тестирование",
    3: "прочее"
  }
  return (<>
    <div onMouseUp={() => setActiveCard(index)} class={`flex w-full flex-col justify-between p-6 gap-4 transition-all rounded-2xl overflow-hidden ${active ? "shadow-xl" : ""} cursor-pointer bg-white`} data-tags="1">
      <h2 class={`text-xl font-medium text-black`}>{index+1}. {title}</h2>
      <p class={`text-secondary text-base `}>Теги:
        <span class="bg-main text-white text-sm leading-6 font-medium py-2 ml-3 px-3 rounded-lg">{tags ? tagName[tags] : ""}</span>
      </p>
    </div>
  </>)
}