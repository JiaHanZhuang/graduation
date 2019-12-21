package com.zjh.graduationproject.controller.admin;

import com.zjh.graduationproject.pojo.Admin;
import com.zjh.graduationproject.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/17
 */
@Controller
@RequestMapping("/gra/admin")
public class LoginController {

    @Autowired
    private AdminService adminService;


    @RequestMapping("logdo")
    @ResponseBody
    public Map<String,Object> login(Admin admin, HttpSession session) {
        Map map = adminService.login(admin);
        Integer httpCode = Integer.parseInt(map.get("HttpCode").toString());
        if(httpCode == 200) {
            session.setAttribute("admin",map.get("admin"));
        }
        return adminService.login(admin);
    }

    @RequestMapping("index")
    public String adminIndex() {
        return "admin/movieShow";
    }

    @RequestMapping("logout")
    public String logout(){
        return "admin/login";
    }

}
