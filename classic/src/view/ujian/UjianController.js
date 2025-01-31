Ext.define('Admin.view.ujian.UjianController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ujian',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },
    
    onFormLoad: function(form) {
        var me = this;
        if(form.idEdit) {        
            form.getForm().load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/ujian/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    var ckeditor = me.getView().down('#ckeditor');
                    ckeditor.setValue(json['data']['penjelasan']);
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },

    onDeleteButtonClick: function(btn) {
        var grid_ujian = this.getView().down('#grid-ujian');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_ujian, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/ujian/'+grid_ujian.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_ujian.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_ujian.selModel.getSelection().length==0) page--;
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
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    },

    onSaveButtonClick: function(btn) {
        var me = this;
        var form = me.getView().down('ujian-edit');
        var ckeditor = me.getView().down('#ckeditor');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/ujian/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        penjelasan: ckeditor.getValue()
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('ujian-list', true);
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
        this.redirectTo('ujian-list', true);
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
                xtype: 'ujianwindow',
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

    getRowNumber: function(value, p, record) {
        var grid = this.getView().down('#grid-ujian'),
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    onAcakCheckChange: function(column, rowIndex, checked, eOpts) {
        
        var grid_ujian  = this.getView().down('#grid-ujian');
        var store      = grid_ujian.getStore();
        var id_ujian   = store.getAt(rowIndex).data['id'];

        //console.log(column);
        //store.getAt(rowIndex).commit();

        //var myMask = new Ext.LoadMask({target: grid_ujian, msg:'Hapus...'});
        //myMask.show();

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/ujian/'+id_ujian+'/acak',
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
                        store.getAt(rowIndex).set('acak', !checked);   
                    }
                });
            }
        });
    },
    
    onAktifCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_ujian  = this.getView().down('#grid-ujian');
        var store      = grid_ujian.getStore();
        var id_ujian   = store.getAt(rowIndex).data['id'];

        //console.log(column);
        //store.getAt(rowIndex).commit();

        //var myMask = new Ext.LoadMask({target: grid_ujian, msg:'Hapus...'});
        //myMask.show();

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/ujian/'+id_ujian+'/aktif',
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

    onAddButtonClick: function(btn) {
        this.setCurrentView('ujian-edit', {
            saveUrl: 'insert',
            title: 'Tambah Data Soal' 
        });
    },

    onEditButtonClick: function(btn) {
        var grid_ujian = this.getView().down('#grid-ujian');
        this.setCurrentView('ujian-edit', {
            saveUrl: grid_ujian.idSelect+'/update',
            idEdit: grid_ujian.idSelect,
            title: 'Edit Data Soal'  
        });
    },

    onBtnKelasUjian: function(view, rowIndex, colIndex, item, e, record, row, action) {

        this.setCurrentView('kelasujian-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                idUjian: record.data['id'],
                data: record.data
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Kelas Ujian',
                width: 640,
                height: 720
            }
        });
    },

    onCancelPilihKelasClick: function(btn) {
        var win = btn.up('window');
        if (win) {
            win.close();   
        }
    },

    onSavePilihKelasClick: function(btn) {
        
        var win  = btn.up('window');
        var form = btn.up('kelasujian-edit');
        var data = form.getDetail();

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/kelas/'+form.idUjian+'/kelasujian',
                    waitMsg: 'Simpan...',
                    params: {
                        detail: data
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            if (win) {
                                win.close();
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

    onSelectionChange: function(sm, selections) {        
        var me = this,
            grid = me.getView().down('#grid-ujian'),
            refs = me.getReferences(),
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
    }
    
});
