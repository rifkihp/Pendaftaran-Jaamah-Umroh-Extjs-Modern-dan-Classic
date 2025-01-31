<?php
namespace App\Libraries;

use CodeIgniter\Library;

class AjaxUploader
{
    protected $file_name 	    = '';
	protected $file_size 	    = 0;
	protected $upload_path      = 'uploads/';
	protected $temp_path 	    = 'temp/';
	protected $allow_ext 	    = array();
	protected $max_file_size 	= '10M';
	
	protected $override         = false;
	protected $deny_ext         = array('php','php3', 'php4', 'php5', 'phtml', 'exe', 'pl', 'cgi', 'html', 'htm', 'js', 'asp', 'aspx', 'bat', 'sh', 'cmd');
	protected $upload_errors    = array(
		UPLOAD_ERR_OK        	=> 'No errors.',
		UPLOAD_ERR_INI_SIZE    	=> 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
		UPLOAD_ERR_FORM_SIZE    => 'Larger than form MAX_FILE_SIZE.',
		UPLOAD_ERR_PARTIAL   	=> 'Partial upload.',
		UPLOAD_ERR_NO_FILE      => 'No file.',
		UPLOAD_ERR_NO_TMP_DIR   => 'No temporary directory.',
		UPLOAD_ERR_CANT_WRITE   => 'Can\'t write to disk.',
		UPLOAD_ERR_EXTENSION    => 'File upload stopped by extension.'
	);
	
	protected $finish_function  = '';
	protected $cross_origin     = false;

	function __construct()
	{
		
		$this->setOverride(true);

		//create a temp folder for uploading the chunks
		
		
		$ini_val = './uploads/temps'; //@ini_get('upload_tmp_dir');
		$this->temp_path = $ini_val ? $ini_val : sys_get_temp_dir();
		$this->temp_path = $this->temp_path.DIRECTORY_SEPARATOR;
		//$this->makeDir($this->temp_path);
	}
	
	/**
	 * Set the maximum file size, expected string with byte notation
	 * @param string $max_file_size
	 */
	public function setMaxFileSize($max_file_size = '10M')
	{
		$this->max_file_size = $max_file_size;
	}
	
	/**
	 * Set the allow extension file to upload
	 * @param array $allow_ext
	 */
	public function setAllowExt($allow_ext=array())
	{
		$this->allow_ext = $allow_ext;
	}
	
	/**
	 * Set the upload poath as string
	 * @param string $upload_path
	 */
	public function setUploadPath($upload_path)
	{
		$upload_path = rtrim($upload_path, '\\/');
		$this->upload_path = $upload_path.DIRECTORY_SEPARATOR;
		// Create thumb path if do not exits
		$this->makeDir($this->upload_path);
	}
	
	public function setOverride($bool){
		$this->override=$bool;	
	}
	
	private function makeDir($dir)
	{
		// Create thumb path if do not exits
		if(!file_exists($dir) && !empty($dir))
		{
			$done = @mkdir($dir, 0777, true);
			if(!$done)
			{
				$this->message(-1, 'Cannot create upload folder');
			}
		}
	}
	
	//Check if file size is allowed
	private function checkSize()
	{
		//------------------max file size check from js
		$max_file_size = $this->max_file_size;
		$size = $this->file_size;
		$rang 		= substr($max_file_size,-1);
		$max_size 	= !is_numeric($rang) && !is_numeric($max_file_size)? str_replace($rang, '', $max_file_size): $max_file_size;
		if($rang && $max_size)
		{
			switch (strtoupper($rang))//1024 or 1000??
			{
				case 'Y': $max_size = $max_size*1024;//Yotta byte, will arrive such day???
				case 'Z': $max_size = $max_size*1024;
				case 'E': $max_size = $max_size*1024;
				case 'P': $max_size = $max_size*1024;
				case 'T': $max_size = $max_size*1024;
				case 'G': $max_size = $max_size*1024;
				case 'M': $max_size = $max_size*1024;
				case 'K': $max_size = $max_size*1024;
			}
		}
	
		if(!empty($max_file_size) && $size>$max_size)
		{
			return false;
		}
		//-----------------End max file size check
	
		return true;
	}
	
	
	//Check if file name is allowed and remove illegal windows chars
	private function checkName()
	{
		//comment if not using windows web server
		$windowsReserved	= array('CON', 'PRN', 'AUX', 'NUL','COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
				'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9');
		$badWinChars		= array_merge(array_map('chr', range(0,31)), array('<', '>', ':', '"', '/', '\\', '|', '?', '*'));
	
		$this->file_name	= str_replace($badWinChars, '', $this->file_name);
	
		//check if legal windows file name
		if(in_array($this->file_name, $windowsReserved))
		{
			return false;
		}
		return true;
	}
	
