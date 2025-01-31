Ext.define('Admin.store.siswa.Siswa', {
    extend: 'Ext.data.Store',

    alias: 'store.siswa',

    model: 'Admin.model.siswa.Siswa',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/siswa',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
