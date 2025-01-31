Ext.define('Admin.view.document.DocumentModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.document',
    
    stores: {
        results: {
            type: 'document'
        }
    }

});
