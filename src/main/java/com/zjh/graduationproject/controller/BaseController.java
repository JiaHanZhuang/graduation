package com.zjh.graduationproject.controller;


import com.zjh.graduationproject.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/16
 */
@Controller
@RequestMapping("/gra")
public class BaseController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/admin/login")
    public String adminLogin(){
        return "admin/login";
    }

    @RequestMapping("/admin/install")
    @ResponseBody
    public Map<String,Object> install() {
        return adminService.install();
    }

    @RequestMapping("/index")
    public String movieIndex(){
        return "/web/index";
    }

}
