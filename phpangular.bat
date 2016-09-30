@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/vendor/emeric0101/phpangular/bin/phpangular.php
php "%BIN_TARGET%" %*
