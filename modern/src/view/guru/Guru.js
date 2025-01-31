Ext.define('Admin.view.guru.Guru', {
    extend: 'Ext.Container',
    xtype: 'guru',

    controller: 'guru',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    cls: 'guru',
    
    items: []
});