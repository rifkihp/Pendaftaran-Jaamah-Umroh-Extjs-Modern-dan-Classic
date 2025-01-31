Ext.define('Admin.store.tahunpelajaran.TahunPelajaran', {
    extend: 'Ext.data.Store',

    alias: 'store.tahunpelajaran',

    model: 'Admin.model.tahunpelajaran.TahunPelajaran',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/tahunpelajaran',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    sorters: {
        direction: 'ASC',
        property: 'title'
    }
});
