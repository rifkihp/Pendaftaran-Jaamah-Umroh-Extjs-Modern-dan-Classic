Ext.define('Admin.view.ujian.Ujian', {
    extend: 'Ext.Container',
    xtype: 'ujian',

    controller: 'ujian',

    listeners: {
        show: 'onShow',
        hide: 'clearChartUpdates'
    },

    layout: 'hbox',
    
    items: []
});