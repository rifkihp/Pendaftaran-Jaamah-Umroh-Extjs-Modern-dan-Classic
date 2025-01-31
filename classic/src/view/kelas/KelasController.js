Ext.define('Admin.view.kelas.KelasController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.kelas',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        this.setCurrentView(viewType);
    },

    /*onKelasListAfterRender: function() {
        var grid_kelas = this.getView().down('#grid-kelas');
        var store      = grid_kelas.getStore();
        
        store.on('load', function(el, records, successful, operation, eOpts ) {
            if(successful) {
                if(el.data.length>0) {
                    grid_kelas.getSelectionModel().select(0, true);
                }
            }
         });
    },*/

    onLoadData: function(form) {
        var win = form.up('window');
        if(form.idEdit) {
            form.getForm().load({
                waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/kelas/'+form.idEdit+'/load',
                success: function (frm, action) {

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

    onRuangLoadData: function(form) {
        var win = form.up('window');
        if(form.idEdit) {
            form.getForm().load({
                waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/ruang/'+form.idEdit+'/load',
                success: function (form, action) {

                },
                failure: function (form, action) {
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

    onDeleteButtonClick: function(btn) {
        
        var grid_kelas = this.getView().down('#grid-kelas');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_kelas, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/kelas/'+grid_kelas.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_kelas.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_kelas.selModel.getSelection().length==0) page--;
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

    onRuangDeleteButtonClick: function(btn) {
        
        var grid_ruang = this.getView().down('#grid-ruang');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_ruang, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/ruang/'+grid_ruang.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_ruang.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_ruang.selModel.getSelection().length==0) page--;
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
        var form = btn.up('kelas-edit');
        var win  = btn.up('window');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/kelas/'+form.saveUrl,
                    waitMsg: 'Simpan...',
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

    onRuangSaveButtonClick: function(btn) {
        var form = btn.up('ruang-edit');
        var win  = btn.up('window');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/ruang/'+form.saveUrl,
                    waitMsg: 'Simpan...',
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

    onRuangCancelButtonClick: function(btn) {
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
                xtype: 'kelaswindow',
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
                    xtype: view,
                    flex: 1
                }, params)
            );

            Ext.resumeLayouts(true);
            me.fireEvent('goontop');
        }
    },

    getRowNumberListKelas: function(value, p, record) {
        var grid = this.getView().down('#grid-kelas'),
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    getRowNumberListRuang: function(value, p, record) {
        var grid = this.getView().down('#grid-ruang'),
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    onAddButtonClick: function(btn) {
        
        var grid_kelas = this.getView().down('#grid-kelas'); 
        this.setCurrentView('kelas-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: 'insert',
                grid: grid_kelas
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Tambah Kelas',
                width: 500,
                height: 350
            }
        });
    },

    onEditButtonClick: function(btn) {
        
        var grid_kelas = this.getView().down('#grid-kelas'); 
        this.setCurrentView('kelas-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: grid_kelas.idSelect+'/update',
                grid: grid_kelas,
                idEdit: grid_kelas.idSelect
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Edit Kelas',
                width: 500,
                height: 350
            }
        });
    },

    onRuangAddButtonClick: function(btn) {
        
        var grid_ruang = this.getView().down('#grid-ruang'); 
        this.setCurrentView('ruang-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: 'insert',
                grid: grid_ruang
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Tambah Ruang',
                width: 600,
                height: 500
            }
        });
    },

    onRuangEditButtonClick: function(btn) {
        
        var grid_ruang = this.getView().down('#grid-ruang');
        this.setCurrentView('ruang-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: grid_ruang.idSelect+'/update',
                grid: grid_ruang,
                idEdit: grid_ruang.idSelect
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Edit Ruang',
                width: 600,
                height: 500
            }
        });
    },

    onSelectionChange: function(sm, selections) {
        var me     = this,
            grid   = me.getView().down('#grid-kelas')
            refs   = me.getReferences(),
            delBtn = refs.deleteButton,
            edtBtn = refs.editButton,
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
    },

    onRuangSelectionChange: function(sm, selections) {
        var me     = this,
            grid   = me.getView().down('#grid-ruang')
            refs   = me.getReferences(),
            delBtn = refs.ruangDeleteButton,
            edtBtn = refs.ruangEditButton,
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
    },

    onPilihKelasSelect: function(combo, record, e) {
        var me = this,
            grid = me.getView().down('#grid-ruang'),
            refs = me.getReferences(),
            resetBtn = refs.resetButton,
            store = grid.getStore(),
            proxy = store.getProxy();

        resetBtn.setDisabled(false);
        proxy.extraParams['id_kelas'] = record.data['id'];
        store.loadPage(1);
    },

    onResetButtonClick: function(btn) {
        var me = this,
            grid = me.getView().down('#grid-ruang'),
            refs = me.getReferences(),
            pilihKelasCombo = refs.pilihKelasCombo,
            resetBtn = refs.resetButton,
            store = grid.getStore(),
            proxy = store.getProxy();

        resetBtn.setDisabled(true);
        pilihKelasCombo.setValue();
        proxy.extraParams['id_kelas'] = '';
        store.loadPage(1);
    } /*,

    onGridKelasSelectionChange: function( el, selected, eOpts )  {
        
        if(selected && selected[0]) {
            var grid_essai = this.getView().down('#grid-kelas');
            var store      = grid_essai.getStore();
            var proxy      = store.getProxy();

            proxy.extraParams['id_kelas'] = selected[0].data['id'];
            store.loadPage(1);
        }
    }*/
    
});
