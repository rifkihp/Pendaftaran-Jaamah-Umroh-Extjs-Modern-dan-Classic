Ext.define('Admin.view.sekolah.SekolahEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'sekolah-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.ComboBox',
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
        labelAlign: 'top',
        required: true,
        errorTarget: 'under'
    },

    items: [{
        xtype: 'textfield',
        name: 'kode',
        label: 'Kode'
    },
    {
        xtype: 'textfield',
        name: 'nama',
        label: 'Nama'
    },
    {
        xtype: 'textfield',
        name: 'no_bh',
        label: 'No. Badan Hukum'
    },
    {
        xtype: 'datefield',
        name:'tgl_berdiri',
        label: 'Tanggal Berdiri',
        dateFormat: 'd-m-Y'
    },
    {
        xtype: 'textfield',
        name: 'nss',
        label: 'NSS'
    },
    {
        xtype: 'textfield',
        name: 'npsn',
        label: 'NPSN'
    },    
    {
        xtype: 'combobox',
        name: 'status',
        label: 'Status Sekolah',
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
        xtype: 'combobox',
        name: 'tingkat',
        label: 'Tingkat',
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
        label: 'MBS'
    },
    {
        xtype: 'textareafield',
        name: 'alamat',
        label: 'Alamat'
    },
    {
        xtype: 'combobox',
        name: 'province',
        itemId: 'province',
        label: 'Propinsi',
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
        xtype: 'combobox',
        name: 'city',
        itemId: 'city',
        label: 'Kota / Kabupaten',
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
        xtype: 'combobox',
        name: 'subdistrict',
        itemId: 'subdistrict',
        label: 'Kecamatan',
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
        label: 'Kode POS'
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'telepon',
        label: 'Telepon'
    },
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        name: 'fax',
        label: 'Fax'
    },
    {
        xtype: 'textfield',
        name: 'website',
        label: 'Website'
    },
    {
        xtype: 'textfield',
        name: 'email',
        label: 'Email',
        vtype: 'email' 
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
