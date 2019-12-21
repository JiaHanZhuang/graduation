package com.zjh.graduationproject.service.admin;

import com.zjh.graduationproject.pojo.Admin;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/17
 */
public interface AdminService {


    Map<String,Object> login(Admin admin);


    Map<String,Object> install();


}
