Ext.define('Admin.view.pilihanganda.PilihanGandaEdit', {
    extend: 'Ext.panel.Panel',
    xtype: 'pilihanganda-edit',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,
    scrollable: true,

    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },

    listeners: {
        afterrender: 'onFormLoad'
    },

    items: [{
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">DATA UJIAN</div>'
    },{
        xtype: 'form',
        itemId: 'form-ujian',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        
        items: [{
            xtype: 'panel',
            flex: 1,
            layout: 'anchor',
            margin: '0 5px 0 0',
            defaults: {
                anchor: '100%',
                labelWidth: 100,
                fieldStyle: 'background: none #F8F9F9;',
                readOnly: true
            },

            items: [{
                xtype: 'textfield',
                name: 'nama',
                itemId: 'namaujian',
                fieldLabel: 'Nama Ujian'
            },
            {
                xtype: 'textfield',
                name: 'kelas',
                itemId: 'kelasujian',
                fieldLabel: 'Kelas'
            }]
        },
        {
            xtype: 'panel',
            flex: 1,
            layout: 'anchor',
            margin: '0 0 0 5px',

            defaults: {
                anchor: '100%',
                labelWidth: 100,
                fieldStyle: 'background: none #F8F9F9;',
                readOnly: true
            },
            
            items: [{
                xtype: 'textfield',
                name: 'mapel',
                itemId: 'mapel',
                fieldLabel: 'Mapel'
            },
            {
                xtype: 'textfield',
                name: 'guru',
                itemId: 'guru',
                fieldLabel: 'Guru'
            }]
        }]
    },
    {
        xtype: 'form',
        itemId: 'form-pilihanganda',
        layout: 'anchor',
        
        defaults: {
            labelSeparator: '',
            msgTarget: 'side',
            anchor: '100%',
            selectOnFocus: true,
            allowBlank: false,
            labelAlign: 'top',
        },

        items: [{
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PERTANYAAN</div>'
        }, 
        {
            xtype: 'ckeditor',
            itemId: 'pertanyaan'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PILIHAN A</div>'
        },
        {
            xtype: 'ckeditor',
            itemId: 'pilihan_a'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile_a',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_a',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PILIHAN B</div>'
        },
        {
            xtype: 'ckeditor',
            itemId: 'pilihan_b'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile_b',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_b',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PILIHAN C</div>'
        },
        {
            xtype: 'ckeditor',
            itemId: 'pilihan_c'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile_c',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_c',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PILIHAN D</div>'
        },
        {
            xtype: 'ckeditor',
            itemId: 'pilihan_d'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile_d',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_d',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">PILIHAN E</div>'
        },
        {
            xtype: 'ckeditor',
            itemId: 'pilihan_e'
        },
        {
            xtype: 'fileupload',
            fieldLabel: 'Audio Upload',
            itemId: 'audiofile_e',
            ext: 'mp3|mp4',
            keterangan: 'Tipe file harus mp3, mp4.'
        },
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_e',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/

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
        /*{
            xtype: 'fileupload',
            fieldLabel: 'Dokumen Upload',
            itemId: 'docfile_pembahasan',
            ext: 'pdf|doc|docx',
            keterangan: 'Tipe file harus pdf, doc, docx.'
        },*/
        
        {
            xtype: 'component',
            html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">KUNCI JAWABAN</div>'
        },
        {
            xtype: 'textfield',
            itemId: 'kuncijawaban'
        }]
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
