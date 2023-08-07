console.log("other")

var editor,editor2

//Посмотреть название поля API (два раза кликнуть по названию поля)
$('body').on('dblclick', '.form-group', function(){
	let hideInput = `<div id="hideInp" style="opacity: 0"><input type="text"></div>`
	if ($('#hideInp').html()==undefined) $('#wrapper').append(hideInput);
	$('#hideInp input').val($(this).attr('data-field')).select()
	document.execCommand("copy");
	toastr.info('Информация в буфере обмена', 'Скопировал!')
})


/*userMenu*/
$(document).ready(function(){

	$('body').append(`<div id="showUserMenu"></div>`)
	$('body .bottom-buttons').append(`<li class="salesap-market-icon"><a href="#" onclick="$('#showUserMenu').click(); return"><i class="s2-icons s2-list"></i></a></li>`)

	document.addEventListener("keydown", function (zEvent) {
	    if (zEvent.ctrlKey  &&   zEvent.key === "`" || zEvent.ctrlKey  &&   zEvent.key === "ё") {  // case sensitive
	        $('#showUserMenu').click()
	    }
	});

})


$('body').on('click','#showUserMenu', function(){
	if ($('#userWindow').is(':visible')) {$('#userWindow').hide(); return false;}
	if ($('#userWindow').length) {$('#userWindow').show(); return false;}

	$('body').append(`<div id="userWindow" style="overflow: auto; position: absolute; opacity: 1; inset: 0px; background: rgb(221, 221, 221); z-index: 999; padding: 5px; display: block; min-width: 1200px; overflow: auto;">
	
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.9.2/jsoneditor.min.css">


		<div id="closeUserWindow" onclick="$('#userWindow').hide()" style="position: fixed; right: 100px; top: 10px; z-index: 99" class="btn btn-danger">Закрыть</div>
		<div style="position: fixed; left: 0; top: 0; bottom: 0; width: 200px; background: red; margin: 0; padding: 10px; color: #d1d1d1; background:#03060e; overflow: auto;">
				<h3 class="text-center" style="font-weight: lighter;">API заготовки/Меню</h3>
				<hr>
				<div style="background: #0b0c15; font-size: 14px; cursor: pointer;" onclick="$('#ulApi').toggle()">API</div>
					<ul id="ulApi" style="display: none">
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#intro')" href='#'>Введение</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#auth')" href='#'>Авторизация</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#token')" href='#'>Информация о токене</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#contacts')" href='#'>Контакты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#companies')" href='#'>Компании</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#deals')" href='#'>Сделки</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#orders')" href='#'>Заявки</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#diary_events')" href='#'>События</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#diary_tasks')" href='#'>Задачи</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#entry')" href='#'>Записи</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#telephonies')" href='#'>Телефония</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#products')" href='#'>Продукты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#entity_products')" href='#'>Вложенные продукты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#projects')" href='#'>Проекты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#estate-properties')" href='#'>Объекты недвижимости</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#contracts')" href='#'>Договоры</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#segments')" href='#'>Сегменты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#invoices')" href='#'>Счета и платежи</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#dictionaries')" href='#'>Справочники</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#users')" href='#'>Пользователи</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#webhooks')" href='#'>Вебхуки</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#activities')" href='#'>Активности</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#table-states')" href='#'>Табличные фильтры</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#documents-attributes')" href='#'>Файлы</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#user_work_times')" href='#'>Трекинг рабочего временпользователя</a></li>",
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#files')" href='#'>Загрузка файлов</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#utm_label')" href='#'>UTM-метки (устарел)</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#notifications')" href='#'>Уведомления</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#document_template_renders')" href='#'>Документы</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#checklists')" href='#'>Чеклисты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#contact_groups')" href='#'>Группа контактов</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#checkup')" href='#'>Осмотры</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#stores')" href='#'>Склады</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#custom_fields')" href='#'>Дополнительные поля</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#mail_accounts')" href='#'>Почтовые аккаунты</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#mail_messages35')" href='#'>Почтовые сообщения</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#scenarios')" href='#'>Автоматизации</a></li>
						<li><a onclick="$('#iframe').show().attr('src','https://api.salesap.ru/#bulk-jobs')" href='#'>Bulk API</a></li>
					</ul>
				<div style="background: #0b0c15; font-size: 14px; cursor: pointer;" onclick="$('#ulMenu').toggle()">Разделы меню</div>
					<ul id="ulMenu">
						<li><a target="_blank" href="/indiboards">Рабочий стол </a></li>
						<li><a target="_blank" href="/diary">Задачи </a></li>
						<li><a target="_blank" href="/deals">Сделки </a></li>
						<li><a target="_blank" href="/orders">Заявки </a></li>
						<li><a target="_blank" href="/contacts">Контакты </a></li>
						<li><a target="_blank" href="/contracts">Договоры </a></li>
						<li><a target="_blank" href="/companies">Компании </a></li>
						<li><a target="_blank" href="/products">Продукты </a></li>
						<li><a target="_blank" href="/recurrence_rules">Повторы </a></li>
						<li><a target="_blank" href="/telephony_calls">Звонки </a></li>
						<li><a target="_blank" href="/mail/messages">Почта </a></li>
						<li><a target="_blank" href="/analytic">Аналитика </a></li>
						<li><a target="_blank" href="/segments">Сегменты </a></li>
						<b>Финансы</b>
						<li><a target="_blank" href="/invoices">Счета </a></li>
						<li><a target="_blank" href="/invoice_payments">Платежи </a></li>
						<li><a target="_blank" href="/kkm/operations">Операции (касса) </a></li>
						<b>Записи</b>
						<li><a target="_blank" href="/entries">Журнал записей </a></li>
						<li><a target="_blank" href="/contact_groups">Группы </a></li>
						<b>Недвижимость</b>
						<li><a target="_blank" href="/estate/finders">Подписки </a></li>
						<li><a target="_blank" href="/estate/properties">Объекты </a></li>
						<b>Сотрудники</b>
						<li><a target="_blank" href="/users">Сотрудники </a></li>
						<li><a target="_blank" href="/user_salaries">Начисления </a></li>
						<li><a target="_blank" href="/work_schedules">Рабочее время </a></li>
						<b>Склад</b>
						<li><a target="_blank" href="/store/operations">Операции</a></li>
					</ul>	
		</div>

		<div style="background: #090b10; position: fixed; top: 0; left:200px; right: 0; bottom: 0; display: flex; flex-wrap: wrap; overflow: auto;">
			<div style="width: 475px;margin-left: 20px; position: relative;">

				<div style="background: #0b0c15; cursor: pointer; text-align: center; padding: 20px;">Request</div>
				<div id="jsoneditor" style="width: 400px; height: 400px;"></div>
			</div>

			<div style="width: 475px; margin-left: 20px; position: relative;">
				<div style="background: #0b0c15; cursor: pointer; text-align: center; padding: 20px;">Отправить API запрос</div>
				<form action="" class="form" id="userFormAPI" style="position: relative; background: #03060e; padding: 0 10px;">
					<p>метод
						<select name="methods" class="form-control" style="background: #090b10; color: #fff">
							<option value="POST">POST</option>
							<option value="GET" selected>GET</option>
							<option value="PATCH">PATCH</option>
							<option value="DELETE">DELETE</option>
						</select>
					</p>
					<p>Ключ API: <input type="text" class="form-control" name="apiKeyFrom" id="apiKeyFrom" style="background: #090b10; color: #fff"></p>
					<div style="margin-top: 20px;">
						<p onclick="window.open(document.location.origin + '/settings?mode=api_keys%3Aindex&tab=', '_blank')">Ключи API<i class="s2-icons s2-visibility"></i></p>
						<div id="apiKey" style="display: none;"></div>
					</div>
					<p>Адрес: <span onclick="getId()" class="btn btn-primary" style="float: right;margin-top: -16px;">Собрать ID</span><input type="text" class="form-control" name="address" value="https://${uriMain}/api/v1/orders" style="background: #090b10; color: #fff">	 </p>
					</p>
					<button class="btn btn-primary" style="width: 100%">Отправить</button>
				</form>
			</div>


			<div style="width: 475px; margin-left: 20px; position: relative; ">
				<div style="background: #0b0c15; cursor: pointer; text-align: center; padding: 20px;">Response</div>
				<div id="jsoneditor2" style="width: 400px; height: 400px;"></div>
				<!-- <textarea id="response" is="highlighted-code" style="width: 475px;min-height: 258px; resize: vertical;" language="javascript" tab-size="2"></textarea> -->
			</div>
			<iframe id="iframe" src="https://api.salesap.ru/#contacts" frameborder="0" width="100%" style="flex-basis: 100%; min-height: 600px; margin: 20px; background: #fff; display: none;"></iframe>
			<div>
				<div class="icons" style="display: flex;flex-wrap: wrap;">
					<i class="s2-icons s2-marketplace"></i><i class="s2-icons s2-map"></i><i class="s2-icons s2-phone"></i><i class="s2-icons s2-notification"></i><i class="s2-icons s2-delivery"></i><i class="s2-icons s2-add"></i><i class="s2-icons s2-book"></i><i class="s2-icons s2-list"></i><i class="s2-icons s2-calendar"></i><i class="s2-icons s2-alarm"></i><i class="s2-icons s2-dots-menu"></i><i class="s2-icons s2-filters"></i><i class="s2-icons s2-email"></i><i class="s2-icons s2-board"></i><i class="s2-icons s2-table"></i><i class="s2-icons s2-menu-burger"></i><i class="s2-icons s2-question"></i><i class="s2-icons s2-search"></i><i class="s2-icons s2-settings"></i><i class="s2-icons s2-users"></i><i class="s2-icons s2-chat"></i><i class="s2-icons s2-full-screen-off"></i><i class="s2-icons s2-full-screen-on"></i><i class="s2-icons s2-close"></i><i class="s2-icons s2-cashbox"></i><i class="s2-icons s2-save"></i><i class="s2-icons s2-catalog"></i><i class="s2-icons s2-unlock"></i><i class="s2-icons s2-lock"></i><i class="s2-icons s2-smiley"></i><i class="s2-icons s2-work"></i><i class="s2-icons s2-share"></i><i class="s2-icons s2-send-doc-mail"></i><i class="s2-icons s2-launch"></i><i class="s2-icons s2-filter"></i><i class="s2-icons s2-chat-bubble"></i><i class="s2-icons s2-info-square"></i><i class="s2-icons s2-warning"></i><i class="s2-icons s2-keyboard"></i><i class="s2-icons s2-supervisor-account"></i><i class="s2-icons s2-check-square"></i><i class="s2-icons s2-add-file"></i><i class="s2-icons s2-plus-circle"></i><i class="s2-icons s2-document"></i><i class="s2-icons s2-people"></i><i class="s2-icons s2-business"></i><i class="s2-icons s2-bag"></i><i class="s2-icons s2-home"></i><i class="s2-icons s2-repeat"></i><i class="s2-icons s2-assignment"></i><i class="s2-icons s2-contract"></i><i class="s2-icons s2-invoice"></i><i class="s2-icons s2-check-circle"></i><i class="s2-icons s2-check-circle-folder"></i><i class="s2-icons s2-basket"></i><i class="s2-icons s2-event"></i><i class="s2-icons s2-store"></i><i class="s2-icons s2-segment"></i><i class="s2-icons s2-link-circle"></i><i class="s2-icons s2-folder-image"></i><i class="s2-icons s2-autorenew"></i><i class="s2-icons s2-edit"></i><i class="s2-icons s2-delete"></i><i class="s2-icons s2-coins"></i><i class="s2-icons s2-check"></i><i class="s2-icons s2-archive"></i><i class="s2-icons s2-add-circle"></i><i class="s2-icons s2-pageview"></i><i class="s2-icons s2-queue"></i><i class="s2-icons s2-download"></i><i class="s2-icons s2-cancel"></i><i class="s2-icons s2-call-made"></i><i class="s2-icons s2-call-received"></i><i class="s2-icons s2-play-circle"></i><i class="s2-icons s2-play"></i><i class="s2-icons s2-attachment"></i><i class="s2-icons s2-done-all"></i><i class="s2-icons s2-alternate-email"></i><i class="s2-icons s2-send"></i><i class="s2-icons s2-pause-circle"></i><i class="s2-icons s2-pause"></i><i class="s2-icons s2-paragraph"></i><i class="s2-icons s2-spacing"></i><i class="s2-icons s2-import"></i><i class="s2-icons s2-export"></i><i class="s2-icons s2-reset-filter"></i><i class="s2-icons s2-info"></i><i class="s2-icons s2-visibility-off"></i><i class="s2-icons s2-visibility"></i><i class="s2-icons s2-arrow-up"></i><i class="s2-icons s2-arrow-down"></i><i class="s2-icons s2-arrow-right"></i><i class="s2-icons s2-arrow-left"></i><i class="s2-icons s2-flag"></i><i class="s2-icons s2-edit-all"></i><i class="s2-icons s2-image"></i><i class="s2-icons s2-remove-circle"></i><i class="s2-icons s2-print"></i><i class="s2-icons s2-expand-less"></i><i class="s2-icons s2-expand-more"></i><i class="s2-icons s2-asterisk"></i><i class="s2-icons s2-chevron-left"></i><i class="s2-icons s2-chevron-right"></i><i class="s2-icons s2-dots-menu-vert"></i><i class="s2-icons s2-chart"></i><i class="s2-icons s2-reply-email"></i><i class="s2-icons s2-send-email"></i><i class="s2-icons s2-unarchive"></i><i class="s2-icons s2-content-copy"></i><i class="s2-icons s2-phone-alarm"></i><i class="s2-icons s2-time"></i><i class="s2-icons s2-restore"></i><i class="s2-icons s2-square"></i><i class="s2-icons s2-checkbox"></i><i class="s2-icons s2-link"></i><i class="s2-icons s2-folder"></i><i class="s2-icons s2-folder-visible"></i><i class="s2-icons s2-refresh"></i><i class="s2-icons s2-remove-square"></i><i class="s2-icons s2-power"></i><i class="s2-icons s2-folder-shared"></i><i class="s2-icons s2-documents"></i><i class="s2-icons s2-code"></i><i class="s2-icons s2-copy"></i><i class="s2-icons s2-star"></i><i class="s2-icons s2-report"></i><i class="s2-icons s2-dollar"></i><i class="s2-icons s2-backup-restore"></i><i class="s2-icons s2-sentiment-dissatisfied"></i><i class="s2-icons s2-rss"></i><i class="s2-icons s2-view-headline"></i><i class="s2-icons s2-explore"></i><i class="s2-icons s2-dialpad"></i><i class="s2-icons s2-exit-to-app"></i><i class="s2-icons s2-account-balance"></i><i class="s2-icons s2-vpn-key"></i><i class="s2-icons s2-dislike"></i><i class="s2-icons s2-like"></i><i class="s2-icons s2-wrap-text"></i><i class="s2-icons s2-function"></i><i class="s2-icons s2-dashboard"></i><i class="s2-icons s2-extension"></i><i class="s2-icons s2-event-busy"></i><i class="s2-icons s2-schedule"></i><i class="s2-icons s2-train"></i><i class="s2-icons s2-locate"></i><i class="s2-icons s2-double-arrow-left"></i><i class="s2-icons s2-double-arrow-right"></i><i class="s2-icons s2-equalizer"></i><i class="s2-icons s2-circle"></i><i class="s2-icons s2-ruble"></i><i class="s2-icons s2-folder-check"></i><i class="s2-icons s2-sort"></i><i class="s2-icons s2-import-export"></i><i class="s2-icons s2-deadline-add"></i><i class="s2-icons s2-read"></i><i class="s2-icons s2-new"></i><i class="s2-icons s2-tune"></i><i class="s2-icons s2-trash"></i><i class="s2-icons s2-double-list"></i><i class="s2-icons s2-pie-chart"></i><i class="s2-icons s2-circle-map"></i><i class="s2-icons s2-circle-share"></i><i class="s2-icons s2-information1"></i><i class="s2-icons s2-card"></i><i class="s2-icons s2-backspace-delete"></i><i class="s2-icons s2-arrow-back"></i><i class="s2-icons s2-key"></i>
				</div>
			</div>

		</div>

	</div>`);


	let scriptJSONEditor = document.createElement('script');
	scriptJSONEditor.src = "https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.9.2/jsoneditor.min.js"
	document.head.append(scriptJSONEditor);
	scriptJSONEditor.onload = function() {
		// create the editor
	    const container = document.getElementById("jsoneditor")
	    const container2 = document.getElementById("jsoneditor2")
	    const options = {
	    	 mode: 'code'
	    }
	    editor = new JSONEditor(container, options)
	    editor2 = new JSONEditor(container2, options)

	    // set json
	    const initialJson = {"data": {"type":"orders","id": 999,"attributes":{"name": "order create API"},"relationships": {"stage": {"data": {"type": "order-stages","id": 155036}}}}}
		editor.set(initialJson)
		const updatedJson = editor.get()
	};
					

	fetch('https://'+uriMain+'/settings/api_keys.json', {
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
		let apiKey = data.slice(data.indexOf('<code>')+6,data.indexOf('<\/code>'))
		$('#apiKeyFrom').val(apiKey);
	}))
	// $('#apiKey').load("https://"+uriMain+"/settings/api_keys .settings-main code", function(){
	// })

})


