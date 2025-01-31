Ext.define('Admin.view.quiz.QuizView',{
    extend: 'Ext.panel.Panel',
    xtype: 'quiz-view',

    cls: 'shadow',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onViewLoad'
    },

    items: [{
        xtype: 'dataview',
        scrollable: true,
        itemId: 'dataview-quiz',
        flex: 1,
        cls: 'quiz-view',
        store: {
            type: 'quiz',
            autoLoad: false
        },
        tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="quiz">',
                '<div class="subtitle">SOAL</div>',
                '<div class="soal">{soal}</div>',
            '</div>',
        '</tpl>'),
        itemSelector: 'div.soal'
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Tutup',
                handler: 'onCloseViewQuizClick'
            }
        ]
    }

});
