<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Subdistrict extends BaseController
{
	use ResponseTrait;

	public function index()
	{
		$city_id = $this->request->getVar('city_id');

		$model = new \App\Models\Subdistrict();
		$data =  $model->where('city_id', $city_id)->get()->getResultArray();

		$response = [
			'total' => count($data),
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}
}
