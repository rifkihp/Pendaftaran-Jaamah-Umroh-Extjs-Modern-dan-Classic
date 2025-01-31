Ext.define('Admin.view.document.DocumentEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'document-edit',

    
    bodyPadding: 10,

    cls: 'shadow',

    listeners: {
        render: 'onFormLoad'
    },
    
    layout: 'anchor',
    
    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },
        
    items: [{
        xtype: 'datefield',
        name:'tgl',
        fieldLabel: 'Tanggal',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d',
        value: new Date(),
        readOnly: true,
        fieldStyle: 'background: none #F8F9F9;',
    },
    {
        xtype: 'textfield',
        name: 'judul',
        fieldLabel: 'Judul'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Dokumen Upload',
        itemId: 'docfile',
        ext: 'pdf|doc|docx',
        keterangan: 'Tipe file harus pdf, doc, docx.'
    },
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktifkan Document',
        inputValue: 1,
        checked: true,
        width: 120
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Batal',
                handler: 'onCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onSaveButtonClick'
            }
        ]
    }
    
});
