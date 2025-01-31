<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class Auth extends \CodeIgniter\Controller
{
    use ResponseTrait;
    
    public function Register() {

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'nama'                => $this->request->getPost('nama'),
			'email'               => $this->request->getPost('email'),
            'nohp'                => $this->request->getPost('nohp'),
            'username'            => $this->request->getPost('username'),
            'username_referal'    => $this->request->getPost('username_referal'),
            'password'            => $this->request->getPost('password'),
            'konfirmasi_password' => $this->request->getPost('konfirmasi_password'),
            'tempat_lahir'        => $this->request->getPost('tempat_lahir'),
			'tanggal_lahir'       => $this->request->getPost('tanggal_lahir'),
			'jenis_kelamin'       => $this->request->getPost('jenis_kelamin'),
			'id_user'             => 0,
			'tipe_user'           => 4,
			'aktif'               => 1,			
            'photo'               => 'default.png',
			'date_create'         => $date->format('Y-m-d H:i:s'),
			'date_update'         => $date->format('Y-m-d H:i:s')
		];

		$validation = \Config\Services::validation();
		if($validation->run($_DATA, 'registrasi') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

        if($_DATA['password']!=$_DATA['konfirmasi_password']) {
            $response = [                
                'success' => false,
                'message' => 'Konfirmasi password tidak sesuai.'
            ];

            return $this->respond($response, 500);
        }

		$model      = new \App\Models\Jamaah();
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

		$MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);
		
		//PROSES INSERT DATA
        $_DATA['id_user'] = $model_user->insert($_DATA);
		$model_user->where('id', $_DATA['id_user'])->set(['id_tipe_user' => $model->insert($_DATA)])->update();

		$response = [
			'success' => true,
			'message' => 'Pendaftaran Jamaah berhasil.'
		];

		return $this->respond($response, 200);
	}

    public function Login() {
		
        $_DATA = [
            'username' => $this->request->getPost('userid'),
            'password' =>  $this->request->getPost('password')
        ];

        $validation = \Config\Services::validation();
		if($validation->run($_DATA, 'auth') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

        $MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);  

        $model = new \App\Models\User();
        $user  = $model->select('
            id,
            nama,
            email,
            nohp,
            username,
            photo,
            aktif,
            tipe_user
        ')->where($_DATA)->get()->getRowArray();

		if($user) {
            if($user['aktif']==0) {
                $response = [                
                    'success' => false,
                    'message' => 'User tidak aktif.'
                ];
    
                return $this->respond($response, 500);
            } 
            
            $mdl_menu = new \App\Models\Menu();
            $menu = $mdl_menu->getMenu(0, $user['tipe_user']);
			$response = [
                'success' => true,
                'data' => [
                    $user
                ],
                'menu' => [
                    'children' => $menu,
                ]
            ];

            $session = \Config\Services::session();
            $session->set(['user' => $user, 'menu' => $menu]);

			return $this->respond($response, 200);
		} else {
			$response = [
                'success' => false,
                'message' => 'User ID dan password tidak sesuai.'
            ];

            return $this->respond($response, 500);	
		}
    }

    public function Logout() {
		$session = \Config\Services::session();
		$session->destroy();

		$response = [
            'status' => 200,
            'success' => true,
            'data' => [
                'message' => 'Proses logout berhasil.'
            ],
        ];

        return $this->respond($response, 200);	
	}

}