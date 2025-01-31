<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class TryOut extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Ujian();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');

		$nama     = $this->request->getVar('nama');
		$kelas    = $this->request->getVar('kelas');
		$id_siswa = $this->request->getVar('id_tipe_user');

		$date  = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));

		$builder = $model->db->table('ujian A');
		$builder->select('
			A.id,

			A.nama,
			A.penjelasan,

			B.nama kelas,
			C.nama mapel,
			D.nama guru,

			A.waktu,
			E.total pg,
			F.total essai,

			A.jawaban_pg,
			COALESCE(G.jawaban, \'\') jawab,
			COALESCE(G.selesai, 0) selesai,

			COALESCE(G.selesai, 0) selesai,
			A.acak,
			A.aktif
		');
		$builder->limit($limit, $start);
		$builder->join('kelas B', 'B.id=A.id_kelas', 'LEFT');
		$builder->join('mapel C', 'C.id=A.id_mapel', 'LEFT');
		$builder->join('guru D', 'D.id=A.id_guru', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_pilihan_ganda GROUP BY id_ujian) E', 'E.id_ujian=A.id', 'LEFT');
		$builder->join('(SELECT id_ujian, COUNT(*) TOTAL FROM soal_essai GROUP BY id_ujian) F', 'F.id_ujian=A.id', 'LEFT');
		$builder->join('jawaban_soal G', 'G.id_siswa='.$id_siswa.' AND G.id_ujian=A.id', 'LEFT');
		
		$builder->where('A.id_sekolah', 1);
		$builder->where('A.jenis', 'TRY OUT');
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
		$builder->where('A.jenis', 'TRY OUT');
		if($nama!='') {
			$builder->where('A.nama', $nama);
		}
		if($kelas>0) {
			$builder->where('A.id_kelas', $kelas);
		}
		//$total = $builder->getCompiledSelect();
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		foreach($data as $key => $value) {
			if($value['selesai']==1) {
				$benar = 0;
				$jawaban_pg = explode("|", $value["jawaban_pg"]);
				$jawab = explode("|", $value["jawab"]);

				foreach($jawaban_pg as $key_ => $value_) {
					$id_soal = substr($value_, 0, strlen($value_)-1);
					$jw_soal = substr($value_, -1);

					foreach($jawab as $k => $v) {
						$jawaban        = substr($v, -1);
						$id_detail_soal = substr($v, 0, strlen($v)-1);                
						
						if($id_detail_soal==$id_soal) {
							$benar=$benar+($jw_soal==$jawaban?1:0);
							break;
						}
					}			
				}

				$data[$key]['score'] = number_format(10*(($benar*10)/count($jawaban_pg)), 2, ".", ",");
			}
			
			unset($data[$key]['jawaban_pg']);
			unset($data[$key]['jawab']);	
		}

		$response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);

	}

	private function prosesAbsen($id_siswa, $id_ujian) {
		$model = new \App\Models\Jawabansoal();
		$date  = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));

		$result = [0, ''];
		$data = $model->select('id, jawaban')->where(['id_siswa' => $id_siswa, 'id_ujian' => $id_ujian])->get()->getRowArray();
		if(!$data) {
			$id_absen = $model->set([
				'id_siswa' => $id_siswa,
				'id_ujian' => $id_ujian,
				'datetime_absen' => $date->format('Y-m-d H:i:s'),
				'datetime_update' => $date->format('Y-m-d H:i:s')
			])->insert();

			$result = [$id_absen, ''];

		} else {
			$id_absen = (int)$data['id'];
			$jawaban  = $data['jawaban'];

			$result = [$id_absen, $jawaban];
		}

		return $result;
	}

	public function mulai() {

		$model       = new \App\Models\PilihanGanda();
		$mdl_jawaban = new \App\Models\Jawabansoal();

		$id_siswa    = $this->request->getPost('id_siswa');
		$id_ujian    = $this->request->getPost('id_tryout');
		$pembahasan  = $this->request->getPost('pembahasan');

		$prosesAbsen = $this->prosesAbsen($id_siswa, $id_ujian); 
		$id_absen    = $prosesAbsen[0];
		$jawaban     = $prosesAbsen[1];

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
			docfile_e' .

			($pembahasan==1?', kuncijawaban, pembahasan, audiofile_pembahasan, docfile_pembahasan, 1 show_pembahasan':', 0 show_pembahasan')
		);
		$builder->where('id_ujian', $id_ujian);
		$builder->orderBy('id', 'ASC');
		$data = $builder->get()->getResultArray();
		foreach($data as $key => $value) {
			$data[$key]['no'] = $key+1; 
		}

        $response = [
            'success'      => true,
			'id_absen'     => $id_absen,
			'jawaban'      => $jawaban,
			'pilihanganda' => $data
		];
            
		return $this->respond($response, 200);
	}
	
	public function jawab() {

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

	public function tutup() {
		$id      = $this->request->getPost('id');
		$jawaban = $this->request->getPost('jawaban'); 

        $model = new \App\Models\Jawabansoal();
		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
        $result = $model->set([
			'jawaban' => $jawaban, 
			'selesai' => 1,
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
	
}
