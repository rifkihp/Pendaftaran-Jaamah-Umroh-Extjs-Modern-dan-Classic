Ext.define('Admin.view.sekolah.SekolahEdit', {
    
    extend: 'Ext.form.Panel',
    xtype: 'sekolah-edit',
    
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox'
    ],

    controller: 'sekolah',

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
        render: 'onLoadData'
    },

    items: [{
        xtype: 'textfield',
        name: 'kode',
        fieldLabel: 'Kode'
    },
    {
        xtype: 'textfield',
        name: 'nama',
        fieldLabel: 'Nama'
    },
    {
        xtype: 'textfield',
        name: 'no_bh',
        fieldLabel: 'No. Badan Hukum'
    },
    {
        xtype: 'datefield',
        name:'tgl_berdiri',
        fieldLabel: 'Tanggal Berdiri',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d'
    },
    {
        xtype: 'textfield',
        name: 'nss',
        fieldLabel: 'NSS'
    },
    {
        xtype: 'textfield',
        name: 'npsn',
        fieldLabel: 'NPSN'
    },    
    {
        xtype: 'combo',
        name: 'status',
        fieldLabel: 'Status Sekolah',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'statussekolah'
        },
        valueField: 'kode',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'combo',
        name: 'tingkat',
        fieldLabel: 'Tingkat',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'tingkatsekolah'
        },
        valueField: 'nama',
        displayField: 'nama',
        queryMode: 'local'
    },
    {
        xtype: 'textfield',
        name: 'mbs',
        fieldLabel: 'MBS'
    },
    {
        xtype: 'textareafield',
        name: 'alamat',
        fieldLabel: 'Alamat'
    },
    {
        xtype: 'combo',
        name: 'province',
        itemId: 'province',
        fieldLabel: 'Propinsi',
        store: {
            type: 'province',
            autoLoad: true
        },
        queryMode: 'local',
        valueField: 'province_id',
        displayField: 'province',
        listeners: {
            select: 'onProvinceSelect'
        }
    },
    {
        xtype: 'combo',
        name: 'city',
        itemId: 'city',
        fieldLabel: 'Kota / Kabupaten',
        store: {
            type: 'city',
            autoLoad: false
        },
        queryMode: 'local',
        valueField: 'city_id',
        displayField: 'city_name',
        listeners: {
            select: 'onCitySelect'
        }
    },
    {
        xtype: 'combo',
        name: 'subdistrict',
        itemId: 'subdistrict',
        fieldLabel: 'Kecamatan',
        store: {
            type: 'subdistrict',
            autoLoad: false
        },
        queryMode: 'local',
        valueField: 'subdistrict_id',
        displayField: 'subdistrict_name'
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'kodepos',
        fieldLabel: 'Kode POS'
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'telepon',
        fieldLabel: 'Telepon'
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'fax',
        fieldLabel: 'Fax'
    },
    {
        xtype: 'textfield',
        name: 'website',
        fieldLabel: 'Website'
    },
    {
        xtype: 'textfield',
        name: 'email',
        fieldLabel: 'Email',
        vtype: 'email' 
    },
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktif',
        inputValue: 1       
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
