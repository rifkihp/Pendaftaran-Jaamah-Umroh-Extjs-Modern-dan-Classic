Ext.define('Admin.store.guru.Guru', {
    extend: 'Ext.data.Store',

    alias: 'store.guru',

    model: 'Admin.model.guru.Guru',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/guru',
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
