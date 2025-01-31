
Ext.define('Admin.view.quiz.QuizView',{
    extend: 'Ext.Panel',
    xtype: 'quiz-view',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadQuizSoal'
    },
    
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },

    cls: 'lembar-quiz',

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
                hidden: true,
                reference: 'timer',
                cls: 'title',
                html: '00 : 00: 00'
            }, {
                ui: 'header',
                iconCls: 'x-fa fa-times',
                handler: 'onFinish',
                margin: '0 -7 0 0'    
            }]
        }, 
        {
            xtype: 'container',
            flex: 1,

            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'stretch'
            },
        
            items: [{
                xtype: 'dataview',
                itemId: 'lembarquizsoal',
                flex: 1,
                selectable: false,
                itemCls: 'lembar-quiz-soal-item',
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
                                            '<td nowrap><p><tpl if="show_pembahasan !== 1"><input type="radio" name="pilihan" value="A" {[values.jawaban === "A" ? "checked" : ""]}></tpl>A.&nbsp;</p></td>',
                                            '<td width="100%">{pilihan_a}',
                                                '<tpl if="audiofile_a !== \'\'">',
                                                    '<audio controls>',
                                                        '<source src="./server/public/uploads/berkas/{audiofile_a}" type="audio/mpeg">',
                                                    '</audio>',                           
                                                '</tpl>',
                                            '</td>',
                                        '</tr>',

                                        '<tr>',
                                            '<td nowrap><p><tpl if="show_pembahasan !== 1"><input type="radio" name="pilihan" value="B" {[values.jawaban === "B" ? "checked" : ""]}></tpl>B.&nbsp;</p></td>',
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
                                            '<td nowrap><p><tpl if="show_pembahasan !== 1"><input type="radio" name="pilihan" value="C" {[values.jawaban === "C" ? "checked" : ""]}></tpl>C.&nbsp;</p></td>',
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
                                            '<td nowrap><p><tpl if="show_pembahasan !== 1"><input type="radio" name="pilihan" value="D" {[values.jawaban === "D" ? "checked" : ""]}></tpl>D.&nbsp;</p></td>',
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
                                            '<td nowrap><p><tpl if="show_pembahasan !== 1"><input type="radio" name="pilihan" value="E" {[values.jawaban === "E" ? "checked" : ""]}></tpl>E.&nbsp;</p></td>',
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

                                '<tpl if="show_pembahasan === 1">',
                                    '<div class="subtitle">Pembahasan</div>',
                                    '{pembahasan}',
                                    '<div class="subtitle">Kunci Jawaban: {kuncijawaban}</div>',
                                '</tpl>',

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
                itemId: 'lembarquizjawab',
                
                itemCls: 'lembar-quiz-jawab-item',
                itemTpl: new Ext.XTemplate(
                        '<div class="btn btn-default{[values.no % 2 === 0 ? "-odd" : "-even"]} radius-0">' ,
                            '<span class="badge badge-red badge-corner radius-3">{no}</span>' ,
                            '<tpl if="show_pembahasan === 1">',
                                '<div class="badge-{[values.jawaban === values.kuncijawaban ? "true" : "false"]}-corner-bottom"></div>',
                            '</tpl>',
                            '{jawaban}',
                            
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

        },
        {
            layout: 'hbox',
            margin: '0 10px 10px 10px',
            items: [/*{
                xtype: 'button',
                margin: '0 5px 0 0',
                text: '<b>Ragu-Ragu</b>',
                iconAlign: 'right',
                iconCls: 'x-fa fa-search',
                ui: 'bright-blue',
                width: '100%',
                //handler: 'onRaguButton',
                flex: 1
            },*/
            
            {
                xtype: 'button',
                //margin: '0 0 0 5px',
                text: '<b>Selesai</b>',
                //iconAlign: 'right',
                //iconCls: 'x-fa fa-angle-right',
                ui: 'confirm',
                width: '100%',
                handler: 'onFinish',
                flex: 1
            }]
        }]

});
