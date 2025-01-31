Ext.define('Admin.view.ujian.UjianList', {
    extend: 'Ext.Panel',
    xtype: 'ujian-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Ujian',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'ujian',
            autoLoad: false
        },
        cls: 'ujian',
        selectedCls: 'ujian-item-selected',
        itemTpl:
        new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="ujian-item">',
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="100%" colspan=3>{nama} {mapel}<div class="right"><input type="checkbox" name="checkbox-aktif" {[values.aktif === true ? "checked" : ""]}> <label for="checkbox-aktif">Aktif</label></div></th></tr>',                            
                            '<tr><th width="23%">Guru</th><td width="77%" colspan=2>{guru}</td></tr>',
                            '<tr><th width="23%">Waktu</th><td width="52%">{tanggal} {jam}</td><td width="25%"><div class="right">{[this.setFormatDecimal(values.waktu)]} Menit</div></td></tr>',
                            '<tr><th width="23%">Soal</th><td width="77%" colspan=2>PG: {pg} / Essai: {essai}<div class="right"><input type="checkbox" name="checkbox-acak" {[values.acak === true ? "checked" : ""]}> <label for="checkbox-acak">Acak</label></div></td></tr>',
                        '</tbody>',
                    '</table>',

                    '<div class="selector">',
                        '<button class="view space-right" name="view-button">Lihat Soal</button>',
                        '<button class="delete space-right" name="delete-button">Hapus</button>',
                        '<button class="edit" name="edit-button">Edit</button>',
                    '</div>',
                '</div>',
            '</tpl>',
            {
                setFormatDecimal: function (value) {
                    var func = Ext.create('Admin.view.currency');
                    return (value>0?func.currency(value):'');
                }
            }
        ),
    
        listeners: {
            childtap: 'onChildTap'
        }          
        
    }]
});
