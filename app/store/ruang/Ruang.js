Ext.define('Admin.store.ruang.Ruang', {
    extend: 'Ext.data.Store',

    alias: 'store.ruang',

    model: 'Admin.model.ruang.Ruang',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/ruang',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    /*sorters: {
        direction: 'ASC',
        property: 'kode'
    }*/
});
