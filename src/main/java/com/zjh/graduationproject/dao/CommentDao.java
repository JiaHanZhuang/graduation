package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author zjh
 * @date 2019/12/19
 */
public interface CommentDao extends JpaRepository<Comment,Integer> {


    @Query(value = "SELECT * from comment WHERE movie_id = ?1 ORDER BY time DESC",nativeQuery = true)
    Page<Comment> findComments(int mid,Pageable pageable);

    @Query(value = "SELECT AVG(score) from comment where movie_id = ?1",nativeQuery = true)
    float commentScoreAVG(int mid);

}
