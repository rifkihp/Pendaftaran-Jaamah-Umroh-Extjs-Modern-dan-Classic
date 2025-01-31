Ext.define('Admin.view.lasatihan.LatihanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.latihan',
    
    stores: {
        results: {
            type: 'latihan'
        }/*,
        
        kelaslatihan: {
            type: 'kelaslatihantree'
        }*/
    }

});
