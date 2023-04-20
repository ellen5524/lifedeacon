var url = "draw.json"; /*JSON檔來源：https://github.com/you2245g/jsUnderground/blame/master/LV14-Draw/draw.json*/
var count = 0;

/*--抽籤--*/
function drawgo(){
	var mydraw = getrand(0,99);
	var draw_num = mydraw + 1;
	document.getElementById('new_draw').innerHTML = '你抽到第' + turnch(draw_num) + '籤';
	document.getElementById('draw_bu').setAttribute("disabled","disabled");
	document.getElementById('toss_bu').removeAttribute("disabled");
	return mydraw;
}

/*--擲筊--*/
function tossgo(control){
	var c = control;
	var control = false;
	if (c == true){
		c = false;
		//0為正，1為反。01、10聖筊，00陰筊，11笑筊
		var leri = ['pos','neg'];
		var letoss = getrand(0,1);
		document.getElementById('left_img').innerHTML = '<img src="images/left_' + leri[letoss] + '.png">';
		var ritoss = getrand(0,1);
		document.getElementById('right_img').innerHTML = '<img src="images/right_' + leri[ritoss] + '.png">';

		if (letoss != ritoss){
			count++;
			document.getElementById('count_toss').innerHTML = '你擲了' + count + '次聖筊';
			console.log(count);
			if (count == 3){
				count = 0;
				control = true;
				document.getElementById('toss_bu').setAttribute("disabled","disabled");
				document.getElementById('showcontent').setAttribute("style","opacity:1;");
				document.getElementById('showcontent').removeAttribute("disabled");
				$.get(url,function (dr){
					var draw_co = drawgo();
					var drawList = dr[draw_co].drawList; //第幾簽
					var drawTitle = dr[draw_co].drawTitle; //甲甲
					var fate = dr[draw_co].fate; //大吉
					var explan = dr[draw_co].explan; //籤詩內容
					var mean = dr[draw_co].mean; //聖意
					var poem = dr[draw_co].poem; //解曰
					document.getElementById('draw_down').innerHTML = '<span>' + drawList + '</span>&emsp;&emsp;<span>' + drawTitle + '</span><br><br><span class="daikiji">' + fate + '</span><br><br><span>【籤詩內容】</span><p>' + explan + '</p><span>【聖意】</span><p>' + mean + '</p><span>【解曰】</span><p>' + poem + '</p>';
				});
			}
		}else if (letoss == ritoss){
			document.getElementById('toss_bu').setAttribute("disabled","disabled");
			document.getElementById('draw_bu').removeAttribute("disabled");
			count = 0;
			document.getElementById('count_toss').innerHTML = '你擲了' + count + '次聖筊';
		}
	}
}

/*--取亂數--*/
function getrand(min,max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

/*--轉中文數字--*/
function turnch(num){
	var x = num % 10;
	var y = num / 10;
	var ch = ['百','一','二','三','四','五','六','七','八','九','十',];
	if (num == 100){
		return ch[1] + ch[0];
	}else if (x == 0){ //10的倍數
		if (y == 1){
			return ch[10];
		}else{
			return ch[y] + ch[10];
		}
	}else if (x != 0){
		if (y < 1){ //小於10
			return ch[x];
		}else if (y >= 1){ //大於10
			if (y > 2){ //21以後
				var ten = Math.floor(y);
				return ch[ten] + ch[10] + ch[x];
			}else{ //11~19
				return ch[10] + ch[x];
			}
		}
	}
}

