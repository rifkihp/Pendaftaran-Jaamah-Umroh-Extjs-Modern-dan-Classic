Ext.define('Admin.model.quiz.Quiz', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'nama'
        },
        {
            type: 'string',
            name: 'kelas'
        },
        {
            type: 'string',
            name: 'mapel'
        },
        {
            type: 'string',
            name: 'guru'
        },
        {
            type: 'int',
            name: 'waktu'
        },
        {
            type: 'int',
            name: 'pg'
        },
        {
            type: 'int',
            name: 'essai'
        },
        {
            type: 'int',
            name: 'selesai'
        },
        {
            type: 'bool',
            name: 'acak'
        },
        {
            type: 'bool',
            name: 'aktif'
        },
        {
            type: 'string',
            name: 'score'
        }
    ]
});