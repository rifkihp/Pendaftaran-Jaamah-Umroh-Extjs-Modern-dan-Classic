Ext.define('Admin.view.siswa.Profil', {
    extend: 'Ext.Container',
    xtype: 'siswa-profil',

    controller: 'siswa-profil',

    listeners: {
        show: 'onShow'
    },

    layout: 'hbox',
    
    items: []
});
