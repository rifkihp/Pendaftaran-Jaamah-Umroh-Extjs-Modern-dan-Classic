Ext.define('Admin.view.guru.Guru', {
    extend: 'Ext.container.Container',
    xtype: 'guru',

    controller: 'guru',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [{
        xtype: 'container',
        itemId: 'contentPanel',
        margin: '0 20 20 0',
        flex: 1,
        layout: {
            type : 'anchor',
            anchor : '100%'
        }
    }]
});
