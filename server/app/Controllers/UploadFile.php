<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class UploadFile extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		//VALIDASI PHOTO
		helper(['form', 'url']);
		$max_size = 1024*5000; //MAX 5MB
		$validated =  $this->validate([
			'upload' => [
				'uploaded[upload]',
				'mime_in[upload,image/jpg,image/jpeg,image/png,audio/mp3]',
				'max_size[upload,'.$max_size.']',
			]
		]);

		if ($validated == FALSE) {
			$response = [
				'error' => [
					'message' => 'Kesalahan upload photo.'
				]	
			];

			return $this->respond($response, 200);
		} 

		//UPLOAD PHOTO	
		$photo = $this->request->getFile('upload');
		$_DATA['photo'] = $photo->getRandomName();		
		$photo->move(ROOTPATH . 'public/uploads/berkas', $_DATA['photo']);
		
		$response = [
			'url' => './server/public/uploads/berkas/'.$_DATA['photo']
		];

		return $this->respond($response, 200);
	
	}

	public function fileupload() {

		$MAX_FILES_SIZE   = $this->request->getPost('ax-max-file-size');
		$ALLOW_EXTENSIONS = $this->request->getPost('ax-allow-ext');
		$UPLOAD_PATH      = $this->request->getPost('ax-file-path');
		$LAST_CHUNK		  = $this->request->getPost('ax-last-chunk');
		$START_BYTE		  = $this->request->getPost('ax-start-byte');

		$uploader = new \App\Libraries\AjaxUploader();

		if(isset($MAX_FILES_SIZE) && $MAX_FILES_SIZE) {
			$uploader->setMaxFileSize($MAX_FILES_SIZE);
		} 		
		
		if(isset($ALLOW_EXTENSIONS) && $ALLOW_EXTENSIONS) {
			$uploader->setAllowExt($ALLOW_EXTENSIONS);
		}

		if(isset($UPLOAD_PATH) && $UPLOAD_PATH) {
			$uploader->setUploadPath($UPLOAD_PATH);
		}
		
		$response = $uploader->uploadAjax($LAST_CHUNK, $START_BYTE, $_FILES['ax_file_input']);
		
		return $this->respond($response, 200);
	}


	public function filedelete() {
		$FILE_PATH = $this->request->getPost('ax-file-path');
		$FILE_NAME = $this->request->getPost('ax-file-name');
		
		if(file_exists(ROOTPATH . 'public/uploads/berkas/'.$FILE_NAME)) {
			unlink(ROOTPATH . 'public/uploads/berkas/'.$FILE_NAME);			
		}

		$response = [
			'success' => true,
			'message' => 'Hapus file berhasil.'
		];

		return $this->respond($response, 200);
	}

}
