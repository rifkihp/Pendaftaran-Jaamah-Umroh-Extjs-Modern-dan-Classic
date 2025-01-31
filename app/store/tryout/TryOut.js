Ext.define('Admin.store.tryout.TryOut', {
    extend: 'Ext.data.Store',

    alias: 'store.tryout',

    model: 'Admin.model.tryout.TryOut',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/tryout',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
