package com.zjh.graduationproject.controller.web;

import com.zjh.graduationproject.pojo.User;
import com.zjh.graduationproject.service.web.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/20
 */
@Controller
@RequestMapping("/gra")
public class UserLoginController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping("/loginState")
    public Map<String,Object> checkLoginState(HttpSession session){
        User user = (User) session.getAttribute("user");
        Map<String,Object> map = new HashMap<>(2);
        if(user == null) {
            map.put("HttpCode",404);
        } else {
            map.put("HttpCode",200);
            map.put("user",user);
        }
        return map;
    }

    @RequestMapping("/register")
    @ResponseBody
    public Map<String,Object> register(User user) {
        return userService.register(user);
    }

    @ResponseBody
    @RequestMapping("/login")
    public Map<String,Object> login(User user,HttpSession session) {
        Map<String,Object> map = userService.login(user);
        if(map.get("HttpCode").equals(200)) {
            session.setAttribute("user",map.get("user"));
        }
        return map;
    }

}
