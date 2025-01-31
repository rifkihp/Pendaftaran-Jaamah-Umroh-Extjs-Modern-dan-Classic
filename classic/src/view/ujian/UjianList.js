Ext.define('Admin.view.ujian.UjianList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'ujian-list',

    viewModel: {
        type: 'ujian'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        itemId: 'grid-ujian',
        cls: 'ujian-grid',
        title: 'Data Soal',
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
                dataIndex: 'jenis',
                text: 'Jenis',
                flex: 0.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nama',
                text: 'Nama',
                flex: 0.7
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'kelas',
                text: 'Kelas',
                align: 'center',
                flex: 0.7
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'mapel',
                text: 'Bidang Ilmu',
                align: 'left',
                flex: 1.2
            },
            /*{
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'tanggal',
                text: 'Tanggal',
                align: 'center',
                flex: 0.7
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'jam',
                text: 'Jam',
                align: 'center',
                flex: 0.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'waktu',
                text: 'Waktu',
                align: 'center',
                flex: 0.5
            },*/
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'guru',
                text: 'Pembimbing',
                align: 'left',
                flex: 1.2
            },
            {    
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'pg',
                text: 'PG',
                align: 'center',
                width: 70
            },
            {    
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'essai',
                text: 'Essai',
                align: 'center',
                width: 70
            },
            /*{    
                xtype: 'actioncolumn',
                cls: 'content-column',
                items: [{
                    iconCls:'x-fa fa-pencil-alt',
                    handler: 'onBtnKelasUjian'
                }],
                align: 'center',
                menuDisabled: true,
                width: 70,
                text: 'Kelas'
            },
            {
                xtype: 'checkcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 70,
                dataIndex: 'acak',
                text: 'Acak',
                listeners: {
                    checkChange: 'onAcakCheckChange'
                }
            },*/
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
                    type: 'ujian'
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
