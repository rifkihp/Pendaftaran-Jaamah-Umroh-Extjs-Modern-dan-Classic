Ext.define('Admin.store.quiz.Soal', {
    extend: 'Ext.data.Store',

    alias: 'store.quiz-soal',

    model: 'Admin.model.quiz.Soal',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/quiz/mulai',
        extraParams: {
            id_siswa: 0,
            id_quiz: 0
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
