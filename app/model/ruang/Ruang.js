Ext.define('Admin.model.ruang.Ruang', {
    extend: 'Admin.model.Base',

    fields: [
        { 
            type: 'int',
            name: 'id', 
        },
        { 
            type: 'string',
            name: 'kode'  
        },
        {             
            type: 'string',
            name: 'nama'
        },
        {
            type: 'int',
            name: 'id_guru'
        },
        {
            type: 'string',
            name: 'guru'
        },
        { 
            type: 'int',
            name: 'id_kelas'
        },
        { 
            type: 'string',
            name: 'kelas'
        },
        { 
            type: 'int',
            name: 'id_sekolah'
        },
        { 
            type: 'string',
            name: 'sekolah'
        }

    ]
});
