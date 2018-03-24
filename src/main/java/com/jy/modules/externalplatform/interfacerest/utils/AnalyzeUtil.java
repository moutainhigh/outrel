package com.jy.modules.externalplatform.interfacerest.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.jy.modules.common.util.JsonUtil;

public class AnalyzeUtil {

	public static Element parseXml(String xml, String nodeName) throws Exception{
		Document document = DocumentHelper.parseText(xml);
		//获取根节点
		Element root = document.getRootElement();
		Iterator it = root.elementIterator();
		while (it.hasNext()) {
			//获取cisReport节点
			Element cisReport = (Element) it.next();
			Iterator cisreports = cisReport.elementIterator();
			while (cisreports.hasNext()) {
				Element ele = (Element) cisreports.next();
				if(ele.getName().equals(nodeName)){
					return ele;
				}
			}
		}
		return null;
	}

	/**
	 * JSON转换为对象
	 * @param respXml
	 * @return
	 * @throws Exception 
	 */
	public static JSONObject JSONToObject(String respXml,String nodeName) throws Exception{
		JSONObject rootJson = null;
		try {
			JSON json = JsonUtil.getJSONFromXml(respXml);
			JSONObject respObj = JSONObject.fromObject(json.toString());
			rootJson = respObj.getJSONObject("cisReport");
		} catch (Exception e) {
			throw new Exception(nodeName+"数据解析异常！",e);
		}
		return rootJson;
	}

	/**
	 * 将Map对象通过反射机制转换成Bean对象
	 * 
	 * @param map 存放数据的map对象
	 * @param clazz 待转换的class
	 * @return 转换后的Bean对象
	 * @throws Exception 异常
	 */
	public static Object mapToBean(Map<String, Object> map, Class clazz) throws Exception {
		Object obj = clazz.newInstance();
		if(map != null && map.size() > 0) {
			for(Map.Entry<String, Object> entry : map.entrySet()) {
				String propertyName = entry.getKey();
				Object value = entry.getValue();
				String setMethodName = "set"+ propertyName.substring(0, 1).toUpperCase()+ propertyName.substring(1);
				Field field = getClassField(clazz, propertyName);
				Class fieldTypeClass = field.getType();
				value = convertValType(value, fieldTypeClass);
				clazz.getMethod(setMethodName, field.getType()).invoke(obj, value);
			}
		}
		return obj;
	}


	/**
	 * 将Object类型的值，转换成bean对象属性里对应的类型值
	 * 
	 * @param value Object对象值
	 * @param fieldTypeClass 属性的类型
	 * @return 转换后的值
	 */
	private static Object convertValType(Object value, Class fieldTypeClass) {
		Object retVal = null;
		if(Long.class.getName().equals(fieldTypeClass.getName())
				|| long.class.getName().equals(fieldTypeClass.getName())) {
			retVal = Long.parseLong(value.toString());
		} else if(Integer.class.getName().equals(fieldTypeClass.getName())
				|| int.class.getName().equals(fieldTypeClass.getName())) {
			retVal = Integer.parseInt(value.toString());
		} else if(Float.class.getName().equals(fieldTypeClass.getName())
				|| float.class.getName().equals(fieldTypeClass.getName())) {
			retVal = Float.parseFloat(value.toString());
		} else if(Double.class.getName().equals(fieldTypeClass.getName())
				|| double.class.getName().equals(fieldTypeClass.getName())) {
			retVal = Double.parseDouble(value.toString());
		} else {
			retVal = value;
		}
		return retVal;
	}

	/**
	 * 获取指定字段名称查找在class中的对应的Field对象(包括查找父类)
	 * 
	 * @param clazz 指定的class
	 * @param fieldName 字段名称
	 * @return Field对象
	 */
	private static Field getClassField(Class clazz, String fieldName) {
		if( Object.class.getName().equals(clazz.getName())) {
			return null;
		}
		Field []declaredFields = clazz.getDeclaredFields();
		for (Field field : declaredFields) {
			if (field.getName().equals(fieldName)) {
				return field;
			}
		}
		Class superClass = clazz.getSuperclass();
		if(superClass != null) {// 简单的递归一下
			return getClassField(superClass, fieldName);
		}
		return null;
	}  

	/***
	 * 解析节点匹配
	 * @param ele
	 * @param entity
	 * @return
	 * @throws Exception 
	 */
	public static Object  parseToEntity(Element element ,Class<?> entity) throws Exception{
		Object obj = null ;
		if(element!=null){
			List<Element> eles = element.elements();
			if(eles.size()>0){
				Map<String, Object> map = new HashMap<String, Object>();
				for(int i = 0; i < eles.size(); i++) {
					Element child = (Element)eles.get(i);
					map.put(child.getName(), child.getTextTrim());
				}
				obj = mapToBean(map, entity);
			}
		}
		return obj;
	}
	
	/***
	 * 数据节点解析
	 * @param ele
	 * @param nodeName
	 * @param entity
	 * @throws Exception 
	 */
	public static List<Object> ananalysisXmlInfo(Element ele ,Class<?> entity) throws Exception{
		List<Object> objs = new ArrayList<Object>();
		Object classz = entity.newInstance();
		Iterator<Element> itm = ele.elementIterator("item");
		while (itm.hasNext()) {
			Element thre = (Element) itm.next();
			classz =  AnalyzeUtil.parseToEntity(thre, entity);
			objs.add(classz);
		}
		return objs;
	}
	
	

	/***
	 * 数据节点解析
	 * @param ele
	 * @param nodeName
	 * @param entity
	 * @throws Exception 
	 */
	public static Object ananalysisXmlInfo(Element ele,String nodeName ,Class<?> c  ) throws Exception{
		Object	obj = c.newInstance();
		Iterator<Element> itm = ele.elementIterator("item");
		while (itm.hasNext()) {
			//此处一般只有0-1个节点，所以不必返回集合
			Element thre = (Element) itm.next();
			obj =  AnalyzeUtil.parseToEntity(thre,c);
		}
		return obj;
	}

	

}
