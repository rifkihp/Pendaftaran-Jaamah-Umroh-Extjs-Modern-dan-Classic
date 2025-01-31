<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Document extends BaseController
{
	use ResponseTrait;
	
	public function index() {

		$session    = \Config\Services::session();
		$user_login = $session->get('user');
		$model = new \App\Models\Document();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');
		$query = $this->request->getVar('query');

		$builder = $model->select('
			id, 
			DATE_FORMAT(tanggal, "%d-%m-%Y") tgl,
			judul,
			docfile,
			aktif
        ');

		$builder->limit($limit, $start);
		$builder->where('id_sekolah=1'.($query!=''?' AND (judul LIKE "%'.$query.'%")':'').($user_login['tipe_user']>2?' AND aktif=1':''));
		$builder->orderBy('tanggal DESC');
		$data = $builder->get()->getResultArray();
		
		$builder->select('COUNT(*) total');
		$builder->where('id_sekolah=1'.($query!=''?' AND (judul LIKE "%'.$query.'%")':'').($user_login['tipe_user']>2?' AND aktif=1':''));
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		$response = [
            'total' => $total,
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Document();

		$builder = $model->select('
			id, 
			DATE_FORMAT(tanggal, "%d-%m-%Y") tgl,
			judul,
			docfile,
			aktif
        ');
		$builder->where('id', $id);
		$data  =  $builder->get()->getRowArray();
		if($data) {
			$response = [
				'success' => true,
        		'data' => $data
			];

			return $this->respond($response, 200);	
		} else {
			$response = [
				'error' => true,
        		'message' => 'Data tidak ditemukan.'
			];

			return $this->respond($response, 500);
		}
    }

	public function delete($id) {
		$model = new \App\Models\Document();
			
		$data   = $model->whereIn('id', explode(',', $id))->get()->getResultArray();
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			foreach($data as $_DATA) {
				if($_DATA['docfile']!='' && file_exists(ROOTPATH . 'public/uploads/documents/'.$_DATA['docfile'])) {
					unlink(ROOTPATH . 'public/uploads/documents/'.$_DATA['docfile']);			
				}
			}

			$response = [
				'success' => true,
				'message' => 'Hapus document berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'error' => true,
				'message' => 'Proses hapus document gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Document();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'id_sekolah'  => 1,
            
			'tanggal'     => $this->request->getPost('tgl'),
			'judul'       => $this->request->getPost('judul'),
			'docfile'	  => $this->request->getPost('docfile'),
			
			'aktif'       => $this->request->getPost('aktif'),
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		//PROSES INSERT DATA
		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah Document berhasil.'
			];
	
			return $this->respond($response, 200);
		} else {
			$response = [
				'error' => true,
				'message' => 'Proses Tambah Document gagal.'
			];

			return $this->respond($response, 500);
		}		
	}

	public function update($id) {
		$model = new \App\Models\Document();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'id_sekolah'  => 1,
			
			'tanggal'     => $this->request->getPost('tgl'),
			'judul'       => $this->request->getPost('judul'),
			'docfile'	  => $this->request->getPost('docfile'),

			'aktif'       => $this->request->getPost('aktif'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		//PROSES UPDATE DATA
		$update = $model->where(['id' => $id])->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update dokumen berhasil.'
			];
	
			return $this->respond($response, 200);
		} else {
			$response = [
				'error' => true,
				'message' => 'Proses update dokumen gagal.'
			];

			return $this->respond($response, 500);
		}	

	}

	public function aktif($id) {
		$model  = new \App\Models\Document();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif' => $this->request->getPost('status')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Perubahan status aktif berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'error' => true,
				'message' => 'Proses perubahan status aktif gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
