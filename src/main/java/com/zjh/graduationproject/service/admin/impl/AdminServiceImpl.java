package com.zjh.graduationproject.service.admin.impl;

import com.zjh.graduationproject.dao.AdminDao;
import com.zjh.graduationproject.dao.TypeDao;
import com.zjh.graduationproject.pojo.Admin;
import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.MovieType;
import com.zjh.graduationproject.service.admin.AdminService;
import com.zjh.graduationproject.utils.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/17
 */
@Service
public class AdminServiceImpl implements AdminService {

    private Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

    private final String USERNAME = "admin";
    private final String PASSWORD = "123456";

    @Autowired
    private AdminDao adminDao;
    @Autowired
    private TypeDao typeDao;

    @Override
    public Map<String, Object> login(Admin admin) {
        Map<String,Object> map = new HashMap<>(2);
        if(USERNAME.equals(admin.getUsername()) && PASSWORD.equals(admin.getPassword())) {
            map.put("HttpCode",200);
            map.put("admin",new Admin(0,"admin","123456"));
        } else {
            String password = MD5Util.getMd5(admin.getPassword());
            admin = adminDao.findAdminByUsernameAndPassword(admin.getUsername(),password);
            logger.info(admin.toString());
            if(admin != null && admin.getId() != null) {
                map.put("HttpCode",200);
                map.put("admin",admin);
            } else {
                map.put("HttpCode",404);
                map.put("message","账户密码错误");
            }
        }
        return map;
    }


    @Override
    public Map<String, Object> install() {
        Map<String,Object> map = new HashMap<>(2);
        String[] str = {"动作","传记","犯罪","亲情","恐怖","浪漫","体育",
        "战争","冒险","喜剧","记录","玄幻","惊悚","卡通","古装","戏剧","历史",
        "音乐","心理"};
        //查询是否已经录入
        List<MovieType> movieTypeList = typeDao.findAll();
        if(movieTypeList.size() == 0) {
            for(int i = 0;i < str.length; i++) {
                typeDao.save(new MovieType(str[i]));
            }
        } else if(movieTypeList.size() < str.length) {
            typeDao.deleteAll();
            for(int i = 0;i < str.length; i++) {
                typeDao.save(new MovieType(str[i]));
            }
        } else {
            map.put("HttpCode",202);
            map.put("message","已经安装，不需要重复安装");
            return map;
        }
        map.put("HttpCode",200);
        map.put("message","安装完成");
        return map;
    }
}
