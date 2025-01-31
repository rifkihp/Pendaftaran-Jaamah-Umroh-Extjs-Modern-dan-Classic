Ext.define('Admin.view.quiz.Quiz', {
    extend: 'Ext.container.Container',
    xtype: 'quiz',
    
    controller: 'quiz',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [{
        xtype: 'container',
        itemId: 'contentPanel',
        margin: '0 20 20 0',
        flex: 1,
        layout: {
            type : 'anchor',
            anchor : '100%'
        }
    }]
});
