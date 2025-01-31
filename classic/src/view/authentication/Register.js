Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],

    title: 'User Registration',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

    listeners : {
        render: 'onRegisterResize'
    },

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference : 'authDialog',

            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            
            scrollable: true,
            defaults : {
                margin: '10 0',
                selectOnFocus : true,
                allowBlank: false,
                hideLabel: true,
                cls: 'auth-textbox',
            },
            items: [{
                xtype: 'component',
                html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; font-size: 17px;">Registrasi Peserta</div>'
            }, 
            {
                xtype: 'textfield',
                emptyText: 'Nama',
                name: 'nama',
                itemId: 'nama'
            },
            {
                xtype: 'textfield',
                emptyText: 'No. HP (WA)',
                name: 'nohp',
                itemId: 'nohp'
            }, 
            {
                xtype: 'textfield',
                emptyText: 'Email',
                name: 'email',
                itemId: 'email',
                vtype: 'email'
            }, 
            {
                xtype: 'textfield',
                emptyText: 'Tempat Lahir',
                name: 'tempat_lahir',
                itemId: 'tempat_lahir'
            },
            {
                xtype: 'datefield',
                emptyText: 'Tanggal Lahir',
                name: 'tgl_lahir',
                itemId: 'tgl_lahir',
                dateFormat: 'd-m-Y'
            },
            {
                xtype: 'combobox',
                name: 'jenis_kelamin',
                itemId: 'jenis_kelamin',
                emptyText: 'Jenis Kelamin',
                emptyText: 'Pilih jenis kelamin',
                editable: false,
                selectOnFocus: false,
                store: {
                    type: 'jeniskelamin'
                },
                valueField: 'kode',
                displayField: 'nama',
                queryMode: 'local'
            },
            {
                xtype: 'textfield',
                emptyText: 'User ID',
                name: 'username',
                itemId: 'username'
            }, 
            {
                xtype: 'textfield',
                inputType: 'password',
                emptyText: 'Password',
                name: 'password',
                itemId: 'password'
            }, 
            {
                xtype: 'textfield',
                inputType: 'password',
                emptyText: 'Konfirmasi Password',
                name: 'konfirmasi_password',
                itemId: 'konfirmasi_password'
            },
            {
                xtype: 'textfield',
                emptyText: 'Kode Referal',
                name: 'username_referal',
                itemId: 'username_referal',
                allowBlank: true
            },
            {
                xtype: 'button',
                scale: 'large',
                ui: 'soft-blue',
                formBind: true,
                reference: 'submitButton',
                bind: false,
                margin: '5 0',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                text: 'Signup',
                listeners: {
                    click: 'onSignupClick'
                }
            }/*,
            {
                xtype: 'box',
                html: '<div class="outer-div"><div class="seperator">OR</div></div>'
            },
            {
                xtype: 'button',
                scale: 'large',
                ui: 'facebook',
                margin: '5 0',
                iconAlign: 'right',
                iconCls: 'x-fab fa-facebook',
                text: 'Login with Facebook',
                listeners: {
                    click: 'onFaceBookLogin'
                }
            },
            {
                xtype: 'component',
                html: '<div style="text-align:right">' +
                    '<a href="#login" class="link-forgot-password">'+
                        'Back to Log In</a>' +
                    '</div>'
            }*/
            ]
        }
    ]
});
