Ext.define('Admin.model.guru.Guru', {
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
            name: 'nip'
        },
        {
            type: 'string',
            name: 'tempat_lahir'
        },
        {
            type: 'string',
            name: 'tanggal_lahir'
        },
        {
            type: 'string',
            name: 'jenis_kelamin'
        },
        {
            type: 'string',
            name: 'agama'
        },
        {
            type: 'string',
            name: 'nik'
        },
        {
            type: 'string',
            name: 'nuptk'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'string',
            name: 'nohp'
        },
        {
            type: 'string',
            name: 'username'
        },
        {
            type: 'string',
            name: 'password'
        },
        {
            type: 'string',
            name: 'photo'
        },
        {
            type: 'bool',
            name: 'aktif'
        }
    ]
});