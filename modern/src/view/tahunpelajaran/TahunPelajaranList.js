Ext.define('Admin.view.tahunpelajaran.TahunPelajaranList', {
    extend: 'Ext.Panel',
    xtype: 'tahunpelajaran-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Tahun Pelajaran',
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'tahunpelajaran',
            autoLoad: false
        },
        selectedCls: 'inbox-item-selected',
        itemTpl: 
            new Ext.XTemplate(
                '<div class="inbox-item">',
                    '<div class="inbox-inner-row inbox-unread">',
                        '<div class="list-cls inbox-from"><div style="padding-bottom: 0.25rem;">{tahun}</div></div>',
                        '<div class="inbox-date">',
                            '<tpl if="aktif === 1">',
                                '<span class="x-fa x-fa fa-check inbox-attachment"></span>',
                            '</tpl>',
                        '</div>',
                        '<div class="inbox-summary">Semester {semester}</div>',
                    '</div>',
                '</div>'
            )           
        
    }]
});
