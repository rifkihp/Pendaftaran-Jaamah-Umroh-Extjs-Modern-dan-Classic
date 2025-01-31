Ext.define('Admin.store.latihan.Soal', {
    extend: 'Ext.data.Store',

    alias: 'store.latihan-soal',

    model: 'Admin.model.latihan.Soal',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/latihan/mulai',
        extraParams: {
            id_siswa: 0,
            id_latihan: 0
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
