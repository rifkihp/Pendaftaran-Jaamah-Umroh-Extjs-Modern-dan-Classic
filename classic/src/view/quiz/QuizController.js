Ext.define('Admin.view.quiz.QuizController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.quiz',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },

    onViewLoad: function(form) {
        var dataview = form.down('#dataview-quiz');
        var store    = dataview.getStore();

        //console.log(form.datarecord);
        store.loadRecords(form.datarecord);
        store.loadRecords(form.datarecord);
    },
    
    onFormLoad: function(form) {
        var me = this;
        if(form.idEdit) {        
            form.getForm().load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/quiz/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    var view      = me.getView();
                    var ckeditor  = view.down('#ckeditor');
                    var audiofile = view.down('#audiofile');
                    var docfile   = view.down('#docfile');

                    var pembahasan           = view.down('#pembahasan');
                    var audiofile_pembahasan = view.down('#audiofile_pembahasan');
                    var docfile_pembahasan   = view.down('#docfile_pembahasan');

                    ckeditor.setValue(json['data']['soal']);
                    audiofile.setValue(json['data']['audiofile']);
                    docfile.setValue(json['data']['docfile']);

                    pembahasan.setValue(json.data['pembahasan']);
                    audiofile_pembahasan.setValue(json.data['audiofile_pembahasan']);
                    docfile_pembahasan.setValue(json.data['docfile_pembahasan']);
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
        var grid_quiz = this.getView().down('#grid-quiz');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_quiz, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/quiz/'+grid_quiz.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_quiz.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_quiz.selModel.getSelection().length==0) page--;
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
        var form      = view.down('quiz-edit');

        var ckeditor  = view.down('#ckeditor');
        var audiofile = view.down('#audiofile');
        var docfile   = view.down('#docfile');

        var pembahasan           = view.down('#pembahasan');
        var audiofile_pembahasan = view.down('#audiofile_pembahasan');
        var docfile_pembahasan   = view.down('#docfile_pembahasan');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/quiz/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        soal      : ckeditor.getValue(),
                        audiofile : audiofile.getValue(),
                        docfile   : docfile.getValue(),

                        pembahasan           : pembahasan.getValue(),
                        audiofile_pembahasan : audiofile_pembahasan.getValue(),
                        docfile_pembahasan   : docfile_pembahasan.getValue()
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('quiz-list', true);
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
        this.redirectTo('quiz-list', true);
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
                xtype: 'quizwindow',
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
        var grid = this.getView().down('#grid-quiz'),
            store = grid.getStore()
            page = store.currentPage,
            index = store.indexOf(record),
            limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    onAktifCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_quiz  = this.getView().down('#grid-quiz');
        var store      = grid_quiz.getStore();
        var id_quiz   = store.getAt(rowIndex).data['id'];

        //console.log(column);
        //store.getAt(rowIndex).commit();

        //var myMask = new Ext.LoadMask({target: grid_quiz, msg:'Hapus...'});
        //myMask.show();

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/quiz/'+id_quiz+'/aktif',
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
        this.setCurrentView('quiz-edit', {
            saveUrl: 'insert',
            title: 'Tambah Quiz / PR',
        });
    },

    onEditButtonClick: function(btn) {
        var grid_quiz = this.getView().down('#grid-quiz');
        this.setCurrentView('quiz-edit', {
            saveUrl: grid_quiz.idSelect+'/update',
            idEdit: grid_quiz.idSelect,
            title: 'Edit Quiz / PR' 
        });
    },

    onBtnKelasQuiz: function(view, rowIndex, colIndex, item, e, record, row, action) {

        this.setCurrentView('kelasquiz-edit', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                idQuiz: record.data['id'],
                data: record.data
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Kelas Quiz',
                width: 640,
                height: 720
            }
        });
    },

    onBtnViewQuiz: function(view, rowIndex, colIndex, item, e, record, row, action) {

        this.setCurrentView('quiz-view', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                datarecord: record
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'View Quiz / PR',
                width: 900,
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

    onCloseViewQuizClick: function(btn) {
        var win = btn.up('window');
        if (win) {
            win.close();   
        }
    },

    onSavePilihKelasClick: function(btn) {
        
        var win  = btn.up('window');
        var form = btn.up('kelasquiz-edit');
        var data = form.getDetail();

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/kelas/'+form.idQuiz+'/kelasquiz',
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
            grid = me.getView().down('#grid-quiz'),
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
