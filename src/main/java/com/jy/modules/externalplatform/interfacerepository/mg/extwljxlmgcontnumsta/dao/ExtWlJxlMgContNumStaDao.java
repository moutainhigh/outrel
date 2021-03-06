package com.jy.modules.externalplatform.interfacerepository.mg.extwljxlmgcontnumsta.dao;

import java.util.List;
import java.util.Map;

import com.jy.modules.externalplatform.interfacerepository.mg.extwljxlmgcontnumsta.dto.ExtWlJxlMgContNumStaDTO;

import com.jy.platform.core.mybatis.MyBatisRepository;
/**
 * @classname: ExtWlJxlMgContNumStaDao
 * @description: 定义  蜜罐联系人数表 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ExtWlJxlMgContNumStaDao {
    
    /**
     * @author Administrator
     * @description: 分页查询蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param searchParams
     * @return
     */
    public List<ExtWlJxlMgContNumStaDTO> searchExtWlJxlMgContNumStaByPaging(Map<String, Object> searchParams) ;
    
    /**
     * @author Administrator
     * @description:查询对象蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param searchParams
     * @return
     */
    public List<ExtWlJxlMgContNumStaDTO> searchExtWlJxlMgContNumSta(Map<String, Object> searchParams);

    /**
     * @author Administrator
     * @description:查询对象蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param id
     * @return
     */
    public ExtWlJxlMgContNumStaDTO findExtWlJxlMgContNumStaByPrimaryKey(String id);
    
    /**
     * @author Administrator
     * @description: 新增对象蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param paramMap
     * @return
     */
    public int insertExtWlJxlMgContNumSta(Map<String, Object> paramMap);
    
    /**
     * @author Administrator
     * @description: 更新对象蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param paramMap
     */
    public void updateExtWlJxlMgContNumSta(Map<String, Object> paramMap);
     
    /**
     * @author Administrator
     * @description: 按主键删除蜜罐联系人数表
     * @date 2018-01-09 17:44:13
     * @param ids
     * @return
     */ 
    public void deleteExtWlJxlMgContNumStaByPrimaryKey(Map<String, Object> paramMap);
    
    
}
