Ext.define('Admin.store.essai.Essai', {
    extend: 'Ext.data.Store',

    alias: 'store.essai',

    model: 'Admin.model.essai.Essai',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/essai',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
