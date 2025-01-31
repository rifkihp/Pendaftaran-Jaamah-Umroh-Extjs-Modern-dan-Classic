Ext.define('Admin.store.ujian.Soal', {
    extend: 'Ext.data.Store',

    alias: 'store.ujian-soal',

    model: 'Admin.model.ujian.Soal',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/ujian/mulai',
        extraParams: {
            id_siswa: 0,
            id_ujian: 0
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
