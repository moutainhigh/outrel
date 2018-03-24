<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询员工虚拟组织关系表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}/js/platform/bizauth/vmuservmorgmap/queryVmuserVmorgMap.js"></script>
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 

</script>

</head>
<body style="background-color:#FFFFFF">
<!-- 列表按钮操作 start -->
	<div id="tableToolbar" class="tableToolbar" style="display:none;">
		 <!--   <shiro:hasPermission name="platform/bizauth/vmuservmorgmap/queryVmuserVmorgMap:add">  -->
		  	<a href="javascript:void(0)" onclick="toAddData()" index="0">新增</a>
		 <!-- </shiro:hasPermission> -->
	  	<!-- <shiro:hasPermission name="platform/bizauth/vmuservmorgmap/queryVmuserVmorgMap:modify"> -->
		  	<a href="javascript:void(0)" onclick="toUpdateData()" index="1">修改</a>
		<!--  </shiro:hasPermission>  -->
		<!--  <shiro:hasPermission name="platform/bizauth/vmuservmorgmap/queryVmuserVmorgMap:delete">  -->
		  	<a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>
		<!--  </shiro:hasPermission> -->
	  </div>
<!-- 列表按钮操作 end -->

	
	<!-- 页面初始化 需要的 div -->


</body>
<!-- 相关js方法 -->	
<script>
	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 用户ID ', code : 'userId', width : 200,  type:'text'}
			,{display : '虚拟组织代码 ', code : 'orgId', width : 200,  type:'text'}
	        ,{display : ' 虚拟树类型', code : 'orgType', width : 200,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 用户ID ', code : 'userId', width : 100, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.userId+"</a>";
				    }	 
			 }
			,{display : '虚拟组织代码 ', code : 'orgId', width : 100, align : 'left', type:'text', isOrder : false}
			,{display : ' 虚拟树类型 ', code : 'orgType', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			
			url : "${basePath}vmuserVmorgMap/queryListVmuserVmorgMap"+(orgId!=null?("?orgId="+orgId):""),
			toolbar:[{"text":"新增","action":toAddData}
					,{"text":"修改","action":toUpdateData}
					,{"text":"删除","action":deleteData}
					],
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id"
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#userTableDiv").newSearchIframe(searchIframe);
		iframe.show();
	}
	
	$(document).ready(function(){
		initFn();
	});
	
</script> 
</html>

<input type="hidden" id="orgId" name="orgId" value="${param.orgId}"/>
<div id="userTableDiv"></div>
