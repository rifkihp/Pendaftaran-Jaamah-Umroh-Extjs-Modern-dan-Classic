Ext.define('Admin.model.Subdistrict', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'subdistrict_id'
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
            type: 'string',
            name: 'type'
        },
        {
            type: 'string',
            name: 'subdistrict_name'
        }
    ]
});
