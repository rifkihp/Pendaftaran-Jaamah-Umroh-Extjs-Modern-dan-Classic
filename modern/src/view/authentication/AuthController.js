Ext.define('Admin.view.authentication.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth',

    onSigninClick: function(button) {
        
        var me = this;
        var form = me.lookup('loginform');

        form.submit({
            url: 'server/public/login',
            waitMsg: true,
            success: function(frm, action) {
                //untuk versi mobile parameter action sudah dalam format JSON
                localStorage.setItem('m_user', JSON.stringify(action['data']));
                localStorage.setItem('m_menu', JSON.stringify(action['menu']));
                
                me.redirectTo('dashboard', true);
            },
            failure: function(frm, action) {
                var json = Ext.JSON.decode(action.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        })
        
    },

    onDaftarButton: function(button) {
        var me = this;
        me.redirectTo('register', true);
    },

    onLoginButton: function(button) {
        var me = this;
        me.redirectTo('login', true);
    },

    onSignupClick:  function(button) {
        var me = this;
        var form = me.lookup('registerform');
        var tanggal = form.down('[name=tgl_lahir]'); 

        if (form.validate()) {
            Ext.Msg.confirm('Konfirmasi', 'Yakin untuk proses Registrasi?',
                function(choice) {
                    if (choice === 'yes') {
                        form.waitMsgTarget = me.getView();
                        form.submit({
                            method:'POST',
                            url: 'server/public/register',
                            waitMsg: 'Proses...',
                            params: {
                                tanggal_lahir: Ext.Date.format(tanggal.getValue(),'Y-m-d')
                            },
                            success:function(frm, json) {
                                Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                    form.reset();
                                    me.redirectTo('login', true);
                                });
                            },
                            failure:function(frm, action) {
                                var json = Ext.JSON.decode(action.responseText);
                                Ext.Msg.alert('Error', json['message']);
                
                                //Ext.Msg.alert('Error', action['message']);
                            }
                        });
                    }
                }, 
                this
            );
        }
    },

    onRegisterResize:  function(authdialog) {
        var me    = this,
            width =  Ext.Element.getViewportWidth(),
            height =  Ext.Element.getViewportHeight(),
            register = me.lookup('registerform');

        //console.log(height);
        register.setWidth(Math.floor(width * 0.9));
        register.setHeight(Math.floor(height * 0.9));
    },

    onLoginResize:  function(authdialog) {
        var me    = this,
            width =  Ext.Element.getViewportWidth(),
            login = me.lookup('loginform');

        login.setWidth(Math.floor(width * 0.8));
    },

    onKelasSelect: function(combobox, record) {
        var me                = this,
            ruang             = me.getView().down('#ruang'),
            store_ruang       = ruang.getStore();

        console.log('kelas select!');
        store_ruang.load({
            params: {id_kelas: record.data['id']},
            callback: function(records, operation, success) {
                
            }
        });
        ruang.reset();
    }

});
