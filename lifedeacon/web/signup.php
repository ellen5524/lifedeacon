<!DOCTYPE HTML>
<!--
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->

<html>
	<head>
		<title>立即註冊 - 生活助理</title>
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
			
			function formcheck(){
			//alert("有錯");
				if (document.signup.na.value == ""){
					//alert("請正確輸入暱稱");
					document.getElementById("warn").innerHTML='請輸入暱稱';
					return false;
				}else if (document.signup.email.value == ""){
					//alert("請正確輸入電子信箱");
					document.getElementById("warn").innerHTML='請輸入電子信箱';
					return false;
				}else if (document.signup.pasw.value == ""){
					//alert("請正確輸入密碼");
					document.getElementById("warn").innerHTML='請輸入密碼';
					return false;
				}else if (document.signup.pasw2.value == ""){
					//alert("請輸入確認密碼");
					document.getElementById("warn").innerHTML='請輸入確認密碼';
					return false;
				}else{
					if (document.signup.pasw2.value != document.signup.pasw.value){
						document.getElementById("warn").innerHTML='確認密碼錯誤，請重新檢查';
						return false;
					}else{
						return true;
					}
				}
			}
			
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
						<header id="head">
							<h2>立即註冊</h2>
							<p>想使用生活助理嗎？趕快註冊以使用更多功能</p>
							<a href="#one" class="more scrolly"></a>
						</header>
						<section class="wrapper style5">
							<div class="inner">
								<section id="one">
									<h2 align="center">立即註冊</h2><br>
									<h3 id="warn" align="center" style="color:red;"></h3>
									<form name="signup" method="POST" action="" onsubmit="return formcheck()">
										<div class="row gtr-uniform">
											<div class="col-12 col-12-xsmall">
												<font color='red'>＊</font>暱稱<input type="text" name="na" id="na" value="" placeholder="請輸入暱稱" />
											</div>
											<div class="col-12 col-12-xsmall">
												<font color='red'>＊</font>電子信箱<input type="email" name="email" id="email" value="" placeholder="請輸入電子信箱" />
											</div>
											<div class="col-12 col-12-xsmall">
												<font color='red'>＊</font>密碼<input type="password" name="pasw" id="pasw" value="" placeholder="請輸入密碼" />
											</div>
											<div class="col-12 col-12-xsmall">
												<font color='red'>＊</font>確認密碼<input type="password" name="pasw2" id="pasw2" value="" placeholder="請再次輸入密碼" />
											</div>
											<div class="col-12">
												<ul class="actions">
													<li><button type="submit" class="primary">立即註冊</button></li>
													<li><input type="reset" value="重新輸入" /></li>
												</ul>
											</div>
										</div>
									</form>
								</section>
							</div>
						</section>
					</article>
				<!--註冊php部分-->
				<?php
					if (isset($_POST["na"]) && isset($_POST["email"])){
						$na=$_POST["na"];
						$email=$_POST["email"];
						$pasw=crypt($_POST["pasw"],"key");
						
						echo "<script type=\"text/javascript\">
								function storedata() {
									db.collection(\"user_list\").doc(\"".$email."\").set({
										name: \"".$na."\",
										email: \"".$email."\",
										password: \"".$pasw."\",
									}).then(() => {
										console.log('set data successful');
									});}
								storedata();
								alert(\"註冊成功\");
								document.location.href=\"login.php\";
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
			

	</body>
</html>