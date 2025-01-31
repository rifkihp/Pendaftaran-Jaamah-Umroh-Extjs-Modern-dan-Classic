<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Mapel extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Mapel();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');

		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(kode LIKE \'%'.$query.'%\' OR nama LIKE \'%'.$query.'%\')';
		}

		$builder = $model->select('id, kode, nama');
		$builder->where('id_sekolah', 1);
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();

		//TOTAL
		$builder->select('COUNT(*) total'); 
		$builder->where('id_sekolah', 1);
		if($query!='') {
			$builder->where($query);
		}
		//$total = $builder->getCompiledSelect();
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

        $response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Mapel();

		$data  = $model->select('id, kode, nama, id_sekolah')->where('id', $id)->first();
		if($data) {
			$response = [
				'success' => true,
        		'data' => $data
			];

			return $this->respond($response, 200);	
		} else {
			$response = [
				'success' => false,
        		'message' => 'Data tidak ditemukan.'
			];

			return $this->respond($response, 500);
		}
    }

	public function delete($id) {
		$model  = new \App\Models\Mapel();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Bidang Ilmu berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Bidang Ilmu gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Mapel();

		$insert = $model->insert([
			'kode'       => $this->request->getPost('kode'),
            'nama'       => $this->request->getPost('nama'),
			'id_sekolah' => 1	
		]);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Bidang Ilmu berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Bidang Ilmu gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Mapel();

		$update = $model->where(['id' => $id])->set([
			'kode' => $this->request->getPost('kode'),
            'nama' => $this->request->getPost('nama'),
			'id_sekolah' => 1
		])->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Bidang Ilmu berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Bidang Ilmu gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function getMapelDiajar() {
		$model = new \App\Models\MapelDiajar();

		$id_guru = $this->request->getVar('id_guru');

		$builder = $model->db->table('mapel_to_guru A');
		$builder->select('
			A.id_mapel id, 
			B.kode,
			B.nama,
			A.id_kelas, 
			C.nama kelas,
			A.id_ruang,
			D.nama ruang,
			A.id_sekolah,
			E.nama sekolah
		');
		$builder->join('mapel B', 'B.id=A.id_mapel', 'LEFT');
		$builder->join('kelas C', 'C.id=A.id_kelas', 'LEFT');
		$builder->join('ruang D', 'D.id=A.id_ruang', 'LEFT');
		$builder->join('sekolah E', 'E.id=A.id_sekolah', 'LEFT');
		$builder->where(['A.id_guru' => $id_guru, 'A.id_sekolah' => 1]);
		$builder->orderBy('id', 'ASC');
		$data = $builder->get()->getResultArray();

        $response = [
            'data' => $data,
            'total' => count($data)
        ];
            
		return $this->respond($response, 200);
	}
}
