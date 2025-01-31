Ext.define('Admin.view.siswa.ProfilView', {
    extend: 'Ext.Panel',
    xtype: 'siswa-profil-view',

    requires: [
        'Ext.dataview.DataView' 
    ],
    
    listeners: {
        added: 'onLoadView'
    },

    title: 'Profil Siswa',
    scrollable: true,
    items: [{
        xtype: 'dataview',    
        store: {
            type: 'siswa-profil',
            autoLoad: false
        },
        listeners: {
            select: 'onSelect'
        },
        
        cls: 'siswa-profil-view',
        selectedCls: 'selector',
        itemTpl: 
            new Ext.XTemplate(
                '<div class="card">', 

                    '<div class="selector">', 
                        '<button name="terimaButton">EDIT</button>', 
                    '</div>', 

                    '<div class="text-center">', 
                        '<img class="profile_img" src="./server/public/uploads/siswa/{photo}" alt="Profile Pic">',     
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">Nama</div>', 
                        '<div>{nama}</div>', 
                        '<hr>', 
                    '</div>', 
                
                    '<div class="row">', 
                        '<div class="list-cls spc">NIS</div>', 
                        '<div>{nis}</div>', 
                        '<hr>', 
                    '</div>', 

                    '<div class="row">', 
                        '<div class="list-cls spc">NISN</div>', 
                        '<div>{nisn}</div>', 
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

                    '<div class="row">', 
                        '<div class="list-cls spc">Lintas Minat 1</div>', 
                        '<div>{lintas_minat_1}</div>', 
                        '<hr>', 
                    '</div>',

                    '<div class="row">', 
                        '<div class="list-cls spc">Lintas Minat 2</div>', 
                        '<div>{lintas_minat_2}</div>', 
                        '<hr>', 
                    '</div>',

                    '<div class="row">', 
                        '<div class="list-cls spc">Kelas</div>', 
                        '<div>{kelas}</div>', 
                        '<hr>', 
                    '</div>',

                    '<div class="row">', 
                        '<div class="list-cls spc">Ruang</div>', 
                        '<div>{ruang}</div>', 
                        '<hr>', 
                    '</div>',
                   
                '</div>'
            )
    }]
});
