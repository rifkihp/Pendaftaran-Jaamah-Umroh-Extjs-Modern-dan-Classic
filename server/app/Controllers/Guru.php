<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Guru extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Guru();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');

		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(A.nama LIKE \'%'.$query.'%\' OR A.nip LIKE \'%'.$query.'%\' OR A.nik LIKE \'%'.$query.'%\' OR A.nuptk LIKE \'%'.$query.'%\')';
		}

		$builder = $model->db->table('guru A');
		$builder->select('
			A.id, 
			A.nama,
			A.nip,
			A.tempat_lahir,
			DATE_FORMAT(A.tanggal_lahir, "%d-%m-%Y") tanggal_lahir,
			A.jenis_kelamin,
			A.agama,
			A.nik,
			A.nuptk,
			A.email,
			A.nohp,
			A.photo,
			B.username,
			B.password,
			A.aktif
        ');

		$builder->limit($limit, $start);
		$builder->join('user B', 'B.id=A.id_user', 'LEFT');
		$builder->where('A.id_sekolah', 1);
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('A.id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		$MCrypt = new \App\Libraries\MCrypt();
		foreach($data as $key => $value) {
			$data[$key]['password'] = $MCrypt->decrypt($value['password']); 	
		}

		$builder->select('COUNT(*) total'); 
		$builder->where('A.id_sekolah', 1);
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
		$model = new \App\Models\Guru();

		$builder = $model->db->table('guru A');
		$builder->select('
			A.id, 
			A.nama,
			A.nip,
			A.tempat_lahir,
			DATE_FORMAT(A.tanggal_lahir, "%d-%m-%Y") tanggal_lahir,
			A.jenis_kelamin,
			A.agama,
			A.nik,
			A.nuptk,
			A.email,
			A.nohp,
			B.username,
			B.password,
			A.aktif
        ');
		$builder->join('user B', 'B.id=A.id_user', 'LEFT');
		$builder->where('A.id', $id);

		$data  =  $builder->get()->getRowArray();
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

	public function profile() {
		$model = new \App\Models\Guru();

		$id_user = $this->request->getVar('id_user');

		$builder = $model->db->table('guru A');
		$builder->select('
			A.id, 
			A.nama,
			A.nip,
			A.tempat_lahir,
			A.tanggal_lahir,
			IF(A.jenis_kelamin="L", "Laki-laki", IF(A.jenis_kelamin="P", "Perempuan", "")) jenis_kelamin,
			A.agama,
			A.nik,
			A.nuptk,
			A.email,
			A.nohp,
			A.photo,
			B.username,
			B.password,
			A.aktif
        ');
		$builder->join('user B', 'B.id=A.id_user', 'LEFT');
		$builder->where('A.id_user', $id_user);

		$data  =  $builder->get()->getRowArray();
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
		$model_guru = new \App\Models\Guru();
		
		$id_user = [];
		$data = $model_guru->whereIn('id', explode(',', $id))->get()->getResultArray();
		foreach($data as $_DATA) {
			if($_DATA['photo']!='' && $_DATA['photo']!='default.png' && file_exists(ROOTPATH . 'public/uploads/guru/'.$_DATA['photo'])) {
				unlink(ROOTPATH . 'public/uploads/guru/'.$_DATA['photo']);			
			}
			array_push($id_user, $_DATA['id_user']);
		}
		
		$delete = $model_guru->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$model_user = new \App\Models\User();
			$model_user->whereIn('id', $id_user)->delete();

			$response = [
				'success' => true,
				'message' => 'Hapus data Guru berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Guru gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {

		$validation = \Config\Services::validation();

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'           => $this->request->getPost('nama'),
			'nip'            => $this->request->getPost('nip'),
			'tempat_lahir'   => $this->request->getPost('tempat_lahir'),
			'tanggal_lahir'  => $this->request->getPost('tanggal_lahir'),
			'jenis_kelamin'  => $this->request->getPost('jenis_kelamin'),
			'agama'          => $this->request->getPost('agama'),
			'nik'            => $this->request->getPost('nik'),
			'nuptk'          => $this->request->getPost('nuptk'),
            'email'          => $this->request->getPost('email'),
            'nohp'           => $this->request->getPost('nohp'),
            'username'       => $this->request->getPost('username'),
            'password'       => $this->request->getPost('password'),
            'aktif'          => $this->request->getPost('aktif'),
			'id_user'        => 0,
			'tipe_user'      => 3,
			'id_sekolah'     => 1,
			'photo'          => 'default.png',
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//VALIDASI
		if($validation->run($_DATA, 'guru') == FALSE) {
			$response = [
				'success' => false,
				'message' => 'Kesalahan upload photo.'
			];

			return $this->respond($response, 500);
        }

		$model      = new \App\Models\Guru();
		$model_user = new \App\Models\User();

		//CHECK DUPLIKAT USERNAME;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where('username', $_DATA['username']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'User ID sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//CHECK DUPLIKAT EMAIL;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where('email', $_DATA['email']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Email sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//CHECK DUPLIKAT NO HP;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where('nohp', $_DATA['nohp']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'No. HP sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//VALIDASI PHOTO
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

		//UPLOAD PHOTO	
		$photo = $this->request->getFile('file');
		$_DATA['photo'] = $photo->getRandomName();		
		$photo->move(ROOTPATH . 'public/uploads/guru', $_DATA['photo']);
		
		$MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);

		//PROSES INSERT DATA
		$_DATA['id_user'] = $model_user->insert($_DATA);
		$model_user->where('id', $_DATA['id_user'])->set(['id_tipe_user' => $model->insert($_DATA)])->update();
		
		$response = [
			'success' => true,
			'message' => 'Tambah data Guru berhasil.'
		];

		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$validation =  \Config\Services::validation();

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'           => $this->request->getPost('nama'),
			'nip'            => $this->request->getPost('nip'),
			'tempat_lahir'   => $this->request->getPost('tempat_lahir'),
			'tanggal_lahir'  => $this->request->getPost('tanggal_lahir'),
			'jenis_kelamin'  => $this->request->getPost('jenis_kelamin'),
			'agama'          => $this->request->getPost('agama'),
			'nik'            => $this->request->getPost('nik'),
			'nuptk'          => $this->request->getPost('nuptk'),
            'email'          => $this->request->getPost('email'),
            'nohp'           => $this->request->getPost('nohp'),
            'username'       => $this->request->getPost('username'),
            'password'       => $this->request->getPost('password'),
            'aktif'          => $this->request->getPost('aktif'),
			'id_user'        => 0,
			'tipe_user'      => 3,
			'id_sekolah'     => 1,
			'photo'          => 'default.png',
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//VALIDASI
		if($validation->run($_DATA, 'guru') == FALSE) {
			$response = [
				'success' => false,
				'message' => 'Kesalahan upload photo.'
			];

			return $this->respond($response, 500);	         
        }

		$model      = new \App\Models\Guru();
		$model_user = new \App\Models\User();

		//GET DATA GURU
		$data = $model->where('id', $id)->get()->getRowArray();
		$_DATA['id_user'] = $data['id_user'];
		$_DATA['photo']   = $data['photo'];

		//CHECK DUPLIKAT USERNAME;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where(['username' => $_DATA['username'], 'id !=' => $_DATA['id_user']]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'User ID sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//CHECK DUPLIKAT EMAIL;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where(['email' => $_DATA['email'], 'id !=' => $_DATA['id_user']]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Email sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		//CHECK DUPLIKAT NO HP;
		$builder = $model_user->select('COUNT(*) TOTAL');
		$builder->where(['nohp' => $_DATA['nohp'], 'id !=' => $_DATA['id_user']]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'No. HP sudah terpakai.'
			];

			return $this->respond($response, 500);
		}

		if (!empty($_FILES['file']['name'])) {

			//VALIDASI PHOTO
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

			//DELETE PHOTO LAMA
			if($_DATA['photo']!='' && $_DATA['photo']!='default.png' && file_exists(ROOTPATH . 'public/uploads/guru/'.$_DATA['photo'])) {
				unlink(ROOTPATH . 'public/uploads/guru/'.$_DATA['photo']);			
			}

			//UPLOAD PHOTO BARU
			$photo = $this->request->getFile('file');
			$_DATA['photo'] = $photo->getRandomName();		
			$photo->move(ROOTPATH . 'public/uploads/guru', $_DATA['photo']);
		}

		$MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);

		//PROSES Update
		$model->where(['id' => $id])->set($_DATA)->update();
		$model_user->where(['id' => $_DATA['id_user']])->set($_DATA)->update();

		$response = [
			'success' => true,
			'message' => 'Update Guru berhasil.'
		];

		return $this->respond($response, 200);
	}

	public function aktif($id) {
		$model  = new \App\Models\Guru();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif'        => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$data = $model->where('id', $id)->get()->getRowArray();
			$model_user = new \App\Models\User();
			$model_user->where(['id' => $data['id_user']])->set($_DATA)->update();

			$response = [
				'success' => true,
				'message' => 'Update Guru berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Guru gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
