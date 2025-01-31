Ext.define('Admin.view.pilihanganda.PilihanGandaList',{
    extend: 'Ext.container.Container',
    xtype: 'pilihanganda-list',

    cls: 'shadow',
    
    viewModel: {
        type: 'pilihanganda'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onPilihanGandaListAfterRender'
    },

    items: [{
        xtype: 'gridpanel',
        height: 300,
        margin: '0 0 20px 0',
        itemId: 'grid-ujian',
        cls: 'ujian-grid',
        title: 'Data Soal',
        store: {
            type: 'ujian'
        },
        scrollable: false,
        columns: [{
            xtype: 'gridcolumn',
            cls: 'content-column',
            menuDisabled: true,
            align: 'center',
            width: 70,
            renderer: 'getRowNumberGridUjian',
            text: 'No.'
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
        }],

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: ['->', 
            {
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
            bind: '{ujian_results}'
        }],
        
        listeners: {
            selectionchange: 'onGridUjianSelectionChange'
        }
        
    }, 
    { 
        xtype: 'panel',
        title: 'Soal Pilihan Ganda',
        flex: 1,
        layout: 'fit',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                reference: 'addButton',
                text:'Baru',
                iconCls:'x-fa fa-plus',
                handler: 'onAddButtonClick'
            }, '->', {
                xtype: 'searchfield',
                flex: 1,
                store: {
                    type: 'pilihanganda'
                }
            }]
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{pilihanganda_results}'
        }],

        items: [{
            xtype: 'dataview',
            itemId: 'grid-pilihanganda',
            cls: 'soal-all',
            bind: {
                store: '{pilihanganda_results}'
            },
            tpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="soal">',

                    '<div class="selector">',
                        '<button name="deleteButton" class="deletebtn">Delete</button>',
                        '<button name="editButton" class="editbtn">Edit</button>',
                    '</div>',

                    '<div class="subtitle">PERTANYAAN</div>',
                    
                    '{xindex} {pertanyaan}',
                    
                    '<ol>',
                        '<li>{pilihan_a}</li>',
                        '<li>{pilihan_b}</li>',
                        '<li>{pilihan_c}</li>',
                        '<li>{pilihan_d}</li>',
                        '<li>{pilihan_e}</li>',
                    '</ol>',
                            
                    '<div class="subtitle">PEMBAHASAN</div>',
                    '{pembahasan}',

                '</div>',
            '</tpl>'),
            itemSelector: 'div.selector',
            //selectedItemCls: 'item-selected',
            listeners: {
                afterrender: 'onDataViewAfterRender',
                itemclick: 'onDataViewItemClick'
           }
        }]
    }]

});
