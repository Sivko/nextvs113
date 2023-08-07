console.log("costumize")
$(document).ready(function(){
	var style = '<style>.dataTable.table>thead>tr>th.sorting i {text-decoration: underline}</style>';
	$(document.body).append(style);
})


/*Открывать настройки полей из карточки объекта*/
$('body').on('mouseenter','.form-group[data-field]', function(){
	$(this).css({'position': 'relative'})
	let linkField = $(this).attr('data-field')
	if (linkField.indexOf('custom')!==-1) {
		console.log("fint costum field")
		linkField = linkField.replaceAll('custom_','')
		$(this).prepend(`<a class="customlink" style="margin-top: 8px;position: absolute; background: #fff; opacity: 0.8" title="Редактировать" data-remote="true" href="/settings/custom_fields/${linkField}/edit" ><i style="font-size: 15px;" class="s2-icons s2-edit"></i></a>`)
	}
	// debugger
})

$('body').on('mouseleave','.form-group[data-field]', function(){
	let linkField = $(this).attr('data-field')
	if (linkField.indexOf('custom')!==-1) {
		$(this).find('.customlink').remove();
	}
	// debugger
})




/*Добавить кнопку у поля ID для редактирования профиля Юзера в карточке объекта*/
$("body").on("mouseenter",".users\\.show .header-block, .modal[data-model=User] .header-block", function(){
	let userLink = $(this).find(".copy-by-click").attr("data-copy-text")
	userLink = userLink.replace('users','settings/users')+'/edit'
	let linkToEditUser = `<a id="linkToEditUser" data-remote="true" href="${userLink}" style="color: #fff" class="header-block__icon-wrap page-users-icon"><i class="s2-icons s2-edit header-block__icon"></i></a>`
	$(this).prepend(linkToEditUser)
})

$("body").on("mouseleave",".users\\.show .header-block, .modal[data-model=User] .header-block", function(){
	$("#linkToEditUser").remove()
})


$('body').on('mouseenter','#rights label[for="user_custom_role_id"]', function(){
	$(this).css({'position': 'relative'})
	let rightsId = $('#user_custom_role_id').val()
	$(this).append(`<a class="customlink" title="Редактировать" data-remote="true" href="/settings/custom_roles/${rightsId}/edit" style="position: absolute;right: 13px;"><i style="font-size: 10px" class="s2-icons s2-edit"></i></a>`)
})

$('body').on('mouseleave','#rights label[for="user_custom_role_id"]', function(){
	$(this).find('.customlink').remove()
})


/*Переходим в атвоматизацию*/
$('body').on('click','.top-line', function(){
    let id = $(this).text()
    id = id.split('ID: ');id = id[1].replaceAll(')', ''); id = id.replaceAll(' ', '');
    window.open('https://'+uriMain+'/settings/scenarios/'+id+'/edit', '_blank')
})



/*Открываем/Закрываем активности*/
$('body').on('mouseleave','.ibox-header:contains("Активность"),.ibox-header:contains("Activity")', function(e){
	$(this).find('.customlink').remove()
})
$('body').on('mouseenter','.ibox-header:contains("Активность"), .ibox-header:contains("Activity")', function(e){
        $(this).append(`<span class="customlink" onclick="$('.changes-collapse.collapse').addClass('in');$('.descr-toggle').removeClass('collapsed')"><i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-visibility"></i></span>
        	<span class="customlink" onclick="$('.changes-collapse.collapse').removeClass('in');$('.descr-toggle').addClass('collapsed')"><i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-visibility-off"></i></span>
        	`)
})

/*Показать ссылки на Сценарии по кнопкам*/
$('body').on('mouseenter', '.ibox-header:contains("Действия")', function(){
    $(this).append(`<span class="customlink"><i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-visibility"></i></span>`)
})

$('body').on('mouseleave','.ibox-header:contains("Действия")', function(e){
	$(this).find('.customlink').remove()
})

