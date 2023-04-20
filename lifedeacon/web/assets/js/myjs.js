window.addEventListener('load',function(){
	if("geolocation" in navigator) {
		position();
		weather();
		nowtime();
		console.log('weather start');
	} else {
	  alert('你的裝置不支援地理位置功能，無法使用此服務。');
	}
	/*------------------------------------------------*/	
	//顯示現在時間
	function nowtime(){
		let today = new Date();
		let h = chengtime(today.getHours());
		let m = chengtime(today.getMinutes());
		let s = chengtime(today.getSeconds());
		let y = today.getFullYear();
		let mon = chengtime(today.getMonth() + 1);
		let d = chengtime(today.getDate());
		let week = today.getDay();
		
		let ndate = y + "-" + mon + "-" + d; //取得現在日期
		let ntime = h + ":" + m + ":" + s; //取得現在時間
		
		document.getElementById('datebox').innerHTML = ndate + " 星期" + we(week); //顯示在網頁上
		document.getElementById('timebox').innerHTML = ntime; //顯示在網頁上
		let showtime = setTimeout(nowtime, 100);
		
		let noti = [ndate,ntime];
		return noti;
	}
	
	/*------------------------------------------------*/	
	//顯示裝置所在位置一周天氣預報
	function weather(nowcity){
		let url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=CWB-06D871EA-B2E1-4894-9A1D-E3FAA72CB12D&downloadType=WEB&format=JSON';
		
		$.get(url,function (e){
			var go = new Date();
			let weatherdata = e.cwbopendata.dataset.locations;
			console.log(weatherdata); // 顯示所有天氣預報資訊
			
			let i =0;
			for (i =0; i<22; i++){
				let add = weatherdata.location[i];
				if ( add.locationName == nowcity){ //找出裝置所在的一周天氣預報
					document.getElementById('city').innerHTML = nowcity;
					
					let ndate = nowtime()[0];
					let ntime = nowtime()[1];
					let dati = ndate+'T'+ntime
					
					let r = 0, u = 0;
					
					for (u = 0; u < 15; u++){
						let timelen = add.weatherElement[u].time.length;
						for (r = 0; r < timelen; r++){
							let ui = add.weatherElement[u].time[r];
							let endday = new Array(ui.endTime.substr(0,10)); //取得結束日期
							let endtime = new Array(ui.endTime.substr(11,8)); //取得結束時間
							let startday = new Array(ui.startTime.substr(0,10)); //取得開始日期
							let starttime = new Array(ui.startTime.substr(11,8)); //取得開始時間
							
							let start = startday[0] + 'T' + starttime; //開始日期時間
							let end = endday[0] + 'T' + endtime[0]; //結束日期時間
							let avgtem = '',maxtem = '',mintem = '',timaxtem = '',timintem = '',ran = '',phe = '';
							
							console.log(start + ',' + end+ ',' +dati);
							console.log(dati > start);
							console.log(dati < end);
							console.log(dati > start && dati < end);
							
							if (dati > start && dati < end){
								if (u == 0){
									avgtem = ui.elementValue.value; //平均溫度
									document.getElementById('T').innerHTML = avgtem + '°';
									console.log(avgtem);
								}else if (u == 3){
									maxtem = ui.elementValue.value; //最高溫度
									document.getElementById('Ma').innerHTML = maxtem+ '°';
									console.log(maxtem);
								}else if (u == 4){
									mintem = ui.elementValue.value; //最低溫度
									document.getElementById('Mi').innerHTML = mintem+ '°';
									console.log(mintem);
								}else if (u == 5){
									timaxtem = ui.elementValue.value; //最高體感溫度
									document.getElementById('TMa').innerHTML = timaxtem+ '°';
									console.log(timaxtem);
								}else if (u == 6){
									timintem = ui.elementValue.value; //最低體感溫度
									document.getElementById('TMi').innerHTML = timintem+ '°';
									console.log(timintem);
								}else if (u == 9){
									ran = ui.elementValue.value; //降雨機率
									if (ran == null){
										ran = 0;
									}
									document.getElementById('ran').innerHTML = '降雨' + ran + '%';
									console.log(ran);
								}else if (u == 12){
									phe = ui.elementValue[0].value; //天氣現象
									document.getElementById('phe').innerHTML = phe;
									console.log(phe);
								}
							}else{
								console.log('weather error');
								break;
							}
						}
					}
				}
			}
		});
	}
	/*------------------------------------------------*/	
	//取得裝置所在位置及縣市
	function position(){
		navigator.geolocation.getCurrentPosition(function(position) {
				console.log(position.coords.latitude); //緯度
				console.log(position.coords.longitude); //經度
				var lat = position.coords.latitude;
				var log = position.coords.longitude;
				
				let city = "https://maps.google.com/maps/api/geocode/json?latlng=" + lat + "," + log + "&language=zh-TW&sensor=true&key=AIzaSyCD9VLfvBjsilcQG4LX3x6jqUbx44bkJxs";
				let ct = "https://maps.google.com/maps/api/geocode/json?latlng=24.1031487,120.5211535&language=zh-TW&sensor=true&key=AIzaSyCD9VLfvBjsilcQG4LX3x6jqUbx44bkJxs";
				$.get(city,function (citydata){
					var mycity = citydata.plus_code.compound_code.substr(10,3);
					weather(mycity.replace('台','臺'));
				});
			});
		
	}
	
	/*------------------------------------------------*/
	//時間顯示補零
	function chengtime(x){
		if (x < 10){
			x = "0" + x;
		}
		return x;
	}
	/*------------------------------------------------*/	
	//星期數字轉為國字
	function we(w){
		var week = ['日','一','二','三','四','五','六'];
		return week[w];
	}
})

