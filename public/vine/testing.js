/*--ТЕСТИРОВАНИЕ--*/
console.log("testing") 



/*Ctrl+Alt+A Прокликать все label:visible в открытом модально окне*/
document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.key === "a" || zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.key === "ф") {  // case sensitive
        $('.modal-dialog').last().find('label:visible').click()
        console.log('ща шото буде')
    }
});



/*Выделить все загруженные элементы*/
$('body').on('dblclick','.modal-dialog .active .bind-tab:contains("Найдено")', function(){
	console.log("doubleclick")
	$('.bind-form-body.tab-content .tab-pane>div').each(function(){
		$(this).find('div').last().children().last().click()
	})
})



//Создание своих полей

let indexArray;
window.tab = $('.settings-main .settings-main-tabs .settings-droppable.active').attr('data-id')


window.addFieldes =  function addFieldes(number) {
	window.tab = $('.settings-main .settings-main-tabs .settings-droppable.active').attr('data-id')
	debugger
	if (window.tab == undefined) {alert("Не смог определить категорию, проверьте чтобы была активная категория"); return}
	fetch('https://'+uriMain+'/settings/custom_fields', {
	  "headers": {
	    "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
	    "accept-language": "ru",
	    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
	    "sec-ch-ua-mobile": "?0",
	    "sec-ch-ua-platform": "\"Windows\"",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "x-csrf-token": `${crf}`,
	    "x-requested-with": "XMLHttpRequest"
	  },
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": `${bodyFields(modes,indexArray,tab)[number-1]}`,
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	}).then((e)=>{
        if (e.status == 200)
            toastr.info('Поле '+number+' создано!', 'Информация')
        else
            toastr.error('При создании поля '+number+' что-то пошло не так!', 'Внимание')
    });
}

$('body').on('mouseenter', '#modal_custom_field_new .modal-header', function(){
    $(this).find('h4').append(`<span id="add_custom_field" class="btn btn-primary" style="margin-left: 10px;margin-top: -4px;padding: 0 10px;"><i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-add"></i></span>`)
})

$('body').on('mouseleave','#modal_custom_field_new .modal-header', function(e){
	$(this).find('#add_custom_field').remove()
})

