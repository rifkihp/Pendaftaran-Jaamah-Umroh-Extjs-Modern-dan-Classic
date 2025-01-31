Ext.define('Admin.view.ujian.UjianSiswaAktifList', {
    extend: 'Ext.Panel',
    xtype: 'ujiansiswaaktif-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList',
        removed: 'clearChartUpdates'
    },

    title: 'Ujian Aktif',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'ujianaktif',
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
                            '<tr><th width="100%" colspan=3>{nama} {mapel}<div class="right"><label for="status-mulai">{[values.status === 2 ? "Belum Mulai" : [values.status === 4 ? "Selesai" : "Berlangsung"]]}</label></div></th></tr>',                            
                            '<tr><th width="23%">Guru</th><td width="77%" colspan=2>{guru}</td></tr>',
                            '<tr><th width="23%">Waktu</th><td width="52%">{tanggal} {jam}</td><td width="25%"><div class="right">{[this.setFormatDecimal(values.waktu)]} Mnt</div></td></tr>',
                            '<tr><th width="23%">Soal</th><td width="77%" colspan=2>PG: {pg} / Essai: {essai}</td></tr>',
                        '</tbody>',
                    '</table>',

                    '<div class="selector">',
                        '{[values.status === 3 ? "<button class=\'view\' name=\'start-button\'>Mulai</button>" : [values.status === 2 && values.selisih < 30 ? "<button class=\'edit\' name=\'absen-button\'>Absen</button>" : "" ] ]}',
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
