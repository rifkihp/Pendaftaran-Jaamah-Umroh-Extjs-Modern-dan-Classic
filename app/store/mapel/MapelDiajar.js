Ext.define('Admin.store.mapel.MapelDiajar', {
    extend: 'Ext.data.Store',

    alias: 'store.mapeldiajar',

    model: 'Admin.model.mapel.MapelDiajar',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/mapeldiajar',
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
