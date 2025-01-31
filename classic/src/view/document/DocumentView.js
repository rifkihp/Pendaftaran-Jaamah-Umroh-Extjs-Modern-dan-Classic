Ext.define('Admin.view.document.DocumentView',{
    extend: 'Ext.panel.Panel',
    xtype: 'document-view',

    cls: 'document-view shadow',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onViewLoad'
    },

    items: [{
        xtype: 'panel',
        bodyPadding: '20px 20px 0 20px',

        layout: 'anchor',

        defaults: {
            anchor: '100%',
            labelWidth: 100,
            fieldStyle: 'background: none #F8F9F9;',
            readOnly: true
        },
        
        items: [{
            xtype: 'textfield',
            name: 'tgl',
            fieldLabel: 'Tanggal'
        }] 
    }, 
    {
        xtype: 'dataview',
        scrollable: true,
        itemId: 'dataview-document',
        flex: 1,
        cls: 'document-view',
        store: {
            type: 'document',
            autoLoad: false
        },
        tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="document">',
                '<div class="subtitle">DETAIL DOCUMENT</div>',
                '<div class="soal">{judul}</div>',
                '<tpl if="docfile !== \'\'">',
                    '<div class="time"><b>Lampiran:</b></div>',
                    '<a href="./server/public/uploads/berkas/{docfile}" target="_blank">{docfile}</a>',                           
                '</tpl>',
            '</div>',
            '<div style="display: none;">{[MathJax.Hub.Queue(["Typeset", MathJax.Hub])]}</div>',
        '</tpl>'),
        itemSelector: 'div.soal'
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Tutup',
                handler: 'onCloseViewDocumentClick'
            }
        ]
    }

});
