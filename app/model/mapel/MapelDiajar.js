Ext.define('Admin.model.mapel.MapelDiajar', {
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
            name: 'id_kelas'
        },
        {
            type: 'string',
            name: 'kelas'
        },
        {
            type: 'int',
            name: 'id_ruang'
        },
        {
            type: 'string',
            name: 'ruang'
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
