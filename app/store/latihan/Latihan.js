Ext.define('Admin.store.latihan.Latihan', {
    extend: 'Ext.data.Store',

    alias: 'store.latihan',

    model: 'Admin.model.latihan.Latihan',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/latihan',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