$('body').on('click','#add_custom_field', function(){

	window.tab = $('.settings-main .settings-main-tabs .settings-droppable.active').attr('data-id')
	crf = $('meta[name=csrf-token]').attr('content')
    console.log("Создаю поле")
	let params = window.location.search.replace('?','').split('&').reduce(function(p,e){var a = e.split('=');p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);return p;},{});
    // indexArray = modes[0].indexOf(params.mode.replace(':custom_fields',''));
    // console.log(indexArray);
    indexArray = modes[0].indexOf(params.mode.replace(':custom_fields','').replace('/orders',''));
    let div = `
<div id="addFieldsWrapper" style="overflow: auto; position: absolute; opacity: 0.8; inset: 0px; background: rgb(221, 221, 221); z-index: 999; padding: 5px; display: block;">
   <div id="addFields" class="btn btn-primary" style="margin-bottom: 10px">Добавить все поля</div>
   <div id="closeFieldsWrapper" onclick="$('#addFieldsWrapper').hide()" style="position: fixed; right: 100px;" class="btn btn-danger">Закрыть</div>
   Уточните, какое поле необходимо создать (Введите "all", если все). Варианты: 
   <p>1. Текст - Текст<span onclick="addFieldes(1)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>2. Текст - Текст (без формат<span onclick="addFieldes(2)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>3.+Текст - Адрес<span onclick="addFieldes(3)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>4. Текст - Город<span onclick="addFieldes(4)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>5. Текст - Регион<span onclick="addFieldes(5)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>6. Текст - Телефон<span onclick="addFieldes(6)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>7. Текст - Телефон (неск. значений)<span onclick="addFieldes(7)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>8. Текст - Телефон (системный вид)<span onclick="addFieldes(8)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>9. Текст - Телефон (неск. зн + сист. вид)<span onclick="addFieldes(9)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>10. Текст - email<span onclick="addFieldes(10)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>11. Текст - email (неск. значений)<span onclick="addFieldes(11)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>12. Текст - ссылка<span onclick="addFieldes(12)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>13. Текст - ссылка (неск. значений)<span onclick="addFieldes(13)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>14. Число <span onclick="addFieldes(14)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>15. Число - Целое<span onclick="addFieldes(15)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>16. Число - Свое зн.  <span onclick="addFieldes(16)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>17. Число - Валюта (USD, $)<span onclick="addFieldes(17)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>18. Число - Валюта (Баз знака)<span onclick="addFieldes(18)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>19. Дата<span onclick="addFieldes(19)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>20. Дата и Время<span onclick="addFieldes(20)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>21. Дата и Время и Календарь задач<span onclick="addFieldes(21)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>22. Список - Выпадающий (одно значение)<span onclick="addFieldes(22)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>23. Список - Выпадающий (мн. выбор)<span onclick="addFieldes(23)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>24. Список - Флажки (одно значние)<span onclick="addFieldes(24)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>25. Список - Флажки (мн. выбор)<span onclick="addFieldes(25)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>26. Список (внешний источник) (одно знач.)<span onclick="addFieldes(26)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>27. Список (внешний источник) (мн. выбор)<span onclick="addFieldes(27)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>28. Файл (не публ.)<span onclick="addFieldes(28)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>29. Файл (публичный)<span onclick="addFieldes(29)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>30. Формула<span onclick="addFieldes(30)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>31. Рейтинг<span onclick="addFieldes(31)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>32. Связь - Заявки<span onclick="addFieldes(32)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>33. Связь - Компании<span onclick="addFieldes(33)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>34. Связь - Сделки<span onclick="addFieldes(34)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>35. Связь - Контакты<span onclick="addFieldes(35)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>36. Связь - Продукты<span onclick="addFieldes(36)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>37. Связь - Сотрудники<span onclick="addFieldes(37)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>38. Связь - Задачи<span onclick="addFieldes(38)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>39. Связь - События<span onclick="addFieldes(39)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>40. Связь - Записи<span onclick="addFieldes(40)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>41. Связь - Документы<span onclick="addFieldes(41)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>42. Связь - Договоры<span onclick="addFieldes(42)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>43. Связь - Визиты<span onclick="addFieldes(43)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>44. мн. Связь - Компании<span onclick="addFieldes(44)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>45. мн. Связь - Сделки<span onclick="addFieldes(45)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>46. мн. Связь - Заявки<span onclick="addFieldes(46)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>47. мн. Связь - Контакты<span onclick="addFieldes(47)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>48. мн. Связь - Продукты<span onclick="addFieldes(48)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>49. мн. Связь - Сотрудники<span onclick="addFieldes(49)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>50. мн. Связь - Задачи<span onclick="addFieldes(50)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>51. мн. Связь - События<span onclick="addFieldes(51)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>52. мн. Связь - Записи<span onclick="addFieldes(52)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>53. мн. Связь - Документы<span onclick="addFieldes(53)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>54. мн. Связь - Договоры<span onclick="addFieldes(54)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>55. мн. Связь - Визиты<span onclick="addFieldes(55)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>56. мн. Связь - Компании (чт. всего списка)<span onclick="addFieldes(56)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>57. мн. Связь - Сделки (чт. всего списка)<span onclick="addFieldes(57)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>58. мн. Связь - Заявки (чт. всего списка)<span onclick="addFieldes(58)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>59. мн. Связь - Контакты (чт. всего списка)<span onclick="addFieldes(59)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>60. мн. Связь - Продукты (чт. всего списка)<span onclick="addFieldes(60)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>61. мн. Связь - Сотрудники (чт. всего списка)<span onclick="addFieldes(61)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>62. мн. Связь - Задачи (чт. всего списка)<span onclick="addFieldes(62)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>63. мн. Связь - События (чт. всего списка)<span onclick="addFieldes(63)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>64. мн. Связь - Записи (чт. всего списка)<span onclick="addFieldes(64)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>65. мн. Связь - Документы (чт. всего списка)<span onclick="addFieldes(65)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>66. мн. Связь - Договоры (чт. всего списка)<span onclick="addFieldes(66)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>67. мн. Связь - Визиты. (чт. всего списка)<span onclick="addFieldes(67)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>68. Расчетный список<span onclick="addFieldes(68)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>69. мн. Расчетный список<span onclick="addFieldes(69)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>70. Дерево<span onclick="addFieldes(70)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>71.  (мн.) Дерево<span onclick="addFieldes(71)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>72. Курс валюты (USD)<span onclick="addFieldes(72)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>73. Курс валюты (EUR)<span onclick="addFieldes(73)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>74. Нумератор (инкремент)<span onclick="addFieldes(75)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
   <p>75. Нумератор (инкремент + шаблон)<span onclick="addFieldes(75)" class="btn btn-primary" style="margin-left: 5px">+</span></p>
</div>`;
    //<div id="addFields" class="btn btn-primary">Добавить</div>
    //<div id="closeFieldsWrapper" class="btn btn-danger">Закрыть</div>
    if ($('#addFieldsWrapper').html() != undefined) $('#addFieldsWrapper').show()
    else $('#wrapper').append(div);
})

