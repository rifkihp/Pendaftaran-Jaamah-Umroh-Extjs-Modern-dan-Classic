Ext.define('Admin.view.guru.GuruList', {
    extend: 'Ext.Panel',
    xtype: 'guru-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    listeners: {
        added: 'onLoadList'
    },

    title: 'Guru',

    tools: [{
        itemId: 'addBtn',
        hidden: true,
        iconCls: 'x-fa fa-plus',
        handler: 'onAddButton'
    }],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        type: 'guru'
    },

    items: [/*{
        xtype: 'grid',
        flex: 1, 

        bind: '{results}',

        plugins: {
            pagingtoolbar: true
        },

        columns: [
            { text: 'No.',  renderer: renderNo, flex: 0.2 },
            { text: 'NIP',  dataIndex: 'nip', flex: 0.2 },
            { text: 'Nama', dataIndex: 'nama', flex: 0.4 },
            { text: 'Email', dataIndex: 'email', flex: 0.2, align: 'center' },
            { text: 'No. HP', dataIndex: 'nohp', flex: 0.2, align: 'right'}
        ],

    }*/
    
    {
        xtype: 'dataview',
        flex: 1, 

        store: {
            type: 'barangstore',
            autoLoad: false
        },
        
        //plugins: ['listpaging', 'pullrefresh'],

        scrollable: true,
        cls: 'barang',
        
        itemTpl: new Ext.XTemplate(
            '<div class="barang-item">',
                '<table class="table">',
                    '<tbody>',
                        '<tr><th width="25%">Kode</th><td width="75%">{kdbarang}</td></tr>',
                        '<tr><th width="25%">Nama</th><td width="75%">{namabarang}</td></tr>',
                        '<tr><th width="25%">Harga</th><td width="75%">Rp. {[this.setFormatDecimal(values.harga)]} / {satuan}</td></tr>',
                    '</tbody>',
                '</table>',

                '<div class="selector">',
                    '<button class="delete space-right" name="delete-button">Hapus</button>',
                    '<button class="edit" name="edit-button">Edit</button>' +
                '</div>',
            '</div>',
            {
                setFormatDecimal: function (value) {
                    return (value>0?func.currency(value):'');
                }
            }
        ),
        listeners: {
            childtap: 'onSelect'
        } 
    } /*{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'guru',
            autoLoad: false
        },
        scrollable: true,
        itemCls: 'guru-item',
        itemTpl: new Ext.XTemplate(
            '<div class="item{[xindex % 2 === 0 ? "-odd" : "-even"]}">',
                
                '<div class="title">', 
                    '{kode}<br />{nama}',

                    '<tpl if="this.getModifiedAccess()">',
                        '<div class="selector-aktif">', 
                            '<input type="checkbox" name="checkbox-aktif" {[values.aktif === true ? "checked" : ""]}> <label for="checkbox-aktif">Aktif</label>',
                        '</div>',
                
                        '<div class="selector">', 
                            '<button class="edit-btn" name="edit">Edit</button>', 
                            '<button class="hapus-btn" name="delete">Hapus</button>', 
                        '</div>',

                        '<p>&nbsp;</p>',
                    '</tpl>',

                '</div>',

            '</div>',
            {
                getModifiedAccess: function() {
                    var user = JSON.parse(localStorage.getItem('m_user'))[0];
                    return user['tipe_user']<=2;
                },

                getChecked: function(value) {
                    return value==1;
                }
            }
        ),
        listeners: {
            childtap: 'onSelect'
        } 
    }*/]
});
