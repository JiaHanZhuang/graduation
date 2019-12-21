package com.zjh.graduationproject.service.admin.impl;

import com.zjh.graduationproject.dao.MovieDao;
import com.zjh.graduationproject.dao.MovieSimilarityDao;
import com.zjh.graduationproject.dao.TypeDao;
import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.MovieSimilarity;
import com.zjh.graduationproject.pojo.MovieType;
import com.zjh.graduationproject.service.admin.MovieService;
import com.zjh.graduationproject.utils.MovieSimilarityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author zjh
 * @date 2019/10/19
 */
@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieDao movieDao;
    @Autowired
    private TypeDao typeDao;
    @Autowired
    private MovieSimilarityDao movieSimilarityDao;

    private Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> addMovie(Movie movie, List<MovieType> movieTypes)throws Exception {
        Map<String,Object> map = new HashMap<>(2);
        movie.setMovieTypeList(movieTypes);
        //相似度
        float similarity;
        try {
            //先将未添加前的数据查询出来
            List<Movie> movies = movieDao.findAll();
            //将新的添加进去
            movieDao.save(movie);
            //判断数据库中添加前是否已经有电影数据了
            if(movies.size()>0){
                //有则进行电影相似度计算
                for(int i=0;i < movies.size();i++) {
                    similarity = MovieSimilarityUtil.compare(movieTypes,movies.get(i).getMovieTypeList());
                    movieSimilarityDao.save(new MovieSimilarity(similarity,movie,movies.get(i)));
                }
            }
        }catch (Exception e) {
            System.out.println(e);
            throw new Exception("出错");
        }
        map.put("HttpCode","200");
        map.put("message","加入成功");
        return map;
    }

    @Override
    public Map<String, Object> selectType() {
        Map<String,Object> map = new HashMap<>(2);
        List<MovieType> list = typeDao.findType();
        map.put("HttpCode",200);
        map.put("types",list);
        return map;
    }

    @Override
    public Map<String, Object> findMovie() {
        Map<String,Object> map = new HashMap<>(2);
        List<Movie> movies = movieDao.findMovie();
        map.put("HttpCode",200);
        map.put("movies",movies);
        return map;
    }

    @Override
    public Map<String, Object> findOne(int id) {
        Map<String,Object> map = new HashMap<>(2);
        Movie movie = movieDao.selectMovieById(id);
        List<MovieType> typeList = typeDao.selectMoiveType(id);
        movie.setMovieTypeList(typeList);
        List<MovieType> list = typeDao.findType();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String dateString = formatter.format(movie.getReleaseDate());
        map.put("HttpCode",200);
        map.put("movie",movie);
        map.put("types",list);
        map.put("dateString",dateString);
        return map;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> update(Movie movie, List<MovieType> movieTypes,String update) throws Exception {
        Map<String,Object> map = new HashMap<>(2);
        movie.setMovieTypeList(movieTypes);
        //通过判断传入的值是否为空，判断类型是否已被修改
        if(update != null) {
            //修改了电影类型，需要重新计算内容相似度
            //删除旧的电影相似度计算结果
            movieSimilarityDao.deleteSim(movie.getId());
            //进行修改操作
            //修改指定电影信息，同时添加新的电影类型数据
            movieDao.save(movie);
            //查询所有的电影数据
            List<Movie> movies = movieDao.findAll();
            //相似度
            float similarity;
            //重新计算相似度
            for(int i=0;i < movies.size();i++) {
                //防止电影自身的比较
                if(!movies.get(i).getId().equals(movie.getId()) ) {
                    similarity = MovieSimilarityUtil.compare(movieTypes,movies.get(i).getMovieTypeList());
                    //添加相似度计算结果
                    movieSimilarityDao.save(new MovieSimilarity(similarity,movie,movies.get(i)));
                }
            }
        } else {
            //未修改类型，只修改其他字段信息
            movieDao.save(movie);
        }
        map.put("HttpCode",200);
        map.put("message","修改完成");
        return map;
    }

    @Override
    public Map<String, Object> updateState(int id, int state) {
        Map<String,Object> map = new HashMap<>(2);
        movieDao.updateMovie(id,state);
        List<Movie> movies = movieDao.findMovie();
        map.put("HttpCode",200);
        map.put("message","修改成功");
        map.put("movies",movies);
        return map;
    }

}
