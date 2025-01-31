Ext.define('Admin.model.essai.Essai', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'pertanyaan'
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
            type: 'string',
            name: 'score'
        },
        {
            type: 'string',
            name: 'pembahasan'
        },
        {
            type: 'string',
            name: 'audiofile_pembahasan'
        },
        {
            type: 'string',
            name: 'docfile_pembahasan'
        }
    ]
});