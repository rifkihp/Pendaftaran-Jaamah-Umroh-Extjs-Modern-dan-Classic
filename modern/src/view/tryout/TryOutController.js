Ext.define('Admin.view.tryout.TryOutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tryout',

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
        var me   = this;
        
        store.load({
            params: {
                id_tipe_user: data[0]['id_tipe_user']
            },
            callback: function(records, operation, success) {

            }
        });
    },

    onLoadTryOutSoal: function (panel, container, index, eOpts ) {
        var me                = this;
        var lembarjawab       = me.getView().down('#lembartryoutjawab');
        var store_lembarjawab = lembarjawab.getStore();

        var judul = this.lookup('judul');
        judul.setHtml(panel.datarecord.data['nama']);
        
        var timer = this.lookup('timer');
        timer.setHidden(panel.pembahasan==1);
        
        var user = localStorage.getItem('m_user');
        var data = JSON.parse(user);
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/tryout/mulai',
            params: {
                id_tryout: panel.datarecord.data['id'],
                id_siswa: data[0]['id_tipe_user'],
                pembahasan: panel.pembahasan?1:0
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                    if(json['success']) {
                        me.id_absen     = json['id_absen'];
                        
                        //set initial jawaban
                        const myJawaban = json['jawaban'].split("|");
                        for(var key in json['pilihanganda']) {
                            json['pilihanganda'][key]['jawaban'] = '';
                            var id_soal  = parseInt(json['pilihanganda'][key]['id']);
                            var jawaban = 'K';                            
                            
                            for(var no in myJawaban) {
                                var id_jawab = parseInt(myJawaban[no].substring(0, myJawaban[no].length-1));
                                if(id_jawab==id_soal) {
                                    jawaban = myJawaban[no].substring(myJawaban[no].length-1, myJawaban[no].length);
                                    json['pilihanganda'][key]['jawaban'] = jawaban=='K'?'':jawaban;
                                    myJawaban.slice(no);

                                    break;
                                } 
                            } 
                            me.oldJawaban+=id_soal+jawaban+'|';
                        }
                        store_lembarjawab.loadData(json['pilihanganda']);

                        me.oldJawaban = me.oldJawaban.slice(0, -1); 
                        me.newJawaban = me.oldJawaban;
                        //console.log('set jawaban awal: '+me.newJawaban);

                        //console.log(hr+':'+min);
                        me.onTryOutShow(panel.datarecord.data['waktu'], panel.pembahasan);
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
        var lembarsoal        = this.getView().down('#lembartryoutsoal');
        var store_lembarsoal  = lembarsoal.getStore();
        
        store_lembarsoal.loadRecords(record);
        setTimeout(function() {
            console.log('mathml transform~');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
    },

    onPilihJawaban: function ( dataview, location, eOpts ) {
        var pembahasan = dataview.up('tryout-view').pembahasan;
        
        if(!pembahasan) {   
            var target = location.source.target;
            //console.log(target.name + '  ' + target.value);
            target.checked  = true;

            var me          = this;
            var lembarjawab = me.getView().down('#lembartryoutjawab');
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
            //console.log('New Jawaban: '+me.newJawaban);
        }
    },

    onChildTap: function (dataview, location, eOpts) {
        var me = this;
        var data = location.record.data;
        var target = location.source.target;
        
        if(target.name=='view-button') {
            me.onViewSoal(location.record, false);
        } else 
        if(target.name=='edit-button') {
            me.onViewSoal(location.record, true);
        }
    },

    onViewSoal: function(record, pembahasan) {
        if(pembahasan & record.data['selesai']==0) {
            Ext.Msg.alert('Error', 'Anda Belum Menjawab Soal.');
            return;
        }
        
        var me = this,
            view = me.getView();

        me.fireEvent('hiddenToolbar', true);
        view.removeAll();
        view.add({
            xtype: 'tryout-view',
            datarecord: record,
            pembahasan: pembahasan,
            flex: 1
        });
    },

    onTryOutShow: function(duration, pembahasan) {
        var me = this;

        if(!pembahasan) {
            var timer = me.lookup('timer');
            
            var sekarang  = new Date();
            var jam_mulai = sekarang.getHours();
            var mnt_mulai = sekarang.getMinutes();
            var dtk_mulai = sekarang.getSeconds();

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
                            //console.log('kirim jawaban ....');
                            me.SubmitOnProgress = true;
                            var jawaban_to_send = me.newJawaban;
    
                            Ext.Ajax.request({
                                method:'POST',
                                params: {
                                    id: me.id_absen,
                                    jawaban: jawaban_to_send
                                },
                                url: './server/public/tryout/jawab',
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
        }
        
    },

    onFinish: function(btn) {
        var me         = this;
        var view       = me.getView();
        var pembahasan = btn.up('tryout-view').pembahasan;
        
        if(pembahasan) {
            me.clearChartUpdates();
            me.fireEvent('hiddenToolbar', false);
            view.removeAll();
            view.add({
                xtype: view.viewType,
                flex: 1
            });
        } else {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk Selesai?', 'onConfirmFinish', this);
        }
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
                url: './server/public/tryout/tutup',
                success: function(response) {
                    me.oldJawaban = jawaban_to_send;
                    me.SubmitOnProgress = false;
                    
                    if(me.task1) {
                        me.task1.stop();
                    }

                    if(me.task2) {
                        me.task2.stop();                    
                    }
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
    }
    
});
