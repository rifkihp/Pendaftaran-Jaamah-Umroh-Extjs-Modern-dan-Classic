Ext.define('Admin.store.LevelUser', {
    extend: 'Ext.data.Store',

    alias: 'store.leveluser',

    fields: [{
        type: 'int',
        name: 'id'
    }, 
    {
        type: 'string',
        name: 'level'
    }],

    data: [
        {id: '1', level: 'Administrator'}, 
        {id: '2', level: 'Operator'}, 
        {id: '3', level: 'Guru'}, 
        {id: '4', level: 'Siswa'}
    ]

});
