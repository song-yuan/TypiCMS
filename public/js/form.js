function initTinymce(selector) {
	tinymce.init({
		selector: selector,
		fix_list_elements : true,
		// relative_urls: false,
		height : 400,
		menubar: false,
		entity_encoding : 'raw',
		plugins: 'paste,table,nonbreaking,link,code,image',
		paste_as_text: true,
		// statusbar: false,
		style_formats : [
			{title : 'File (link)', selector : 'a', classes : 'file'},
			{title : 'Button (link)', selector : 'a', classes : 'btn btn-default'},
		],
		content_css : '/css/public.css,/components/tinymce/css/tiny_mce.css',
		toolbar: 'formatselect | styleselect | bold italic | subscript superscript | bullist numlist outdent indent | link unlink | alignleft aligncenter alignright alignjustify | table | nonbreaking | image | code',
		language_url: '/components/tinymce/langs/fr.js'
	});
}

!function( $ ){

	"use strict";

	$(function () {

		for (var i = 0; i < langues.length; i++) {
			var titleField = $('#' + langues[i] + '\\[title\\]');
			titleField.slug({
				slugField: '#' + langues[i] + '\\[slug\\]'
			});
		};
		var titleField = $('#title');
		titleField.slug({
			slugField: '#slug'
		});

		if ($('.editor').length) {
			initTinymce('.editor');
		}

		if ($('#tags').length) {
			var tags = $.getJSON("/admin/tags", function(data){
				$('#tags').select2({
					tags: data,
					tokenSeparators: [',']
				});
			})
		}

		// Set tab in red on validation errors
		var firstErrorTabActive = false;
		$('.tab-pane').each(function(index, el) {
			if ($(this).find('.has-error').length) {
				if ( ! firstErrorTabActive) {
					$('a[href="#' + $(this).attr('id') + '"]').tab('show');
					firstErrorTabActive = true;
				}
				$('a[href="#' + $(this).attr('id') + '"]').addClass('text-danger');
			};
		});

		if ($('.datepicker').length) {
			$('.datepicker').parent().datetimepicker({
				format: 'DD.MM.YYYY',
				pickTime: false,
				language: lang
			});
			$('.datepicker-start').parent().on('change.dp', function (e) {
				$('.datepicker-end').parent().data('DateTimePicker').setStartDate(e.date);
			});
			$('.datepicker-end').parent().on('change.dp', function (e) {
				$('.datepicker-start').parent().data('DateTimePicker').setEndDate(e.date);
			});
		};

		if ($('.datetimepicker').length) {
			$('.datetimepicker').parent().datetimepicker({
				format: 'DD.MM.YYYY HH:mm',
				pickSeconds: false,
				language: lang
			});
		};

		if ($('.timepicker').length) {
			$('.timepicker').parent().datetimepicker({
				pickDate: false,
				pickSeconds: false,
				language: lang
			});
		};

	});

}( window.jQuery || window.ender );
