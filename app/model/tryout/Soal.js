Ext.define('Admin.model.tryout.Soal', {
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