<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Operator extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Operator();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');

		$builder = $model->select('
			id, 
			nama,
			email,
			nohp,
			username,
			password,
			aktif
        ');

		$builder->limit($limit, $start);
		$builder->where(['id_sekolah' => 1, 'tipe_user' => 'O']);
		$builder->orderBy('id', 'ASC');
		$data = $builder->get()->getResultArray();

		$builder->select('COUNT(*) total'); 
		$builder->where(['A.id_sekolah' => 1, 'A.tipe_user' => 'O']);
		$total = $builder->get()->getRowArray();
        
		$MCrypt = new \App\Libraries\MCrypt();
		foreach($data as $key => $value) {
			$data[$key]['password'] = $MCrypt->decrypt($value['password']); 	
		}
		$response = [
            'data' => $data,
            'total' => $total['total']
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Operator();

		$data  = $model->select('
			id, 
			nama,
			email,
			nohp,
			username,
			password
		')->where('id', $id)->first();
		if($data) {
			$MCrypt = new \App\Libraries\MCrypt();
			$data['password'] = $MCrypt->decrypt($data['password']); 

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
		$model  = new \App\Models\Operator();
		
		$data = $model->whereIn('id', explode(',', $id))->get()->getResultArray();
		foreach($data as $value) {
			if($value['photo']!='' && file_exists(ROOTPATH . 'public/uploads/operator/'.$value['photo'])) {
				unlink(ROOTPATH . 'public/uploads/operator/'.$value['photo']);			
			}
		}
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Operator berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Operator gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {

		$validation =  \Config\Services::validation();

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'        => $this->request->getPost('nama'),
            'email'       => $this->request->getPost('email'),
            'nohp'        => $this->request->getPost('nohp'),
            'username'    => $this->request->getPost('username'),
            'password'    => $this->request->getPost('password'),
            'aktif'       => $this->request->getPost('aktif'),
			'tipe_user'   => 'O',
			'id_sekolah'  => 1,
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		if($validation->run($_DATA, 'operator') == FALSE) {
			$response = [
				'success' => false,
				'message' => 'Kesalahan upload photo.'
			];

			return $this->respond($response, 500);	         
        }

		$model  = new \App\Models\Operator();

		$builder = $model->db->table('admin_users');
		$builder->select('COUNT(*) TOTAL');
		$builder->where('username', $this->request->getPost('username'));

		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'User ID sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		helper(['form', 'url']);
		$max_size = 1024*5; //MAX 5MB
		$validated =  $this->validate([
			'file' => [
				'uploaded[file]',
				'mime_in[file,image/jpg,image/jpeg,image/png]',
				'max_size[file,'.$max_size.']',
			]
		]);

		if ($validated == FALSE) {
			$response = [
				'success' => false,
				'message' => 'Kesalahan upload photo.'
			];

			return $this->respond($response, 500);
		} 

		$photo = $this->request->getFile('file');
		$_DATA['photo'] = $photo->getRandomName();		
		$photo->move(ROOTPATH . 'public/uploads/operator', $_DATA['photo']);
		
		$MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);
		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Operator berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Operator gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		
		$validation =  \Config\Services::validation();

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'        => $this->request->getPost('nama'),
            'email'       => $this->request->getPost('email'),
            'nohp'        => $this->request->getPost('nohp'),
            'username'    => $this->request->getPost('username'),
            'password'    => $this->request->getPost('password'),
            'aktif'       => $this->request->getPost('aktif'),
			'tipe_user'   => 'O',
			'id_sekolah'  => 1,
			'date_update' => date('Y-m-d H:i:s')
		];

		if($validation->run($_DATA, 'operator') == FALSE) {
			$response = [
				'success' => false,
				'message' => 'Kesalahan upload photo.'
			];

			return $this->respond($response, 500);	         
        }

		$model  = new \App\Models\Operator();

		$builder = $model->db->table('admin_users');
		$builder->select('COUNT(*) TOTAL');
		$builder->where('username', $this->request->getPost('username'));
		$builder->where('id !=', $id);
		
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'User ID sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		$data = $model->where('id', $id)->get()->getRowArray();
		$_DATA['photo'] = $data['photo'];
		if (!empty($_FILES['file']['name'])) {
			helper(['form', 'url']);
			
			$max_size = 1024*5; //MAX 5MB
			$validated =  $this->validate([
				'file' => [
					'uploaded[file]',
					'mime_in[file,image/jpg,image/jpeg,image/png]',
					'max_size[file,'.$max_size.']',
				]
			]);

			if ($validated == FALSE) {
				$response = [
					'success' => false,
					'message' => 'Kesalahan upload photo.'
				];

				return $this->respond($response, 500);
			}

			$photo = $this->request->getFile('file');
			$_DATA['photo'] = $photo->getRandomName();		
			$photo->move(ROOTPATH . 'public/uploads/operator', $_DATA['photo']);

			if($data['photo']!='' && file_exists(ROOTPATH . 'public/uploads/operator/'.$data['photo'])) {
				unlink(ROOTPATH . 'public/uploads/operator/'.$data['photo']);			
			}
		}

		$MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);
		$update = $model->where(['id' => $id])->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Operator berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Operator gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
