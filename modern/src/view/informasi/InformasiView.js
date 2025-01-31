Ext.define('Admin.view.informasi.InformasiView', {
    extend: 'Ext.Panel',
    xtype: 'informasi-view',

    requires: [
        'Ext.Button',
        'Ext.dataview.DataView' 
    ],

    title: 'Detail Informasi',

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
        cls: 'informasi',
        flex: 1,
        scrollable: true,
        store: {
            type:'informasi',
            autoLoad: false,
        },
        selectable: false,

        itemCls: 'informasi-item',
        itemTpl: new Ext.XTemplate(
            '<table class="table">',
                '<tbody>',
                    '<tr><th width="17%">Tanggal</th><th width="3%">:</th><td width="80%">{tgl}</td></tr>',
                    '<tr><th width="17%">Kepada</th><th width="3%">:</th><td width="80%">{kepada}</td></tr>',
                    '<tr><th width="17%">Judul</th><th width="3%">:</th><td width="80%">{judul}</td></tr>',
                '</tbody>',
            '</table>',
            '<div class="time"><br /><b>Detail Informasi:</b></div>',
            '<div>',
                '{penjelasan}',

                /*'<tpl if="audiofile !== \'\'">',
                    '<audio controls>',
                        '<source src="./server/public/uploads/berkas/{audiofile}" type="audio/mpeg">',
                    '</audio>',                           
                '</tpl>',*/
            
                '<tpl if="docfile !== \'\'">',
                    '<div class="time"><b>Lampiran:</b></div>',
                    '<a href="./server/public/uploads/berkas/{docfile}" target="_blank">{docfile}</a>',                           
                '</tpl>',
            '</div>'
        )
    }]
});
