Ext.define('Admin.view.kelas.RuangEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'ruang-edit',
    
    controller: 'kelas',

    layout: 'anchor',

    bodyPadding: 10,
    scrollable: true,

    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },

    listeners: {
        render: 'onRuangLoadData'
    },

    items: [{
        xtype: 'combo',
        name: 'kelas',
        fieldLabel: 'Kelas',
        emptyText: 'Pilih Kelas',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'kelas'
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'combo',
        name: 'guru',
        fieldLabel: 'Pembimbing',
        emptyText: 'Pilih Pembimbing',
        store: {
            type: 'guru'
        },
        valueField: 'id',
        displayField: 'nama',
        typeAhead: true,  
        minChars: 3,
        queryMode: 'remote'
    },
    {
        xtype: 'textfield',
        name: 'kode',
        fieldLabel: 'Kode'
    },
    {
        xtype: 'textfield',
        name: 'nama',
        fieldLabel: 'Nama Ruang'
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
                handler: 'onRuangCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onRuangSaveButtonClick'
            }
        ]
    }
});
