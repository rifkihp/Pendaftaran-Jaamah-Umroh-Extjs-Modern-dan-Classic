Ext.define('Admin.store.City', {
    extend: 'Ext.data.Store',

    alias: 'store.city',

    model: 'Admin.model.City',

    proxy: {
        type: 'ajax',
        url: './server/public/city',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
    
});
