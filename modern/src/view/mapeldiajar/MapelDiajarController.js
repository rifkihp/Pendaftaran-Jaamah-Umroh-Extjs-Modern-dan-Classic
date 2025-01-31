Ext.define('Admin.view.mapeldiajar.MapelDiajarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mapeldiajar',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'mapeldiajar-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);

        store.load({
            params: {id_guru: data[0]['id_tipe_user']}
        });
    }
});
