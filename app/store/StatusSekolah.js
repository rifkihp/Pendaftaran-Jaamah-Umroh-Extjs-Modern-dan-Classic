Ext.define('Admin.store.StatusSekolah', {
    extend: 'Ext.data.Store',

    alias: 'store.statussekolah',

    fields: [{
        type: 'string',
        name: 'kode'
    }, 
    {
        type: 'string',
        name: 'nama'
    }],

    data: [
        {kode: 'SWASTA', nama: 'SWASTA'}, 
        {kode: 'NEGERI', nama: 'NEGERI'}
    ]

});
