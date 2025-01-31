Ext.define('Admin.view.latihan.Latihan', {
    extend: 'Ext.Container',
    xtype: 'latihan',

    controller: 'latihan',

    listeners: {
        show: 'onShow',
        hide: 'clearChartUpdates'
    },

    layout: 'hbox',
    
    items: []
});