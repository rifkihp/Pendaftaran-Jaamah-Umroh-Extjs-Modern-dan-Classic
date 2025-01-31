Ext.define('Admin.view.ujian.UjianController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ujian',

    requires: [
        'Ext.util.TaskRunner'
    ],

    SubmitOnProgress: false,

    oldJawaban: '',
    newJawaban: '',
    id_absen: 0,

    clearChartUpdates : function() {
        console.log('onDestroy!');
        this.runner = Ext.destroy(this.runner);
    },

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();
            viewType = view.viewType;

        me.fireEvent('hiddenToolbar', false);
        view.removeAll();
        view.add({
            xtype: viewType,
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);
        var me = this;
        
        store.load({
            params: {id_tipe_user: data[0]['id_tipe_user']},
            callback: function(records, operation, success) {
                
                if(!me.runner) {
                    me.runner = new Ext.util.TaskRunner();
                    me.task3 = me.runner.newTask({
                        run: function() { 
                            
                            me.task3.stop();
                            console.log('stop');
                    
                            Ext.Ajax.request({
                                method:'GET',
                                params: {id_tipe_user: data[0]['id_tipe_user']},
                                url: './server/public/ujian/aktif',
                                success: function(response) {
                                
                                    console.log('checking data and do it again.');
                                    var json = Ext.JSON.decode(response.responseText);
                                    var data = json['data'];
                                    store.loadData(data);

                                    me.task3.start();
                                },
                                failure: function(response) {
                                    console.log('do it again.');
                                    me.task3.start();  
                                }
                            });
                            
                        },
                        interval: 3000
                    });
                }

                me.task3.start();
            }
        });
    },

    onLoadSoal: function (panel, container, index, eOpts ) {
        var me                = this;
        var lembarjawab       = me.getView().down('#lembarjawab');
        var store_lembarjawab = lembarjawab.getStore();

        var judul = this.lookup('judul');
        judul.setHtml(panel.datarecord.data['nama']+' '+panel.datarecord.data['mapel']);


        var data = JSON.parse(localStorage.getItem('user'));
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/ujian/mulai',
            params: {
                id_ujian: panel.datarecord.data['id'],
                id_siswa: data[0].id
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                    if(json['success']) {
                        me.id_absen = json['id_absen'];
                        store_lembarjawab.loadData(json['pilihanganda']);
                        for(var key in json['pilihanganda']) {
                            me.oldJawaban+=json['pilihanganda'][key].id+'K|';
                        }
                        me.oldJawaban = me.oldJawaban.slice(0, -1); 
                        me.newJawaban = me.oldJawaban;
                        //console.log('set jawaban awal: '+me.newJawaban);
                        
                        me.onUjianShow(panel.datarecord.data['waktu'], panel.datarecord.data['jam']);
                        lembarjawab.select(store_lembarjawab.getAt(0));
                    }
            },

            failure: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
    },

    onPilihSoal: function (dataview, record ) {
        var lembarsoal        = this.getView().down('#lembarsoal');
        var store_lembarsoal  = lembarsoal.getStore();
        
        store_lembarsoal.loadRecords(record);
        setTimeout(function() {
            console.log('mathml transform~');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
    },

    onPilihJawaban: function ( dataview, location, eOpts ) {
        var target = location.source.target;
        console.log(target.name + '  ' + target.value);
        target.checked = true;

        var me          = this;
        var lembarjawab = me.getView().down('#lembarjawab');
        var store = lembarjawab.getStore();
        var index = store.indexOfId(location.record.data['id']);
        store.getAt(index).set('jawaban', target.value);

        var datos = store.getData().items;
        me.newJawaban = '';
        for(var key in datos) {
            var rec = datos[key].data;
            me.newJawaban+=rec.id+(rec.jawaban==''?'K':rec.jawaban)+'|';
        }
        me.newJawaban = me.newJawaban.slice(0, -1); 
        console.log('New Jawaban: '+me.newJawaban);
    },

    onChildTap: function (dataview, location, eOpts) {
        var me = this;
        var data = location.record.data;
        var target = location.source.target;
        if(target.name=='start-button') {
            console.log(location.record);
            this.onViewSoal(location.record);
        } else        
        if(target.name=='view-button') {
            this.onViewSoal(location.record);
        } else 
        if(target.name=='delete-button') {
            Ext.Msg.confirm('Delete', 'Yakin untuk hapus data yang dipilih?',
            function(choice) {
                console.log(choice);
                if (choice === 'yes') {
                    me.onDelete(data['id']);
                }
            }, this);
        } else
        if(target.name=='edit-button') {
            this.onEdit(data['id']);
        } else
        if(target.name=='checkbox-aktif') {
            this.onActive(target, data['id']);
        } else
        if(target.name=='checkbox-acak') {
            this.onAcak(target, data['id']);
        }
    },

    onViewSoal: function(record) {
        var me = this,
            view = me.getView();

        me.fireEvent('hiddenToolbar', true);
        view.removeAll();
        view.add({
            xtype: 'soal-view',
            datarecord: record,
            flex: 1
        });
    },

    onEdit: function() {
        console.log('edit');
    },

    onDelete: function(id_ujian) {
        var me = this;
        Ext.Ajax.request({
            method:'GET',
            url: './server/public/ujian/'+id_ujian+'/delete',
            success: function(response) {
                me.onLoadList();
            },

            failure: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        });
    },

    onActive: function(target, id_ujian) {
        //console.log(target.checked);
        var checked = !target.checked;
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/ujian/'+id_ujian+'/aktif',
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

    onAcak: function(target, id_ujian) {
        var checked = !target.checked;
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/ujian/'+id_ujian+'/acak',
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

    onUjianShow: function(duration, start) {
        var me = this;

        var timer = this.lookup('timer');
        var ss    = start.split(':');

        var jam_mulai = parseInt(ss[0]);
        var mnt_mulai = parseInt(ss[1]);
        var dtk_mulai = 0;

        var jam_selesai = jam_mulai;
        var mnt_selesai = mnt_mulai;
        var dtk_selesai = dtk_mulai;

        var sisa = duration; 
        while (sisa>=60) {
            jam_selesai++;
            sisa = sisa-60;
            //console.log(' --> ' + sisa);
        }

        if(sisa>0) {
            mnt_selesai=mnt_mulai+sisa;
        }

        if(mnt_selesai>=60) {
            jam_selesai++;
            mnt_selesai=mnt_selesai-60;
        }

        //console.log('Selesai: '+ jam_selesai +' : ' + mnt_selesai +' : ' + dtk_selesai);

        if(!me.runner) {
            me.runner = new Ext.util.TaskRunner();
            me.task1 = me.runner.newTask({
                run: function() { 
                   
                    var now     = new Date(); 
                    var jam_now = now.getHours();
                    var mnt_now = now.getMinutes();
                    var dtk_now = now.getSeconds();

                    if(jam_now<jam_mulai) {
                        console.log('Belum Mulai berdasarkan jam!');
                    } else if(jam_now==jam_mulai && mnt_now<mnt_mulai) {
                        console.log('Belum Mulai berdasarkan menit!');
                    } else if(jam_now==jam_mulai && mnt_now==mnt_mulai && dtk_now<dtk_mulai) {
                        console.log('Belum Mulai berdasarkan detik!');
                    } else if(jam_now>jam_selesai) {
                        console.log('Sudah berakhir berdasarkan jam!');
                        me.onConfirmFinish('yes');
                    } else if(jam_now==jam_selesai && mnt_now>mnt_selesai) {
                        console.log('Sudah berakhir berdasarkan menit!');
                        me.onConfirmFinish('yes');
                    } else if(jam_now==jam_selesai && mnt_now==mnt_selesai && dtk_now>dtk_selesai) {
                        console.log('Sudah berakhir berdasarkan detik!');
                        me.onConfirmFinish('yes');
                    } else {
                        
                        sisa_jam = jam_selesai-jam_now;
                        
                        if(mnt_selesai<=mnt_now) {
                            sisa_jam--;
                            sisa_mnt=(mnt_selesai+60)-mnt_now;
                        } else {
                            sisa_mnt = mnt_selesai-mnt_now;
                        }
                        
                        if(dtk_selesai<=dtk_now) {
                            sisa_mnt--;
                            sisa_dtk=(dtk_selesai+60)-dtk_now;
                        } else {
                            sisa_dtk = dtk_selesai-dtk_now;    
                        }

                        console.log('Berlangsung!');
                        timer.setHtml((sisa_jam<10?'0':'')+sisa_jam+ ' : '+(sisa_mnt<10?'0':'')+sisa_mnt+ ' : '+(sisa_dtk<10?'0':'')+sisa_dtk);
                    }                    
                },
                interval: 1000
            });

            me.task2 = me.runner.newTask({
                run: function() { 
                    if(!me.SubmitOnProgress && me.newJawaban!='' && me.newJawaban!=me.oldJawaban) {
                        console.log('kirim jawaban ....');
                        me.SubmitOnProgress = true;
                        var jawaban_to_send = me.newJawaban;

                        Ext.Ajax.request({
                            method:'POST',
                            params: {
                                id: me.id_absen,
                                jawaban: jawaban_to_send
                            },
                            url: './server/public/ujian/jawab',
                            success: function(response) {
                                me.oldJawaban = jawaban_to_send;
                                me.SubmitOnProgress = false;                    
                            },
                            failure: function(response) {
                                me.SubmitOnProgress = false;
                            }
                        });
                    }
                },
                interval: 3000
            });
            
        }
        me.task1.start();
        me.task2.start();
    },

    onFinish: function() {
        Ext.Msg.confirm('Konfirmasi', 'Yakin untuk Selesai?', 'onConfirmFinish', this);
    },

    onConfirmFinish: function (choice) {
        var me = this;
        if (choice === 'yes' && !me.SubmitOnProgress) {
            me.SubmitOnProgress = true;
            var jawaban_to_send = me.newJawaban;

            console.log('Proses Submit!!!');
            Ext.Ajax.request({
                method:'POST',
                params: {
                    id: me.id_absen,
                    jawaban: jawaban_to_send
                },
                url: './server/public/ujian/tutup',
                success: function(response) {
                    me.oldJawaban = jawaban_to_send;
                    me.SubmitOnProgress = false;
                    
                    me.task1.stop();
                    me.task2.stop();                    
                    me.clearChartUpdates();
                    
                    me.fireEvent('hiddenToolbar', false);
                    var view = me.getView();
                    view.removeAll();
                    view.add({
                        xtype: view.viewType,
                        flex: 1
                    });
                },

                failure: function(response) {
                    if(response.responseText!=null){
                        var data = JSON.parse(response.responseText);
                        Ext.Msg.alert('Error', data.data.message, function() {
                            me.SubmitOnProgress = false;
                        });
                    } else {
                        Ext.Msg.alert('Error', response.statusText, function() {
                            me.SubmitOnProgress = false;
                        });
                    }
                }
            });
        }
    },

    onCancel: function() {
        Ext.Msg.confirm('Konfirmasi', 'Yakin untuk Keluar?', 'onConfirmCancel', this);
    },

    onConfirmCancel: function (choice) {
        var me = this;
        if (choice === 'yes') {
            
            me.task1.stop();                    
            me.task2.stop();                    
            me.clearChartUpdates();
            
            me.fireEvent('hiddenToolbar', false);
            var view = me.getView();
            view.removeAll();
            view.add({
                xtype: view.viewType,
                flex: 1
            });
        }
    }

});
