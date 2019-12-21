package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author zjh
 * @date 2019/10/19
 */
public interface MovieDao extends JpaRepository<Movie,Integer> {


    @Query("select new Movie(id,name,releaseState,derivation,price) from Movie")
    List<Movie> findMovie();

    @Query("select new Movie(id,name,releaseDate,content,derivation,duration,image,price,releaseState) from Movie m where m.id = ?1")
    Movie selectMovieById(int id);

    Movie findMovieById(int id);

    @Transactional
    @Modifying
    @Query(value = "update movie set release_state = ?2 where id = ?1",nativeQuery = true)
    void updateMovie(int id,int state);

    @Query(value = "select new Movie(id,name) from Movie m where m.releaseState = 1")
    List<Movie> findMovieName();

    @Query("select m from Movie m")
    Page<Movie> findMovieLimt(Pageable pageable);

    @Query("select m from Movie m order by m.releaseDate desc")
    Page<Movie> findMovieToNewDate(Pageable pageable);

    @Query("select m from Movie m order by m.score DESC ")
    Page<Movie> findMovieToScore(Pageable pageable);

    @Query(value = "SELECT m.* from movie m INNER JOIN movie_and_type mt on mt.movie_id = m.id and mt.type_id = (SELECT t.id from movie_type as t where t.type = ?1)",
            countQuery="SELECT count(*) from movie m INNER JOIN movie_and_type mt on mt.movie_id = m.id and mt.type_id = (SELECT t.id from movie_type as t where t.type = ?1)",
            nativeQuery = true)
    Page<Movie> findMovieToType(String type,Pageable pageable);


    Page<Movie> findMovieByDerivation(String derivation,Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update movie set score = ?2 where id = ?1",nativeQuery = true)
    void updateMovieScore(int id,float score);

}
