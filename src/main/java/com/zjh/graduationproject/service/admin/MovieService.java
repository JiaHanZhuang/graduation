package com.zjh.graduationproject.service.admin;

import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.MovieType;

import java.util.List;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/19
 */
public interface MovieService {

    Map<String,Object> addMovie(Movie movie, List<MovieType> movieTypes) throws Exception;

    Map<String,Object> selectType();

    Map<String,Object> findMovie();

    Map<String,Object> findOne(int id);

    Map<String,Object> update(Movie movie, List<MovieType> movieTypes,String update) throws Exception;

    Map<String,Object> updateState(int id,int state);

}
