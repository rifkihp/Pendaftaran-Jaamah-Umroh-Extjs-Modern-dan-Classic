Ext.define('Admin.store.document.Document', {
    extend: 'Ext.data.Store',

    alias: 'store.document',
    model: 'Admin.model.informasi.Informasi',
    
    proxy: {
        type: 'ajax',
        url: './server/public/document',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
