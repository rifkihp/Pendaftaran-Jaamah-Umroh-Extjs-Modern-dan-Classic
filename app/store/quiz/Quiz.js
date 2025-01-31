Ext.define('Admin.store.quiz.Quiz', {
    extend: 'Ext.data.Store',

    alias: 'store.quiz',

    model: 'Admin.model.quiz.Quiz',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/quiz',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
