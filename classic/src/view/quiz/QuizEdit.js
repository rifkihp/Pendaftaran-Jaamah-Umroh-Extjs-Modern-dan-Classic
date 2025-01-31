Ext.define('Admin.view.quiz.QuizEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'quiz-edit',

    
    bodyPadding: 10,

    cls: 'shadow',

    listeners: {
        render: 'onFormLoad'
    },
    
    layout: 'anchor',
    
    //scrollable: 'y',

    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },
        
    items: [{
        xtype: 'textfield',
        name: 'judul',
        fieldLabel: 'Judul'
    }, 
    {
        xtype: 'ckeditor',
        fieldLabel: 'Soal',
        itemId: 'ckeditor'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Audio Upload',
        itemId: 'audiofile',
        ext: 'mp3|mp4',
        keterangan: 'Tipe file harus mp3, mp4.'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Dokumen Upload',
        itemId: 'docfile',
        ext: 'pdf|doc|docx',
        keterangan: 'Tipe file harus pdf, doc, docx.'
    },
    {
        xtype: 'combo',
        name: 'kelas',
        fieldLabel: 'Kelas',
        emptyText: 'Pilih Kelas',
        editable: false,
        selectOnFocus: false,
        store: {
            type: 'kelas'
        },
        valueField: 'id',
        displayField: 'nama',
        queryMode: 'local'
    }, 
    {
        xtype: 'combo',
        name: 'mapel',
        fieldLabel: 'Mapel',
        emptyText: 'Pilih Mapel',
        store: {
            type: 'mapel'
        },
        valueField: 'id',
        displayField: 'nama',
        typeAhead: true,  
        minChars: 3,
        queryMode: 'remote'
    },
    {
        xtype: 'combo',
        name: 'guru',
        fieldLabel: 'Guru',
        emptyText: 'Pilih Guru',
        store: {
            type: 'guru'
        },
        valueField: 'id',
        displayField: 'nama',
        typeAhead: true,  
        minChars: 3,
        queryMode: 'remote'
    },
    {
        xtype: 'fieldcontainer',
        layout: 'hbox',
        defaults: {
            labelSeparator: '',
            msgTarget: 'side',
            anchor: '100%',
            selectOnFocus: true,
            allowBlank: false,
            labelAlign: 'top',
        },
        items: [{
            xtype: 'datefield',
            name: 'tanggal_mulai',
            fieldLabel: 'Tanggal',
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            flex: 1,
            margin: '0 5 0 0'
        },
        {
            xtype: 'datefield',
            name: 'tanggal_selesai',
            fieldLabel: 'Selesai',
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            flex: 1,
            margin: '0 0 0 5'
        }]
    },
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktifkan Quiz / PR',
        inputValue: 1,
        checked: true,
        width: 120
    }, 
    {
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PEMBAHASAN</div>'
    },
    {
        xtype: 'ckeditor',
        itemId: 'pembahasan'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Audio Upload',
        itemId: 'audiofile_pembahasan',
        ext: 'mp3|mp4',
        keterangan: 'Tipe file harus mp3, mp4.'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Dokumen Upload',
        itemId: 'docfile_pembahasan',
        ext: 'pdf|doc|docx',
        keterangan: 'Tipe file harus pdf, doc, docx.'
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Batal',
                handler: 'onCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onSaveButtonClick'
            }
        ]
    }
    
});
