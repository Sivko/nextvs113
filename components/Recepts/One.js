export default function One() {
  return (<>
    <div className='flex-1 flex flex-col gap-4'>
      <div className='p-6 rounded-2xl border border-[#00000007] bg-white '>
        <div className='font-bold text-3xl mb-4'>Цифры прописью</div>
        <p className='text-secondary text-sm'> rubles(12.10) // двенадцать рублей 10 копеек</p>
        <p>Данный скрипт преобразовывает цифры в прописной варинт</p>
        <pre className='text-sm mb-4'>{`
newData.type = "deals";
let text = rubles(data.amount);
newData.attributes.description = text;
return newData
`}
        </pre>
        <p>Здесь мы берем информацию, которую вернул вебхук, в данном случае <span className='underline'>data.amount</span> - сумму из сделки и записываем эту сумму в <span className='underline'>newData.attributes.description</span> - в поле Описание.</p>
        <p className='mt-4'>Вы можете указать какие поля используете Вы и автоматически вставить скрипт в систему</p>
        <div>
          <p>Выберите объект, который Вы используете
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </p></div>
      </div>
    </div>


    <div className='bg-black w-1/3 p-6 rounded-2xl text-white sticky top-4'>
      <div className='text-xl mb-4'>Как это работает?</div>
      <div className='mb-2'>1. Вы описываете скрипт на JS и вставляете его в константу, либо можете взять готовый скрипт из списка</div>
      <div className='mb-2'>2. Вызываете действие автоматизации <b>отправить вебхук</b> с параметрами POST JSON по адресу  https://vs113.ru/api/v1/idконстанты/токен </div>
      <div className='mb-2'>Можно посмотреть <a href="#" className='underline'>видосик</a></div>
    </div>
  </>)
}