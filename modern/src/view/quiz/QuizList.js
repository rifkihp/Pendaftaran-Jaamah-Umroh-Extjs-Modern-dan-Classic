Ext.define('Admin.view.quiz.QuizList', {
    extend: 'Ext.Panel',
    xtype: 'quiz-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Quiz',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'quiz',
            autoLoad: false
        },
        cls: 'quiz',
        selectedCls: 'quiz-item-selected',
        itemTpl:
        new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="quiz-item">',
                    '<table class="table">',
                        '<tbody>',
                            '<tr><th width="100%" colspan=2>{nama}</th></tr>',
                            '<tr><th width="23%">Bidang&nbsp;Ilmu&nbsp;</th><td width="77%">{mapel}</td></tr>',
                            '<tr><th width="23%">Jumlah&nbsp;Soal&nbsp;</th><td width="77%">PG: {pg} / Essai: {essai}<div class="right"></td></tr>',
                            '<tr><th width="23%">Score&nbsp;</th><td width="77%"><b>{score}</b></td></tr>',
                        '</tbody>',
                    '</table>',

                    '<div class="selector">',
                        '{[values.selesai === 1 ? "<button class=\'edit space-right\' name=\'edit-button\'>Pembahasan</button>" : "<button class=\'view space-right\' name=\'view-button\'>Jawab Soal</button>" ]}',                    
                    '</div>',
                '</div>',
            '</tpl>'
        ),
    
        listeners: {
            childtap: 'onChildTap'
        }          
        
    }]
});
