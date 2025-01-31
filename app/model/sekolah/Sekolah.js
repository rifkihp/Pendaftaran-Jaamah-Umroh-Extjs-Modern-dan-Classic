Ext.define('Admin.model.sekolah.Sekolah', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
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
            type: 'string',
            name: 'no_bh'
        },
        {
            type: 'string',
            name: 'tgl_berdiri'
        },
        {
            type: 'string',
            name: 'nss'
        },
        {
            type: 'string',
            name: 'npsn'
        },
        {
            type: 'string',
            name: 'status'
        },
        {
            type: 'string',
            name: 'tingkat'
        },
        {
            type: 'string',
            name: 'mbs'
        },
        {
            type: 'string',
            name: 'alamat'
        },
        {
            type: 'int',
            name: 'province_id'
        },
        {
            type: 'string',
            name: 'province'
        },
        {
            type: 'int',
            name: 'city_id'
        },
        {
            type: 'string',
            name: 'city'
        },        
        {
            type: 'int',
            name: 'subdistrict_id'
        },
        {
            type: 'string',
            name: 'subdistrict'
        },
        {
            type: 'string',
            name: 'kodepos'
        },
        {
            type: 'string',
            name: 'telepon'
        },
        {
            type: 'string',
            name: 'fax'
        },
        {
            type: 'string',
            name: 'website'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'bool',
            name: 'aktif'
        }
    ]
});