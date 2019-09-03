<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fitness Application</title>
		<script src="<?=base_url()?>/assets/jquery/jquery-3.2.1.min.js"></script>
		<link rel="stylesheet" href="<?=base_url()?>/assets/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="<?=base_url()?>/assets/bootstrap/css/bootstrap.min.css">
		<script src="<?=base_url()?>/assets/bootstrap/js/tether.min.js"></script>
		<script src="<?=base_url()?>/assets/bootstrap/js/bootstrap.min.js"></script>
		<script src="https://www.google.com/jsapi"></script>
		<script>
			window.router = '<?php echo $router ?>';
			window.pageURL = "/fitness-application/index.php/router/";
		</script>
		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	</head>
	<body>
		<div id="app"></div>
		<script src="<?=base_url()?>/assets/js/bundle.js"></script>
	</body>
</html>
