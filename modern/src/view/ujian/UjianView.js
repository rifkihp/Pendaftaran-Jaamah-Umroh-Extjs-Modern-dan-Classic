Ext.define('Admin.view.ujian.UjianView', {
    extend: 'Ext.Panel',
    xtype: 'ujian-view',

    requires: [
        'Ext.Button',
        'Ext.dataview.DataView' 
    ],

    title: 'Ujian',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bbar: ['->', {
        ui: 'header',
        text: '<b>Kembali</b>',
        handler: 'onShow'
    }],

    listeners: {
        added: 'onLoadView'
    },

    items: [{
        xtype: 'dataview',
        cls: 'ujian',
        flex: 1,
        scrollable: true,
        store: {
            type:'ujian',
            autoLoad: false,
        },
        selectedCls: 'ujian-item-selected',
        itemTpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="ujian-item">',
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="100%" colspan=2>{judul}<div class="right"><b>Kelas {kelas}</b></div></th></tr>',                            
                            '<tr><th width="23%">Mapel</th><td width="77%">{mapel}</td></tr>',
                            '<tr><th width="23%">Guru</th><td width="77%">{guru}</td></tr>',
                            '<tr><th width="23%">Waktu</th><td width="77%">{mulai} sd. {selesai}</td></tr>',
                        '</tbody>',
                    '</table>',
                    '<div class="time"><b>Soal:</b></div>',
                    '<div>{soal}</div>',
                '</div>',
            '</tpl>',
            {
                getThumbUrl: function (jarak) {
                    //alert('tes '+jarak);
                    return '';
                }
            }
        )
    }]
});
