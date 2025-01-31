Ext.define('Admin.view.siswa.ProfilEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'siswa-profil-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.ComboBox',
        'Ext.field.Date',
        'Ext.field.File' 
    ],

    title: 'Edit Profil',

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
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top'
    },

    items: [{
        xtype: 'textfield',
        name: 'nama',
        label: 'Nama'
    },
    {
        xtype: 'textfield',
        name: 'nis',
        label: 'NIS'
    },
    {
        xtype: 'textfield',
        name: 'nisn',
        label: 'NISN'
    },
    {
        xtype: 'textfield',
        name: 'tempat_lahir',
        label: 'Tempat Lahir'
    },
    {
        xtype: 'datefield',
        name:'tanggal_lahir',
        label: 'Tanggal Lahir',
        dateFormat: 'd-m-Y'
    },
    {
        xtype: 'combobox',
        name: 'jenis_kelamin',
        label: 'Jenis Kelamin',
        emptyText: 'Pilih jenis kelamin',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'jeniskelamin'
        },
        valueField: 'kode',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'combobox',
        name: 'agama',
        label: 'Agama',
        emptyText: 'Pilih agama',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'agama'
        },
        valueField: 'nama',
        displayField: 'nama',
        queryMode: 'local'
    },{
        xtype: 'textfield',
        name: 'email',
        label: 'Email',
        vtype: 'email' 
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'nohp',
        label: 'No. HP'
    },
    {
        xtype: 'textfield',
        name: 'username',
        label: 'User ID'
    },
    {
        xtype: 'textfield',
        name: 'password',
        label: 'Password'
    },
    {
        xtype: 'combobox',
        name: 'lintas_minat_1',
        label: 'Lintas Minat I',
        emptyText: 'Pilih Lintas Minat',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'mapel'
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'combobox',
        name: 'lintas_minat_2',
        label: 'Lintas Minat II',
        emptyText: 'Pilih Lintas Minat',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'mapel'
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local'
    }, 
    {
        xtype: 'combobox',
        name: 'kelas',
        label: 'Kelas',
        emptyText: 'Pilih Kelas',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'kelas'
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local',
        listeners: {
            select: 'onComboKelasSelect'
        }
    }, 
    {
        xtype: 'combobox',
        name: 'ruang',
        itemId: 'ruang',
        label: 'Ruang',
        emptyText: 'Pilih Ruang',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'ruang',
            autoLoad: false
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local'
    }/*, 
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktif',
        inputValue: 1,
        checked: true
    }*/,
    {
        xtype: 'filefield',
        name: 'file',
        buttonConfig: {
            xtype: 'filebutton',
            glyph:'',
            iconCls: 'x-fa fa-cloud-upload-alt',
            text: 'Browse'
        },
        label: 'Photo',
        allowBlank: true
    }]
});
