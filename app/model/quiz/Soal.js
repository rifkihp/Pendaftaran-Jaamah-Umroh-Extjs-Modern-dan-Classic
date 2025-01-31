Ext.define('Admin.model.quiz.Soal', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        }
    ],

    hasMany: [{
        name: 'pilihanganda',
        model: 'pilihanganda.PilihanGanda'
    }, {
        name: 'essai',
        model: 'essai.Essai'
    }]

});