Ext.define('Admin.view.informasi.InformasiEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'informasi-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.Date',
        'Ext.field.Time',
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
        xtype: 'containerfield',
        label: 'Tanggal / Jam',
        items: [{
            xtype: 'datefield',
            itemId: 'tanggal',
            name:'tanggal',
            placeholder: 'Tanggal',
            dateFormat: 'd-m-Y',
            value: new Date(),
            flex: 0.6,
            margin: '0 5px 0 0'
        }, {
            xtype: 'timefield',
            itemId: 'jam',
            name:'jam',
            placeholder: 'Jam',
            format: 'H:i',
            value: new Date(),
            flex: 0.4
        }]
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
            xtype: 'froalaeditor',
            value: 'Hello world!',
            listeners: {
                change: function (froalaComponent) {
                    Ext.toast({
                        message: "Change!"
                    });
                },
                // Native Froala events are prefixed with 'froala.'
                "froala.click": function (froalaComponent) {
                    Ext.toast({
                        message: "Click!"
                    });
                }
            }
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
