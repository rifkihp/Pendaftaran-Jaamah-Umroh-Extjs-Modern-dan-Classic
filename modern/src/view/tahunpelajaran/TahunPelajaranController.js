Ext.define('Admin.view.tahunpelajaran.TahunPelajaranController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tahunpelajaran',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'tahunpelajaran-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        store.loadPage(1);
    }
    
});
