Ext.define('Admin.store.kelas.Kelas', {
    extend: 'Ext.data.Store',

    alias: 'store.kelas',

    model: 'Admin.model.kelas.Kelas',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/kelas',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    /*sorters: {
        direction: 'ASC',
        property: 'title'
    }*/
});
