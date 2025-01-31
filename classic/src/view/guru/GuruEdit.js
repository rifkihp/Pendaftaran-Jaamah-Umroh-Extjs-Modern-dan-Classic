Ext.define('Admin.view.guru.GuruEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'guru-edit',
    
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox'
    ],

    controller: 'guru',

    layout: 'anchor',

    bodyPadding: 10,
    scrollable: true,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },

    listeners: {
        render: 'onLoadData'
    },

    items: [
        {
            xtype: 'textfield',
            name: 'nama',
            fieldLabel: 'Nama'
        },
        {
            xtype: 'textfield',
            name: 'nip',
            fieldLabel: 'No. Induk'
        },
        {
            xtype: 'textfield',
            name: 'tempat_lahir',
            fieldLabel: 'Tempat Lahir'
        },
        {
            xtype: 'datefield',
            name:'tanggal_lahir',
            fieldLabel: 'Tanggal Lahir',
            format: 'd-m-Y',
            submitFormat: 'Y-m-d'
        },
        {
            xtype: 'combo',
            name: 'jenis_kelamin',
            fieldLabel: 'Jenis Kelamin',
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
            xtype: 'combo',
            name: 'agama',
            fieldLabel: 'Agama',
            emptyText: 'Pilih agama',
            editable: false,
            selectOnFocus: false,
            store: {
                type: 'agama'
            },
            valueField: 'nama',
            displayField: 'nama',
            queryMode: 'local'
        },
        {
            xtype: 'textfield',
            maskRe: /([0-9\s]+)$/,
            name: 'nik',
            fieldLabel: 'NIK'
        },
        {
            xtype: 'textfield',
            maskRe: /([0-9\s]+)$/,
            name: 'nuptk',
            fieldLabel: 'NUPTK'
        },  
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email' 
        },
        {
            xtype: 'textfield',
            maskRe: /([0-9\s]+)$/,
            name: 'nohp',
            fieldLabel: 'No. HP'
        },
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'User ID'
        },
        {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password'
        },
        {
            xtype: 'checkbox',
            name: 'aktif',
            boxLabel: 'Aktif',
            inputValue: 1,
            checked: true
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
            fieldLabel: 'Photo',
            allowBlank: true
        }
    ],

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
