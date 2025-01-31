Ext.define('Admin.model.Province', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'province_id'
        },
        {
            type: 'string',
            name: 'province'
        }
    ]
});
