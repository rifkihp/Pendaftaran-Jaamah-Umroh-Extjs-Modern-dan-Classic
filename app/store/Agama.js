Ext.define('Admin.store.Agama', {
    extend: 'Ext.data.Store',

    alias: 'store.agama',

    fields: [{
        type: 'string',
        name: 'nama'
    }],

    data: [
        {nama: 'Islam'}, 
        {nama: 'Kristen'}, 
        {nama: 'Hindu'}, 
        {nama: 'Budha'}, 
        {nama: 'Kepercayaan Tuhan YME'}
    ]

});
