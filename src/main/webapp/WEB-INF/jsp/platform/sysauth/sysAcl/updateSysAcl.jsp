<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改操作权限控制表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.platform.sysauth.sysacl.controller.SysAclController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色ID ：</th>
  <td > 
  <input type="text" class="text" id="dtoroleId" name="roleId" notNull="false" maxLength="11" value="${dto.roleId}" />
  </td>
  <th> 资源ID ：</th>
  <td > 
  <input type="text" class="text" id="dtoresoureId" name="resoureId" notNull="false" maxLength="11" value="${dto.resoureId}" />
  </td>
  <th> 1可访问，0拒 ：</th>
  <td > 
  <input type="text" class="text" id="dtoaccessibility" name="accessibility" notNull="false" maxLength="11" value="${dto.accessibility}" />
  </td>
</tr>
<tr>
  <th> 应用ID，备用 ：</th>
  <td > 
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="${dto.appId}" />
  </td>
  <th> 乐观锁 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="${dto.version}" />
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
	});
</script>
  
</html>
