package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.MovieType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author zjh
 * @date 2019/10/19
 */
public interface TypeDao extends JpaRepository<MovieType,Integer> {


    @Query("select new MovieType (id,type) from MovieType")
    List<MovieType> findType();

    @Query(value="select t.id,t.type from movie_type as t,movie_and_type as mat where t.id = mat.type_id and mat.movie_id = ?1", nativeQuery = true)
    List<MovieType> selectMoiveType(int id);

}
