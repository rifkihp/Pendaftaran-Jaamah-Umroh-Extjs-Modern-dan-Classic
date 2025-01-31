Ext.define('Admin.view.ujian.UjianEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'ujian-edit',

    bodyPadding: 10,

    cls: 'shadow',

    listeners: {
        render: 'onFormLoad'
    },
    
    layout: 'anchor',
    
    //scrollable: 'y',

    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },
        
    items: [{
        xtype: 'combo',
        name: 'jenis',
        fieldLabel: 'Jenis Soal',
        emptyText: 'Pilih Jenis Soal',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'namaujian'
        },
        valueField: 'nama',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'textfield',
        name: 'nama',
        fieldLabel: 'Nama Soal'
    },
    {
        xtype: 'ckeditor',
        fieldLabel: 'Penjelasan',
        itemId: 'ckeditor'
    },
    {
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
        name: 'mapel',
        fieldLabel: 'Bidang Ilmu',
        emptyText: 'Pilih Bidang Ilmu',
        store: {
            type: 'mapel'
        },
        valueField: 'id',
        displayField: 'nama',
        typeAhead: true,  
        minChars: 3,
        queryMode: 'remote'
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
    /*{
        xtype: 'datefield',
        name: 'tanggal',
        fieldLabel: 'Tanggal',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d'
    },
    {
        xtype: 'timefield',
        name: 'jam',
        fieldLabel: 'Jam',
        format: 'H:i',
        submitFormat: 'H:i:s'
    },*/
    {
        xtype: 'numberfield',
        name: 'waktu',
        fieldLabel: 'Waktu',
        value: 90
    },
    {
        xtype: 'fieldcontainer',
        itemId: 'bawah',
        layout: 'hbox',
        items: [/*{
            xtype: 'checkbox',
            name: 'acak',
            boxLabel: 'Acak Soal',
            inputValue: 1,
            checked: true,
            width: 120
        },*/
        {
            xtype: 'checkbox',
            name: 'aktif',
            boxLabel: 'Aktifkan Ujian',
            inputValue: 1,
            checked: true,
            width: 120
        }]
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
