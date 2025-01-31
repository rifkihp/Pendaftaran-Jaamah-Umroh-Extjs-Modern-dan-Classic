<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

$routes->post('register', 'Auth::Register');
$routes->post('login', 'Auth::Login');
$routes->get('logout', 'Auth::Logout');

$routes->add('/fileupload', 'UploadFile::index');
$routes->add('/ajaxfileupload', 'UploadFile::fileupload');
$routes->add('/file/delete', 'UploadFile::filedelete');

$routes->get('sekolah', 'Sekolah::index');
$routes->get('sekolah/(:segment)/load', 'Sekolah::load/$1');
$routes->get('sekolah/(:segment)/delete', 'Sekolah::delete/$1');
$routes->add('sekolah/insert', 'Sekolah::insert');
$routes->add('sekolah/(:segment)/update', 'Sekolah::update/$1');
$routes->add('sekolah/(:segment)/aktif', 'Sekolah::aktif/$1');

$routes->get('tahunpelajaran', 'TahunPelajaran::index');
$routes->get('tahunpelajaran/(:segment)/load', 'TahunPelajaran::load/$1');
$routes->get('tahunpelajaran/(:segment)/delete', 'TahunPelajaran::delete/$1');
$routes->get('tahunpelajaran/(:segment)/active', 'TahunPelajaran::active/$1');
$routes->add('tahunpelajaran/insert', 'TahunPelajaran::insert');
$routes->add('tahunpelajaran/(:segment)/update', 'TahunPelajaran::update/$1');

$routes->get('kelas', 'Kelas::index');
$routes->get('kelas/(:segment)/load', 'Kelas::load/$1');
$routes->get('kelas/(:segment)/delete', 'Kelas::delete/$1');
$routes->add('kelas/insert', 'Kelas::insert');
$routes->add('kelas/(:segment)/update', 'Kelas::update/$1');

$routes->get('kelas/(:segment)/kelasujian', 'Kelas::getKelasUjian/$1');
$routes->add('kelas/(:segment)/kelasujian', 'Kelas::setKelasUjian/$1');
$routes->get('kelas/(:segment)/kelasquiz', 'Kelas::getKelasQuiz/$1');
$routes->add('kelas/(:segment)/kelasquiz', 'Kelas::setKelasQuiz/$1');

$routes->get('ruang', 'Ruang::index');
$routes->get('ruang/(:segment)/load', 'Ruang::load/$1');
$routes->get('ruang/(:segment)/delete', 'Ruang::delete/$1');
$routes->add('ruang/insert', 'Ruang::insert');
$routes->add('ruang/(:segment)/update', 'Ruang::update/$1');

$routes->get('guru', 'Guru::index');
$routes->get('guru/(:segment)/profile', 'Guru::profile');
$routes->get('guru/(:segment)/load', 'Guru::load/$1');
$routes->get('guru/(:segment)/delete', 'Guru::delete/$1');
$routes->add('guru/insert', 'Guru::insert');
$routes->add('guru/(:segment)/update', 'Guru::update/$1');
$routes->add('guru/(:segment)/aktif', 'Guru::aktif/$1');

$routes->get('siswa', 'Siswa::index');
$routes->get('siswa/(:segment)/profile', 'Siswa::profile');
$routes->get('siswa/(:segment)/load', 'Siswa::load/$1');
$routes->get('siswa/(:segment)/delete', 'Siswa::delete/$1');
$routes->add('siswa/insert', 'Siswa::insert');
$routes->add('siswa/(:segment)/update', 'Siswa::update/$1');
$routes->add('siswa/(:segment)/aktif', 'Siswa::aktif/$1');

$routes->get('mapel', 'Mapel::index');
$routes->get('mapel/(:segment)/load', 'Mapel::load/$1');
$routes->get('mapel/(:segment)/delete', 'Mapel::delete/$1');
$routes->add('mapel/insert', 'Mapel::insert');
$routes->add('mapel/(:segment)/update', 'Mapel::update/$1');

$routes->get('mapeldiajar', 'Mapel::getMapelDiajar');

$routes->get('operator', 'Operator::index');
$routes->get('operator/(:segment)/load', 'Operator::load/$1');
$routes->get('operator/(:segment)/delete', 'Operator::delete/$1');
$routes->add('operator/insert', 'Operator::insert');
$routes->add('operator/(:segment)/update', 'Operator::update/$1');

$routes->get('latihan', 'Latihan::index');
$routes->add('latihan/mulai', 'Latihan::mulai');
$routes->add('latihan/jawab', 'Latihan::jawab');
$routes->add('latihan/tutup', 'Latihan::tutup');

$routes->get('tryout', 'TryOut::index');
$routes->add('tryout/mulai', 'TryOut::mulai');
$routes->add('tryout/jawab', 'TryOut::jawab');
$routes->add('tryout/tutup', 'TryOut::tutup');

$routes->get('quiz', 'Quiz::index');
$routes->get('quiz/mulai', 'Quiz::mulai');
$routes->get('quiz/jawab', 'Quiz::jawab');
$routes->add('quiz/tutup', 'Quiz::tutup');

$routes->get('ujian', 'Ujian::index');
$routes->get('ujian/aktif', 'Ujian::ujianAktif');
$routes->get('ujian/(:segment)/load', 'Ujian::load/$1');
$routes->get('ujian/(:segment)/delete', 'Ujian::delete/$1');
$routes->add('ujian/insert', 'Ujian::insert');
$routes->add('ujian/(:segment)/update', 'Ujian::update/$1');
$routes->add('ujian/(:segment)/acak', 'Ujian::acak/$1');
$routes->add('ujian/(:segment)/aktif', 'Ujian::aktif/$1');

$routes->add('ujian/absen', 'Ujian::absenUjian');
$routes->add('ujian/mulai', 'Ujian::mulaiUjian');
$routes->add('ujian/jawab', 'Ujian::jawabUjian');
$routes->add('ujian/tutup', 'Ujian::tutupUjian');

$routes->get('pilihanganda', 'PilihanGanda::index');
$routes->get('pilihanganda/(:segment)/load', 'PilihanGanda::load/$1');
$routes->get('pilihanganda/(:segment)/delete', 'PilihanGanda::delete/$1');
$routes->add('pilihanganda/insert', 'PilihanGanda::insert');
$routes->add('pilihanganda/(:segment)/update', 'PilihanGanda::update/$1');

$routes->get('essai', 'Essai::index');
$routes->get('essai/(:segment)/load', 'Essai::load/$1');
$routes->get('essai/(:segment)/delete', 'Essai::delete/$1');
$routes->add('essai/insert', 'Essai::insert');
$routes->add('essai/(:segment)/update', 'Essai::update/$1');



$routes->get('informasi', 'Informasi::index');
$routes->get('informasi/(:segment)/load', 'Informasi::load/$1');
$routes->get('informasi/(:segment)/delete', 'Informasi::delete/$1');
$routes->add('informasi/insert', 'Informasi::insert');
$routes->add('informasi/(:segment)/update', 'Informasi::update/$1');
$routes->add('informasi/(:segment)/aktif', 'Informasi::aktif/$1');

$routes->get('document', 'Document::index');
$routes->get('document/(:segment)/load', 'Document::load/$1');
$routes->get('document/(:segment)/delete', 'Document::delete/$1');
$routes->add('document/insert', 'Document::insert');
$routes->add('document/(:segment)/update', 'Document::update/$1');
$routes->add('document/(:segment)/aktif', 'Document::aktif/$1');

$routes->get('province', 'Province::index');
$routes->get('city', 'City::index');
$routes->get('subdistrict', 'Subdistrict::index');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
