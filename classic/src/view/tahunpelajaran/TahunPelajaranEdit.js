Ext.define('Admin.view.tahunpelajaran.TahunPelajaranEdit', {
    
    extend: 'Ext.form.Panel',
    xtype: 'tahunpelajaran-edit',
    
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox'
    ],

    controller: 'tahunpelajaran',

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

    items: [
        {
            xtype: 'textfield',
            name: 'tahun',
            fieldLabel: 'Tahun Pelajaran'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Semester',
            name:'semester',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'nama'],
                data:[
                    {id: '1', nama: 'Semester 1'}, 
                    {id: '2', nama: 'Semester 2'}
                ]
            }),                
            valueField: 'id',
            displayField: 'nama',
            editable: false,
            selectOnFocus: false,
            queryMode: 'local'
        },
        {
            xtype: 'checkbox',
            name: 'aktif',
            boxLabel: 'Default',
            inputValue: 1
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
