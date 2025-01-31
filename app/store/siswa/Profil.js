Ext.define('Admin.store.siswa.Profil', {
    extend: 'Ext.data.Store',

    alias: 'store.siswa-profil',

    model: 'Admin.model.siswa.Siswa',

    pageSize: 1,
    
    proxy: {
        type: 'ajax',
        url: './server/public/siswa/profile',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

    /*sorters: {
        direction: 'ASC',
        property: 'title'
    }*/
});
