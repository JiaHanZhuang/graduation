package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @author zjh
 * @date 2019/11/7
 */
public interface ScheduleDao extends JpaRepository<Schedule,Integer> {

    @Query(value = "select * from schedule as s WHERE s.end_time >= ?1 and s.start_time <= ?1 and s.room_id = ?2",nativeQuery = true)
    List<Schedule> checkSchedule(Date startTime,int roomId);

    @Transactional
    @Modifying
    @Query(value = "update schedule set state = ?2 where id = ?1",nativeQuery = true)
    void updateState(int id,int sate);

    @Query(value = "select * from schedule WHERE moive_id = ?1 and state = 0",nativeQuery = true)
    List<Schedule> findSchedules(int mid);

}
