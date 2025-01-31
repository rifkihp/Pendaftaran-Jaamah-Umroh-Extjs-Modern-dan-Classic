Ext.define('Admin.model.tahunpelajaran.TahunPelajaran', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'tahun'
        },
        {
            type: 'string',
            name: 'semester'
        },
        {
            type: 'int',
            name: 'aktif'
        }
    ]
});
