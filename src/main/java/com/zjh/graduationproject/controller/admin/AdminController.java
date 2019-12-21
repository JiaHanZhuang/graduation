package com.zjh.graduationproject.controller.admin;

import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.MovieType;
import com.zjh.graduationproject.pojo.Room;
import com.zjh.graduationproject.pojo.Schedule;
import com.zjh.graduationproject.service.admin.MovieService;
import com.zjh.graduationproject.service.admin.RoomService;
import com.zjh.graduationproject.service.admin.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author zjh
 * @date 2019/10/19
 */
@Controller
@RequestMapping("/gra/admin")
public class AdminController {

    @Autowired
    private MovieService movieService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private ScheduleService scheduleService;



    @RequestMapping("/addMovie")
    @ResponseBody
    public Map<String,Object> addMovieAfter(HttpServletRequest request)throws Exception {
        //获取电影信息，并封装
        Movie movie = new Movie();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile file = multipartRequest.getFile("file");
        movie.setName(multipartRequest.getParameter("name"));
        movie.setDuration(multipartRequest.getParameter("duration"));
        movie.setPrice(Float.parseFloat(multipartRequest.getParameter("price")));
        //临时变量
        String temp;
        temp = multipartRequest.getParameter("releaseState");
        System.out.println(temp);
        if("true".equals(temp)) {
            movie.setReleaseState(1);
        } else {
            movie.setReleaseState(0);
        }

        movie.setDerivation(multipartRequest.getParameter("derivation"));
        movie.setContent(multipartRequest.getParameter("content"));

        temp = multipartRequest.getParameter("releaseDate");
        DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");
        Date date = null;
        try {
            date = format1.parse(temp);
        }catch (Exception e) {
            e.printStackTrace();
        }
        movie.setReleaseDate(date);
        //获取电影类型信息，并进行设置
        temp = multipartRequest.getParameter("types");
        List<MovieType> list = new ArrayList<>();
        if(!"".equals(temp) && temp != null ) {
            String[] types = temp.split(",");
            for(int i = 0; i < types.length;i++) {
                list.add(new MovieType(Integer.parseInt(types[i])));
            }
        }
        return this.addMovie(movie,list,file,request);
    }

