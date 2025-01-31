<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Province extends BaseController
{
	use ResponseTrait;

	public function index()
	{
		$model = new \App\Models\Province();
		$data =  $model->get()->getResultArray();

		$response = [
			'total' => count($data),
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}
}
