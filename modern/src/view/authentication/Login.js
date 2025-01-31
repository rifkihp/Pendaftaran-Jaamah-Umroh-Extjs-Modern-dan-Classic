Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.AuthBase',
    xtype: 'login',

    requires: [
        'Ext.field.Checkbox',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.layout.HBox'
    ],

    listeners : {
        show: 'onLoginResize'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'loginform',

        padding: 20,
        width: 300,
        defaults: {
            margin: '0 0 10 0'
        },
        items: [{
            html: 'Sign into your account'
        }, {
            xtype: 'textfield',
            name: 'userid',
            placeholder: 'User ID'
        }, {
            xtype: 'passwordfield',
            name: 'password',
            placeholder: 'Password'
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'checkboxfield',
                boxLabel: 'Remember Me'
            }, {
                xtype: 'component',
                html: '<a href="#passwordreset">Forgot Password</a>',
                margin: '7 0 0 45'
            }]
        }, {
            xtype: 'button',
            width: '100%',
            text: 'Login',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            ui: 'confirm',
            handler: 'onSigninClick'
        },/*, {
            xtype: 'button',
            width: '100%',
            text: 'Login with Facebook',
            iconAlign: 'right',
            iconCls: 'x-fab fa-facebook',
            ui: 'facebook',
            handler: 'goToDashboard'
        }, {
            xtype: 'button',
            width: '100%',
            margin: 0,
            text: 'Create Account',
            ui: 'gray-button',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            handler: 'goToRegister'
        }, */ 
        {
            xtype: 'button',
            width: '100%',
            margin: '5 0 0 0',
            text: 'Registrasi',
            ui: 'bright-blue',
            iconAlign: 'right',
            iconCls: 'x-fa fa-user-plus',
            handler: 'onDaftarButton'
        }]
    }]
});
