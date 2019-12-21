package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.MovieSimilarity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * @author zjh
 * @date 2019/10/21
 */
public interface MovieSimilarityDao extends JpaRepository<MovieSimilarity,Integer> {

    @Modifying
    @Query(value = "delete from movie_similarity where movie1_id = ?1 or movie2_id = ?1",nativeQuery = true)
    void deleteSim(int mid);

}
