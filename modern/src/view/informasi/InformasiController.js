Ext.define('Admin.view.informasi.InformasiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.informasi',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'informasi-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var user     = JSON.parse(localStorage.getItem('m_user'))[0],
            addBtn   = panel.down('#addBtn'),
            dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        store.load();        
        addBtn.setHidden(user['tipe_user']>2);
    },
    
    onLoadEdit: function ( form, container, index, eOpts ) {
        var me = this;
        me.setCity = me.setSubdistrict = form.idEdit>0;
        
        if(form.idEdit>0) {
            form.load({
                method: 'GET',
                url: './server/public/informasi/'+form.idEdit+'/load',
                success: function (frm, action) {
                    //console.log(action.data);
                    form.setValues(action.data);
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.responseText);
                    Ext.Msg.alert('Error', json['message']);
                }
            });
        }
    },

    onLoadView: function ( panel, container, index, eOpts ) {
        var dataview = panel.down('dataview');
        var store = dataview.getStore();
        store.loadRecords(panel.datarec);
    },

    onAddButton: function(btn) {
        var me     = this,
            view   = me.getView();
        
        setTimeout(function() {
            view.removeAll();    
            view.add({
                xtype:'informasi-edit',
                idEdit: 0,
                saveUrl: 'insert',
                title: 'Tambah Sekolah',
                flex: 1
            });
        }, 100);
    },

    onSave: function(btn) {
        var me   = this;
        var form = me.getView().down('informasi-edit');
        var tanggal = form.down('[name=tgl_berdiri]');
        var get_aktif = form.down('[name=aktif]');

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses simpan data?',
                function(choice) {
                    if (choice === 'yes') {
                        form.waitMsgTarget = me.getView();
                        form.submit({
                            method:'POST',
                            url: './server/public/informasi/'+form.saveUrl,
                            waitMsg: 'Simpan...',
                            params: {
                                tanggal_berdiri: Ext.Date.format(tanggal.getValue(),'Y-m-d'),
                                is_aktif: get_aktif.getChecked()?1:0
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
        }
    },

    onSelect: function( dataview, location, eOpts ) {
        var me     = this,
            target = location.source.target,
            data   = location.record.data,
            view   = me.getView();
        
        if(target.name=='edit') {
            setTimeout(function() {
                view.removeAll();    
                view.add({
                    xtype:'informasi-edit',
                    idEdit: data['id'],
                    saveUrl: data['id']+'/update',
                    title: 'Edit Sekolah',
                    flex: 1
                });
            }, 100);
        } else 
        if(target.name=='delete') {
            Ext.Msg.confirm('Delete', 'Yakin untuk hapus data yang dipilih?',
            function(choice) {
                console.log(choice);
                if (choice === 'yes') {
                    me.onDelete(data['id']);
                }
            }, this);
        } else
        if(target.name=='checkbox-aktif') {
            this.onActive(target, data['id']);
        } else {
            view.removeAll();
            view.add({
                xtype: 'informasi-view',
                datarec: location.record,
                flex: 1
            });
        }    
    }
});
