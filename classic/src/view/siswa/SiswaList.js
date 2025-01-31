Ext.define('Admin.view.siswa.SiswaList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'siswa-list',

    viewModel: {
        type: 'siswa'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        itemId: 'grid-siswa',
        cls: 'siswa-grid',
        title: 'Data Peserta',
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
                    return "<img src='./server/public/uploads/siswa/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
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
                flex: 0.8
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nisn',
                text: 'No. Peserta',
                align: 'center',
                flex: 0.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nohp',
                text: 'No. HP',
                align: 'center',
                flex: 0.6
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'email',
                text: 'Email',
                flex: 0.7
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'kelas',
                text: 'Kelas',
                flex: 0.6
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'ruang',
                text: 'Ruang',
                flex: 0.6
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
            }, '-', {
                xtype: 'combo',
                reference: 'pilihKelasCombo',
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
                xtype: 'combo',
                reference: 'pilihRuangCombo',
                emptyText: 'Pilih Ruang',
                editable: false,
                store: {
                    type: 'ruang',
                    autoLoad: false
                },
                valueField: 'id',
                displayField: 'nama',
                queryMode: 'local',
                listeners: {
                    select: 'onPilihRuangSelect'
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
                    type: 'siswa'
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
