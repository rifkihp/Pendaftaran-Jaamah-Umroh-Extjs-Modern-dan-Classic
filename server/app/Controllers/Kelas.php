<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Kelas extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Kelas();

		$builder = $model->select('
			id, 
			kode, 
			nama'
		);
		$builder->where('id_sekolah', 1);
		$builder->orderBy('kode ASC');

		$data = $builder->get()->getResultArray();
        $response = [
            'data' => $data,
            'total' => count($data)
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Kelas();

		$data  = $model->select('id, kode, nama')->where('id', $id)->first();
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
		$model  = new \App\Models\Kelas();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Kelas berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Kelas gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Kelas();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'        => $this->request->getPost('kode'),
            'nama'        => $this->request->getPost('nama'),
			'id_sekolah'  => 1,
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Kelas berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Kelas gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Kelas();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'       => $this->request->getPost('kode'),
            'nama'       => $this->request->getPost('nama'),
			'id_sekolah' => 1,
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Kelas berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Kelas gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function getKelasUjian($id_ujian) {

		$result = [];
		$model  = new \App\Models\Kelas();

		$builder = $model->select('id id_, kode, nama');
		$builder->where(['id_sekolah' => 1]);
		$builder->orderBy('id');

		$data = $builder->get()->getResultArray();
		foreach ($data as $key => $value) {
			
			$builder = $model->db->table('ruang A');
			$builder->select('A.id id_, A.kode, A.nama, coalesce(B.id_ruang, 0) id_ruang, coalesce(B.lm1, 0) lm1, coalesce(B.lm2, 0) lm2');
			$builder->join('ujian_to_ruang B', 'B.id_ujian='.$id_ujian.' AND B.id_ruang=A.id', 'LEFT');
			$builder->where(['A.id_sekolah' => 1, 'A.id_kelas' => $value['id_']]);
			$builder->orderBy('A.id');
			
			$children = $builder->get()->getResultArray();
			if(count($children)>0) {
				$result[$key] = $value;
				
				$result[$key]['leaf']     = count($children)==0;
				$result[$key]['expanded'] = true;

				$checked = false;
				$result[$key]['children'] = $children;
				foreach ($result[$key]['children'] as $key_ => $value_) {
					$result[$key]['children'][$key_]['checked'] = $value_['id_ruang']>0;
					$result[$key]['children'][$key_]['leaf']    = true;
					if($value_['id_ruang']>0) {
						$checked = true;
					}
				}

				$result[$key]['checked']  = $checked;
			}		
		}

		$response = [
			'children' => $result
		];

		return $this->respond($response, 200);
	}

	public function setKelasUjian($id_ujian) {
		$detail = $this->request->getPost('detail');

		if($detail=='') {

			$response = [
				'success' => false,
				'message' => 'Pilih minimal satu ruang kelas.'
			];

			return $this->respond($response, 500);	
		}
		
		$model  = new \App\Models\KelasUjian();
		$delete = $model->where('id_ujian', $id_ujian)->delete();
		$data = explode(',', $detail);
		foreach($data as $value) {
			$row = explode('|', $value);
			$_DATA = [
				'id_ujian' => $id_ujian,
				'id_ruang' => $row[0],
				'lm1'      => $row[1]=='true'?1:0,
				'lm2'      => $row[2]=='true'?1:0
			];
			$model->insert($_DATA);
		}

		$response = [
			'success' => true,
			'message' => 'Update Kelas Ujian berhasil.'
		];

		return $this->respond($response, 200);
	}

	public function getKelasQuiz($id_quiz) {

		$result = [];
		$model  = new \App\Models\Kelas();

		$builder = $model->select('id id_, kode, nama');
		$builder->where(['id_sekolah' => 1]);
		$builder->orderBy('id');

		$data = $builder->get()->getResultArray();
		foreach ($data as $key => $value) {
			
			$builder = $model->db->table('ruang A');
			$builder->select('A.id id_, A.kode, A.nama, coalesce(B.id_ruang, 0) id_ruang');
			$builder->join('quiz_to_ruang B', 'B.id_quiz='.$id_quiz.' AND B.id_ruang=A.id', 'LEFT');
			$builder->where(['A.id_sekolah' => 1, 'A.id_kelas' => $value['id_']]);
			$builder->orderBy('A.id');
			
			$children = $builder->get()->getResultArray();
			if(count($children)>0) {
				$result[$key] = $value;
				
				$result[$key]['leaf']     = count($children)==0;
				$result[$key]['expanded'] = true;

				$checked = false;
				$result[$key]['children'] = $children;
				foreach ($result[$key]['children'] as $key_ => $value_) {
					$result[$key]['children'][$key_]['checked'] = $value_['id_ruang']>0;
					$result[$key]['children'][$key_]['leaf']    = true;
					if($value_['id_ruang']>0) {
						$checked = true;
					}
				}

				$result[$key]['checked']  = $checked;
			}		
		}

		$response = [
			'children' => $result
		];

		return $this->respond($response, 200);
	}

	public function setKelasQuiz($id_quiz) {
		$detail = $this->request->getPost('detail');

		if($detail=='') {

			$response = [
				'success' => false,
				'message' => 'Pilih minimal satu ruang kelas.'
			];

			return $this->respond($response, 500);	
		}
		
		$model  = new \App\Models\KelasQuiz();
		$delete = $model->where('id_quiz', $id_quiz)->delete();
		$data = explode(',', $detail);
		foreach($data as $value) {
			$row = explode('|', $value);
			$_DATA = [
				'id_quiz' => $id_quiz,
				'id_ruang' => $row[0]
			];
			$model->insert($_DATA);
		}

		$response = [
			'success' => true,
			'message' => 'Update Kelas Quiz / PR berhasil.'
		];

		return $this->respond($response, 200);
	}
}
