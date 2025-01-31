Ext.define('Admin.view.sekolah.SekolahController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sekolah',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },

    onLoadData: function(form) {
        var win = form.up('window');

        if(form.idEdit>0) {    
            form.getForm().load({
                waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/sekolah/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    
                    var city              = form.down('#city'),
                        subdistrict       = form.down('#subdistrict'),
                        store_city        = city.getStore(),
                        store_subdistrict = subdistrict.getStore();

                    store_city.load({
                        params: {province_id: json.data['province']}
                    });

                    store_subdistrict.load({
                        params: {city_id: json.data['city']}
                    });
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn : function(buttonValue, inputText, showConfig) {
                            if (win) {
                                win.close();
                            }
                        }
                    });
                }
            });
        }
    },

    onAktifButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('gridpanel');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk set default data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: gridpanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/sekolah/'+gridpanel.idSelect+'/active',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = gridpanel.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-gridpanel.selModel.getSelection().length==0) page--;
                            store.loadPage(page);
                        });
                    },

                    failure: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn : function(buttonValue, inputText, showConfig) {

                            }
                        });
                    }
                });
            }
        });
    },

    onDeleteButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('sekolah-list');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: gridpanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/sekolah/'+gridpanel.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = gridpanel.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-gridpanel.selModel.getSelection().length==0) page--;
                            store.loadPage(page);
                        });
                    },

                    failure: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn : function(buttonValue, inputText, showConfig) {

                            }
                        });
                    }
                });
            }
        });
    },

    onSaveButtonClick: function(btn) {
        var form = btn.up('sekolah-edit');
        var win  = btn.up('window');
        var tgl_berdiri = form.down('[name=tgl_berdiri]');
        var get_aktif = form.down('[name=aktif]');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/sekolah/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        tanggal_berdiri: tgl_berdiri.getSubmitValue(),
                        is_aktif: get_aktif.getSubmitValue()

                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            if (win) {
                                win.close();
                                form.grid.getStore().loadPage(1);
                            }
                        });
                    },
                    failure:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });
            }
        });
    },

    onCancelButtonClick: function(btn) {
        var win = btn.up('window');
        if (win) {
            win.close();
            
        }
    },

    setCurrentView: function(view, params) {
        var me = this;
        var contentPanel = this.getView().down('#contentPanel');

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)){
            return false;
        }

        if (params && params.openWindow) {
            var cfg = Ext.apply({
                xtype: 'sekolahwindow',
                items: [
                    Ext.apply({
                        xtype: view
                    }, params.targetCfg)
                ]
            }, params.windowCfg);

            Ext.create(cfg);
        } else {
            Ext.suspendLayouts();

            contentPanel.removeAll(true);
            contentPanel.add(
                Ext.apply({
                    xtype: view
                }, params)
            );

            Ext.resumeLayouts(true);
            me.fireEvent('goontop');
        }
    },

    onAktifCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_sekolah = this.getView().down('sekolah-list');
        var store        = grid_sekolah.getStore();
        var id_sekolah   = store.getAt(rowIndex).data['id'];

        //console.log(column);
        //store.getAt(rowIndex).commit();

        //var myMask = new Ext.LoadMask({target: grid_sekolah, msg:'Hapus...'});
        //myMask.show();

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/sekolah/'+id_sekolah+'/aktif',
            params: {
                status: checked?1:0
            },
            success: function(response) {
                //myMask.hide();
                store.getAt(rowIndex).commit();
            },

            failure: function(response) {
                //myMask.hide();
                var json = Ext.JSON.decode(response.responseText);

                Ext.MessageBox.show({
                    title: 'Error',
                    msg: json['message'],
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn : function(buttonValue, inputText, showConfig) {
                        store.getAt(rowIndex).set('aktif', !checked);   
                    }
                });
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
        subdistrict.reset();
    },

    getRowNumber: function(value, p, record) {
        var me = this,
            grid = me.getView().down('sekolah-list'),
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },
    
    onAddButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('sekolah-list');
        this.setCurrentView('sekolah-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: 'insert',
                grid: gridpanel,
                idEdit: 0
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Tambah Sekolah',
                width: 500,
                height: 650
            }
        });
    },

    onEditButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('sekolah-list');
        this.setCurrentView('sekolah-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: gridpanel.idSelect+'/update',
                grid: gridpanel,
                idEdit: gridpanel.idSelect
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Edit Sekolah',
                width: 500,
                height: 650
            }
        });
    },

    onSelectionChange: function(sm, selections) {
                  
        var me = this,
            grid = me.getView().down('sekolah-list'),
            refs = me.getReferences(),
            delBtn = refs.deleteButton,
            edtBtn = refs.editButton,
            actBtn = refs.aktifButton,
            idSelect = '',
            recordSelect = null;

        for(var i=0; i<sm.getSelection().length; i++) {
            idSelect+=(idSelect!=''?',':'') + sm.getSelection()[i].data['id'];
        }

        if(sm.getSelection().length==1) {
            recordSelect = sm.getSelection()[0];
        }

        delBtn.setDisabled(selections.length == 0);
        edtBtn.setDisabled(selections.length != 1);
        grid.idSelect = idSelect;
    }
    
});
