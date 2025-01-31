Ext.define('Admin.view.tahunpelajaran.TahunPelajaranList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'tahunpelajaran-list',

    viewModel: {
        type: 'tahunpelajaran'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        reference: 'tahunpelajarangridpanel',
        cls: 'tahunpelajaran-grid',
        title: 'Tahun Pelajaran dan Semester',
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
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'tahun',
                text: 'Tahun Pelajaran',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'semester',
                text: 'Semester',
                renderer: 'semesterRender',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 120,
                dataIndex: 'aktif',
                renderer: 'statusRender',
                text: 'Default'
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
            }, {
                xtype: 'button',
                reference: 'aktifButton',
                text:'Default',
                iconCls:'x-fa fa-check',
                handler: 'onAktifButtonClick',
                disabled: true
            }, '-']
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{results}'
        }]
    }]
});
