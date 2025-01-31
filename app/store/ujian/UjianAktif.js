Ext.define('Admin.store.ujian.UjianAktif', {
    extend: 'Ext.data.Store',

    alias: 'store.ujianaktif',

    model: 'Admin.model.ujian.Ujian',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/ujian/aktif',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
