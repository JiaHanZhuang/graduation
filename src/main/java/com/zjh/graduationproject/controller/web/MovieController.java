package com.zjh.graduationproject.controller.web;

import com.zjh.graduationproject.pojo.User;
import com.zjh.graduationproject.service.web.WebMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/21
 */
@Controller
@RequestMapping("/gra")
public class MovieController {

    @Autowired
    private WebMovieService movieService;

    @ResponseBody
    @RequestMapping("/webMovieNew")
    public Map<String,Object> webMovieNew(int page,int size){
        return movieService.findMovieToNewDate(page, size);
    }

    @ResponseBody
    @RequestMapping("/webMovieTab")
    public Map<String, Object> webMovie(){
        return movieService.findMovie();
    }

    @ResponseBody
    @RequestMapping("/webMovieScore")
    public Map<String,Object> webMovieScore(int page,int size){
        return movieService.findMovieToScore(page, size);
    }

    @ResponseBody
    @RequestMapping("/webMovieType")
    public Map<String,Object> webMovieType(int page,int size,String key){
        return movieService.findMovieToType(page, size, key);
    }

    @ResponseBody
    @RequestMapping("/webMovieDerivation")
    public Map<String,Object> webMovieDerivation(int page,int size,String key) {
        return movieService.findMovieToDerivation(page, size, key);
    }

    @RequestMapping("/movieShow")
    public String movieShow(){
        return "/web/news";
    }

    @RequestMapping("/oneMoive")
    public String oneMoive(){
        return "/web/single";
    }

    @ResponseBody
    @RequestMapping("/findMovie")
    public Map<String,Object> findMovie(int mid){
        return movieService.findMovie(mid);
    }

    @ResponseBody
    @RequestMapping("/addComment")
    public Map<String,Object> addComment(int mid, String content, float score ,HttpSession session) throws Exception{
        Object obj = session.getAttribute("user");
        Map<String,Object> map = null;
        if(obj == null) {
            map = new HashMap<>(2);
            map.put("HttpCode",503);
            map.put("message","还未登录，无法进行评论，请登录后再试");
        } else {
            User user = (User) obj;
            map = movieService.addComment(mid,user,score,content);
        }
        return map;
    }

    @ResponseBody
    @RequestMapping("/findComment")
    public Map<String,Object> findComment(int mid){
        return movieService.findComment(mid);
    }

}