function getRand(max = 10000) {
  return Math.floor(Math.random() * max);
}

function bodyFields(modes,indexArray, tab ) { return [`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=1. Текст - Текст++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=text&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=2. Текст - Текст (без формат) ${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=text&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0&custom_field%5Bwysiwyg_disabled%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=3.+Текст - Адрес++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=address&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=4. Текст - Город +${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=city&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=5. Текст - Регион++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=region&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=6. Текст - Телефон++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=phone&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=7. Текст - Телефон (неск. значений)++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=phone&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=8. Текст - Телефон (системный вид)++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=phone&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0&custom_field%5Bbeauty_phone%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=9. Текст - Телефон (неск. зн + сист. вид)++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=phone&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bbeauty_phone%5D=0&custom_field%5Bbeauty_phone%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=10. Текст - email++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=email&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=11. Текст - email (неск. значений)++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=email&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=12. Текст - ссылка++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=url&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=13. Текст - ссылка (неск. значений)++${getRand()}&type=text&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bacts_like%5D=url&custom_field%5Bprefix%5D=&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bbeauty_phone%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=14. Число ++${getRand()}&type=number&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=without_extension&custom_field%5Bextension%5D=&custom_field%5Bextension%5D=&custom_field%5Brequired%5D=0&custom_field%5Bonly_integer%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=15. Число - Целое++${getRand()}&type=number&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=without_extension&custom_field%5Bextension%5D=&custom_field%5Bextension%5D=&custom_field%5Brequired%5D=0&custom_field%5Bonly_integer%5D=0&custom_field%5Bonly_integer%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=16. Число - Свое зн.  ++${getRand()}&type=number&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=unit&custom_field%5Bextension%5D=%D0%BB.&custom_field%5Brequired%5D=0&custom_field%5Bonly_integer%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=17. Число - Валюта (USD, $)++${getRand()}&type=number&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=currency&custom_field%5Bextension%5D=USD%2C+%24&custom_field%5Brequired%5D=0&custom_field%5Bonly_integer%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=18. Число - Валюта (Баз знака)++${getRand()}&type=number&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=currency&custom_field%5Bextension%5D=%D0%91%D0%B5%D0%B7+%D0%B7%D0%BD%D0%B0%D0%BA%D0%B0&custom_field%5Brequired%5D=0&custom_field%5Bonly_integer%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=19. Дата++${getRand()}&type=date&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0&custom_field%5Bwith_time%5D=0&custom_field%5Bshow_diaries_in_timepicker%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=20. Дата и Время++${getRand()}&type=date&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0&custom_field%5Bwith_time%5D=0&custom_field%5Bwith_time%5D=1&custom_field%5Bshow_diaries_in_timepicker%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=21. Дата и Время и Календарь задач++${getRand()}&type=date&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0&custom_field%5Bwith_time%5D=0&custom_field%5Bwith_time%5D=1&custom_field%5Bshow_diaries_in_timepicker%5D=0&custom_field%5Bshow_diaries_in_timepicker%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=22. Список - Выпадающий (одно значение)++${getRand()}&type=select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=checkapp&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bcolors%5D%5B%5D=%2316b636&custom_field%5Boptions%5D%5B%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Bvalues%5D%5B%5D=1&custom_field%5Bcolors%5D%5B%5D=%239e2e3f&custom_field%5Boptions%5D%5B%5D=%D0%94%D0%B2%D0%B0&custom_field%5Bvalues%5D%5B%5D=2&custom_field%5Bcolors%5D%5B%5D=%23b11b4d&custom_field%5Boptions%5D%5B%5D=%D0%A2%D1%80%D0%B8&custom_field%5Bvalues%5D%5B%5D=3`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=23. Список - Выпадающий (мн. выбор)++${getRand()}&type=select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=checkapp&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bcolors%5D%5B%5D=%231c93b0&custom_field%5Boptions%5D%5B%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Bvalues%5D%5B%5D=1&custom_field%5Bcolors%5D%5B%5D=%23227faa&custom_field%5Boptions%5D%5B%5D=%D0%94%D0%B2%D0%B0&custom_field%5Bvalues%5D%5B%5D=2&custom_field%5Bcolors%5D%5B%5D=%23892ca0&custom_field%5Boptions%5D%5B%5D=%D0%A2%D1%80%D0%B8&custom_field%5Bvalues%5D%5B%5D=3`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=24. Список - Флажки (одно значние)++${getRand()}&type=select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=checkbox&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bcolors%5D%5B%5D=%23903c40&custom_field%5Boptions%5D%5B%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Bvalues%5D%5B%5D=1&custom_field%5Bcolors%5D%5B%5D=%23928d3a&custom_field%5Boptions%5D%5B%5D=%D0%94%D0%B2%D0%B0&custom_field%5Bvalues%5D%5B%5D=2&custom_field%5Bcolors%5D%5B%5D=%2${tab}20ac&custom_field%5Boptions%5D%5B%5D=%D0%A2%D1%80%D0%B8&custom_field%5Bvalues%5D%5B%5D=3`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=25. Список - Флажки (мн. выбор)++${getRand()}&type=select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=checkbox&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bcolors%5D%5B%5D=%23903c40&custom_field%5Boptions%5D%5B%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Bvalues%5D%5B%5D=1&custom_field%5Bcolors%5D%5B%5D=%23928d3a&custom_field%5Boptions%5D%5B%5D=%D0%94%D0%B2%D0%B0&custom_field%5Bvalues%5D%5B%5D=2&custom_field%5Bcolors%5D%5B%5D=%2${tab}20ac&custom_field%5Boptions%5D%5B%5D=%D0%A2%D1%80%D0%B8&custom_field%5Bvalues%5D%5B%5D=3`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=26. Список (внешний источник) (одно знач.)++${getRand()}&type=external_select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bmultiple%5D=0&custom_field%5Bexternal_source%5D=https%3A%2F%2Fsalesap.ru%2Fdemo-data%2Fdemo-field.json&custom_field%5Blabel_key%5D=name&custom_field%5Bvalue_key%5D=value&custom_field%5Bcolor_key%5D=&custom_field%5Bjson_path%5D=colors&custom_field%5Busername%5D=&custom_field%5Bpassword%5D=`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=27. Список (внешний источник) (мн. выбор)++${getRand()}&type=external_select&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Bexternal_source%5D=https%3A%2F%2Fsalesap.ru%2Fdemo-data%2Fdemo-field.json&custom_field%5Blabel_key%5D=name&custom_field%5Bvalue_key%5D=value&custom_field%5Bcolor_key%5D=&custom_field%5Bjson_path%5D=colors&custom_field%5Busername%5D=&custom_field%5Bpassword%5D=`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=28. Файл (не публ.)++${getRand()}&type=file&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bpublic_upload%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=29. Файл (публичный)++${getRand()}&type=file&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bpublic_upload%5D=0&custom_field%5Bpublic_upload%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=30. Формула++${getRand()}&type=formula&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bextension_type%5D=without_extension&custom_field%5Bextension%5D=&custom_field%5Bextension%5D=&custom_field%5Bformula%5D=%3Cp%3E100%2B100%3C%2Fp%3E`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=31. Рейтинг++${getRand()}&type=rating&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=32. Связь - Заявки++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Order`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=33. Связь - Компании++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Company`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=34. Связь - Сделки++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Deal`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=35. Связь - Контакты++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contact`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=36. Связь - Продукты++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Product`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=37. Связь - Сотрудники++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=User`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=38. Связь - Задачи++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryTask`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=39. Связь - События++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryEvent`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=40. Связь - Записи++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Entry`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=41. Связь - Документы++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DocumentTemplateRender`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=42. Связь - Договоры++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contract`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=43. Связь - Визиты++${getRand()}&type=relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Checkup`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=44. мн. Связь - Компании++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Company&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=45. мн. Связь - Сделки++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Deal&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=46. мн. Связь - Заявки++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Order&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=47. мн. Связь - Контакты++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contact&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=48. мн. Связь - Продукты++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Product&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=49. мн. Связь - Сотрудники++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=User&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=50. мн. Связь - Задачи++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryTask&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=51. мн. Связь - События++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryEvent&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=52. мн. Связь - Записи++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Entry&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=53. мн. Связь - Документы++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DocumentTemplateRender&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=54. мн. Связь - Договоры++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contract&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=55. мн. Связь - Визиты++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Checkup&custom_field%5Bread_all%5D=0`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=56. мн. Связь - Компании (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Company&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=57. мн. Связь - Сделки (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Deal&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=58. мн. Связь - Заявки (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Order&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=59. мн. Связь - Контакты (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contact&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=60. мн. Связь - Продукты (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Product&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=61. мн. Связь - Сотрудники (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=User&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=62. мн. Связь - Задачи (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryTask&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=63. мн. Связь - События (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DiaryEvent&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=64. мн. Связь - Записи (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Entry&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=65. мн. Связь - Документы (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=DocumentTemplateRender&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=66. мн. Связь - Договоры (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Contract&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=67. мн. Связь - Визиты. (чт. всего списка)++${getRand()}&type=multiple_relation&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brelation_class%5D=Checkup&custom_field%5Bread_all%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=68. Расчетный список++${getRand()}&type=weight&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=select&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Boptions_attributes%5D%5B1660560888987%5D%5Bname%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Boptions_attributes%5D%5B1660560888987%5D%5Bweight%5D=1&custom_field%5Boptions_attributes%5D%5B1660560889778%5D%5Bname%5D=%D0%94%D0%B2%D0%B0&custom_field%5Boptions_attributes%5D%5B1660560889778%5D%5Bweight%5D=2&custom_field%5Boptions_attributes%5D%5B1660560890134%5D%5Bname%5D=%D0%A2%D1%80%D0%B8&custom_field%5Boptions_attributes%5D%5B1660560890134%5D%5Bweight%5D=3&custom_field%5Boptions_attributes%5D%5B1660560901712%5D%5Bname%5D=%D0%9C%D0%B8%D0%BD%D1%83%D1%81+3&custom_field%5Boptions_attributes%5D%5B1660560901712%5D%5Bweight%5D=-3&custom_field%5Boptions_attributes%5D%5B1660560907640%5D%5Bname%5D=1.5&custom_field%5Boptions_attributes%5D%5B1660560907640%5D%5Bweight%5D=1.5`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=69. мн. Расчетный список++${getRand()}&type=weight&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bdisplay_as%5D=select&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Boptions_attributes%5D%5B1660560964929%5D%5Bname%5D=%D0%9E%D0%B4%D0%B8%D0%BD&custom_field%5Boptions_attributes%5D%5B1660560964929%5D%5Bweight%5D=1&custom_field%5Boptions_attributes%5D%5B1660560965076%5D%5Bname%5D=%D0%94%D0%B2%D0%B0&custom_field%5Boptions_attributes%5D%5B1660560965076%5D%5Bweight%5D=2&custom_field%5Boptions_attributes%5D%5B1660560965223%5D%5Bname%5D=%D0%A2%D1%80%D0%B8&custom_field%5Boptions_attributes%5D%5B1660560965223%5D%5Bweight%5D=3&custom_field%5Boptions_attributes%5D%5B1660560965366%5D%5Bname%5D=%D0%9C%D0%B8%D0%BD%D1%83%D1%81+%D1%82%D1%80%D0%B8&custom_field%5Boptions_attributes%5D%5B1660560965366%5D%5Bweight%5D=-3&custom_field%5Boptions_attributes%5D%5B1660560972256%5D%5Bname%5D=1%2C5&custom_field%5Boptions_attributes%5D%5B1660560972256%5D%5Bweight%5D=1.5`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=70. Дерево++${getRand()}&type=tree&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=0&custom_field%5Boptions_json%5D=%5B%7B%22id%22%3A%22j1_1%22%2C%22text%22%3A%22Step+1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_1%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_1_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_3%22%2C%22text%22%3A%22Step+1.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_3%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_3_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D%7D%2C%7B%22id%22%3A%22j1_2%22%2C%22text%22%3A%22Step+2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_2%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_2_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_4%22%2C%22text%22%3A%22Step+2.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_4%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_4_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_5%22%2C%22text%22%3A%22Step+2.2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_5%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_5_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_7%22%2C%22text%22%3A%22Step+2.3%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_7%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_7_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_8%22%2C%22text%22%3A%22Step+2.3.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_8%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_8_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_10%22%2C%22text%22%3A%22Step+2.3.2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_10%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_10_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D%7D%5D%7D%2C%7B%22id%22%3A%22j1_11%22%2C%22text%22%3A%22Step+3%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_11%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_11_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=71.  (мн.) Дерево++${getRand()}&type=tree&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Brequired%5D=0&custom_field%5Bmultiple%5D=1&custom_field%5Boptions_json%5D=%5B%7B%22id%22%3A%22j1_1%22%2C%22text%22%3A%22Step+1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_1%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_1_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_3%22%2C%22text%22%3A%22Step+1.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_3%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_3_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D%7D%2C%7B%22id%22%3A%22j1_2%22%2C%22text%22%3A%22Step+2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_2%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_2_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_4%22%2C%22text%22%3A%22Step+2.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_4%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_4_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_5%22%2C%22text%22%3A%22Step+2.2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_5%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_5_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_7%22%2C%22text%22%3A%22Step+2.3%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_7%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_7_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Atrue%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%7B%22id%22%3A%22j1_8%22%2C%22text%22%3A%22Step+2.3.1%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_8%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_8_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22j1_10%22%2C%22text%22%3A%22Step+2.3.2%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_10%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_10_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D%7D%5D%7D%2C%7B%22id%22%3A%22j1_11%22%2C%22text%22%3A%22Step+3%22%2C%22icon%22%3Atrue%2C%22li_attr%22%3A%7B%22id%22%3A%22j1_11%22%7D%2C%22a_attr%22%3A%7B%22href%22%3A%22%23%22%2C%22id%22%3A%22j1_11_anchor%22%7D%2C%22state%22%3A%7B%22loaded%22%3Atrue%2C%22opened%22%3Afalse%2C%22selected%22%3Afalse%2C%22disabled%22%3Afalse%7D%2C%22data%22%3A%7B%7D%2C%22children%22%3A%5B%5D%7D%5D`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=72. Курс валюты (USD)++${getRand()}&type=exchange_rate&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bcurrency%5D=11`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=73. Курс валюты (EUR)++${getRand()}&type=exchange_rate&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bcurrency%5D=12`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=74. Нумератор (инкремент)++${getRand()}&type=sequence&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bstart_number%5D=1&custom_field%5Bmask%5D=&custom_field%5Bsequence_group%5D=default&custom_field%5Bauto_sequence%5D=0&custom_field%5Bauto_sequence%5D=1`,
`utf8=%E2%9C%93&class_name=${modes[1][indexArray]}&custom_field%5Bname%5D=75. Нумератор (инкремент + шаблон)++${getRand()}&type=sequence&custom_field%5Bcustom_field_category_id%5D=${tab}&custom_field%5Bstart_number%5D=1&custom_field%5Bmask%5D=2019-%D0%94-%7B99999%7D&custom_field%5Bsequence_group%5D=default&custom_field%5Bauto_sequence%5D=0&custom_field%5Bauto_sequence%5D=1`] };

$('body').on('click','#addFields', async function(){

	if (tab == undefined) {alert("Не смог определить категорию, проверьте чтобы была активная категория"); return}
	let prom = prompt('Введите "all" (чтобы создать все доступные поля)')
	if (prom == 'all') {
		alert('Отправляются запросы, дождитесь пожалуйста, пока будут созданы все 75 полей')
		for (let i = 0; i < bodyFields(modes,indexArray,tab).length; i++) {
			await fetch('https://'+uriMain+"/settings/custom_fields", {
			  "headers": {
			    "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
			    "accept-language": "ru",
			    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
			    "sec-ch-ua-mobile": "?0",
			    "sec-ch-ua-platform": "\"Windows\"",
			    "sec-fetch-dest": "empty",
			    "sec-fetch-mode": "cors",
			    "sec-fetch-site": "same-origin",
			    "x-csrf-token": `${crf}`,
			    "x-requested-with": "XMLHttpRequest"
			  },
			  "referrerPolicy": "strict-origin-when-cross-origin",
			  "body": `${bodyFields(modes,indexArray,tab)[i]}`,
			  "method": "POST",
			  "mode": "cors",
			  "credentials": "include"
			}).then((e)=>{
                if (e.status == 200)
                    toastr.info('Поле '+(i+1)+' создано!', 'Информация')
                else
                    toastr.error('При создании поля '+(i+1)+' что-то пошло не так!', 'Внимание')
            });;
		}
	} else alert('Введен неверный параметр. Введеье слово "all"');
})

//Конец "создание своих полей"