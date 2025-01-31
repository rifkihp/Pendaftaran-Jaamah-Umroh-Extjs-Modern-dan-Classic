Ext.define('Admin.store.ujian.Ujian', {
    extend: 'Ext.data.Store',

    alias: 'store.ujian',

    model: 'Admin.model.ujian.Ujian',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/ujian',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
