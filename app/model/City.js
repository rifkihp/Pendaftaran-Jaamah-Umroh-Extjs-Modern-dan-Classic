Ext.define('Admin.model.City', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'city_id'
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
            type: 'string',
            name: 'type'
        },
        {
            type: 'string',
            name: 'city_name'
        },
        {
            type: 'string',
            name: 'postal_code'
        }
    ]
});
