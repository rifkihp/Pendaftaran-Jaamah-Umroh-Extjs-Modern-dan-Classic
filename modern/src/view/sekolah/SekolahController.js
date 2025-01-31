Ext.define('Admin.view.sekolah.SekolahController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sekolah',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'sekolah-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var user     = JSON.parse(localStorage.getItem('m_user'))[0],
            addBtn   = panel.down('#addBtn'),
            dataview = panel.down('dataview'),
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
                url: './server/public/sekolah/'+form.idEdit+'/load',
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

    onAddButton: function(btn) {
        var me     = this,
            view   = me.getView();
        
        setTimeout(function() {
            view.removeAll();    
            view.add({
                xtype:'sekolah-edit',
                idEdit: 0,
                saveUrl: 'insert',
                title: 'Tambah Sekolah',
                flex: 1
            });
        }, 100);
    },

    onSave: function(btn) {
        var me   = this;
        var form = me.getView().down('sekolah-edit');
        var tanggal = form.down('[name=tgl_berdiri]');
        var get_aktif = form.down('[name=aktif]');

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses simpan data?',
                function(choice) {
                    if (choice === 'yes') {
                        form.waitMsgTarget = me.getView();
                        form.submit({
                            method:'POST',
                            url: './server/public/sekolah/'+form.saveUrl,
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
                    xtype:'sekolah-edit',
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
        }
    },
    
    onActive: function(target, id_ujian) {
        //console.log(target.checked);
        var checked = !target.checked;
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/sekolah/'+id_ujian+'/aktif',
            params: {
                status: checked?1:0
            },
            success: function(response) {
            },

            failure: function(response) {
                target.checked = !target.checked;
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
        
    },

    onProvinceSelect: function(combobox, record) {
        var me                = this,
            city              = me.getView().down('#city'),
            subdistrict       = me.getView().down('#subdistrict'),
            store_city        = city.getStore(),
            store_subdistrict = subdistrict.getStore();

        console.log('province select!');
        store_city.load({
            params: {province_id: record.data['province_id']},
            callback: function(records, operation, success) {
                
            }
        });
        
        if(me.setCity) {
            me.setCity = !me.setCity;
            return;
        }

        city.reset();
        store_subdistrict.removeAll();
        subdistrict.reset();
    },
    
    onCitySelect: function(combobox, record) {
        var me                = this,
            subdistrict       = me.getView().down('#subdistrict'),
            store_subdistrict = subdistrict.getStore();

        console.log('city select!');
        store_subdistrict.load({
            params: {city_id: record.data['city_id']},
            callback: function(records, operation, success) {
                
            }
        });

        if(me.setSubdistrict) {
            me.setSubdistrict = !me.setSubdistrict;
            return;
        }

        subdistrict.reset();
    },

    onDelete: function(id_sekolah) {
        var me = this;
        Ext.Ajax.request({
            method:'GET',
            url: './server/public/sekolah/'+id_sekolah+'/delete',
            success: function(response) {
                me.onLoadList();
            },

            failure: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
    },
});
