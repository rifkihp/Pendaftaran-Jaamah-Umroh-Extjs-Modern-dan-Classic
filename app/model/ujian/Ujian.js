Ext.define('Admin.model.ujian.Ujian', {
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
            type: 'string',
            name: 'tanggal'
        },
        {
            type: 'string',
            name: 'jam'
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
            name: 'peserta'
        },
        {
            type: 'int',
            name: 'status'
        },
        {
            type: 'bool',
            name: 'acak'
        },
        {
            type: 'bool',
            name: 'aktif'
        }
    ]
});