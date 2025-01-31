Ext.define('Admin.view.tahunpelajaran.TahunPelajaranController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tahunpelajaran',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },

    onLoadData: function(form) {
        var win = form.up('window');
        if(form.idEdit) {
            form.getForm().load({
                waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/tahunpelajaran/'+form.idEdit+'/load',
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

    onAktifButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('gridpanel');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk set default data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: gridpanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/tahunpelajaran/'+gridpanel.idSelect+'/active',
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
        
        var gridpanel = this.getView().down('gridpanel');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: gridpanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/tahunpelajaran/'+gridpanel.idSelect+'/delete',
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
        var form = btn.up('tahunpelajaran-edit');
        var win  = btn.up('window');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/tahunpelajaran/'+form.saveUrl,
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
                xtype: 'tahunpelajaranwindow',
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

    getRowNumber: function(value, p, record) {
        var me = this,
            refs = me.getReferences(),
            grid = refs.tahunpelajarangridpanel,
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    semesterRender: function(value, p, record) {
        return 'Semester '+ value;
    },

    statusRender: function(value, meta, record) {
        if(value==1) {
            meta.style = "color: white; font-weight: bold; background-color: green;";    
        } else {
            meta.style = "color: white; font-weight: bold; background-color: lightgrey;";    
        }

        return 'Default';
    },
    
    onAddButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('gridpanel'); 
        this.setCurrentView('tahunpelajaran-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: 'insert',
                grid: gridpanel
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Tambah Data Tahun Pelajaran',
                width: 400,
                height: 350
            }
        });
    },

    onEditButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('gridpanel'); 
        this.setCurrentView('tahunpelajaran-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                saveUrl: gridpanel.idSelect+'/update',
                grid: gridpanel,
                idEdit: gridpanel.idSelect
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Edit Data Tahun Pelajaran',
                width: 400,
                height: 350
            }
        });
    },

    onSelectionChange: function(sm, selections) {
                  
        var me = this,
            refs = me.getReferences(),
            grid = refs.tahunpelajarangridpanel,
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
        actBtn.setDisabled(selections.length != 1);
        grid.idSelect = idSelect;
    }
    
});
