Ext.define('Admin.store.KelasUjianTree', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.kelasujiantree',

    fields: [{
        name: 'text'
    }],

    proxy: {
        type: 'ajax',
        url: './server/public/kelas/kelasujian',
        reader: {
            type: 'json',
            rootProperty: 'children'
        }
    },

    autoLoad: true
});
