package com.zjh.graduationproject.service.web;

import com.zjh.graduationproject.pojo.User;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/21
 */
public interface WebMovieService {

    Map<String,Object> findMovieToNewDate(int page,int size);

    Map<String,Object> findMovieToScore(int page,int size);

    Map<String,Object> findMovie();

    Map<String,Object> findMovieToType(int page,int size,String type);

    Map<String,Object> findMovieToDerivation(int page,int size,String derivation);

    Map<String,Object> findMovie(int mid);

    Map<String,Object> addComment(int mid, User user, float score, String content)throws Exception;

    Map<String,Object> findComment(int mid);

}
