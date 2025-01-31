Ext.define('Admin.model.siswa.Siswa', {
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
            name: 'nis'
        },
        {
            type: 'string',
            name: 'nisn'
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
            name: 'email'
        },
        {
            type: 'string',
            name: 'nohp'
        },
        {
            type: 'string',
            name: 'lintas_minat_1'
        },
        {
            type: 'string',
            name: 'lintas_minat_2'
        },
        {
            type: 'string',
            name: 'kelas'
        },
        {
            type: 'string',
            name: 'ruang'
        },        
        {
            type: 'string',
            name: 'sekolah'
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