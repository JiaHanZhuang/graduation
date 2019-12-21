package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zjh
 * @date 2019/10/17
 */
public interface AdminDao extends JpaRepository<Admin,Integer> {

    /**
     * 根据账户和密码查询管理员
     * @param username 管理员账号
     * @param password 密码
     * @return 管理员信息
     */
    Admin findAdminByUsernameAndPassword(String username,String password);

}