    @RequestMapping("/updateMovie")
    @ResponseBody
    public Map<String,Object> updateMovie(HttpServletRequest request)throws Exception{
        //获取电影信息，并封装
        Movie movie = new Movie();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile file = multipartRequest.getFile("file");
        movie.setId(Integer.parseInt(multipartRequest.getParameter("id")));
        movie.setName(multipartRequest.getParameter("name"));
        movie.setDuration(multipartRequest.getParameter("duration"));
        movie.setPrice(Float.parseFloat(multipartRequest.getParameter("price")));
        movie.setReleaseState(Integer.parseInt(multipartRequest.getParameter("releaseState")));
        movie.setDerivation(multipartRequest.getParameter("derivation"));
        movie.setContent(multipartRequest.getParameter("content"));
        //临时变量
        String update = multipartRequest.getParameter("update");
        String temp = multipartRequest.getParameter("releaseDate");
        DateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");
        Date date = null;
        try {
            date = format1.parse(temp);
        }catch (Exception e) {
            e.printStackTrace();
        }
        movie.setReleaseDate(date);
        //获取电影类型信息，并进行设置
        temp = multipartRequest.getParameter("types");

        List<MovieType> list = new ArrayList<>();
        if(!"".equals(temp) && temp != null ) {
            String[] types = temp.split(",");
            for(int i = 0; i < types.length;i++) {
                list.add(new MovieType(Integer.parseInt(types[i])));
            }
        }

        //若文件不为空，则图片进行了修改，重新上传
        if(file!=null) {
            String uuidName = null;
            try {
                //得到这个文件的uuidname
                uuidName = file.getOriginalFilename();
                //上传路径（tomcat）
                String realPath = "E:\\image";
                System.out.println(realPath);
                //储存路径
                String path = realPath;
                File file1 = new File(path);
                if (!file1.exists()) {
                    file1.mkdirs();
                }
                //得到文件的输入流
                InputStream in = new BufferedInputStream(file.getInputStream());
                //获得文件的输出流
                OutputStream out = new BufferedOutputStream(new FileOutputStream(new File(path, uuidName)));

                IOUtils.copy(in, out);
                in.close();
                out.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            movie.setImage(uuidName);
        } else {
            movie.setImage(multipartRequest.getParameter("image"));
        }
        return movieService.update(movie,list,update);
    }


    @RequestMapping("/selectType")
    @ResponseBody
    public Map<String,Object> selectType(){
        return movieService.selectType();
    }


    @RequestMapping("/movieAction")
    public String addMovieAction() {
        return "/admin/addmovie";
    }

    @RequestMapping("findMovies")
    @ResponseBody
    public Map<String,Object> findMovies(){
        return movieService.findMovie();
    }

    @RequestMapping("findOne")
    @ResponseBody
    public Map<String,Object> findOneMovie(int id) {
        return movieService.findOne(id);
    }

    @RequestMapping("movieMessage")
    public String movieMessage(int id) {
        return "/admin/movie";
    }

    @RequestMapping("movieState")
    @ResponseBody
    public Map<String,Object> movieState(Movie movie) {
        int state = 0;
        if(movie.getReleaseState() == 0) {
            state = 1;
        }
        return movieService.updateState(movie.getId(),state);
    }


    @RequestMapping("addRoom")
    public String addRoom() {
        return "/admin/addRoom";
    }

    @RequestMapping("addRoomDo")
    @ResponseBody
    public Map<String,Object> addRoomDo(Room room) {
        return roomService.addRoom(room);
    }

    @RequestMapping("showRoom")
    @ResponseBody
    public Map<String,Object> showRoom(){
        return roomService.showRooms();
    }

    @RequestMapping("updateRoomState")
    @ResponseBody
    public Map<String,Object> updateRoomState(Room room){
        int state = 0;
        if(room.getState() == 0) {
            state = 1;
        }
        return roomService.updateRoom(room.getId(),state);
    }

    @RequestMapping("addSchedule")
    public String addSchedule(){
        return "/admin/addSchedule";
    }

    @RequestMapping("addScheduleBefore")
    @ResponseBody
    public Map<String,Object> addScheduleBefore(){
        return scheduleService.addScheduleBefore();
    }

    @RequestMapping("addScheduleDo")
    @ResponseBody
    public Map<String,Object> addSchedule(Schedule schedule) {
        return scheduleService.addSchedule(schedule);
    }

    @RequestMapping("showScheduleBefore")
    public String showScheduleBefore(){
        return "/admin/ScheduleShow";
    }

    @RequestMapping("showSchedule")
    @ResponseBody
    public Map<String,Object> showSchedule(){
        return scheduleService.showSchedule();
    }

    @RequestMapping("updateScheduleState")
    @ResponseBody
    public Map<String,Object> updateScheduleState(Schedule schedule) {
        int state = 0;
        if(schedule.getState() == 0) {
            state = 1;
        }
        return scheduleService.updateState(schedule.getId(),state);
    }

    @RequestMapping("deleteSchedule")
    @ResponseBody
    public Map<String,Object> deleteSchedule(int id){
        return scheduleService.deleteSchedule(id);
    }

    private Map<String,Object> addMovie(Movie movie, List<MovieType> movieTypes, MultipartFile file,
                                        HttpServletRequest request)throws Exception {
        String uuidName = null;
        try {
            //得到这个文件的uuidname
            uuidName = file.getOriginalFilename();
            //上传路径（tomcat）
            String realPath = "E:\\image";
            System.out.println(realPath);
            //储存路径
            String path = realPath;
            File file1 = new File(path);
            if (!file1.exists()) {
                file1.mkdirs();
            }
            //得到文件的输入流
            InputStream in = new BufferedInputStream(file.getInputStream());
            //获得文件的输出流
            OutputStream out = new BufferedOutputStream(new FileOutputStream(new File(path, uuidName)));

            IOUtils.copy(in, out);
            in.close();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        movie.setImage(uuidName);
        return movieService.addMovie(movie,movieTypes);
    }
}
