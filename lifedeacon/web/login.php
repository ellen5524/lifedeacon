<!DOCTYPE HTML>
<!--
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<?php
Setcookie("user", $email, time()-86400);
?>
<html>
	<head>
		<title>登入 - 生活助理</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<!--自己寫的CSS-->
		<link rel="stylesheet" href="assets/css/mycss.css" />
		<!---->
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
		
		<!--firebase JavaScript-->
		<!-- The core Firebase JS SDK is always required and must be listed first -->
		<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
		<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js"></script>
		<!-- TODO: Add SDKs for Firebase products that you want to use
			 https://firebase.google.com/docs/web/setup#available-libraries -->
		<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

		<script>
			// Your web app's Firebase configuration
			// For Firebase JS SDK v7.20.0 and later, measurementId is optional
			var firebaseConfig = {
			apiKey: "AIzaSyC6K7WBINJcZxYxzj8YvHvLoQ30ILQjhVE",
			authDomain: "ligedeacon.firebaseapp.com",
			projectId: "ligedeacon",
			storageBucket: "ligedeacon.appspot.com",
			messagingSenderId: "686933277301",
			appId: "1:686933277301:web:e38001f08fdcb4fa3f163c",
			measurementId: "G-7PJ4LG95XM"
			};
			// Initialize Firebase
			firebase.initializeApp(firebaseConfig);
			firebase.analytics();
			
			var db = firebase.firestore();
		</script>
		
	</head>
	<body class="is-preload">

		<!-- Page Wrapper -->
			<div id="page-wrapper">

				<!-- Header -->
					<header id="header">
						<h1><a href="index.html">生活助理</a></h1>
						<nav id="nav">
							<ul>
								<li class="special">
									<a href="#menu" class="menuToggle"><span>Menu</span></a>
									<div id="menu">
										<ul>
											<li><a href="index.html">首頁</a></li>
											<li><a href="signup.php">立即註冊</a></li>
											<li><a href="login.php">登入</a></li>
										</ul>
									</div>
								</li>
							</ul>
						</nav>
					</header>

				<!-- Main -->
					<article id="main">
						<section class="wrapper style5">
							<div class="inner">
								<section>
									<h2 align="center">登入</h2><br>
									<form method="post" action="#">
										<div class="row gtr-uniform">
											<div class="col-12 col-12-xsmall">
												電子郵件<input type="email" name="email" id="email" value="" placeholder="請輸入電子信箱" />
											</div>
											<div class="col-12 col-12-xsmall">
												密碼<input type="password" name="pswd" id="pswd" value="" placeholder="請輸入密碼" />
											</div>
											<div class="col-12">
												<ul class="actions">
													<li><button type="submit" class="primary">登入</button></li>
												</ul>
												<span>還沒註冊？<a href="signup.php">點我註冊</a></span>
											</div>
										</div>
									</form>
								</section>
							</div>
						</section>
					</article>
				<!--登入php-->
				<?php
				if (isset($_POST["email"]) && isset($_POST["pswd"])){
					$email=$_POST["email"];
					//$pswd=$_POST["pswd"];
					$pswd=crypt($_POST["pswd"],"key");
					
					echo "<script type=\"text/javascript\">
							function login(){
								var docRef = db.collection(\"user_list\").doc(\"".$email."\");
								docRef.get().then(function(doc) {
								 if (doc.exists) {
									
									if (\"".$pswd."\" == doc.data()[\"password\"]){
										var usercookies = document.cookie = 'user=".$email."';
										console.log(getCookieByName('user'));
										var username = getCookieByName('user');
										alert(\"登入成功，歡迎\"+username);
										document.location.href=\"firstsite.html\";
										return true;
									}else{
										alert(\"密碼錯誤\");
										return false;
									}
									console.log(\"end\");
								  } else {
									console.log(\"找不到文件\");
									alert(\"查無此帳號\");
									return false;
								  }
								});
							}
							login();
						</script>";
						
						
				}
				?>
				
				<!-- Footer -->
					<footer id="footer">
						<ul class="copyright">
							<li>&copy; 生活助理</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
			<!--自己寫&加入的js-->
			<script src="assets/js/cookie.js"></script>
	</body>
</html>