Ext.define('Admin.view.guru.ProfilController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.guru-profil',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();
        
        view.removeAll();
        view.add({
            xtype: 'guru-profil-view',
            flex: 1
        });
    },

    onLoadView: function ( panel, container, index, eOpts ) {
        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore(),
            proxy    = store.getProxy();

        proxy.extraParams['id_user'] = data[0]['id'];
        store.loadPage(1);
    },
    
    onLoadEdit: function ( form, container, index, eOpts ) {
        form.load({
            method: 'GET',
            url: './server/public/guru/'+form.idEdit+'/load',
            success: function (frm, action) {
                console.log(action.data);
                form.setValues(action.data);
            },
            failure: function (frm, action) {
                var json = Ext.JSON.decode(action.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
    },

    onSave: function(btn) {
        var me   = this;
        var form = me.getView().down('guru-profil-edit');
        var tanggal = form.down('[name=tanggal_lahir]'); 
        //console.log(Ext.Date.format(tanggal.getValue(),'Y-m-d'));

        if(!form.isValid()) return;
        Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses simpan data?',
            function(choice) {
                if (choice === 'yes') {
                    form.waitMsgTarget = me.getView();
                    form.submit({
                        method:'POST',
                        url: './server/public/guru/'+form.idEdit+'/update',
                        waitMsg: 'Simpan...',
                        params: {
                            tanggal_lahir: Ext.Date.format(tanggal.getValue(),'Y-m-d')
                        },
                        success:function(frm, json) {
                            //var json = Ext.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                me.onShow();
                            });
                        },
                        failure:function(frm, action) {
                            var json = Ext.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Error', json['message']);
                        }
                    });
                }
            }, 
            this
        );
    },

    onSelect: function (dataview, record) {
        var me = this,
            view = me.getView();
            
        view.removeAll();
        view.add({
            xtype: 'guru-profil-edit',
            idEdit: record.data['id'],
            flex: 1
        });
        
    }
});
