/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbar= [
        { name: 'document', items: [ 'Print' ] },
        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
        { name: 'styles', items: [ 'Format', 'FontSize', 'lineheight' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
        { name: 'insert', items: [ 'Mathjax', 'Image', 'Table' ] },
        { name: 'tools', items: [ 'Maximize'] },
        { name: 'editing', items: [ 'Source', 'Scayt' ] }
    ];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// // Set the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;pre;div';

	// // Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

    config.filebrowserImageUploadUrl = '/public/ckupimg';


    // config.fillEmptyBlocks = false;
    config.contentsCss = 'http://localhost:5000/question.css';

    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_P;
};


// $.fn.modal.Constructor.prototype.enforceFocus = function () {
//     modal_this = this
//     $(document).on('focusin.modal', function (e) {
//         if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
//             // add whatever conditions you need here:
//             &&
//             !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select') && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
//             modal_this.$element.focus()
//         }
//     })
// };