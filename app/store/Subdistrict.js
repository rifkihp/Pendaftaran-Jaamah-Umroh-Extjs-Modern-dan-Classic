Ext.define('Admin.store.Subdistrict', {
    extend: 'Ext.data.Store',

    alias: 'store.subdistrict',

    model: 'Admin.model.Subdistrict',

    proxy: {
        type: 'ajax',
        url: './server/public/subdistrict',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
    
});
