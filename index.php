<?php 
	$req = getallheaders();
	$user_agent = $req['User-Agent'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marjon Cajocon</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/grid.css" />
	<script src="js/jquery.js"></script>
</head>
<body>
    <div class="main-content">
    	<div class="nav">
      		<div class="profile-icon" id="profile-icon">
			
			</div>
			<div class="profile-name">
				MARJON CAJOCON
			</div>
      	</div>
		<div class="sider" id="sider">
			<button class="sider-close" id="sider-close">
				Close
			</button>
			<div class="sider-item">
				<div class="menu">
					<button class="menu-item" rel="about"><i class="fa fa-question-circle"></i> About </button>
				</div>
				<div class="menu">
					<button class="menu-item" rel="contact"><i class="fa fa-address-card"></i> Contact</button>
				</div>
			</div>
		</div>
		<div class="content">
			
		</div>
    </div>    
    <script src="js/index.js"></script>
</body>
</html>