$('body').on('click','.ibox-header:contains("Действия") .customlink', function(e){
	$('.ibox-content.remote-content .customlink').remove()
	$('.ibox-content.remote-content a.scenario-btn.js-scenario-btn').each(function(){
    	$(this).after(`<a class="customlink" style="margin: 10px 0 20px;display: block;text-align: center;" href="https://${uriMain}/settings/scenarios/${JSON.parse($(this).attr('data-params')).scenario_id}/edit" target="_blank">перейти в сценарий ID: ${JSON.parse($(this).attr('data-params')).scenario_id}</a>`)
	})
})



/*Вывести все объекты из левой колонки в правую (старница пользователей, доп. полей и прочее)*/
$('body').on('click','#allVisual', function(e){
	alert('Сейчас будет что-то загружено')
	let links = []
	$('.settings-droppable.ui-droppable a').each(function(){
		links.push($(this).attr('data-source'))
	})
	$('.col-xs-8.settings-main-content.settings-main-remote').html('')
	for (let i = 0; i<links.length; i++) {
		$('.col-xs-8.settings-main-content.settings-main-remote').append($('<div>').load(links[i]));
	}
})

$('body').on('mouseleave','.settings-subhead.col-xs-8 .ss-left', function(e){
	$('#allVisual').remove()
})
$('body').on('mouseenter','.settings-subhead.col-xs-8 .ss-left', function(e){
    $(this).append(`<span title="Вывести записи из всех категорий" id="allVisual" class="customlink"><i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-download"></i></span>`)
})




/*Скрыть или показать все уведомления, которые надо прочитать*/

$(document).ready(function(){
	if (localStorage.getItem('hideNotifications') == null || localStorage.getItem('hideNotifications') == 'false') {
		if (!$('#hideNotifications').length) {
	        var style = '<style>#toast-container-bottom-left,#toast-container {display: block;}</style>';
			$(document.body).append(style);
			$('.bottom-buttons').prepend(`<li style="padding: 0" class="salesap-market-icon"><a style="user-select: none;-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;-o-user-select: none;"><label for="hideNotifications" title="Скрыть все уведомления (hotkey: ctrl+q)" style="display: block; cursor: pointer; padding: 10px 0;"><i class="s2-icons s2-visibility"></i></label></a></li>`)
			$('body').append(`<input id="hideNotifications" style="display:none; margin: 4px 0 0 4px" type="checkbox">`)
		}
	} else {
		if (!$('#hideNotifications').length){
	        var style = '<style>#toast-container-bottom-left,#toast-container,.telephony-call-details {display: none;} {display: none;} .bottom-buttons li:first-child {border-bottom: solid 1px #fffa00;}</style>';
			$(document.body).append(style);
			$('.bottom-buttons').prepend(`<li style="padding: 0" class="salesap-market-icon"><a style="user-select: none;-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;-o-user-select: none;"><label for="hideNotifications" title="Скрыть все уведомления (hotkey: ctrl+q)" style="display: block; cursor: pointer; padding: 10px 0;"><i class="s2-icons s2-visibility-off"></i></label></a></li>`)
			$('body').append(`<input id="hideNotifications" style="display:none; margin: 4px 0 0 4px" type="checkbox" checked>`)
		}
	}
})

$('body').on('change', '#hideNotifications', function(){
	if ($(this).is(':checked')) {
		localStorage.setItem('hideNotifications', true)
        var style = '<style>#toast-container-bottom-left,#toast-container,.telephony-call-details {display: none;} .bottom-buttons li:first-child {border-bottom: solid 1px #fffa00;}</style>';
		$('.bottom-buttons li').first().find('i').removeClass('s2-visibility').addClass('s2-visibility-off')
		$(document.body).append(style);

	}
	else {
		localStorage.setItem('hideNotifications', false)
		var style = '<style>#toast-container-bottom-left,#toast-container,.telephony-call-details {display: block;} .bottom-buttons li:first-child {border-bottom: inherit;}</style>';
		$('.bottom-buttons li').first().find('i').removeClass('s2-visibility-off').addClass('s2-visibility')
		$(document.body).append(style);

	}
})

