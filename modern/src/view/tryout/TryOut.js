Ext.define('Admin.view.tryout.TryOut', {
    extend: 'Ext.Container',
    xtype: 'tryout',

    controller: 'tryout',

    listeners: {
        show: 'onShow',
        hide: 'clearChartUpdates'
    },

    layout: 'hbox',
    
    items: []
});