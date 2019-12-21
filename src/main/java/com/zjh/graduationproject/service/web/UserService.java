package com.zjh.graduationproject.service.web;

import com.zjh.graduationproject.pojo.User;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/20
 */
public interface UserService {


    Map<String,Object> register(User user);

    Map<String,Object> login(User user);

}
