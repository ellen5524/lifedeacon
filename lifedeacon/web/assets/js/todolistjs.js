var db = firebase.firestore();
var user = getCookieByName('user');
var ref = db.collection("user_list").doc(user).collection("todolist");
var modifycheck = true;

/*顯示存在資料庫的項目*/
window.addEventListener('load',function(){
	function showlist(){

		ref.orderBy('time','asc').get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				console.log(doc.id, doc.data());
				var listcontent = document.getElementById('listcontent'); //取得外部容器
				
				var list_item = document.createElement('div');
				list_item.className = "listitem";
				//依照已完成或未完成來顯示代辦清單
				if (doc.data().item_status == 'undone'){
					list_item.innerHTML = '<input class="listitemin" type="text" value="'+doc.data().content+'">';
				}else if (doc.data().item_status == 'done'){
					list_item.innerHTML = '<div class="completeitem">'+doc.data().content+'</div>';
				}
				
				var button_item = document.createElement('div');
				
				var list_modify = document.createElement('BUTTON'); //新增修改按鈕
				var list_delete = document.createElement('BUTTON'); //新增刪除按鈕
				var list_complete = document.createElement('BUTTON'); //新增完成按鈕
				
				list_modify.className = "listbutton_modify";
				list_modify.innerHTML = "修改";
				list_modify.setAttribute("onclick","upmo()");
				
				list_delete.className = "listbutton_delete";
				list_delete.innerHTML = "刪除";
				
				list_complete.className = "listbutton_complete";
				list_complete.innerHTML = "完成";
				
				button_item.appendChild(list_modify);
				button_item.appendChild(list_delete);
				button_item.appendChild(list_complete);
				
				list_item.appendChild(button_item);
				
				listcontent.appendChild(list_item);
				console.log(doc.data());
				
				
				/*--刪除舊有的項目--*/
				list_delete.onclick = function (){
					var devalue = list_delete.parentNode.parentNode.children[0].innerText;
					var dref = ref.doc(devalue);
					console.log('start delete');
					console.log(devalue);
					dref.delete().then(() => {
					  console.log('delete data successful');
					  list_item.parentNode.removeChild(list_item);
					});
				}
				
				/*--修改項目--*/
				list_modify.onclick = function (){
					console.log('modify start');
					
					//var oldcontent = getold();
					var oldcontent = doc.data().content;
					var newcontent = list_modify.parentNode.parentNode.children[0].value;
					var mref = ref.doc(oldcontent);
					console.log('newcontent=' + newcontent);
					console.log('oldcontent=' + oldcontent);
					mref.update({
					  content: newcontent,
					}).then(() => {
					  console.log('modify data successful');
					  alert('修改完成');
					});
				}
				
				/*--完成項目--*/
				list_complete.onclick = function(){
					console.log(doc.data().content);
					var cref = ref.doc(doc.data().content);
					cref.update({
					  item_status:'done',
					}).then(() => {
					  console.log('complete data successful');
					});
					list_item.innerHTML = '<div class="completeitem">'+doc.data().content+'</div>';
					list_item.appendChild(list_modify);
					list_item.appendChild(list_delete);
					list_item.appendChild(list_complete);
				}
				
			});
		}).catch(function(error) {
		console.log("提取文件時出錯:", error);
		});
	}
	showlist();
})

function addlist(){
	var addinput = document.getElementById('newlist').value.trim();
	if (addinput == ''){
		alert("還沒輸入記事喔!");
	}else{
		listtodo(addinput);
		document.getElementById('newlist').value = ""
	}
}

/*時間顯示補零*/
function chengtime(x){
	if (x < 10){
		x = "0" + x;
	}
	return x;
}

/*新增項目和顯示*/
function listtodo(list){
		let today = new Date();
		let h = chengtime(today.getHours());
		let m = chengtime(today.getMinutes());
		let s = chengtime(today.getSeconds());
		let y = today.getFullYear();
		let mon = today.getMonth() + 1;
		let d = today.getDate();
		let ndate = y + "-" + mon + "-" + d; //取得現在日期
		let ntime = h + ":" + m + ":" + s; //取得現在時間
		let dati = ndate+'T'+ntime;
		//console.log(today);
		//console.log(list);
		
		db.collection("user_list").doc(user).collection("todolist").doc(list).set({
			content: list,
			time: dati,
			item_status:'undone',
		}).then(() => {
			console.log('set data successful');
		})
		
		var ref = db.collection("user_list").doc(user).collection("todolist").doc(list);
		
		console.log(ref);
		
		ref.get().then(doc => {
			console.log(doc.data());
			var listcontent = document.getElementById('listcontent'); //取得外部容器
				
			var list_item = document.createElement('div'); //新增代辦事項
			var list_modify = document.createElement('BUTTON'); //新增修改按鈕
			var list_delete = document.createElement('BUTTON'); //新增刪除按鈕
			var list_complete = document.createElement('BUTTON'); //新增完成按鈕
			
			var button_item = document.createElement('div');
			
			list_modify.className = "listbutton_modify";
			list_modify.innerHTML = "修改";
			
			list_delete.className = "listbutton_delete";
			list_delete.innerHTML = "刪除";
			
			list_complete.className = "listbutton_complete";
			list_complete.innerHTML = "完成";
			
			list_item.className = "listitem";
			list_item.innerHTML = '<input class="listitemin" type="text" value="'+doc.data().content+'">';
			
			button_item.appendChild(list_modify);
			button_item.appendChild(list_delete);
			button_item.appendChild(list_complete);
			
			list_item.appendChild(button_item);

			listcontent.appendChild(list_item);
			
			/*--刪除新增的項目--*/
			list_delete.onclick = function (){
				console.log('start delete');
				ref.delete().then(() => {
				  console.log('delete data successful');
				  list_item.parentNode.removeChild(list_item);
				});
			}
			
			/*--修改項目--*/
			list_modify.onclick = function (){
				console.log('modify start');
				var newcontent = list_modify.parentNode.parentNode.children[0].value;
				console.log('newcontent=' + newcontent);
				console.log('oldcontent=' + list);
				ref.update({
				  content: newcontent,
				}).then(() => {
				  console.log('modify data successful');
				  alert('修改完成');
				});
			}
			
			/*--完成項目--*/
			list_complete.onclick = function(){
				console.log(doc.data().content);
				console.log(doc.data()["content"].content);
				ref.update({
				  item_status:'done',
				}).then(() => {
				  console.log('complete data successful');
				});
				list_item.innerHTML = '<div class="completeitem">'+doc.data().content+'</div>';
				list_item.appendChild(list_modify);
				list_item.appendChild(list_delete);
				list_item.appendChild(list_complete);
			}
			
		});
}

