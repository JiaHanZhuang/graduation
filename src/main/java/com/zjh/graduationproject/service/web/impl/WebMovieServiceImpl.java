package com.zjh.graduationproject.service.web.impl;

import com.zjh.graduationproject.dao.CommentDao;
import com.zjh.graduationproject.dao.MovieDao;
import com.zjh.graduationproject.dao.ScheduleDao;
import com.zjh.graduationproject.pojo.Comment;
import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.Schedule;
import com.zjh.graduationproject.pojo.User;
import com.zjh.graduationproject.service.web.WebMovieService;
import com.zjh.graduationproject.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/21
 */
@Service
public class WebMovieServiceImpl implements WebMovieService {

    @Autowired
    private MovieDao movieDao;
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private ScheduleDao scheduleDao;

    @Override
    public Map<String,Object> findMovieToNewDate(int page,int size) {
        Pageable pageable = PageRequest.of(page,size);
        return moviePage(pageable,"date",null);
    }

    @Override
    public Map<String, Object> findMovieToScore(int page,int size) {
        Pageable pageable = PageRequest.of(page,size);
        return moviePage(pageable,"score",null);
    }

    @Override
    public Map<String, Object> findMovie() {
        Pageable pageable = PageRequest.of(0,9);
        return moviePage(pageable,"",null);
    }

    @Override
    public Map<String, Object> findMovieToType(int page, int size, String type) {
        String str;
        switch (type){
            case "action": str = "动作";break;
            case "biography":str="传记";break;
            case "crime":str="犯罪";break;
            case "family":str="亲情";break;
            case "terror":str="恐怖";break;
            case "romance":str="浪漫";break;
            case "sports":str="体育";break;
            case "war":str="战争";break;
            case "adventure":str="冒险";break;
            case "comedy":str="喜剧";break;
            case "record":str="记录";break;
            case "fantasy":str="玄幻";break;
            case "panic":str="惊悚";break;
            case "cartoon":str="卡通";break;
            case "ancient":str="古装";break;
            case "drama":str="戏剧";break;
            case "history":str="历史";break;
            case "music":str="音乐";break;
            case "mentality":str="心理";break;
            default:str="动作";break;
        }
        Pageable pageable = PageRequest.of(page,size);
        return moviePage(pageable,"type",str);
    }

    @Override
    public Map<String, Object> findMovieToDerivation(int page, int size, String derivation) {
        String str;
        switch (derivation){
            case "Russia":str="俄罗斯";break;
            case "France":str="法国";break;
            case "England":str="英国";break;
            case "USA":str="美国";break;
            case "China":str="中国";break;
            case "Hongkong":str="中国香港";break;
            case "Japan":str="日本";break;
            case "Thailand":str="泰国";break;
            case "Italy":str="意大利";break;
            case "India":str="印度";break;
            case "Korea":str="韩国";break;
            case "Germany":str="德国";break;
            default:str="美国";
        }
        Pageable pageable = PageRequest.of(page,size);
        return moviePage(pageable,"state",str);
    }

    @Override
    public Map<String, Object> findMovie(int mid) {
        Map<String,Object> map = new HashMap<>(5);
        Pageable pageable = PageRequest.of(0,5);
        Movie movie = movieDao.findMovieById(mid);
        Page<Comment> page = commentDao.findComments(mid,pageable);
        List<Comment> comments = page.getContent();
        List<Schedule> schedules = scheduleDao.findSchedules(mid);
        map.put("HttpCode",200);
        map.put("movie",movie);
        map.put("comments",comments);
        map.put("schedules",schedules);
        return map;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> addComment(int mid, User user,float score, String content) throws Exception {
        Map<String,Object> map = new HashMap<>(2);
        try {
            //添加影评信息
            Comment comment = new Comment();
            comment.setContent(content);
            comment.setTime(new Date());
            comment.setScore(score);
            Movie movie = new Movie();
            movie.setId(mid);
            comment.setMovie(movie);
            comment.setUser(user);
            commentDao.save(comment);
            //添加后获取电影平均分进行重新计算
            float scoreAVG = commentDao.commentScoreAVG(mid);
            //修改指定电影的评分
            movieDao.updateMovieScore(mid,scoreAVG);
            map.put("HttpCode",200);
            map.put("message","评论成功");
        } catch (Exception e) {
            map.put("HttpCode",500);
            map.put("message","出现错误");
            throw new Exception("出错");
        }
        return map;
    }

    @Override
    public Map<String, Object> findComment(int mid) {
        Map<String,Object> map = new HashMap<>(2);
        Pageable pageable = PageRequest.of(0,5);
        Page<Comment> page = commentDao.findComments(mid,pageable);
        List<Comment> comments = page.getContent();
        map.put("HttpCode",200);
        map.put("comments",comments);
        return map;
    }


    private Map<String,Object> moviePage(Pageable pageable,String type,String key) {
        Map<String,Object> map = new HashMap<>(3);
        Page<Movie> page = null;
        switch (type) {
            case "date" :
                page = movieDao.findMovieToNewDate(pageable);
                break;
            case "score":
                page = movieDao.findMovieToScore(pageable);
                break;
            case "type":
                page = movieDao.findMovieToType(key,pageable);
                break;
            case "state":
                page = movieDao.findMovieByDerivation(key,pageable);
                break;
            default:
                page = movieDao.findMovieLimt(pageable);
                break;
        }
        List<Movie> movies = page.getContent();
        PageUtil pageUtil = new PageUtil();
        pageUtil.setLastPage(page.hasPrevious()).setNextPage(page.hasNext())
                .setPageNumber(page.getTotalPages())
                .setFirst(page.isFirst()).setEnd(page.isLast())
                .setPageNow(page.getNumber());
        map.put("HttpCode",200);
        map.put("movies",movies);
        map.put("pageMessage",pageUtil);
        return map;
    }

}
