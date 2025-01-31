Ext.define('Admin.view.sekolah.SekolahList', {
    extend: 'Ext.Panel',
    xtype: 'sekolah-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    listeners: {
        added: 'onLoadList'
    },

    title: 'Sekolah',

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
            type: 'sekolah',
            autoLoad: false
        },
        scrollable: true,
        itemCls: 'sekolah-item',
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
    }]
});
