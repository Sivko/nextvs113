// $(document).ready(function(){
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1500",
	  "timeOut": "2000",
	  "extendedTimeOut": "1500",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}


	var uriMain = window.location.host;

	var crf = $('meta[name=csrf-token]').attr('content')
	var modes = [
	['users_and_roles', 'contacts','companies','deals','orders','diary','projects','products','entries','contact_groups','contracts','telephony_calls','segments','checkups','estate','documents','invoice_payments','invoices','productions/process_charts', 'productions'],
	['User', 'Contact','Company','Deal','Order','Diary','Project','Product','Entry','ContactGroup','Contract','TelephonyCall','Segment','Checkup','EstateProperty','DocumentTemplateRender','InvoicePayment','Invoice','Productions::ProcessChart','Productions::Order']]


	console.log("main.js")

// })
