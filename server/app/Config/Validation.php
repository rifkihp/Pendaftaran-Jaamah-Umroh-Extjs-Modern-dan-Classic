<?php

namespace Config;

use CodeIgniter\Validation\CreditCardRules;
use CodeIgniter\Validation\FileRules;
use CodeIgniter\Validation\FormatRules;
use CodeIgniter\Validation\Rules;

class Validation
{
	//--------------------------------------------------------------------
	// Setup
	//--------------------------------------------------------------------

	/**
	 * Stores the classes that contain the
	 * rules that are available.
	 *
	 * @var string[]
	 */
	public $ruleSets = [
		Rules::class,
		FormatRules::class,
		FileRules::class,
		CreditCardRules::class,
	];

	/**
	 * Specifies the views that are used to display the
	 * errors.
	 *
	 * @var array<string, string>
	 */
	public $templates = [
		'list'   => 'CodeIgniter\Validation\Views\list',
		'single' => 'CodeIgniter\Validation\Views\single',
	];

	//--------------------------------------------------------------------
	// Rules
	//--------------------------------------------------------------------
	public $auth = [
		'username'      => 'required',
		'password'      => 'required'
	];

	public $auth_errors = [
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		]
	];

	public $guru = [
		'nama'          => 'required',
		'nip'           => 'required',
		'tempat_lahir'  => 'required',
		'tanggal_lahir' => 'required',
		'jenis_kelamin' => 'required',
		'agama'         => 'required',
		'nik'           => 'required',
		'nuptk'         => 'required',
		'email'         => 'required',
		'nohp'          => 'required',
		'username'      => 'required',
		'password'      => 'required'
	];

	public $guru_errors = [
		'nama'=> [
			'required' 	=> 'Nama wajib diisi.'
		],
		'nip'=> [
			'required' 	=> 'NIP wajib diisi.'
		],
		'tempat_lahir'=> [
			'required' 	=> 'Tempat Lahir wajib diisi.'
		],
		'tanggal_lahir'=> [
			'required' 	=> 'Tanggal Lahir wajib diisi.'
		],
		'jenis_kelamin'=> [
			'required' 	=> 'Jenis Kelamin wajib diisi.'
		],
		'agama'=> [
			'required' 	=> 'Agama wajib diisi.'
		],
		'nik'=> [
			'required' 	=> 'NIK wajib diisi.'
		],
		'nuptk'=> [
			'required' 	=> 'NUPTK wajib diisi.'
		],
		'email'=> [
			'required' 	=> 'Email wajib diisi.'
		],
		'nohp'=> [
			'required' 	=> 'No. HP wajib diisi.'
		],
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		]
	];

	public $siswa = [
		'nama'           => 'required',
		//'nis'            => 'required',
		'nisn'           => 'required',
		'tempat_lahir'   => 'required',
		'tanggal_lahir'  => 'required',
		'jenis_kelamin'  => 'required',
		'agama'          => 'required',
		'email'          => 'required',
		'nohp'           => 'required',
		'id_kelas'       => 'required',
		'id_ruang'       => 'required',
		//'id_lm_1'        => 'required',
		//'id_lm_2'        => 'required',
		'username'       => 'required',
		'password'       => 'required'
	];

	public $siswa_errors = [
		'nama'=> [
			'required' 	=> 'Nama wajib diisi.'
		],
		/*'nis'=> [
			'required' 	=> 'NIS wajib diisi.'
		],*/
		'nisn'=> [
			'required' 	=> 'NISN wajib diisi.'
		],		
		'tempat_lahir'=> [
			'required' 	=> 'Tempat Lahir wajib diisi.'
		],
		'tanggal_lahir'=> [
			'required' 	=> 'Tanggal Lahir wajib diisi.'
		],
		'jenis_kelamin'=> [
			'required' 	=> 'Jenis Kelamin wajib diisi.'
		],
		'agama'=> [
			'required' 	=> 'Agama wajib diisi.'
		],
		'email'=> [
			'required' 	=> 'Email wajib diisi.'
		],
		'nohp'=> [
			'required' 	=> 'No. HP wajib diisi.'
		],
		'id_kelas'=> [
			'required' 	=> 'Kelas wajib diisi.'
		],
		'id_ruang'=> [
			'required' 	=> 'Ruang wajib diisi.'
		],
		/*'id_lm_1'=> [
			'required' 	=> 'Lintas minat I wajib diisi.'
		],
		'id_lm_2'=> [
			'required' 	=> 'Lintas minat II wajib diisi.'
		],*/
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		]
	];

	public $operator = [
		'nama'       => 'required',
		'email'      => 'required',
		'nohp'       => 'required',
		'username'   => 'required',
		'password'   => 'required'
	];

	public $operator_errors = [
		'nama'=> [
			'required' 	=> 'Nama wajib diisi.'
		],
		'email'=> [
			'required' 	=> 'Email wajib diisi.'
		],
		'nohp'=> [
			'required' 	=> 'No. HP wajib diisi.'
		],
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		]
	];

	public $registrasi = [
		'nama'  		  => 'required',
		'nohp'        		  => 'required',
		'email'       		  => 'required',
		'username'       	  => 'required',
		'password'    		  => 'required',
		'konfirmasi_password' => 'required'
	];

	public $registrasi_errors = [
		'nama'=> [
			'required' 	=> 'Nama wajib diisi.'
		],
		'nohp'=> [
			'required' 	=> 'No. HP wajib diisi.'
		],
		'email'=> [
			'required' 	=> 'Email wajib diisi.'
		],
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		],
		'konfirmasi_password'=> [
			'required' 	=> 'Konfirmasi Password wajib diisi.'
		]
	];

	public $jamaah = [
		'nama'           => 'required',
		'tempat_lahir'   => 'required',
		'tanggal_lahir'  => 'required',
		'jenis_kelamin'  => 'required',
		'agama'          => 'required',
		'email'          => 'required',
		'nohp'           => 'required',
		'username'       => 'required',
		'password'       => 'required'
	];

	public $jamaah_errors = [
		'nama'=> [
			'required' 	=> 'Nama wajib diisi.'
		],
		'tempat_lahir'=> [
			'required' 	=> 'Tempat Lahir wajib diisi.'
		],
		'tanggal_lahir'=> [
			'required' 	=> 'Tanggal Lahir wajib diisi.'
		],
		'jenis_kelamin'=> [
			'required' 	=> 'Jenis Kelamin wajib diisi.'
		],
		'agama'=> [
			'required' 	=> 'Agama wajib diisi.'
		],
		'email'=> [
			'required' 	=> 'Email wajib diisi.'
		],
		'nohp'=> [
			'required' 	=> 'No. HP wajib diisi.'
		],
		'username'=> [
			'required' 	=> 'User ID wajib diisi.'
		],
		'password'=> [
			'required' 	=> 'Password wajib diisi.'
		]
	];

}
