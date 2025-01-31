Ext.define('Admin.view.latihan.LatihanList', {
    extend: 'Ext.Panel',
    xtype: 'latihan-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Latihan',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'latihan',
            autoLoad: false
        },
        cls: 'latihan',
        selectedCls: 'latihan-item-selected',
        itemTpl:
        new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="latihan-item">',
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="100%" colspan=2>{nama}</th></tr>',
                            '<tr><th width="23%">Bidang&nbsp;Ilmu&nbsp;</th><td width="77%">{mapel}</td></tr>',
                            '<tr><th width="23%">Jumlah&nbsp;Soal&nbsp;</th><td width="77%">PG: {pg} / Essai: {essai}<div class="right"></td></tr>',
                            '<tr><th width="23%">Score&nbsp;</th><td width="77%"><b>{score}</b></td></tr>',
                        '</tbody>',
                    '</table>',

                    '<div class="selector">',
                        '<button class="view space-right" name="view-button">Jawab Soal</button>',
                        '<button class="edit" name="edit-button">Pembahasan</button>',
                    '</div>',
                '</div>',
            '</tpl>'
            
        ),
    
        listeners: {
            childtap: 'onChildTap'
        }          
        
    }]
});
