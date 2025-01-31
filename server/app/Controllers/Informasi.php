<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Informasi extends BaseController
{
	use ResponseTrait;

	public function index() {
		$model = new \App\Models\Informasi();

		$session    = \Config\Services::session();
		$user_login = $session->get('user');

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');
		$query = $this->request->getVar('query');
		$query = ($query!=''?'(judul LIKE \'%'.$query.'%\' OR kepada LIKE \'%'.$query.'%\' OR penjelasan LIKE \'%'.$query.'%\')':'');

		$builder = $model->select('
			id, 
			DATE_FORMAT(tanggal, "%d-%m-%Y") tgl,
			kepada,
			judul,
			penjelasan,
			docfile,
			aktif
        ');
		$builder->limit($limit, $start);
		if($user_login['tipe_user']!=1) {
			$builder->where('aktif', 1);
			$builder->whereIn('id_sekolah', [0, $user_login['id_sekolah']]);
		}
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('tanggal', 'DESC');
		$data = $builder->get()->getResultArray();

		$builder->select('COUNT(*) total'); 
		if($user_login['tipe_user']!=1) {
			$builder->where('aktif', 1);
			$builder->whereIn('id_sekolah', [0, $user_login['id_sekolah']]);
		}
		if($query!='') {
			$builder->where($query);
		}
		$total = $builder->get()->getRowArray();

		$response = [
            'data' => $data,
            'total' => $total['total']
        ];
            
		return $this->respond($response, 200);
	}	
	
	public function load($id) {
		$model = new \App\Models\Informasi();

		$data  = $model->select('
			id,
			judul,
			kepada,
			DATE_FORMAT(tanggal, \'%d-%m-%Y\') tgl,
			penjelasan,
			docfile,

			aktif
		
		')->where('id', $id)->first();
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
		$model  = new \App\Models\Informasi();
		
		$data = $model->select('
			audiofile,
			docfile
		')		
		->whereIn('id', explode(',', $id))->get()->getResultArray();

		foreach($data as $_DATA) {
			if($_DATA['docfile']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile']);			
			}
		}

		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Informasi berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Informasi gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Informasi();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'id_sekolah'      => 1,
			
			'tanggal'         => $this->request->getPost('tgl'),
			'judul'           => $this->request->getPost('judul'),
			'kepada'          => $this->request->getPost('kepada'),

            'penjelasan'      => $this->request->getPost('penjelasan'),
			'docfile'         => $this->request->getPost('docfile'),
            
			'aktif'           => $this->request->getPost('aktif'),
			'date_create' 	  => $date->format('Y-m-d H:i:s'),
			'date_update' 	  => $date->format('Y-m-d H:i:s')
		];

		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Informasi berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Informasi gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Informasi();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'id_sekolah'      => 1,
			
			'tanggal'         => $this->request->getPost('tgl'),
			'judul'           => $this->request->getPost('judul'),
			'kepada'          => $this->request->getPost('kepada'),

            'penjelasan'      => $this->request->getPost('penjelasan'),
			'docfile'         => $this->request->getPost('docfile'),
            
			'aktif'           => $this->request->getPost('aktif'),
			'date_update'     => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Informasi berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Informasi gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function aktif($id) {
		$model  = new \App\Models\Informasi();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif' => $this->request->getPost('status')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Informasi berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Informasi gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
