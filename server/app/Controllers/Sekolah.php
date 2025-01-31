<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Sekolah extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Sekolah();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');

		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(A.kode LIKE \'%'.$query.'%\' OR A.nama LIKE \'%'.$query.'%\')';
		}

		$builder = $model->db->table('sekolah A');
		$builder->select('
			A.id, 
			A.kode,
			A.nama,
			
			A.no_bh,
			DATE_FORMAT(A.tgl_berdiri, "%d-%m-%Y") tgl_berdiri,
			A.nss,
			A.npsn,

			A.status,
			A.tingkat,
			A.mbs,
			A.alamat,

			A.province_id,
			B.province,

			A.city_id,
			CONCAT(C.type, " ", C.city_name) city,
			
			A.subdistrict_id,
			D.subdistrict_name subdistrict,

			A.kodepos,
			A.telepon,
			A.fax,
			A.website,
			A.email,
			
			A.aktif
        ');

		$builder->limit($limit, $start);
		$builder->join('province B', 'B.province_id=A.province_id', 'LEFT');
		$builder->join('city C', 'C.city_id=A.city_id', 'LEFT');
		$builder->join('subdistrict D', 'D.subdistrict_id=A.subdistrict_id', 'LEFT');
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('A.id', 'ASC');
		$data = $builder->get()->getResultArray();
		
		$builder->select('COUNT(*) total');
		if($query!='') {
			$builder->where($query);
		}
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		$response = [
            'total' => $total,
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Sekolah();

		$builder = $model->db->table('sekolah A');
		$builder->select('
			A.id, 
			A.kode,
			A.nama,
			
			A.no_bh,
			DATE_FORMAT(A.tgl_berdiri, "%d-%m-%Y") tgl_berdiri,
			A.nss,
			A.npsn,

			A.status,
			A.tingkat,
			A.mbs,
			A.alamat,

			A.province_id province,			
			A.city_id city,			
			A.subdistrict_id subdistrict,

			A.kodepos,
			A.telepon,
			A.fax,
			A.website,
			A.email,
			
			A.aktif
        ');
		$builder->where('A.id', $id);
		$data  =  $builder->get()->getRowArray();
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
		$model = new \App\Models\Sekolah();
			
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Sekolah berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Sekolah gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Sekolah();

		$validation = \Config\Services::validation();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'         => $this->request->getPost('kode'),
			'nama'         => $this->request->getPost('nama'),
			'no_bh'        => $this->request->getPost('no_bh'),
			'tgl_berdiri'  => $this->request->getPost('tanggal_berdiri'),

			'nss'  		   => $this->request->getPost('nss'),
			'npsn'         => $this->request->getPost('npsn'),
			'status'       => $this->request->getPost('status'),
			'tingkat'      => $this->request->getPost('tingkat'),
			'mbs'          => $this->request->getPost('mbs'),
            'alamat'       => $this->request->getPost('alamat'),

            'province_id'    => $this->request->getPost('province'),
			'city_id'        => $this->request->getPost('city'),
			'subdistrict_id' => $this->request->getPost('subdistrict'),
			
            'kodepos'        => $this->request->getPost('kodepos'),
            'telepon'        => $this->request->getPost('telepon'),
            'fax'          	 => $this->request->getPost('fax'),
			'website'        => $this->request->getPost('website'),
			'email'          => $this->request->getPost('email'),
			
            'aktif'          => $this->request->getPost('is_aktif'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE;
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where(['kode' => $_DATA['kode']]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode sekolah sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA
		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah Sekolah berhasil.'
			];
	
			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Tambah Sekolah gagal.'
			];

			return $this->respond($response, 500);
		}		
	}

	public function update($id) {
		$model = new \App\Models\Sekolah();

		$validation =  \Config\Services::validation();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'         => $this->request->getPost('kode'),
			'nama'         => $this->request->getPost('nama'),
			'no_bh'        => $this->request->getPost('no_bh'),
			'tgl_berdiri'  => $this->request->getPost('tanggal_berdiri'),

			'nss'  		   => $this->request->getPost('nss'),
			'npsn'         => $this->request->getPost('npsn'),
			'status'       => $this->request->getPost('status'),
			'tingkat'      => $this->request->getPost('tingkat'),
			'mbs'          => $this->request->getPost('mbs'),
            'alamat'       => $this->request->getPost('alamat'),

            'province_id'    => $this->request->getPost('province'),
			'city_id'        => $this->request->getPost('city'),
			'subdistrict_id' => $this->request->getPost('subdistrict'),
			
            'kodepos'        => $this->request->getPost('kodepos'),
            'telepon'        => $this->request->getPost('telepon'),
            'fax'          	 => $this->request->getPost('fax'),
			'website'        => $this->request->getPost('website'),
			'email'          => $this->request->getPost('email'),

            'aktif'          => $this->request->getPost('is_aktif'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE;
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode sekolah sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//PROSES UPDATE SEKOLAH
		$update = $model->where(['id' => $id])->set($_DATA)->update();

		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Sekolah berhasil.'
			];
	
			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Update Sekolah gagal.'
			];

			return $this->respond($response, 500);
		}	

	}

	public function aktif($id) {
		$model  = new \App\Models\Sekolah();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif'        => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Status Aktif berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Status Aktif gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
