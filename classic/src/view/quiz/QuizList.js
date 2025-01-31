Ext.define('Admin.view.quiz.QuizList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'quiz-list',

    viewModel: {
        type: 'quiz'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        itemId: 'grid-quiz',
        cls: 'quiz-grid',
        title: 'Quiz / PR',
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
                dataIndex: 'judul',
                text: 'Judul',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'kelas',
                text: 'Kelas',
                align: 'center',
                flex: 0.4
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'mapel',
                text: 'Mapel',
                align: 'left',
                flex: 0.8
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'mulai',
                text: 'Tanggal',
                align: 'center',
                flex: 0.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'selesai',
                text: 'Selesai',
                align: 'center',
                flex: 0.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'guru',
                text: 'Guru',
                align: 'left',
                flex: 0.8
            },
            {    
                xtype: 'actioncolumn',
                cls: 'content-column',
                items: [{
                    iconCls:'x-fa fa-file',
                    handler: 'onBtnViewQuiz'
                }],
                align: 'center',
                menuDisabled: true,
                width: 70,
                text: 'View'
            },
            {    
                xtype: 'actioncolumn',
                cls: 'content-column',
                items: [{
                    iconCls:'x-fa fa-pencil-alt',
                    handler: 'onBtnKelasQuiz'
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
                    type: 'quiz'
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
