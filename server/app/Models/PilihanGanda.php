<?php

namespace App\Models;

use CodeIgniter\Model;

class PilihanGanda extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'soal_pilihan_ganda';
	protected $primaryKey           = 'id';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDelete        = false;
	protected $protectFields        = true;
	protected $allowedFields        = ['id', 'id_ujian', 'pertanyaan', 'audiofile', 'docfile', 'kuncijawaban',
									   'pilihan_a', 'audiofile_a', 'docfile_a', 'pilihan_b', 'audiofile_b', 'docfile_b',
									   'pilihan_c', 'audiofile_c', 'docfile_c', 'pilihan_d', 'audiofile_d', 'docfile_d',
									   'pilihan_e', 'audiofile_e', 'docfile_e', 'pembahasan', 'audiofile_pembahasan', 'docfile_pembahasan', 
									   'user_create', 'date_create', 'user_update', 'date_update'];

	// Dates
	protected $useTimestamps        = false;
	protected $dateFormat           = 'datetime';
	protected $createdField         = 'created_at';
	protected $updatedField         = 'updated_at';
	protected $deletedField         = 'deleted_at';

	// Validation
	protected $validationRules      = [];
	protected $validationMessages   = [];
	protected $skipValidation       = false;
	protected $cleanValidationRules = true;

	// Callbacks
	protected $allowCallbacks       = true;
	protected $beforeInsert         = [];
	protected $afterInsert          = [];
	protected $beforeUpdate         = [];
	protected $afterUpdate          = [];
	protected $beforeFind           = [];
	protected $afterFind            = [];
	protected $beforeDelete         = [];
	protected $afterDelete          = [];
}
