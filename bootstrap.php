<?php
// bootstrap.php
define('APP_DIR', '');
define('PHPANGULAR_DEBUG', true);
define('URL_STORAGE', 'web/upload/');
define('URL_ABSOLUTE', 'http://localhost/phpangular-test/web/');
define('VERSION', '0000001');
// mysql config
define('DOCTRINE_HOST', 'localhost');
define('DOCTRINE_USER', 'root');
define('DOCTRINE_PASSWORD', '');
define('DOCTRINE_DB', 'phpangular');
define('PHPANGULAR_BUNDLE', '\\Emeric0101\\PHPAngular');
define('resetWebDir', false);

session_start();
require_once "PHPAngularConfig.php";

require_once "vendor/autoload.php";
