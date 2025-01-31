Ext.define('Admin.store.JenisKelamin', {
    extend: 'Ext.data.Store',

    alias: 'store.jeniskelamin',

    fields: [{
        type: 'string',
        name: 'kode'
    }, 
    {
        type: 'string',
        name: 'nama'
    }],

    data: [
        {kode: 'L', nama: 'Laki-laki'}, 
        {kode: 'P', nama: 'Perempuan'}
    ]

});
