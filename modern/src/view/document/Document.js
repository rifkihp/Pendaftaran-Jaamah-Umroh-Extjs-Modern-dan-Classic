Ext.define('Admin.view.document.Document', {
    extend: 'Ext.Container',
    xtype: 'documents',

    controller: 'documents',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
        
    cls: 'document',
    items: []
});