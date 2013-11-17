// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>';

/***** 定義一些功能 *****/

// 插入新項目到 <ul> 裡。
// content：項目內容，可能是空的 (undefined)
//
var insert = function(content){
	var newLi = $(tmpl).prependTo('.main');
	debugger
	if(content !== undefined){
    // TODO:
    // content 改成了 {isDone: 是否完成, text: 原本的文字}；
    // 若 content.isDone，則在 <li> 上加上「is-done」class。
    // 把 <span> 裡的文字設成 content.text。
	    	if (content.status === 'un-done') {
	    		newLi.find('span').text(content.text);
	    		newLi.addClass('un-done');
	    	}
	    	else{
	    		newLi.find('span').text(content.text);
	    		newLi.addClass('is-done');
	    	}
    console.log( newLi.find('span').text(content));
  }else{
  	newLi.addClass('is-editing');
  	newLi.addClass('un-done');

  	newLi.find('input').focus();
  }
};

// save object
function SaveObject(status , text){
	this.status = status;
	this.text = text;
}

// 把整個表存進 localStorage
//
var save = function(){

  // 準備好要裝各個項目的空陣列
  var arr = [];
  var doneArr = [];

  $('ul.main').find('li').each(function(){
  	debugger
  	var className = $(this).attr('class');
  	console.log($(this).attr('class'));
  	if (className ==='un-done') {
  		var saveObject = new SaveObject('un-done',$(this).text());
    		arr.unshift(saveObject);
  	}
	else{
		var saveObject = new SaveObject('is-done',$(this).text());
    		arr.unshift(saveObject);
	}
  });

  // $('ul li.un-done').find('span').each(function(){

  //   // 把 <span> 裡的文字放進陣列裡
  //   // TODO: 存進陣列的改成 {isDone: 是否完成, text: 原本的文字}
  //   console.log( $(this).text());
  //   var saveObject = new SaveObject('un-done',$(this).text());
  //   arr.unshift(saveObject);
  // });
  // // 對於 <ul> 裡的每一個 <span>
  // $('ul li.is-done').find('span').each(function(){
  // 	debugger
  //   // 把 <span> 裡的文字放進陣列裡
  //   // TODO: 存進陣列的改成 {isDone: 是否完成, text: 原本的文字}
  //   var saveObject = new SaveObject('is-done',$(this).text());
  //   arr.unshift(saveObject);
  // });

  // 把陣列轉成 JSON 字串後存進 localStorage
  console.log('saving', arr);
  localStorage.todoItems = JSON.stringify(arr);
};

// 從 localStorage 讀出整個表，放進 <ul>
//
var load = function(){

  // 從 localStorage 裡讀出陣列 JSON 字串
  var arr, i;
  if(localStorage.todoItems){

    // 把 JSON 字串轉回陣列
    arr = JSON.parse(localStorage.todoItems);
    // arr.reverse();
    // 對於陣列裡的每一個項目
    console.log('loading', arr);
    for(i=0; i<arr.length; i+=1){
      // 插入此項目到 <ul> 裡
      insert(arr[i]);
    }
  }
};

/***** 設定事件 *****/

// 點擊按鈕時，插入新項目
//
$('#add').click(function(){

	insert();
});

// 按 Enter 鍵時完成編輯並存檔
//
$('ul').on('keyup', 'input', function(e){
	if(e.which === 13){
		var input = $(e.target),
		li = input.parents('.is-editing');

		li.find('span').text(input.val());
		li.removeClass('is-editing');
		save();
	}
});

// 從 localStorage 讀出整個表，放進 <ul>
load();

// 課堂練習一：
// 讓三個 <ul> 變成 connected sortable.
//
var sortableLists = $('.connected'), // 三個 <ul>
    placeholder = $('#placeholder'); // 三個 <ul> 的容器

    sortableLists.sortable({
    	connectWith: '.connected',
    	tolerance: 'pointer'
    }).disableSelection();

// 課堂練習二：
// 拖曳開始時，在 #placeholder 上增加「is-dragging」class
//
sortableLists.on('sortstart', function(){
	placeholder.addClass('is-dragging');
}).on('sortstop', function(){

  // 拖曳結束時，從 #placeholder 移除「is-dragging」class
  //
  placeholder.removeClass('is-dragging');
});


// 課堂練習三：
// 當 .delete 收到一個 <li> 時，把此 <li> 移除
//
$('.delete').on('sortreceive', function(e, ui){
	ui.item.remove();

  // 把整個表存進 localStorage
  save();
});

// 課堂練習四：
//
// 當 .done 收到一個 <li> 時，把此 <li> 放到 .main 裡
$('.done').on('sortreceive',function(e,ui){
	$(ui.item).appendTo('.main');
	ui.item.removeClass('un-done');
	ui.item.addClass('is-done');
	save();
})
// 把這個 <li> 加上「is-done」class
// 把整個表存進 localStorage








