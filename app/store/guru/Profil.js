Ext.define('Admin.store.guru.Profil', {
    extend: 'Ext.data.Store',

    alias: 'store.guru-profil',

    model: 'Admin.model.guru.Guru',

    pageSize: 1,
    
    proxy: {
        type: 'ajax',
        url: './server/public/guru/profile',
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
