Ext.define('Admin.view.document.DocumentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.documents',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'documents-list',
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
        var linkfile = form.down('#linkfile');
        var file     = form.down('[name=file]');

        if(form.idEdit>0) {
            form.load({
                method: 'GET',
                url: './server/public/document/'+form.idEdit+'/load',
                success: function (frm, action) {
                    //console.log(action.data);
                    form.setValues(action.data);

                    file.setRequired(false); 
                    linkfile.setHtml('<a href="./server/public/uploads/documents/'+action.data['docfile']+'" target="_blank">'+action.data['docfile']+'</a>');
                    linkfile.setHidden(false);
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
                xtype:'documents-edit',
                idEdit: 0,
                saveUrl: 'insert',
                title: 'Tambah Dokumen',
                flex: 1
            });
        }, 100);
    },

    onSave: function(btn) {
        var me   = this;
        var form = me.getView().down('documents-edit');
        var tanggal = form.down('[name=tanggal]');
        var get_aktif = form.down('[name=aktif]');

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses simpan data?',
                function(choice) {
                    if (choice === 'yes') {
                        form.submit({
                            method:'POST',
                            url: './server/public/document/'+form.saveUrl,
                            waitMsg: 'Simpan...',
                            params: {
                                tanggal: Ext.Date.format(tanggal.getValue(),'Y-m-d'),
                                is_aktif: get_aktif.getChecked()?1:0
                            },
                            success:function(frm, response) {
                                Ext.Msg.alert(response['error']?'Gagal':'Sukses', response['message'], function(btn, text) {
                                    if(!response['error']) me.onShow();
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
                    xtype:'documents-edit',
                    idEdit: data['id'],
                    saveUrl: data['id']+'/update',
                    title: 'Edit Dokumen',
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
        }else
        if(target.name=='checkbox-aktif') {
            this.onActive(target, data['id']);
        }
    },
    
    onActive: function(target, id_ujian) {
        //console.log(target.checked);
        var checked = !target.checked;
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/document/'+id_ujian+'/aktif',
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

    onDelete: function(id_document) {
        var me = this;
        Ext.Ajax.request({
            method:'GET',
            url: './server/public/document/'+id_document+'/delete',
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
