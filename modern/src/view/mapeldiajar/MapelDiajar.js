Ext.define('Admin.view.mapeldiajar.MapelDiajar', {
    extend: 'Ext.Container',
    xtype: 'mapeldiajar',

    controller: 'mapeldiajar',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    items: []
});