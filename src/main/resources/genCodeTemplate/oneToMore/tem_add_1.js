//utf-8
/**
*	对应jsp 页面中的js 只存放 $(document).ready(function(){ ... });
*
**/
function closeWindow(v_urlJspOfTab){
	var v_tabid = window.parent.$("#framecenter").contents().find(".l-selected").attr("tabid");
	//关闭当前选中的tab页
	window.parent.tab.removeTabItem(v_tabid);
	
}

function nextOperate(){
	//所有的验证通过后才进行表单的提交
	var v_boolean = $("#newsForm").validationEngine("validate");
	if(v_boolean){
		$("#nextBtn").attr("disabled",true);
		document.newsForm.submit();
	}
}