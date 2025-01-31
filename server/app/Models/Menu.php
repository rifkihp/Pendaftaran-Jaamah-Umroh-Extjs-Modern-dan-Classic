<?php

namespace App\Models;

use CodeIgniter\Model;

class Menu extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'modul';
	protected $primaryKey           = 'id';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDelete        = false;
	protected $protectFields        = true;
	protected $allowedFields        = [];

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

	public function getMenu($id_parent, $tipe_user) {
		
		$builder = $this->db->table('modul');
		$builder->where(['id_parent' => $id_parent, 'aktif' => 1, 'tipe_user' => $tipe_user]);
		$builder->orderBy('sequence');
		$data = $builder->get()->getResultArray();
		
		$result = [];
		foreach ($data as $key => $value) {
			$result[$key] = $value;
			$children = $this->getMenu($value["id"], $tipe_user);			
			if(count($children)>0) {
				$result[$key]['expanded'] = false;
                $result[$key]['selectable'] = false;
				$result[$key]['children'] = $children;	
			} else {
				$result[$key]['leaf'] = true;
			}
		}

		return $result;
	}
}
