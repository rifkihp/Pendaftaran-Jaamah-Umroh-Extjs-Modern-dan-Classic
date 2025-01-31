Ext.define('Admin.store.pilihanganda.PilihanGanda', {
    extend: 'Ext.data.Store',

    alias: 'store.pilihanganda',

    model: 'Admin.model.pilihanganda.PilihanGanda',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/pilihanganda',
        extraParams: {
            id_ujian: 0
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
