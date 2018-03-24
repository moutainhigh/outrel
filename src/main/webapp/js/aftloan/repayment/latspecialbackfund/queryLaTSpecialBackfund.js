//utf-8
//点击新增按钮 事件跳转至 新增页面
//var dialogAdd;
var dialogUpdate;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=backfund',
			'width':1100,
			'height':750,
			'title':'查询贷款信息',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}
//下一步
function openNextPage(){
	var selectIds = addDlg1.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var claimKind = addDlg1.getIframe().getClaimKind();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
	var contractSrc = addDlg1.getIframe().getSelectedContractSrc();
	var contractCode = addDlg1.getIframe().getSelectedObjss("contractCode");
	//判断合同来源是否有特殊不可新增操作的
	var  url = contextRootPath+"/LaTContractConfigure/queryByserialAndContractno?typeSerial=08&conSerial="+contractSrc+"&contractCode="+contractCode;
	var falg = false;
	var error;
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(msg){
			if(msg.indexOf('ok') >-1){
				falg=false;
			}else{
				falg=true;
				error = msg;
			}
		}
	});
	
	if(falg){
		 jyDialog({"type":"warn"}).alert(error);
		 return ; 
	}
	
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTSpecialBackfund/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增退款信息',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}
//上一步
function openPrevPage() {
	addDlg2.close();
	toAddData();
}

//页面录入的减免金额与核心返回的金额比较
function checkMax(value,element){
	var hiddenId=$(element).attr("extendId");
	hiddenValue=$("#"+hiddenId).val();
	if(undefined!=hiddenValue&&(hiddenValue+"").length<1){
		hiddenValue=0;
	}
	 if(Number(value)>Number(hiddenValue)){
		return hiddenValue;
	 }
	 return -1;
} 
function checkAmount(value){
	if((value+"").length<1){
		return false;
	}
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if(patrn.test(value)){
		return true;
	}else{
		return false;
	}
}
//新增页面的保存操作
function doAddFrom(){
	/*delete by liuyu at 170524 该放款机构理财人-华瑞放款可做特殊退款
	var dtocontractSource=$(addDlg2.iframe.contentDocument.getElementById("dtocontractSource")).val();
	
	if(dtocontractSource == "01"){
		 jyDialog({"type":"warn"}).alert("该放款机构理财人-华瑞放款不可做特殊退款");
		 return ;
	}*/
	
	//序列化 新增页面的form表单数据
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	
	var url=contextRootPath+'/laTSpecialBackfund/insertLaTSpecialBackfund';
	
	var contractId = $(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	if(contractId =="" || contractId==null){
		jyDialog({"type":"warn"}).alert("对不起，您还没有选择合同信息，请先选择合同信息再进行保存操作！");
		return;	
	}
	
	var status = '0';
	var msg = "";
	$.ajax({
		type:"POST",
		dataType:"json",
		url:contextRootPath+'/laTSpecialBackfund/checkWhetherExists?contractId='+contractId,
		async:false,
		success:function(obj){
			status = obj.status;
			msg = obj.msg;
		}
	});
	
	if('1' == status){
		 jyDialog({"type":"warn"}).alert(msg);
		 return ; 
	}
	
	var dtorefundAmount = $(addDlg2.iframe.contentDocument.getElementById("dtorefundAmount")).val();
	if(!checkAmount(dtorefundAmount)){
		jyDialog({"type":"warn"}).alert("退款金额格式不正确！");
		return;
	}
	if(Number(dtorefundAmount) <= 0){
		jyDialog({"type":"warn"}).alert("退款金额需大于0！");
		return;
	}

	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		addDlg2.close();
        	}
  	});
}

//修改 事件
//function toUpdateData(){
//	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
//	
//	//如果没有选中 数据则
//	if(v_ids == ""){
//		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
//		return;
//	}
//	//如果选择多个 择提示
//	if(v_ids.indexOf(",") > -1){
//		jyDialog({"type":"warn"}).alert("请选择一条数据！");
//		return;
//	}
//
//	var dialogStruct={
//			'display':contextRootPath+'/laTBackfund/prepareExecute/toUpdate?id='+v_ids,
//			'width':800,
//			'height':500,
//			'title':'修改退款信息',
//			'buttons':[
//             {'text':'保存','action':doUpdateFrom,'isClose':false},
//			 {'text':'关闭','isClose':true}
//			]
//		};
//		
//	dialogUpdate = jyDialog(dialogStruct);
//	dialogUpdate.open();
//}
//修改页面 的 保存操作
//function doUpdateFrom(){
//	//序列化 新增页面的form表单数据
//	var form=document.getElementById("updateNewsFormData");
//	var params=$(form).serialize();
//	var url=contextRootPath+'/laTBackfund/updateLaTBackfund';
//	//通过ajax保存
//	jyAjax(
//		url,
//		params,
//		function(msg){
//			//保存成功后，执行查询页面查询方法
//			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
//        	var v_status = msg.status;
//        	if(v_status.indexOf('ok') >-1){
//        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
//        		queryData();
//        		dialogUpdate.close();
//        	}
//  	});
//}
//上传文件
function toUploadFile(){
	//getValueForIndex("listStat",);
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	
//	var objs = iframe.iframeObj["table"].getSelectedObjs();
//	if(objs.length){
//		if("01"!=objs[0]["listStat"]){
//			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
//			return;
//		}
//	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=17",
			'width':1100,
			'height':800,
			'title':'上传',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		if(objs[0]["listStat"]!="01"){
			jyDialog({"type":"warn"}).alert("只能删除单据状态为初始录入的数据！");
			return;
		}else{
			$.ajax({
	            type:"POST",
	            url:contextRootPath+"/laTSpecialBackfund/deleteLaTSpecialBackfund?ids="+v_ids,
	            success:function(date){
	            	var msg = $.parseJSON(date);
	            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		iframe.iframeObj["table"].removeSelectedRow();
	            	}
	            }
	        });
		}
		 
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTBackfund/deleteLaTBackfund?ids="+v_ids,
            success:function(date){
            	var msg = $.parseJSON(date);
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}

function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");;
	var v_url =contextRootPath+"/dojbpm/jbpmSpecialbackfund/startAdvfinishedWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:v_url,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
	 },"确认提示");
	
	/*if(confirm("您确认要提交选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:v_url,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}

function checkUpload(objs) {
	var isUpload = false;
  	var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+objs[0]["listId"] + "&listType=17";
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(msg){
			if(msg.indexOf('ok') >-1){
				isUpload = true;
			} else {
				isUpload = false;
			}
		}
	});
	return isUpload;
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTSpecialBackfund/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':600,
			'title':'查看退款信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//查看附件
function checkUploadFile(v_ids){	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=17",
			'width':1000,
			'height':800,
			'title':'附件查看',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}