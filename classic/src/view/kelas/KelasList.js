Ext.define('Admin.view.kelas.KelasList', {  
    extend: 'Ext.container.Container',
    xtype: 'kelas-list',

    cls: 'shadow',
    
    viewModel: {
        type: 'kelas'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    /*listeners: {
        afterrender: 'onKelasListAfterRender'
    },*/
    
    items: [{
        xtype: 'gridpanel',
        height: 300,
        margin: '0 0 20px 0',
        itemId: 'grid-kelas',
        cls: 'kelas-grid',
        title: 'Kelas',
        bind: '{kelas_results}',
        scrollable: false,
        idSelect: '',
        columns: [{
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            align: 'center',
            width: 70,
            renderer: 'getRowNumberListKelas',
            text: 'No.'
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'kode',
            text: 'Kode',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'nama',
            text: 'Nama',
            flex: 1
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
            }, '->', {
                xtype: 'searchfield',
                flex: 1,
                store: {
                    type: 'kelas'
                }
            }]
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{kelas_results}'
        }]/*,
        
        listeners: {
            selectionchange: 'onGridKelasSelectionChange'
        }*/
    },
    {
        xtype: 'gridpanel',
        flex: 1,
        itemId: 'grid-ruang',
        cls: 'ruang-grid',
        title: 'Ruang',
        bind: '{ruang_results}',
        scrollable: false,
        idSelect: '',
        columns: [{
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            align: 'center',
            width: 70,
            renderer: 'getRowNumberListRuang',
            text: 'No.'
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'kelas',
            text: 'Kelas',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            dataIndex: 'kode',
            text: 'Kode',
            flex: 1
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
            dataIndex: 'guru',
            text: 'Pembimbing',
            flex: 1
        }],

        selModel: {
            selType: 'checkboxmodel',
            checkOnly: true,
            showHeaderCheckbox: true,
            headerWidth: 50,
            listeners: {
                selectionchange: 'onRuangSelectionChange'
            }
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                reference: 'ruangAddButton',
                text:'Baru',
                iconCls:'x-fa fa-plus',
                handler: 'onRuangAddButtonClick'
            }, {
                xtype: 'button',
                reference: 'ruangDeleteButton',
                text:'Hapus',
                iconCls:'x-fa fa-trash-alt',
                handler: 'onRuangDeleteButtonClick',
                disabled: true
            }, {
                xtype: 'button',
                reference: 'ruangEditButton',
                text:'Edit',
                iconCls:'x-fa fa-pencil-alt',
                handler: 'onRuangEditButtonClick',
                disabled: true
            }, '-', {
                xtype: 'combo',
                reference: 'pilihKelasCombo',
                //fieldLabel: 'Kelas',
                //labelSeparator: '',
                //labelWidth: 40,
                emptyText: 'Pilih Kelas',
                editable: false,
                store: {
                    type: 'kelas'
                },
                valueField: 'id',
                displayField: 'nama',
                queryMode: 'local',
                listeners: {
                    select: 'onPilihKelasSelect'
                }
            }, {
                xtype: 'button',
                reference: 'resetButton',
                text:'Reset',
                iconCls:'x-fa fa-times-circle',
                handler: 'onResetButtonClick',
                disabled: true
            }, '->', {
                xtype: 'searchfield',
                flex: 1,
                store: {
                    type: 'ruang'
                }
            }]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{ruang_results}'
        }]
    
    }]  
});
