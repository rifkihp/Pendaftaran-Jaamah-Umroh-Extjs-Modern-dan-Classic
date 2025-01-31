Ext.define('Admin.store.sekolah.Sekolah', {
    extend: 'Ext.data.Store',

    alias: 'store.sekolah',

    model: 'Admin.model.sekolah.Sekolah',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/sekolah',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
