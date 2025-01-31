Ext.define('Admin.model.kelas.Kelas', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'kode'
        },
        {
            type: 'string',
            name: 'nama'
        },
        {
            type: 'int',
            name: 'id_sekolah'
        },
        {
            type: 'string',
            name: 'sekolah'
        }
    ]
});
