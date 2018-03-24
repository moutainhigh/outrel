<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript2.jsp"%>
<title>修改数据字典</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
		<br />
		<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true"
			action="com.jy.modules.platform.sysdict.sysdict.controller.SysDictController">
			<input type="hidden" class="text" id="dtoid" name="id"
				notNull="false" maxLength="11" value="${dto.id}" />
			<table id="updateNewsTableId" class="formTableSwap" border="0"
				align="center" cellpadding="0" cellspacing="1">
				<tr>
					<th>数据字典名称 ：</th>
					<td><input type="text" class="text" id="dtodictName"
						name="dictName" notNull="false" maxLength="25"
						value="${dto.dictName}" /></td>
				</tr>
				<tr>
					<th>数据字典编码：</th>
					<td><input type="text" class="text" id="dtodictCode"
						name="dictCode" notNull="false" maxLength="25"
						value="${dto.dictCode}" readonly/></td>
				</tr>
				<tr>
					<th>数据字典类型：</th>
					<td><input type='hidden' id="dictType" name="dictType"
						value='${dto.dictType}' /> <c:if test="${dto.dictType==0}">
							<input class="text" value='系统级' readonly />
						</c:if> <c:if test="${dto.dictType==1}">
							<input class="text" value='项目级' readonly />
						</c:if></td>
				</tr>
				<%-- <tr>
  <th> 乐观锁 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="${dto.version}" />
  </td>
</tr> --%>
			</table>

			<!-- 保存 关闭 按钮 在 查询页面进行控制 -->
		</form>

	</div>

</body>

<script type="text/javascript">
	$(document).ready(function() {
		checkedInit();
	});
</script>

</html>
