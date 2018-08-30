/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

var preview,eqobj;

//event 参数中有 data 属性，就是父窗口发送过来的数据
window.addEventListener("message", function( event ) {
    let ctrl = $('.ck_math_txt textarea:visible').get(0);
    $(ctrl).insertAtCursor(event.data);
    eqobj.focus();

    preview.setValue( '\\(' + eqobj.getInputElement().getValue() + '\\)' );
}, false );

CKEDITOR.dialog.add( 'mathjax', function( editor ) {

    var lang = editor.lang.mathjax;

    var wWidth = $(window).width();
    var wWidth = wWidth * 0.5;
    return {
        title: lang.title,
        minWidth: wWidth,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'default_formula',
                        type: 'html',
                        html:
                        '<div style="height: 100%;width: 100%">' +
                        '<iframe name=\'boot\' style="border:0;width:100%;height:100%;font-size:20px;overflow-y: auto"  frameborder="0" allowTransparency="true" src="./defaultform.html">' +
                        '</iframe></div>',

                        onLoad: function() {
                            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                        },
                        setup: function( widget ) {
                        }

                    },
                    {
                        id: 'equation',
                        type: 'textarea',
                        label: lang.dialogInput,
                        inputStyle :'font-size:18px',
                        className: 'ck_math_txt',

                        onLoad: function() {
                            var that = this;
                            eqobj = this;

                            if ( !( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) ) {
                                this.getInputElement().on( 'keyup', function() {
                                    // Add \( and \) for preview.
                                    preview.setValue( '\\(' + that.getInputElement().getValue() + '\\)' );
                                } );
                            }
                        },

                        setup: function( widget ) {
                            // Remove \( and \).
                            this.setValue( CKEDITOR.plugins.mathjax.trim( widget.data.math ) );
                        },

                        commit: function( widget ) {
                            // Add \( and \) to make TeX be parsed by MathJax by default.
                            widget.setData( 'math', '\\(' + this.getValue() + '\\)' );
                        }
                    },
                    {
                        id: 'documentation',
                        type: 'html',
                        html:
                        '<div style="width:100%;text-align:right;margin:-8px 0 10px">' +
                        '<a class="cke_mathjax_doc" href="' + lang.docUrl + '" target="_black" style="cursor:pointer;color:#00B2CE;text-decoration:underline">' +
                        'TeX语法' +
                        '</a>' +
                        '</div>'
                    },
                    ( !( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) ) && {
                        id: 'preview',
                        type: 'html',
                        html:
                        '<div style="width:100%;text-align:center;">' +
                        '<iframe style="border:0;width:0;height:0;font-size:20px" scrolling="no" frameborder="0" allowTransparency="true" src="' + CKEDITOR.plugins.mathjax.fixSrc + '"></iframe>' +
                        '</div>',

                        onLoad: function() {
                            var iFrame = CKEDITOR.document.getById( this.domId ).getChild( 0 );
                            preview = new CKEDITOR.plugins.mathjax.frameWrapper( iFrame, editor );
                        },

                        setup: function( widget ) {
                            preview.setValue( widget.data.math );
                        }
                    }
                ]
            }
        ]
    };
} );