Ext.define('Admin.view.pilihanganda.pilihangandaController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pilihanganda',

    init: function() {
        var viewType = this.getView().viewType;
        console.log('Initial Controller Pilihan Ganda:', viewType);
        this.setCurrentView(viewType);
    },

    setCurrentView: function(view, params) {
        var me = this;
        var contentPanel = this.getView();

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
            return false;
        }
        
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

    },

    onDataViewAfterRender: function() {

    },

    onDataViewItemClick: function( dataview, record, item, index, e, eOpts  ) {
        var target = e.getTarget();
        if(target.name == 'deleteButton') {
            var pilihanganda_list = this.getView().down('pilihanganda-list');
            var grid_pilihanganda = this.getView().down('#grid-pilihanganda');
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
                if(btn=='yes') {
    
                    var myMask = new Ext.LoadMask({target: pilihanganda_list, msg:'Hapus...'});
                    myMask.show();
    
                    Ext.Ajax.request({
                        method:'GET',
                        url: './server/public/pilihanganda/'+record.data['id']+'/delete',
                        success: function(response) {
                            myMask.hide();
                            var json = Ext.JSON.decode(response.responseText);
    
                            Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                var store = grid_pilihanganda.getStore(),
                                    page  = store.currentPage;

                                if(page>1 && store.getCount()==1) page--;
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
        }

        if(target.name == 'editButton') {
            var grid_ujian = this.getView().down('#grid-ujian');
            var records    = grid_ujian.getSelection();
        
            if(records.length>0) {
                var record_ = records[0];
                this.setCurrentView('pilihanganda-edit', {
                    title: 'Edit Soal Pilihan Ganda',
                    idUjian: record_.data['id'],
                    dataUjian: record_,
                    saveUrl: record.data['id']+'/update',
                    idEdit: record.data['id']
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Pilih salah satu data ujian dahulu.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    },

    onSelectionChange: function(sm, selections) {
        var grid         = this.getView().down('#grid-pilihanganda');
        var refs         = this.getReferences(),
            delBtn       = refs.deleteButton,
            edtBtn       = refs.editButton,
            idSelect     = '',
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

    onPilihanGandaListAfterRender: function() {
        var grid_ujian = this.getView().down('#grid-ujian');
        var store      = grid_ujian.getStore();
        
        store.on('load', function(el, records, successful, operation, eOpts ) {
            if(successful) {
                if(el.data.length>0) {
                    grid_ujian.getSelectionModel().select(0, true);
                }
            }
         });
    },

    onFormLoad: function() {
        var me                = this;
        var pilihanganda_edit = this.getView().down('pilihanganda-edit');
        var form_ujian        = this.getView().down('#form-ujian');
        var form_pilihanganda = this.getView().down('#form-pilihanganda');

        form_ujian.getForm().loadRecord(pilihanganda_edit.dataUjian);
        if(pilihanganda_edit.idEdit) {
            form_pilihanganda.getForm().load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/pilihanganda/'+pilihanganda_edit.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    form_pilihanganda.down('#pertanyaan').setValue(json.data['pertanyaan']);
                    form_pilihanganda.down('#audiofile').setValue(json.data['audiofile']);
                    //form_pilihanganda.down('#docfile').setValue(json.data['docfile']);
                    form_pilihanganda.down('#kuncijawaban').setValue(json.data['kuncijawaban']);

                    form_pilihanganda.down('#pilihan_a').setValue(json.data['pilihan_a']);
                    form_pilihanganda.down('#audiofile_a').setValue(json.data['audiofile_a']);
                    //form_pilihanganda.down('#docfile_a').setValue(json.data['docfile_a']);
                    
                    form_pilihanganda.down('#pilihan_b').setValue(json.data['pilihan_b']);
                    form_pilihanganda.down('#audiofile_b').setValue(json.data['audiofile_b']);
                    //form_pilihanganda.down('#docfile_b').setValue(json.data['docfile_b']);
                    
                    form_pilihanganda.down('#pilihan_c').setValue(json.data['pilihan_c']);
                    form_pilihanganda.down('#audiofile_c').setValue(json.data['audiofile_c']);
                    //form_pilihanganda.down('#docfile_c').setValue(json.data['docfile_c']);
                    
                    form_pilihanganda.down('#pilihan_d').setValue(json.data['pilihan_d']);
                    form_pilihanganda.down('#audiofile_d').setValue(json.data['audiofile_d']);
                    //form_pilihanganda.down('#docfile_d').setValue(json.data['docfile_d']);
                    
                    form_pilihanganda.down('#pilihan_e').setValue(json.data['pilihan_e']);
                    form_pilihanganda.down('#audiofile_e').setValue(json.data['audiofile_e']);
                    //form_pilihanganda.down('#docfile_e').setValue(json.data['docfile_e']);

                    form_pilihanganda.down('#pembahasan').setValue(json.data['pembahasan']);
                    form_pilihanganda.down('#audiofile_pembahasan').setValue(json.data['audiofile_pembahasan']);
                    //form_pilihanganda.down('#docfile_pembahasan').setValue(json.data['docfile_pembahasan']);

                    
                    me.fireEvent('goontop');
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn : function(buttonValue, inputText, showConfig) {
                            me.setCurrentView('pilihanganda-list');
                        }
                    });
                }
            });
        }
    },

    getRowNumberGridUjian: function(value, meta, record) {
        var grid  = this.getView().down('#grid-ujian');
        var store = grid.getStore();
        var page  = store.currentPage;
        var index = store.indexOf(record);
        var limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    getRowNumberGridPilihanGanda: function(value, meta, record) {
        var grid  = this.getView().down('#grid-pilihanganda');
        var store = grid.getStore();
        var page  = store.currentPage;
        var index = store.indexOf(record);
        var limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    renderSoalPilihanGanda: function(value, meta, record) {
        var grid  = this.getView().down('#grid-pilihanganda');
        var store = grid.getStore();
        var page  = store.currentPage;
        var index = store.indexOf(record);
        var limit = store.pageSize;
        var no = ((page-1)*limit)+index+1;

        page = 
            '<div class="soal">' +
                '<ol start="'+no+'" type="1">' +
                    '<li>' + record.data.pertanyaan + '</li>' +
                '</ol>' +
                '<ol start="1" type="A">' +
                    '<li>'+record.data.pilihan_a+'</li>' +
                    '<li>'+record.data.pilihan_b+'</li>' +
                    '<li>'+record.data.pilihan_c+'</li>' +
                    '<li>'+record.data.pilihan_d+'</li>' +
                    '<li>'+record.data.pilihan_e+'</li>' +
                '</ol>' +
            '</div>';
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

        return page;
    },
    
    onGridUjianSelectionChange: function( el, selected, eOpts )  {
        var grid_pilihanganda = this.getView().down('#grid-pilihanganda');
        var store             = grid_pilihanganda.getStore();
        var proxy             = store.getProxy();

        proxy.extraParams['id_ujian'] = selected[0].data['id'];
        store.loadPage(1);
    },

    onAddButtonClick: function(btn) {
        var grid_ujian = this.getView().down('#grid-ujian');
        var records    = grid_ujian.getSelection();
        
        if(records.length>0) {
            var record = records[0];
            this.setCurrentView('pilihanganda-edit', {
                title: 'Tambah Soal Pilihan Ganda',
                saveUrl: 'insert',
                idUjian: record.data['id'],
                dataUjian: record
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Pilih salah satu data ujian dahulu.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    onEditButtonClick: function(btn) {
        var grid_pilihanganda = this.getView().down('#grid-pilihanganda');
        var grid_ujian        = this.getView().down('#grid-ujian');
        var records           = grid_ujian.getSelection();
        
        if(records.length>0) {
            var record = records[0];
            this.setCurrentView('pilihanganda-edit', {
                title: 'Edit Soal Pilihan Ganda',
                idUjian: record.data['id'],
                dataUjian: record,
                saveUrl: grid_pilihanganda.idSelect+'/update',
                idEdit: grid_pilihanganda.idSelect
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Pilih salah satu data ujian dahulu.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    onDeleteButtonClick: function(btn) {
        var grid_pilihanganda = this.getView().down('#grid-pilihanganda');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_pilihanganda, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/pilihanganda/'+grid_pilihanganda.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_pilihanganda.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_pilihanganda.selModel.getSelection().length==0) page--;
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

    onCancelButtonClick: function(btn) {
        this.setCurrentView('pilihanganda-list');
    },

    onSaveButtonClick: function(btn) {
        var me                   = this;
        var pilihanganda_edit    = this.getView().down('pilihanganda-edit');
        var form_pilihanganda    = this.getView().down('#form-pilihanganda');
        var pertanyaan           = form_pilihanganda.down('#pertanyaan');
        var audiofile            = form_pilihanganda.down('#audiofile');
        //var docfile              = form_pilihanganda.down('#docfile');
        var kuncijawaban         = form_pilihanganda.down('#kuncijawaban');
        var pilihan_a            = form_pilihanganda.down('#pilihan_a');
        var audiofile_a          = form_pilihanganda.down('#audiofile_a');
        //var docfile_a            = form_pilihanganda.down('#docfile_a');
        var pilihan_b            = form_pilihanganda.down('#pilihan_b');
        var audiofile_b          = form_pilihanganda.down('#audiofile_b');
        //var docfile_b            = form_pilihanganda.down('#docfile_b');
        var pilihan_c            = form_pilihanganda.down('#pilihan_c');
        var audiofile_c          = form_pilihanganda.down('#audiofile_c');
        //var docfile_c            = form_pilihanganda.down('#docfile_c');
        var pilihan_d            = form_pilihanganda.down('#pilihan_d');
        var audiofile_d          = form_pilihanganda.down('#audiofile_d');
        //var docfile_d            = form_pilihanganda.down('#docfile_d');
        var pilihan_e            = form_pilihanganda.down('#pilihan_e');
        var audiofile_e          = form_pilihanganda.down('#audiofile_e');
        //var docfile_e            = form_pilihanganda.down('#docfile_e');
        var pembahasan           = form_pilihanganda.down('#pembahasan');
        var audiofile_pembahasan = form_pilihanganda.down('#audiofile_pembahasan');
        //var docfile_pembahasan   = form_pilihanganda.down('#docfile_pembahasan');

        if(!form_pilihanganda.getForm().isValid()) {
            Ext.MessageBox.show({
                title: 'Gagal',
                msg: 'Kunci Jawaban belum diisi.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            })

            return;
        }
        
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form_pilihanganda.getForm().waitMsgTarget = pilihanganda_edit.getEl();
                form_pilihanganda.getForm().submit({
                    method:'POST',
                    url: './server/public/pilihanganda/'+pilihanganda_edit.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        id_ujian             : pilihanganda_edit.idUjian,
                        pertanyaan           : pertanyaan.getValue(),
                        audiofile            : audiofile.getValue(),
                        //docfile              : docfile.getValue(),
                        kuncijawaban         : kuncijawaban.getValue(),
                        pilihan_a            : pilihan_a.getValue(),
                        audiofile_a          : audiofile_a.getValue(),
                        //docfile_a            : docfile_a.getValue(),
                        pilihan_b            : pilihan_b.getValue(),
                        audiofile_b          : audiofile_b.getValue(),
                        //docfile_b            : docfile_b.getValue(),
                        pilihan_c            : pilihan_c.getValue(),
                        audiofile_c          : audiofile_c.getValue(),
                        //docfile_c            : docfile_c.getValue(),
                        pilihan_d            : pilihan_d.getValue(),
                        audiofile_d          : audiofile_d.getValue(),
                        //docfile_d            : docfile_d.getValue(),
                        pilihan_e            : pilihan_e.getValue(),
                        audiofile_e          : audiofile_e.getValue(),
                        //docfile_e            : docfile_e.getValue(),
                        pembahasan           : pembahasan.getValue(),
                        audiofile_pembahasan : audiofile_pembahasan.getValue(),
                        //docfile_pembahasan   : docfile_pembahasan.getValue()
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.setCurrentView('pilihanganda-list');
                        });
                    },
                    failure:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    }
});
