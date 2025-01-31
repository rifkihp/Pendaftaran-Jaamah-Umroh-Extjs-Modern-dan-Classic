<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class City extends BaseController
{
	use ResponseTrait;

	public function index()
	{
		$province_id = $this->request->getVar('province_id');


		$model = new \App\Models\City();
		$data =  $model->select('
			city_id,
			province_id,
			province,
			type,
			postal_code,
			CONCAT(type, " ", city_name) city_name
		')->where('province_id', $province_id)->get()->getResultArray();

		$response = [
			'total' => count($data),
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}
}