document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.key === "q" || zEvent.ctrlKey &&  zEvent.key === "й") {  // case sensitive
        $('#hideNotifications').click()
    }
});




/*Показать ID межобъектного сценария по нажатию "Запустить сценарий по объекту"*/
$('body').on('mouseenter', '.control-label:contains("Сценарий для запуска")', function(){
    $(this).append(`<span class="customlink" onclick="$('.changes-collapse.collapse').addClass('in');
    	$('.descr-toggle').removeClass('collapsed')">
    	<i style="font-size: 17px;vertical-align: middle;" class="s2-icons s2-visibility"></i></span>
	`)
})

$('body').on('mouseleave','.control-label:contains("Сценарий для запуска")', function(e){
	$(this).find('.customlink').remove()
})

$('body').on('click','.control-label:contains("Сценарий для запуска") .customlink', function(e){
    let text = $(this).parent().next().val()
    $(this).parents('.form-group').find('.dropdown-wrapper').html(`<a target="_blank" href="https://${uriMain}/settings/scenarios/${text}/edit">https://${uriMain}/settings/scenarios/${text}/edit</a>`)
})

//Закрепить первую КОлонку. Таблица - Аналитика

// $(document).ready(function(){

// if(window.location.href.indexOf('/analytic?')!=-1) {
// 	let  styleTable=`<style>th:nth-of-type(1),td:nth-of-type(1) {-webkit-box-shadow: -1px 0px 0px 0px rgba(34, 60, 80, 0.13) inset;-moz-box-shadow: -1px 0px 0px 0px rgba(34, 60, 80, 0.13) inset;box-shadow: -1px 0px 0px 0px rgba(34, 60, 80, 0.13) inset;position: sticky;left: 0; border-right: none!important; background:#fff;}</style>`;
// 	$('body').append(styleTable)
// 	}
// })


/*Отобразить категорию документа*/

$('body').on('mouseenter','.settings-content[data-partial=documents\\:document_templates] li.settings-droppable.ui-droppable:not(.categoryType)', function(){
	let idCategoryTemplate = $(this).attr('data-id')
	$(this).addClass('categoryType')
	fetch('https://'+uriMain+"/settings/document_template_categories/"+idCategoryTemplate+"/edit", {
	  "headers": {
	    "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
	    "accept-language": "ru",
	    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
	    "sec-ch-ua-mobile": "?0",
	    "sec-ch-ua-platform": "\"Windows\"",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "x-csrf-token": crf,
	    "x-requested-with": "XMLHttpRequest"
	  },
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": null,
	  "method": "GET",
	  "mode": "cors",
	  "credentials": "include"
	}).then((e)=>e.text().then((data) => {
	    let categoryAttr = data
	    categoryAttr = categoryAttr.slice(categoryAttr.indexOf('<select class=\\"select2-def'),categoryAttr.indexOf('<\\/select>')+14)
	    let category = $(categoryAttr).val()

	    if (category.indexOf('document') !== -1)
	    	$(this).append(`<span title="Документы" class="customlink"><i style="opacity: 0.7; font-size: 20px;vertical-align: middle;" class="s2-icons s2-documents"></i></span>`)
	    if (category.indexOf('mail') !== -1)
	    	$(this).append(`<span title="Почтовые сообщения" class="customlink"><i style="opacity: 0.7; font-size: 20px;vertical-align: middle;" class="s2-icons s2-email"></i></span>`)
	    if (category.indexOf('sms') !== -1)
	    	$(this).append(`<span title="СМС сообщения" class="customlink"><i style="opacity: 0.7; font-size: 20px;vertical-align: middle;" class="s2-icons s2-phone"></i></span>`)
	    if (category.indexOf('invoice') !== -1)
	    	$(this).append(`<span title="Счета/Акты" class="customlink"><i style="color: #907c12; opacity: 0.7; font-size: 20px;vertical-align: middle;" class="s2-icons s2-invoice"></i></span>`)

	    return category
	}));
})