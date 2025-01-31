Ext.define('Admin.view.guru.GuruList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'guru-list',

    viewModel: {
        type: 'guru'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        itemId: 'grid-guru',
        cls: 'guru-grid',
        title: 'Data Pembimbing',
        bind: '{results}',
        scrollable: false,
        idSelect: '',
        columns: [
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 70,
                renderer: 'getRowNumber',
                text: 'No.'
            },
            {
                xtype: 'gridcolumn',
                renderer: function(value) {
                    return "<img src='./server/public/uploads/guru/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                },
                width: 75,
                dataIndex: 'photo',
                text: 'User'
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nama',
                text: 'Nama',
                flex: 1.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nip',
                text: 'No. Induk',
                align: 'center',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'email',
                text: 'Email',
                align: 'left',
                flex: 1.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nohp',
                text: 'No. HP',
                align: 'center',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'username',
                text: 'User ID',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'password',
                text: 'Password',
                flex: 1
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
            }
        ],

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
                    type: 'guru'
                }
            }]
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{results}'
        }]
    }]
});
