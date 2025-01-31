Ext.define('Admin.view.mapeldiajar.MapelDiajarList', {
    extend: 'Ext.Panel',
    xtype: 'mapeldiajar-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Mapel Diajar',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'mapeldiajar',
            autoLoad: false
        },
        cls: 'mapeldiajar',
        selectedCls: 'mapeldiajar-item-selected',
        itemTpl: 
            new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="mapeldiajar-item">' ,
                        '<table class="table">',
                            '<tbody>',
                                '<tr><th colspan=2 width="100%">{kode} - {nama}</th></tr>',
                                '<tr><td width="50%">Kelas {kelas}</td><td width="50%">Ruang {ruang}</td></tr>',
                            '</tbody>',
                        '</table>',
                    '</div>',
                '</tpl>'
            )          
        
    }]
});
