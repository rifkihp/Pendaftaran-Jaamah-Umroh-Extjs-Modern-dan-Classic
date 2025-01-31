Ext.define('Admin.view.document.DocumentController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.document',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        //console.log(viewType);
        this.setCurrentView(viewType);
    },

    onViewLoad: function(form) {
        var tanggal  = form.down('[name=tgl]');
        var dataview = form.down('#dataview-document');
        var store    = dataview.getStore();

        store.loadRecords(form.datarecord);
        tanggal.setValue(form.datarecord.data['tgl']);
    },

    onFormLoad: function(form) {
        var me = this;
        if(form.idEdit) {        
            form.getForm().load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/document/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json    = Ext.JSON.decode(action.response.responseText);
                    var view    = me.getView();
                    var docfile = view.down('#docfile');

                    docfile.setValue(json['data']['docfile']);
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
        var grid_document = this.getView().down('#grid-document');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_document, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/document/'+grid_document.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_document.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_document.selModel.getSelection().length==0) page--;
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
        var me        = this;
        var view      = me.getView();
        var form      = view.down('document-edit');
        var docfile   = view.down('#docfile');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/document/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        docfile   : docfile.getValue(),
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('document-list', true);
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
        this.redirectTo('document-list', true);
    },

    onBtnViewDocument: function(view, rowIndex, colIndex, item, e, record, row, action) {
        this.setCurrentView('document-view', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                datarecord: record
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Detail Document',
                width: 900,
                height: 400
            }
        });
    },


    onAktifCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_document = this.getView().down('#grid-document');
        var store          = grid_document.getStore();
        var id_document   = store.getAt(rowIndex).data['id'];

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/document/'+id_document+'/aktif',
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
    
    onCloseViewDocumentClick: function(btn) {
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
                xtype: 'documentwindow',
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

    onAddButtonClick: function(btn) {
        
        this.setCurrentView('document-edit', {
            saveUrl: 'insert',
            title: 'Tambah Document',
        });
    },

    onEditButtonClick: function(btn) {
        var grid_document = this.getView().down('#grid-document');
        this.setCurrentView('document-edit', {
            saveUrl: grid_document.idSelect+'/update',
            idEdit: grid_document.idSelect,
            title: 'Edit Document' 
        });
    },

    onSelectionChange: function(sm, selections) {        
        var me = this,
            grid = me.getView().down('#grid-document'),
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
