Ext.define('Admin.store.Tingkat', {
    extend: 'Ext.data.Store',

    alias: 'store.tingkatsekolah',

    fields: [{
        type: 'string',
        name: 'kode'
    }, 
    {
        type: 'string',
        name: 'nama'
    }],

    data: [
        {kode: 'SMK', nama: 'SMK'}, 
        {kode: 'SMA', nama: 'SMA'}
    ]

});
