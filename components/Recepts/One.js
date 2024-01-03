export default function One() {
  return (<>
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
  </>)
}