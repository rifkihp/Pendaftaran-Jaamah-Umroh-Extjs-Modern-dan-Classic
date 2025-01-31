Ext.define('Admin.view.document.DocumentEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'documents-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.Date',
        'Ext.field.File' 
    ],

    bbar: ['->', {
        ui: 'header',
        text: '<b>Simpan</b>',
        handler: 'onSave'
    }, {
        ui: 'header',
        text: '<b>Batal</b>',
        handler: 'onShow'
    }],

    listeners: {
        added: 'onLoadEdit'
    },

    bodyPadding: 20,

    defaults: {
        required: true,
        labelAlign: 'top',
        errorTarget: 'under'
    },

    items: [{
        xtype: 'datefield',
        itemId: 'tanggal',
        name:'tanggal',
        label: 'Tanggal',
        dateFormat: 'd-m-Y',
        value: new Date()
    }, 
    {
        xtype: 'textfield',
        name: 'judul',
        label: 'Judul Dokumen'
    },
    {
        xtype: 'containerfield',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        label: 'File Dokumen',
        items: [{
            xtype: 'component',
            hidden: true,
            itemId: 'linkfile',
            html: ''
        },
        {
            xtype: 'filefield',
            name: 'file',
            buttonConfig: {
                xtype: 'filebutton',
                glyph:'',
                iconCls: 'x-fa fa-cloud-upload-alt',
                text: 'Browse'
            },
            required: true,
            errorTarget: 'under'
        },
        {
            xtype: 'component',
            html: '<i>Hanya file .pdf atau .doc/.docx yang bisa diupload. Maksimal Ukuran File 5MB.'
        }]
    },
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktif',
        inputValue: 1,
        checked: true,
        required: false
    }]
});
