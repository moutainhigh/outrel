<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询用户权限</title>
</head>
<body>
	<form action="<%=request.getContextPath()%>/testTable1/queryUserPrvPage" method="post">
		用户ID:<input name="id" value="">
		<input type="submit" value="查询" />
	</form>
</body>
</html>