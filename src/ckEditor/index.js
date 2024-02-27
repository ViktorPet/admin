const extraPlugins = 'embed,image2,colordialog,tableresize,justify,clipboard,pagebreak,pastefromword,autolink,link,font,stylesheetparser,stylescombo';


const ckEditorConfig = {
    extraPlugins: extraPlugins,
    filebrowserBrowseUrl: '/file_manager/dialog.php?type=2&editor=ckeditor&fldr=',
    filebrowserUploadUrl: '/file_manager/dialog.php?type=2&editor=ckeditor&fldr=',
    filebrowserImageBrowseUrl: '/file_manager/dialog.php?type=2&editor=ckeditor&fldr=',
    toolbar: [
        {
            name: 'document',
            items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates']
        },
        {
            name: 'clipboard',
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
        },
        {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']},
        {
            name: 'forms',
            items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
        },
        '/',
        {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
        },
        {
            name: 'paragraph',
            items:
                [
                    'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
        },
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
        {
            name: 'insert',
            items: ['Embed', 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
        },
        '/',
        {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
        {name: 'colors', items: ['TextColor', 'BGColor']},
        {name: 'tools', items: ['Maximize', 'ShowBlocks']},
        {name: 'about', items: ['About']}
    ],
    extraAllowedContent:'*(*);*{*}',
    format_tags: 'p;h1;h2;h3;pre;div',
    format_div: {
        element: 'div',
        attributes: {
            'class': 'highlighted-text',
        },
    },
    format_h1: {
        element: 'h1',
        attributes: {
            'class': 'table'
        }
    },
    contentsCss: [
        '/library/cke_editor.css',
        'http://cdn.ckeditor.com/4.16.1/standard-all/contents.css',
        'https://ckeditor.com/docs/ckeditor4/4.16.1/examples/assets/css/format.css'
    ],
    image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
    stylesSet: [
        { name: 'Bordered Table', element: 'table', attributes: { 'class': 'table' }},
    ],
    removeButtons: 'NewPage,ExportPdf,Preview,Print,Find,Replace,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Anchor,Flash,Smiley,SpecialChar,PageBreak,TextColor,BGColor,ShowBlocks,About,Strike,Subscript,Language,Iframe,Save'
};

export default ckEditorConfig;
