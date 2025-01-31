<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class TahunPelajaran extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\TahunPelajaran();

		$builder = $model->select('
			id, 
			tahun, 
			semester,
			aktif
		');
		$builder->where('id_sekolah', 1);
		$builder->orderBy('aktif DESC, tahun DESC, semester DESC');

		$data = $builder->get()->getResultArray();
        $response = [
            'data' => $data,
            'total' => count($data)
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\TahunPelajaran();

		$data  = $model->select('id, tahun, semester, aktif')->where('id', $id)->first();
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
		$model  = new \App\Models\TahunPelajaran();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Tahun Pelajaran berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Tahun Pelajaran gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function active($id) {
		$model  = new \App\Models\TahunPelajaran();
		
		$update = $model->where('id', $id)->set(['aktif' => 1])->update();
		if($update) {			
			$model->where('id !=', $id)->set(['aktif' => 0])->update();	
			$response = [
				'success' => true,
				'message' => 'Proses Default data berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Default data gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\TahunPelajaran();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'tahun'       => $this->request->getPost('tahun'),
            'semester'    => $this->request->getPost('semester'),
            'aktif'       => $this->request->getPost('aktif'),
			'id_sekolah'  => 1,
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$insert = $model->insert($_DATA);
		if($insert) {
			if($_DATA['aktif']==1) {
				$model->where('id !=', $insert)->set(['aktif' => 0])->update();
			}
			$response = [
				'success' => true,
				'message' => 'Tambah data Tahun Pelajaran berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Tahun Pelajaran gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\TahunPelajaran();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'tahun'       => $this->request->getPost('tahun'),
            'semester'    => $this->request->getPost('semester'),
            'aktif'       => $this->request->getPost('aktif'),
			'id_sekolah'  => 1,
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			if($_DATA['aktif']==1) {
				$model->where('id !=', $id)->set(['aktif' => 0])->update();
			}

			$response = [
				'success' => true,
				'message' => 'Update Tahun Pelajaran berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Tahun Pelajaran gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
