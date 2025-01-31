<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Essai extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Essai();

		$id_ujian = $this->request->getVar('id_ujian');
		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(pertanyaan LIKE \'%'.$query.'%\')';
		}

		$builder = $model->select('
			id, 
				
			pertanyaan, 
			audiofile, 
			docfile,
			score, 
			
			pembahasan, 
			audiofile_pembahasan, 
			docfile_pembahasan
			
		');
		$builder->where('id_ujian', $id_ujian);
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();

		//TOTAL
		$builder->select('COUNT(*) total'); 
		$builder->where('id_ujian', $id_ujian);
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
		$model = new \App\Models\Essai();

		$data  = $model->select('
			id, 
			
			pertanyaan, 
			audiofile, 
			docfile,
			score,
			
			pembahasan, 
			audiofile_pembahasan, 
			docfile_pembahasan

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
		$model  = new \App\Models\Essai();
		
		$data = $model->select('
			audiofile,
			docfile,

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
				'message' => 'Hapus data Soal Essai berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Soal Essai gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Essai();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$insert = $model->insert([
			'id_ujian'    		   => $this->request->getPost('id_ujian'),
			'pertanyaan'  		   => $this->request->getPost('pertanyaan'),
            'audiofile'   		   => $this->request->getPost('audiofile'),
            'docfile'     		   => $this->request->getPost('docfile'),
            'score'       		   => $this->request->getPost('score'),
			'pembahasan'           => $this->request->getPost('pembahasan'),
            'audiofile_pembahasan' => $this->request->getPost('audiofile_pembahasan'),
            'docfile_pembahasan'   => $this->request->getPost('docfile_pembahasan'),
			'date_create' 		   => $date->format('Y-m-d H:i:s'),
			'date_update' 		   => $date->format('Y-m-d H:i:s')

		]);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Soal Essai berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Soal Essai gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Essai();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$update = $model->where(['id' => $id])->set([
			'id_ujian'    		   => $this->request->getPost('id_ujian'),
			'pertanyaan'  		   => $this->request->getPost('pertanyaan'),
            'audiofile'   		   => $this->request->getPost('audiofile'),
            'docfile'     		   => $this->request->getPost('docfile'),
            'score'       		   => $this->request->getPost('score'),
			'pembahasan'           => $this->request->getPost('pembahasan'),
            'audiofile_pembahasan' => $this->request->getPost('audiofile_pembahasan'),
            'docfile_pembahasan'   => $this->request->getPost('docfile_pembahasan'),
			'date_update' => $date->format('Y-m-d H:i:s')
		])->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Soal Essai berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Soal Essai gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
