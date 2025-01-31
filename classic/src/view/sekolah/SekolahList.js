Ext.define('Admin.view.sekolah.SekolahList',{
    extend: 'Ext.grid.Panel',
    xtype: 'sekolah-list',

    requires: [
        'Ext.data.Store',
        'Ext.ux.form.SearchField'    
    ],

    cls: 'sekolah-grid shadow',
    title: 'Data Sekolah',
    idSelect: '',

    constructor: function(c) {

        var me = this;
        var tinggi = Ext.Element.getViewportHeight()-110;

        var dataStore = Ext.create('Ext.data.Store', {
            model: 'Admin.model.sekolah.Sekolah',
            proxy: {
                type: 'ajax',
                url: './server/public/sekolah',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            
            autoLoad: true
        });

        Ext.apply(c, {
            height: tinggi,
            
            store: dataStore,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'button',
                    reference: 'addButton',
                    text:'Baru',
                    iconCls:'x-fa fa-plus',
                    handler: 'onAddButtonClick'
                }, {
                    xtype: 'button',
                    reference: 'deleteButton',
                    text:'Hapus',
                    iconCls:'x-fa fa-trash-alt',
                    handler: 'onDeleteButtonClick',
                    disabled: true
                }, {
                    xtype: 'button',
                    reference: 'editButton',
                    text:'Edit',
                    iconCls:'x-fa fa-pencil-alt',
                    handler: 'onEditButtonClick',
                    disabled: true
                }, '-', {
                    xtype: 'searchfield',
                    flex: 1,
                    store: dataStore
                }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: false,
                store: dataStore
            }],

            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true,
                showHeaderCheckbox: true,
                headerWidth: 50,
                listeners: {
                    selectionchange: 'onSelectionChange'
                }
            },

            columns: [{
                xtype: 'gridcolumn',
                cls: 'content-column',               
                menuDisabled: true,
                align: 'center',
                width: 60,
                renderer: 'getRowNumber',
                text: 'No.'
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'kode',
                text: 'Kode',
                width: 120 
            },
            {
                xtype: 'gridcolumn',   
                cls: 'content-column',             
                menuDisabled: true,
                dataIndex: 'nama',
                text: 'Nama',
                flex: 1
            },
            {
                xtype: 'gridcolumn',   
                cls: 'content-column',             
                menuDisabled: true,
                dataIndex: 'alamat',
                text: 'Alamat',
                flex: 1.2,
                cellWrap: true
            },
            {
                xtype: 'gridcolumn',   
                cls: 'content-column',             
                menuDisabled: true,
                dataIndex: 'telepon',
                text: 'Telepon',
                width: 180
            },
            {
                xtype: 'gridcolumn',   
                cls: 'content-column',             
                menuDisabled: true,
                dataIndex: 'tingkat',
                text: 'Tingkat',
                width: 100,
                align: 'center'
            },
            {
                xtype: 'gridcolumn',   
                cls: 'content-column',             
                menuDisabled: true,
                dataIndex: 'status',
                text: 'Status',
                width: 100,
                align: 'center'
            },
            {
                xtype: 'checkcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 70,
                dataIndex: 'aktif',
                text: 'Aktif',
                listeners: {
                    checkChange: 'onAktifCheckChange'
                }
            }]
        });

        this.callParent(arguments);
    }

});
