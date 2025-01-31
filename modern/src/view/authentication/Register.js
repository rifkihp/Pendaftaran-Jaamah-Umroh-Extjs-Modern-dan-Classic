Ext.define('Admin.view.authentication.Register', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'register',

    requires: [
        'Ext.field.Hidden',
        'Ext.field.Checkbox',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.layout.HBox'
    ],
    
    listeners : {
        show: 'onRegisterResize'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'registerform',
        scrollable: true,

        bodyPadding: 20,
        defaults: {
            margin:'0 0 10 0'
        },
        items: [{
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; font-size: 17px;">Registrasi Peserta</div>'
        }, 
        {
            xtype: 'textfield',
            placeholder: 'Nama',
            name: 'nama',
            itemId: 'nama',
            required: true
        },
        {
            xtype: 'textfield',
            placeholder: 'No. HP (WA)',
            name: 'nohp',
            itemId: 'nohp',
            required: true
        }, 
        {
            xtype: 'emailfield',
            placeholder: 'Email',
            name: 'email',
            itemId: 'email',
            required: true
        }, 
        {
            xtype: 'textfield',
            placeholder: 'Tempat Lahir',
            name: 'tempat_lahir',
            itemId: 'tempat_lahir',
            required: true
        },
        {
            xtype: 'datefield',
            placeholder: 'Tanggal Lahir',
            name: 'tgl_lahir',
            itemId: 'tgl_lahir',
            dateFormat: 'd-m-Y',
            required: true
        },
        {
            xtype: 'combobox',
            name: 'jenis_kelamin',
            itemId: 'jenis_kelamin',
            placeholder: 'Jenis Kelamin',
            emptyText: 'Pilih jenis kelamin',
            editable: false,
            selectOnFocus: false,
            store: {
                type: 'jeniskelamin'
            },
            valueField: 'kode',
            displayField: 'nama',
            queryMode: 'local',
            required: true
        },
        {
            xtype: 'textfield',
            placeholder: 'User ID',
            name: 'username',
            itemId: 'username',
            required: true
        }, 
        {
            xtype: 'passwordfield',
            placeholder: 'Password',
            name: 'password',
            itemId: 'password',
            required: true
        }, 
        {
            xtype: 'passwordfield',
            placeholder: 'Konfirmasi Password',
            name: 'konfirmasi_password',
            itemId: 'konfirmasi_password',
            required: true
        },
        {
            xtype: 'textfield',
            placeholder: 'Kode referal',
            name: 'username_referal',
            itemId: 'username_referal'
        }, 
        /*{
            xtype: 'checkboxfield',
            boxLabel: 'I agree to the terms & conditions'
        },*/ 
        {
            xtype: 'button',
            text: 'SignUp',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            ui: 'confirm',
            width: '100%',
            handler: 'onSignupClick'
        },
        {
            xtype: 'component',
            margin: 0,
            html: '<a href="#login">Back to Login</a>'
        }]
    }]
});
