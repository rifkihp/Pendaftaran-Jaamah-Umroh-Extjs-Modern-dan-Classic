<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class PilihanGanda extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\PilihanGanda();

		$id_ujian = $this->request->getVar('id_ujian');
		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		$query    = $this->request->getVar('query');

		$builder = $model->select('
			id, 

			pertanyaan, 
			audiofile, 
			docfile,
			kuncijawaban,
			
			pilihan_a, 
			audiofile_a, 
			docfile_a,
			
			pilihan_b, 
			audiofile_b, 
			docfile_b,
			
			pilihan_c, 
			audiofile_c, 
			docfile_c,
			
			pilihan_d, 
			audiofile_d, 
			docfile_d,

			pilihan_e, 
			audiofile_e, 
			docfile_e,
			
			pembahasan, 
			audiofile_pembahasan, 
			docfile_pembahasan

		');
		$builder->where('id_ujian', $id_ujian);
		$builder->orderBy('id', 'ASC');
		$data = $builder->get()->getResultArray();
		foreach($data as $key => $value) {
			$data[$key]['no'] = $key+1; 
		}

		//TOTAL
		$builder->select('COUNT(*) total'); 
		$builder->where('id_ujian', $id_ujian);
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

        $response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\PilihanGanda();

		$data  = $model->select('
			id, 
			
			pertanyaan, 
			COALESCE(audiofile, \'\') audiofile, 
			COALESCE(docfile, \'\') docfile,
			kuncijawaban,

			pilihan_a, 
			COALESCE(audiofile_a, \'\') audiofile_a, 
			COALESCE(docfile_a, \'\') docfile_a,
			
			pilihan_b, 
			COALESCE(audiofile_b, \'\') audiofile_b, 
			COALESCE(docfile_b, \'\') docfile_b,
			
			pilihan_c, 
			COALESCE(audiofile_c, \'\') audiofile_c, 
			COALESCE(docfile_c, \'\') docfile_c,
			
			pilihan_d, 
			COALESCE(audiofile_d, \'\') audiofile_d, 
			COALESCE(docfile_d, \'\') docfile_d,

			pilihan_e, 
			COALESCE(audiofile_e, \'\') audiofile_e, 
			COALESCE(docfile_e, \'\') docfile_e,
			
			pembahasan, 
			COALESCE(audiofile_pembahasan, \'\') audiofile_pembahasan, 
			COALESCE(docfile_pembahasan, \'\') docfile_pembahasan,

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
		$model  = new \App\Models\PilihanGanda();
		

		$data = $model->select('
			audiofile,
			docfile,

			audiofile_a,
			docfile_a,

			audiofile_b,
			docfile_b,
			
			audiofile_c,
			docfile_c,
			
			audiofile_d,
			docfile_d,
			
			audiofile_e,
			docfile_e,

			audiofile_pembahasan,
			docfile_pembahasan
		')		
		->whereIn('id', explode(',', $id))->get()->getResultArray();

		foreach($data as $_DATA) {
			if($_DATA['audiofile']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile']);			
			}
			if($_DATA['docfile']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile']);			
			}

			if($_DATA['audiofile_a']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_a'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_a']);			
			}
			if($_DATA['docfile_a']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_a'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_a']);			
			}

			if($_DATA['audiofile_b']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_b'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_b']);			
			}
			if($_DATA['docfile_b']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_b'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_b']);			
			}

			if($_DATA['audiofile_c']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_c'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_c']);			
			}
			if($_DATA['docfile_c']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_c'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_c']);			
			}

			if($_DATA['audiofile_d']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_d'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_d']);			
			}
			if($_DATA['docfile_d']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_d'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_d']);			
			}

			if($_DATA['audiofile_e']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_e'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_e']);			
			}
			if($_DATA['docfile_e']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_e'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_e']);			
			}

			if($_DATA['audiofile_pembahasan']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_pembahasan'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile_pembahasan']);			
			}
			if($_DATA['docfile_pembahasan']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_pembahasan'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile_pembahasan']);			
			}
		}

		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Soal Pilihan Ganda berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Soal Pilihan Ganda gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\PilihanGanda();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$insert = $model->insert([
			'id_ujian'    => $this->request->getPost('id_ujian'),

			'pertanyaan'   => $this->request->getPost('pertanyaan'),
            'audiofile'    => $this->request->getPost('audiofile'),
            'docfile'      => $this->request->getPost('docfile'),
            'kuncijawaban' => $this->request->getPost('kuncijawaban'),

			'pilihan_a'   => $this->request->getPost('pilihan_a'),
            'audiofile_a' => $this->request->getPost('audiofile_a'),
            'docfile_a'   => $this->request->getPost('docfile_a'),

			'pilihan_b'   => $this->request->getPost('pilihan_b'),
            'audiofile_b' => $this->request->getPost('audiofile_b'),
            'docfile_b'   => $this->request->getPost('docfile_b'),

			'pilihan_c'   => $this->request->getPost('pilihan_c'),
            'audiofile_c' => $this->request->getPost('audiofile_c'),
            'docfile_c'   => $this->request->getPost('docfile_c'),

			'pilihan_d'   => $this->request->getPost('pilihan_d'),
            'audiofile_d' => $this->request->getPost('audiofile_d'),
            'docfile_d'   => $this->request->getPost('docfile_d'),

			'pilihan_e'   => $this->request->getPost('pilihan_e'),
            'audiofile_e' => $this->request->getPost('audiofile_e'),
            'docfile_e'   => $this->request->getPost('docfile_e'),

			'pembahasan'           => $this->request->getPost('pembahasan'),
            'audiofile_pembahasan' => $this->request->getPost('audiofile_pembahasan'),
            'docfile_pembahasan'   => $this->request->getPost('docfile_pembahasan'),
			
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')

		]);
		if($insert) {			
			$builder = $model->select('id, kuncijawaban');
			$builder->where('id_ujian', $this->request->getPost('id_ujian'));
			$builder->orderBy('id', 'ASC');
			$data = $builder->get()->getResultArray();
			
			$jawaban_pg = '';
			foreach($data as $key => $value) {
				$jawaban_pg.=($key>0?'|':'').$value['id'].$value['kuncijawaban']; 
			}	

			$mdl_ujian = new \App\Models\Ujian();
			$mdl_ujian->where('id', $this->request->getPost('id_ujian'))->set(['jawaban_pg' => $jawaban_pg])->update();

			$response = [
				'success' => true,
				'message' => 'Tambah data Soal Pilihan Ganda berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Soal Pilihan Ganda gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\PilihanGanda();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$update = $model->where(['id' => $id])->set([
			'id_ujian'    => $this->request->getPost('id_ujian'),

			'pertanyaan'   => $this->request->getPost('pertanyaan'),
            'audiofile'    => $this->request->getPost('audiofile'),
            'docfile'      => $this->request->getPost('docfile'),
            'kuncijawaban' => $this->request->getPost('kuncijawaban'),

			'pilihan_a'    => $this->request->getPost('pilihan_a'),
            'audiofile_a'  => $this->request->getPost('audiofile_a'),
            'docfile_a'    => $this->request->getPost('docfile_a'),

			'pilihan_b'    => $this->request->getPost('pilihan_b'),
            'audiofile_b'  => $this->request->getPost('audiofile_b'),
            'docfile_b'    => $this->request->getPost('docfile_b'),

			'pilihan_c'    => $this->request->getPost('pilihan_c'),
            'audiofile_c'  => $this->request->getPost('audiofile_c'),
            'docfile_c'    => $this->request->getPost('docfile_c'),

			'pilihan_d'    => $this->request->getPost('pilihan_d'),
            'audiofile_d'  => $this->request->getPost('audiofile_d'),
            'docfile_d'    => $this->request->getPost('docfile_d'),

			'pilihan_e'    => $this->request->getPost('pilihan_e'),
            'audiofile_e'  => $this->request->getPost('audiofile_e'),
            'docfile_e'    => $this->request->getPost('docfile_e'),
			
			'pembahasan'           => $this->request->getPost('pembahasan'),
            'audiofile_pembahasan' => $this->request->getPost('audiofile_pembahasan'),
            'docfile_pembahasan'   => $this->request->getPost('docfile_pembahasan'),

			'date_update' => $date->format('Y-m-d H:i:s')
		])->update();
		if($update) {
			$builder = $model->select('id, kuncijawaban');
			$builder->where('id_ujian', $this->request->getPost('id_ujian'));
			$builder->orderBy('id', 'ASC');
			$data = $builder->get()->getResultArray();
			
			$jawaban_pg = '';
			foreach($data as $key => $value) {
				$jawaban_pg.=($key>0?'|':'').$value['id'].$value['kuncijawaban']; 
			}	

			$mdl_ujian = new \App\Models\Ujian();
			$mdl_ujian->where('id', $this->request->getPost('id_ujian'))->set(['jawaban_pg' => $jawaban_pg])->update();


			$response = [
				'success' => true,
				'message' => 'Update Soal Pilihan Ganda berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Soal Pilihan Ganda gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
