Ext.define('Admin.view.sekolah.Sekolah', {
    extend: 'Ext.Container',
    xtype: 'sekolah',

    controller: 'sekolah',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    cls: 'sekolah',
    
    items: []
});