$('body').on('submit', '#userFormAPI', function(e){
	e.preventDefault()
	let userFormData = $(this)
	let ff_apikey = $(this).find('input[name="apiKeyFrom"]').val()
	let ff_method = $(this).find('select[name="methods"]').val()
	let ff_address = $(this).find('input[name="address"]').val()
	// let ff_requestData = $(this).find('textarea[name="requestData"]').val()
	let ff_requestData = editor.get()
	editor2.set("")
	
	$.ajax({
		url: ff_address,
		headers: {"Authorization": "Bearer "+ff_apikey, "Content-Type": "application/vnd.api+json"},
		type: ff_method,
		data: ff_requestData,
		success: function (e){
			let resp = JSON.parse(JSON.stringify(e))
			editor2.set(resp)
			console.log(e)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			let resp = JSON.stringify(jqXHR)
			console.log(textStatus, errorThrown);
			// $('#response').val(JSON.stringify(JSON.parse(resp),null,2))
			editor2.set(resp)
		}

	});
	return false;
})




var ids = [];
var pages = 0;
var page = 1;


function getId(){
	console.log('Начал Поиск');
	let url = $("#userFormAPI").find('input[name="address"]').val().indexOf('?') !== -1 ? $("#userFormAPI").find('input[name="address"]').val()+'&page[number]='+page : $("#userFormAPI").find('input[name="address"]').val()+'?page[number]='+page
	$.ajax({
			url: url,
	    // url: $("#userFormAPI").find('input[name="address"]').val(),
	    headers: {"Authorization": "Bearer "+$("#userFormAPI").find('input[name="apiKeyFrom"]').val(), "Content-Type": "application/vnd.api+json"},
	    type: 'GET',
	    async: false,
	    dataType: 'json', // added data type
	    success: function(res) {
	         pages = res.meta['page-count']
	         if (res.meta['record-count'] != 0){
	            for (let i=0;i<res.data.length;i++) {
	            		// debugger
	                ids.push(res.data[i].id)
	            } 
	         }
	         if (page<pages) {page++;setTimeout(getId, 500)}
	         else {alert('Смотреть консоль');console.log(`
let x = [${ids}]
console.log("Скрипт запустился")
let type = "orders" /*Изменить тип по необходимости*/

for (let i=0;i<x.length;i++){
    await $.ajax({
        url: \`https://\${uriMain}/api/v1/\${type}/\${x[i]}\`,
        headers: {"Authorization": "Bearer "+$("#userFormAPI").find('input[name="apiKeyFrom"]').val(), "Content-Type": "application/vnd.api+json"},
        type: 'PATCH',
        dataType: 'json', // added data type
        data: \`{
            "data": {
                "id": \${x[i]},
                "type": "\${type}",
                "attributes": {
                    "name": "edit"
                }
            }
        }\`,
        success: function(res) {
            console.log(res)
        },
        error: function() {
            console.log(\`При изменении \${x[i]} что-то пошло не так\`)
        }
    });
}
console.log("Закончил изменение")

/*Пример удаления (Скопировать и втставить в консоль)*/
let x = [${ids}]
console.log("Скрипт запустился")
let type = "orders" /*Изменить тип по необходимости*/

for (let i=0;i<x.length;i++){
    await $.ajax({
        url: \`https://\${uriMain}/api/v1/\${type}/\${x[i]}\`,
        headers: {"Authorization": "Bearer "+$("#userFormAPI").find('input[name="apiKeyFrom"]').val(), "Content-Type": "application/vnd.api+json"},
        type: 'DELETE',
        success: function(res) {
            console.log(res)
        },
        error: function() {
            console.log(\`При удалении \${x[i]} что-то пошло не так\`)
        }
    });
}
console.log("Закончил Удаление")`);page = 1; ids = []; pages = 0;	}
	    },
	    error: function() {
	    	  $('#response').val('Что-то пошло не так, подробности в консоли');
	        console.log('Что-то пошло не так')
	        return false
	    }
	});



}