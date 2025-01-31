<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Ruang extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Ruang();

		$id_kelas = $this->request->getVar('id_kelas');

		$builder = $model->db->table('ruang A');
		$builder->select('
			A.id, 
			A.kode, 
			A.nama, 
			A.id_guru,
			D.nama guru,
			A.id_kelas,
			B.nama kelas,
			A.id_sekolah,
			C.nama sekolah
		');
        $builder->join('kelas B', 'B.id=A.id_kelas', 'LEFT');
		$builder->join('sekolah C', 'C.id=A.id_sekolah', 'LEFT');
		$builder->join('guru D', 'D.id=A.id_guru', 'LEFT');
		$builder->where('A.id_sekolah', 1);


		if($id_kelas>0) {
			$builder->where('A.id_kelas', $id_kelas);
		}
		$builder->orderBy('B.nama ASC', 'A.kode ASC');

		$data  = $builder->get()->getResultArray();

        $response = [
			'data'  => $data,
			'total' => count($data)
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Ruang();

		$builder = $model->db->table('ruang A');
		$builder->select('
			A.id, 
			A.kode, 
			A.nama, 
			A.id_kelas kelas
		');
		$builder->where('A.id', $id);

		$data  = $builder->get()->getRowArray();
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
		$model  = new \App\Models\Ruang();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Ruang berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Ruang gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Ruang();

		$insert = $model->insert([
			'kode' => $this->request->getPost('kode'),
            'nama' => $this->request->getPost('nama'),
			'id_guru' => $this->request->getPost('guru'),
			'id_kelas' => $this->request->getPost('kelas'),
			'id_sekolah' => 1	
		]);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Ruang berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Ruang gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Ruang();

		$update = $model->where(['id' => $id])->set([
			'kode' => $this->request->getPost('kode'),
            'nama' => $this->request->getPost('nama'),
			'id_guru' => $this->request->getPost('guru'),
			'id_kelas' => $this->request->getPost('kelas'),
			'id_sekolah' => 1
		])->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Ruang berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Ruang gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
