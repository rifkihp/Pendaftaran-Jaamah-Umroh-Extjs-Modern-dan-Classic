Ext.define('Admin.view.informasi.InformasiList', {
    extend: 'Ext.Panel',
    xtype: 'informasi-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    listeners: {
        added: 'onLoadList'
    },

    title: 'Informasi',

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

    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'informasi',
            autoLoad: false
        },
        scrollable: true,
        itemCls: 'informasi-item',
        itemTpl: new Ext.XTemplate(
            '<div class="item{[xindex % 2 === 0 ? "-odd" : "-even"]}">',
                
                    '<table class="table">',
                        '<tbody>',          
                            '<tr><th width="17%">Tanggal</th><th width="3%">:</th><td width="80%">{tgl}</td></tr>',
                            '<tr><th width="17%">Kepada</th><th width="3%">:</th><td width="80%">{kepada}</td></tr>',
                            '<tr><th width="17%">Judul</th><th width="3%">:</th><td width="80%">{judul}</td></tr>',
                        '</tbody>',
                    '</table>',

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
    }]
});
