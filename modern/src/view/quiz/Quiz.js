Ext.define('Admin.view.quiz.Quiz', {
    extend: 'Ext.Container',
    xtype: 'quiz',

    controller: 'quiz',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    items: []
});