//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTQuotaManagement/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTQuotaManagement/insertLbTQuotaManagement';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaManagement/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTQuotaManagement/updateLbTQuotaManagement';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTQuotaManagement/deleteLbTQuotaManagement?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaManagement/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//变更额度状态
function toUpdateLimitState(state){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	var state2="";
	if(state==1){
		state2="启用"
	}else if(state==2){
		state2="暂停"
	}else if(state==3){
		state2="作废"
	}
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	if(v_objs.length<1){
		$("").newMsg({}).show("请选择需要操作的数据！");
	}else{
		for(var i=1;i<v_objs.length;i++){
			if(v_objs[0].limitState!=v_objs[i].limitState){
				$("").newMsg({}).show("请选择相同状态的数据进行操作！");
				break;
				return;
			}
		}
	}
	
	if(state==1&&v_objs[0].limitState!='2'){
		$("").newMsg({}).show("只能启用暂停状态的额度！");
		return;
	}
	if(state==2&&v_objs[0].limitState!='1'){
		$("").newMsg({}).show("只能暂停生效状态的额度！");
		return;
	}
	if(state==3&&!(v_objs[0].limitState=='2'||v_objs[0].limitState=='1')){
		$("").newMsg({}).show("只能作废生效暂停状态的额度！");
		return;
	}
	
	var limitNoes="";
	for(var i=0;i<v_objs.length;i++){
		limitNoes=limitNoes+v_objs[i].limitNo+","
	}
	limitNoes=limitNoes.substring(0, limitNoes.length-1)
	
	jyDialog().confirm("您确认将该额度置为"+state2+"?", function(){
		var url= contextRootPath+"/lbTQuotaManagement/updateLimitState?ids="+v_ids+"&limitState="+state
				+"&oldLimitState="+v_objs[0].limitState+"&limitNoes="+limitNoes;
		jyAjax(url,"",function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
		},"","",false);
	})
	
}


//查看明细
function viewDataDetail(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaManagement/prepareExecute/toViewDetail?id='+vId,
			'width':1200,
			'height':650,
			'title':'额度详情',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//查看明细
function testx(){
	$.ajax({
        type:"POST",
        dataType:"json",
        url:contextRootPath+"/testControl/testx",
        success:function(msg){
        	$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
        		
        	}
        }
    });
}