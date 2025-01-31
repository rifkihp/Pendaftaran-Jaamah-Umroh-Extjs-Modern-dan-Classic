Ext.define('Admin.store.tryout.Soal', {
    extend: 'Ext.data.Store',

    alias: 'store.tryout-soal',

    model: 'Admin.model.tryout.Soal',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/tryout/mulai',
        extraParams: {
            id_siswa: 0,
            id_tryout: 0
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
