export default function HowItsWork() {
  return (<>
    <div className='p-6 rounded-2xl bg-white flex-1'>
      <h1>Как это работает?</h1>
      <p></p>
      <p>1. Вы описываете скрипт на JS и вставляете его в константу, либо можете взять готовый скрипт из Рецептов</p>
      <p>2. Вызываете действие автоматизации <b>отправить вебхук</b> с параметрами POST JSON по адресу  <span className="text-main">https://vs113.ru/api/v1/idконстанты/токен</span> или <span className="text-main">https://vs113.ru/api/v1/idконстанты/токен/app.salesap.ru</span> если это коробка </p>
      <p>Можно посмотреть <a href="#" className='underline'>видосик</a></p>
    </div>
  </>)
}