	/**
	 * Check if a file exits or not and calculates a new name for not oovverring other files
	 * @param string $upload_path
	 */
	private function checkFileExits($upload_path='')
	{
		if($upload_path=='') $upload_path = $this->upload_path;
		if(!$this->override)
		{
			usleep(rand(100, 900));
			
			$filename 		= $this->file_name;
			//$upload_path 	= $this->upload_path;
			
			$file_data 	= pathinfo($filename);
			$file_base	= $file_data['filename'];
			$file_ext	= $file_data['extension'];//PHP 5.2>
		
			//Disable this lines of code to allow file override
			$c=0;
			while(file_exists($upload_path.$filename))
			{
				$find = preg_match('/\((.*?)\)/', $filename, $match);
				if(!$find) $match[1] = 0;
				else
					$file_base = str_replace('('.$match[1].')', '', $file_base);
					
				$match[1]++;
		
				$filename	= $file_base.'('.$match[1].').'.$file_ext;
			}
			// end
			$this->file_name = $filename;
		}
	}
	
	//Check if file type is allowed for upload
	private function checkExt()
	{
		$file_ext = strtolower( pathinfo($this->file_name, PATHINFO_EXTENSION) );
		
		//extensions not allowed for security reason and check if is allowed extension
		if(in_array($file_ext, $this->deny_ext)  || (!in_array($file_ext, $this->allow_ext) && count($this->allow_ext)) )
		{
			return false;
		}
		return true;
	}
	
	public function uploadAjax($last_chunk, $start_byte, $file)
	{
		$currByte	= isset($start_byte)?$start_byte:0;
		$isLast		= isset($last_chunk)?$last_chunk:'true';
		
		$flag = FILE_APPEND;
		if($currByte==0)
		{
			$this->checkFileExits($this->temp_path);//check if file exits in temp path, not so neccessary
			$flag = 0;
		}
		
		

		//we get the path only for the first chunk
		$full_path 	= realpath($this->temp_path.$this->file_name);

		//return $this->message(-1,realpath($full_path ));

		//formData post files just normal upload in $_FILES, older ajax upload post it in input
		$post_bytes	= file_get_contents( isset($file) ? $file['tmp_name'] : 'php://input' );
		//return $this->message(-1, 'Cannot 1111 on file.');
		//some rare times (on very very fast connection), file_put_contents will be unable to write on the file, so we try until it writes
		$try = 20;
		while(file_put_contents($full_path, $post_bytes, $flag) === false && $try>0)
		{
			usleep(50);
			$try--;
		}
		
		if(!$try)
		{
			return $this->message(-1, 'Cannot write on file.');
		}
		
		//delete the temporany chunk
		if(isset($file))
		{
			@unlink($file['tmp_name']);
		}
		
		//if it is not the last chunk just return success chunk upload
		if($isLast!='true')
		{
			return $this->message(1, 'Chunk uploaded.');
		}
		else
		{
			$this->checkFileExits($this->upload_path);
			$ret = rename($full_path, $this->upload_path.$this->file_name);//move file from temp dir to upload dir TODO this can be slow on big files and diffrent drivers
			if($ret)
			{
				return $this->message(1, 'File uploaded.');
			}
			else
			{
				return $this->message(1, 'File move error.');
			}
		}
	}
	
	
	private function message($status, $msg)
	{
		$result = [
			'name'=>$this->file_name, 
			'size'=>$this->file_size, 
			'status'=>$status,
			'info'=>$msg
		];

		return $result;
	}
}