Ext.define('Admin.view.guru.ProfilView', {
    extend: 'Ext.Panel',
    xtype: 'guru-profil-view',

    requires: [
        'Ext.dataview.DataView' 
    ],
    
    listeners: {
        added: 'onLoadView'
    },

    title: 'Profil Guru',
    scrollable: true,
    items: [{
        xtype: 'dataview',    
        store: {
            type: 'guru-profil',
            autoLoad: false
        },
        listeners: {
            select: 'onSelect'
        },
        
        cls: 'guru-profil-view',
        selectedCls: 'selector',
        itemTpl: 
            new Ext.XTemplate(
                '<div class="card">', 

                    '<div class="selector">', 
                        '<button name="terimaButton">EDIT</button>', 
                    '</div>', 

                    '<div class="text-center">', 
                        '<img class="profile_img" src="./server/public/uploads/guru/{photo}" alt="Profile Pic">',     
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Nama</div>', 
                        '<div>{nama}</div>', 
                        '<hr>', 
                    '</div>', 
                
                    '<div class="row">', 
                        '<div class="list-cls spc">NIP</div>', 
                        '<div>{nip}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Tempat, Tanggal Lahir</div>', 
                        '<div>{tempat_lahir}, {tanggal_lahir:date("d-m-Y")}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Jenis Kelamin</div>', 
                        '<div>{jenis_kelamin}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Agama</div>', 
                        '<div>{agama}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">NIK</div>', 
                        '<div>{nik}</div>', 
                        '<hr>', 
                    '</div>',

                    '<div class="row">', 
                        '<div class="list-cls spc">NUPTK</div>', 
                        '<div>{nuptk}</div>', 
                        '<hr>', 
                    '</div>',

                    '<div class="row">', 
                        '<div class="list-cls spc">Email</div>', 
                        '<div>{email}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">No. HP</div>', 
                        '<div>{nohp}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Username</div>', 
                        '<div>{username}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Password</div>', 
                        '<div>{password}</div>', 
                        '<hr>', 
                    '</div>', 
                   
                '</div>'
            )
    }]
});
