<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Ujian extends BaseController
{
	use ResponseTrait;
	
	private function prosesAbsen($id_siswa, $id_ujian) {
		$model = new \App\Models\Jawabansoal();
		$date  = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));

		$result = 0;
		$data = $model->select('id')->where(['id_siswa' => $id_siswa, 'id_ujian' => $id_ujian])->get()->getRowArray();
		if(!$data) {
			$result = $model->set([
				'id_siswa' => $id_siswa,
				'id_ujian' => $id_ujian,
				'datetime_absen' => $date->format('Y-m-d H:i:s'),
				'datetime_update' => $date->format('Y-m-d H:i:s')
			])->insert();
		} else {
			$result = (int)$data['id'];
		}

		return $result;
	}

	public function absenUjian() {
		
		$id_siswa = $this->request->getPost('id_siswa');
		$id_ujian = $this->request->getPost('id_ujian');
		$id_absen = $this->prosesAbsen($id_siswa, $id_ujian);

		$response = [
            'success' => true,
            'id_absen' => $id_absen
        ];
            
		return $this->respond($response, 200);
	}

	public function mulaiUjian() {

		$model = new \App\Models\PilihanGanda();
		$mdl_jawaban = new \App\Models\Jawabansoal();

		$id_siswa = $this->request->getPost('id_siswa');
		$id_ujian = $this->request->getPost('id_ujian');
		$id_absen = $this->prosesAbsen($id_siswa, $id_ujian);

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$builder = $model->select('
			id, 

			pertanyaan, 
			audiofile, 
			docfile,

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
			docfile_e

		');
		$builder->where('id_ujian', $id_ujian);
		$builder->orderBy('id', 'ASC');
		$data = $builder->get()->getResultArray();
		foreach($data as $key => $value) {
			$data[$key]['no'] = $key+1; 
		}

        $response = [
            'success'      => true,
			'id_absen'     => $id_absen,
			'pilihanganda' => $data
		];
            
		return $this->respond($response, 200);
	}

	public function jawabUjian() {

        $id      = $this->request->getPost('id');
		$jawaban = $this->request->getPost('jawaban'); 

        $model = new \App\Models\Jawabansoal();
		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
        $result = $model->set([
			'jawaban'         => $jawaban,
			'datetime_update' => $date->format('Y-m-d H:i:s')
		])->where('id', $id)->update();

        if($result>0) {
            $response = [
                'status' => 200,
                'error' => false,
                'data' => [
                    'message' => 'Proses update berhasil.'
                ],
                'success' => true
            ];
        } else {
            $response = [
                'status' => 400,
                'error' => true,
                'data' => [
                    'message' => 'Proses gagal. Coba lagi.'
                ]
            ];
        }
        
        return $this->respond($response, $response['status']);
	}

	public function tutupUjian() {
		$id      = $this->request->getPost('id');
		$jawaban = $this->request->getPost('jawaban'); 

        $model = new \App\Models\Jawabansoal();
		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
        $result = $model->set([
			'jawaban' => $jawaban, 
			'status'  => 1,
			'datetime_update' => $date->format('Y-m-d H:i:s')
		])->where('id', $id)->update();

        if($result>0) {
            $response = [
                'status' => 200,
                'error' => false,
                'data' => [
                    'message' => 'Proses update berhasil.'
                ],
                'success' => true
            ];
        } else {
            $response = [
                'status' => 400,
                'error' => true,
                'data' => [
                    'message' => 'Proses gagal. Coba lagi.'
                ]
            ];
        }
        
        return $this->respond($response, $response['status']);
	}
	
	public function ujianAktif() {
		$model = new \App\Models\Ujian();
		$id_siswa = $this->request->getVar('id_tipe_user');
		
		//GET RUANG
		$mdl_siswa  =  new \App\Models\Siswa();
		$data_siswa = $mdl_siswa->select('id_ruang')->where('id', $id_siswa)->get()->getRowArray();
		$id_ruang   = $data_siswa['id_ruang'];

		$builder = $model->db->table('ujian_to_ruang G');
		$builder->select('
			A.id,

			A.nama,
			A.penjelasan,

			B.nama kelas,
			C.nama mapel,
			D.nama guru,

			DATE_FORMAT(A.tanggal, \'%d-%m-%Y\') tanggal,
			DATE_FORMAT(A.jam, \'%H:%i\') jam,
			A.waktu,

			E.total pg,
			F.total essai,

			IF(COALESCE(H.status, 0)=1, 4, IF(A.tanggal_jam>NOW(), 2, IF(DATE_ADD(A.tanggal_jam, INTERVAL A.waktu MINUTE)>=NOW(), 3,  1))) status,
			TIMESTAMPDIFF(MINUTE, NOW(), A.tanggal_jam) selisih,
			A.acak,
			A.aktif
		');
		$builder->join('ujian A', 'A.id=G.id_ujian', 'LEFT');
		$builder->join('kelas B', 'B.id=A.id_kelas', 'LEFT');
		$builder->join('mapel C', 'C.id=A.id_mapel', 'LEFT');
		$builder->join('guru D', 'D.id=A.id_guru', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_pilihan_ganda GROUP BY id_ujian) E', 'E.id_ujian=A.id', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_essai GROUP BY id_ujian) F', 'F.id_ujian=A.id', 'LEFT');
		$builder->join('jawaban_soal H', 'H.id_ujian=G.id_ujian AND H.id_siswa='.$id_siswa, 'LEFT');
		
		$builder->where('IF(A.tanggal_jam>NOW(), 2, IF(DATE_ADD(A.tanggal_jam, INTERVAL A.waktu MINUTE)>=NOW(), 3,  1))>1');

		$builder->where([
			'A.id_sekolah' => 1,
			'A.aktif'      => 1,
			'G.id_ruang'   => $id_ruang
		]);
		
		$builder->orderBy('A.id', 'ASC');
		$data = $builder->get()->getResultArray();

		$response = [
			'success' => true,
            'data' => $data,
            'total' => count($data)
        ];
            
		return $this->respond($response, 200);

	}

	public function index() {
		$model = new \App\Models\Ujian();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');

		$nama     = $this->request->getVar('nama');
		$kelas    = $this->request->getVar('kelas');

		$builder = $model->db->table('ujian A');
		$builder->select('
			A.id,

			A.jenis,
			A.nama,
			A.penjelasan,

			B.nama kelas,
			C.nama mapel,
			D.nama guru,

			DATE_FORMAT(A.tanggal, \'%d-%m-%Y\') tanggal,
			DATE_FORMAT(A.jam, \'%H:%i\') jam,
			A.waktu,

			E.total pg,
			F.total essai,

			A.acak,
			A.aktif
		');
		$builder->limit($limit, $start);
		$builder->join('kelas B', 'B.id=A.id_kelas', 'LEFT');
		$builder->join('mapel C', 'C.id=A.id_mapel', 'LEFT');
		$builder->join('guru D', 'D.id=A.id_guru', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_pilihan_ganda GROUP BY id_ujian) E', 'E.id_ujian=A.id', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_essai GROUP BY id_ujian) F', 'F.id_ujian=A.id', 'LEFT');
		
		$builder->where('A.id_sekolah', 1);
		if($nama!='') {
			$builder->where('A.nama', $nama);
		}
		if($kelas>0) {
			$builder->where('A.id_kelas', $kelas);
		}
		$builder->orderBy('A.id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL
		$builder->select('COUNT(*) total'); 
		$builder->where('A.id_sekolah', 1);
		if($nama!='') {
			$builder->where('A.nama', $nama);
		}
		if($kelas>0) {
			$builder->where('A.id_kelas', $kelas);
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
		$model = new \App\Models\Ujian();

		$data  = $model->select('
			id,

			jenis,
			nama,
			penjelasan,

			id_kelas kelas,
			id_mapel mapel,
			id_guru guru,

			DATE_FORMAT(tanggal, \'%d-%m-%Y\') tanggal,
			DATE_FORMAT(jam, \'%H:%i\') jam,
			waktu,

			acak,
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
		$model  = new \App\Models\Ujian();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus data Soal berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Soal gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Ujian();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'jenis'       => $this->request->getPost('jenis'),
            'nama'        => $this->request->getPost('nama'),
            
			'id_sekolah'  => 1,
			'id_kelas'    => $this->request->getPost('kelas'),
			'id_mapel'    => $this->request->getPost('mapel'),
			'id_guru'     => $this->request->getPost('guru'),

            'tanggal'     => $this->request->getPost('tanggal'),
            'jam'         => $this->request->getPost('jam'),
			'tanggal_jam' => $this->request->getPost('tanggal') . ' ' . $this->request->getPost('jam'),
            'waktu'       => $this->request->getPost('waktu'),
			'penjelasan'  => $this->request->getPost('penjelasan'),

			'acak'        => $this->request->getPost('acak'),
            'aktif'        => $this->request->getPost('aktif'),

			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Soal berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Soal gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Ujian();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'jenis'       => $this->request->getPost('jenis'),
			'nama'        => $this->request->getPost('nama'),
            
			'id_sekolah'  => 1,
			'id_kelas'    => $this->request->getPost('kelas'),
			'id_mapel'    => $this->request->getPost('mapel'),
			'id_guru'     => $this->request->getPost('guru'),

            'tanggal'     => $this->request->getPost('tanggal'),
            'jam'         => $this->request->getPost('jam'),
			'tanggal_jam' => $this->request->getPost('tanggal') . ' ' . $this->request->getPost('jam'),
            'waktu'       => $this->request->getPost('waktu'),
			'penjelasan'  => $this->request->getPost('penjelasan'),

			'acak'        => $this->request->getPost('acak'),
            'aktif'        => $this->request->getPost('aktif'),
			
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Soal berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Soal gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function acak($id) {
		$model  = new \App\Models\Ujian();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'acak'        => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Soal berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Soal gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function aktif($id) {
		$model  = new \App\Models\Ujian();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif'        => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Soal berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Soal gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
