package com.jy.modules.externalplatform.interfacerepository.suanhuazx.extwlshsrassets.dto;

import com.jy.platform.core.common.BaseDTO;
/**
 *@Description:算话人行结构化版(资产处置信息表)
 *@author Administrator
 *@version 1.0,
 *@date 2017-12-21 19:52:42
 */
public class ExtWlShSrAssetsDTO extends BaseDTO{

	private static final long serialVersionUID = 1L;

	/**主键ID*/
	private Long id;

	/**征信主表ID*/
	private Long fkReportId;

	/**信息详情*/
	private String original;

	/**资产管理公司*/
	private String company;

	/**债务接收日期*/
	private String debtDate;

	/**接收的债权金额*/
	private String debtAmount;

	/**最后一次还款日期*/
	private String lastRepayment;

	/**余额*/
	private String balance;

	/**是否失败(0-成功;1-失败)*/
	private String isfail;

	/**创建时间*/
	private java.sql.Timestamp createTime;

	/**修改时间*/
	private java.sql.Timestamp modifyTime;

	/**数据有效性*/
	private String validateState;

	/**创建人*/
	private Long createBy;

	/**修改人*/
	private Long updateBy;

	/**
	 *方法: 获得id
	 *@return: java.lang.Long  id
	 */
	public Long getId(){
		return this.id;
	}

	/**
	 *方法: 设置id
	 *@param: java.lang.Long  id
	 */
	public void setId(Long id){
		this.id = id;
	}

	/**
	 *方法: 获得fkReportId
	 *@return: java.lang.Long  fkReportId
	 */
	public Long getFkReportId(){
		return this.fkReportId;
	}

	/**
	 *方法: 设置fkReportId
	 *@param: java.lang.Long  fkReportId
	 */
	public void setFkReportId(Long fkReportId){
		this.fkReportId = fkReportId;
	}

	/**
	 *方法: 获得original
	 *@return: java.lang.String  original
	 */
	public String getOriginal(){
		return this.original;
	}

	/**
	 *方法: 设置original
	 *@param: java.lang.String  original
	 */
	public void setOriginal(String original){
		this.original = original;
	}

	/**
	 *方法: 获得company
	 *@return: java.lang.String  company
	 */
	public String getCompany(){
		return this.company;
	}

	/**
	 *方法: 设置company
	 *@param: java.lang.String  company
	 */
	public void setCompany(String company){
		this.company = company;
	}

	/**
	 *方法: 获得debtDate
	 *@return: java.lang.String  debtDate
	 */
	public String getDebtDate(){
		return this.debtDate;
	}

	/**
	 *方法: 设置debtDate
	 *@param: java.lang.String  debtDate
	 */
	public void setDebtDate(String debtDate){
		this.debtDate = debtDate;
	}

	/**
	 *方法: 获得debtAmount
	 *@return: java.lang.String  debtAmount
	 */
	public String getDebtAmount(){
		return this.debtAmount;
	}

	/**
	 *方法: 设置debtAmount
	 *@param: java.lang.String  debtAmount
	 */
	public void setDebtAmount(String debtAmount){
		this.debtAmount = debtAmount;
	}

	/**
	 *方法: 获得lastRepayment
	 *@return: java.lang.String  lastRepayment
	 */
	public String getLastRepayment(){
		return this.lastRepayment;
	}

	/**
	 *方法: 设置lastRepayment
	 *@param: java.lang.String  lastRepayment
	 */
	public void setLastRepayment(String lastRepayment){
		this.lastRepayment = lastRepayment;
	}

	/**
	 *方法: 获得balance
	 *@return: java.lang.String  balance
	 */
	public String getBalance(){
		return this.balance;
	}

	/**
	 *方法: 设置balance
	 *@param: java.lang.String  balance
	 */
	public void setBalance(String balance){
		this.balance = balance;
	}

	/**
	 *方法: 获得isfail
	 *@return: java.lang.String  isfail
	 */
	public String getIsfail(){
		return this.isfail;
	}

	/**
	 *方法: 设置isfail
	 *@param: java.lang.String  isfail
	 */
	public void setIsfail(String isfail){
		this.isfail = isfail;
	}

	/**
	 *方法: 获得createTime
	 *@return: java.sql.Timestamp  createTime
	 */
	public java.sql.Timestamp getCreateTime(){
		return this.createTime;
	}

	/**
	 *方法: 设置createTime
	 *@param: java.sql.Timestamp  createTime
	 */
	public void setCreateTime(java.sql.Timestamp createTime){
		this.createTime = createTime;
	}

	/**
	 *方法: 获得modifyTime
	 *@return: java.sql.Timestamp  modifyTime
	 */
	public java.sql.Timestamp getModifyTime(){
		return this.modifyTime;
	}

	/**
	 *方法: 设置modifyTime
	 *@param: java.sql.Timestamp  modifyTime
	 */
	public void setModifyTime(java.sql.Timestamp modifyTime){
		this.modifyTime = modifyTime;
	}

	/**
	 *方法: 获得validateState
	 *@return: java.lang.String  validateState
	 */
	public String getValidateState(){
		return this.validateState;
	}

	/**
	 *方法: 设置validateState
	 *@param: java.lang.String  validateState
	 */
	public void setValidateState(String validateState){
		this.validateState = validateState;
	}

	/**
	 *方法: 获得createBy
	 *@return: java.lang.Long  createBy
	 */
	public Long getCreateBy(){
		return this.createBy;
	}

	/**
	 *方法: 设置createBy
	 *@param: java.lang.Long  createBy
	 */
	public void setCreateBy(Long createBy){
		this.createBy = createBy;
	}

	/**
	 *方法: 获得updateBy
	 *@return: java.lang.Long  updateBy
	 */
	public Long getUpdateBy(){
		return this.updateBy;
	}

	/**
	 *方法: 设置updateBy
	 *@param: java.lang.Long  updateBy
	 */
	public void setUpdateBy(Long updateBy){
		this.updateBy = updateBy;
	}

}