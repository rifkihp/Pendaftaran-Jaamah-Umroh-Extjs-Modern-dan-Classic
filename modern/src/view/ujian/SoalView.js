
Ext.define('Admin.view.ujian.SoalView',{
    extend: 'Ext.Panel',
    xtype: 'soal-view',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    bbar: ['->', { 
        ui: 'header',
        text: '<b>Keluar</b>',
        handler: 'onCancel'
    }, { 
        ui: 'header',
        text: '<b>Selesai</b>',
        handler: 'onFinish'
    }],

    listeners: {
        added: 'onLoadSoal'
    },
    
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },

    cls: 'lembar-soal',

    items: [{
        xtype: 'toolbar',
        userCls: 'main-toolbar',
        shadow: true,
        items: [{
                xtype: 'component',
                reference: 'judul',
                cls: 'title',
                html: ''
            }, '->', {
                xtype: 'component',
                reference: 'timer',
                cls: 'title',
                html: '00 : 00: 00'
            }]
        }, {
        xtype: 'container',
        flex: 1,

        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'stretch'
        },
        
        items: [{
            xtype: 'dataview',
            itemId: 'lembarsoal',
            flex: 1,
            selectable: false,
            itemCls: 'lembar-soal-item',
            itemTpl: new Ext.XTemplate(
                
                '<ol type="1" start="{no}">',
                    '<li>',

                        '<div class="pertanyaan">',
                            
                            '{pertanyaan}',
                            '<tpl if="audiofile !== \'\'">',
                                '<audio controls>',
                                    '<source src="./server/public/uploads/berkas/{audiofile}" type="audio/mpeg">',
                                '</audio>',                           
                            '</tpl>',

                            '<table class="table">',
                                '<tbody>',
                                
                                    '<tr>',
                                        '<td nowrap><p><input type="radio" name="pilihan" value="A" {[values.jawaban === "A" ? "checked" : ""]}>A.&nbsp;</p></td>',
                                        '<td width="100%">{pilihan_a}',
                                            '<tpl if="audiofile_a !== \'\'">',
                                                '<audio controls>',
                                                    '<source src="./server/public/uploads/berkas/{audiofile_a}" type="audio/mpeg">',
                                                '</audio>',                           
                                            '</tpl>',
                                        '</td>',
                                    '</tr>',

                                    '<tr>',
                                        '<td nowrap><p><input type="radio" name="pilihan" value="B" {[values.jawaban === "B" ? "checked" : ""]}>B.&nbsp;</p></td>',
                                        '<td width="100%">', 
                                            '{pilihan_b}',
                                            '<tpl if="audiofile_b !== \'\'">',
                                                '<audio controls>',
                                                    '<source src="./server/public/uploads/berkas/{audiofile_b}" type="audio/mpeg">',
                                                '</audio>',                           
                                            '</tpl>',
                                        '</td>',
                                    '</tr>',
                                    
                                    '<tr>',
                                        '<td nowrap><p><input type="radio" name="pilihan" value="C" {[values.jawaban === "C" ? "checked" : ""]}>C.&nbsp;</p></td>',
                                        '<td width="100%">', 
                                            '{pilihan_c}',
                                            '<tpl if="audiofile_c !== \'\'">',
                                                '<audio controls>',
                                                    '<source src="./server/public/uploads/berkas/{audiofile_c}" type="audio/mpeg">',
                                                '</audio>',                           
                                            '</tpl>',
                                        '</td>',
                                    '</tr>',

                                    '<tr>',
                                        '<td nowrap><p><input type="radio" name="pilihan" value="D" {[values.jawaban === "D" ? "checked" : ""]}>D.&nbsp;</p></td>',
                                        '<td width="100%">', 
                                            '{pilihan_d}',
                                            '<tpl if="audiofile_d !== \'\'">',
                                                '<audio controls>',
                                                    '<source src="./server/public/uploads/berkas/{audiofile_d}" type="audio/mpeg">',
                                                '</audio>',                           
                                            '</tpl>',
                                        '</td>',
                                    '</tr>',

                                    '<tr>',
                                        '<td nowrap><p><input type="radio" name="pilihan" value="E" {[values.jawaban === "E" ? "checked" : ""]}>E.&nbsp;</p></td>',
                                        '<td width="100%">', 
                                            '{pilihan_e}',
                                            '<tpl if="audiofile_e !== \'\'">',
                                                '<audio controls>',
                                                    '<source src="./server/public/uploads/berkas/{audiofile_e}" type="audio/mpeg">',
                                                '</audio>',                           
                                            '</tpl>',
                                        '</td>',
                                    '</tr>',

                                '</tbody>',
                            '</table>',
                        '</div>',
                    '</li>',
                '</ol>'
            ),

            listeners: {
                childtap: 'onPilihJawaban'
            },

            store: {
                type: 'pilihanganda',
                autoLoad: false
            }
        }, 
        {
            xtype: 'dataview',
            itemId: 'lembarjawab',
            
            itemCls: 'lembar-jawab-item',
            itemTpl: new Ext.XTemplate(
                    '<div class="btn btn-default{[values.no % 2 === 0 ? "-odd" : "-even"]} radius-0">' ,
                        '<span class="badge badge-red badge-corner radius-3">{no}</span>' ,
                        '{jawaban}' ,
                    '</div>'
            ),

            listeners: {
                select: 'onPilihSoal'
            },

            store: {
                type: 'pilihanganda',
                
                autoLoad: false
            }
        }]

    }]

});
