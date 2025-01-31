Ext.define('Admin.model.document.Document', {
    extend: 'Admin.model.Base',

    fields: [{
        type: 'int',
        name: 'id'
    },
    {
        type: 'string',
        name: 'tgl'
    },
    {
        type: 'string',
        name: 'judul'
    },
    {
        type: 'string',
        name: 'audiofile'
    },
    {
        type: 'string',
        name: 'docfile'
    },
    {
        type: 'bool',
        name: 'aktif'
    }]
});
