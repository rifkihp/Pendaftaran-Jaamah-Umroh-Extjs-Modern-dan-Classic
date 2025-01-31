Ext.define('Admin.store.mapel.Mapel', {
    extend: 'Ext.data.Store',

    alias: 'store.mapel',

    model: 'Admin.model.mapel.Mapel',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/mapel',
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
