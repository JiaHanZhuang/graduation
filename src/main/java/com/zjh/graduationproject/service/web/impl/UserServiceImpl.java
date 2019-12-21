package com.zjh.graduationproject.service.web.impl;

import com.zjh.graduationproject.dao.UserDao;
import com.zjh.graduationproject.pojo.User;
import com.zjh.graduationproject.service.web.UserService;
import com.zjh.graduationproject.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/20
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public Map<String, Object> register(User user) {
        Map<String,Object> map = new HashMap<>(2);
        //搜索用户，查询该用户是否已被注册
        User user1 = userDao.findUserByEmailAndPhone(user.getEmail(),user.getPhone());
        if(user1 == null) {
            //未注册则进行添加操作
            user.setPassword(MD5Util.getMd5(user.getPassword()));
            userDao.save(user);
            map.put("HttpCode",200);
            map.put("message","注册成功");
        } else {
            //已注册
            map.put("HttpCode",500);
            map.put("message","该用户已被注册");
        }
        return map;
    }

    @Override
    public Map<String, Object> login(User user) {
        Map<String,Object> map = new HashMap<>(2);
        user = userDao.findUserByEmailAndPassword(user.getEmail(),MD5Util.getMd5(user.getPassword()));
        if(user != null) {
            map.put("HttpCode",200);
            map.put("user",user);
        } else {
            map.put("HttpCode",500);
            map.put("message","密码或账户邮箱有误");
        }
        return map;
    }

}
