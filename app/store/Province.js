Ext.define('Admin.store.Province', {
    extend: 'Ext.data.Store',

    alias: 'store.province',

    model: 'Admin.model.Province',

    proxy: {
        type: 'ajax',
        url: './server/public/province',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
    
});
