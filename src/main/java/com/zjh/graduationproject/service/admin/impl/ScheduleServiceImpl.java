package com.zjh.graduationproject.service.admin.impl;

import com.zjh.graduationproject.dao.MovieDao;
import com.zjh.graduationproject.dao.RoomDao;
import com.zjh.graduationproject.dao.ScheduleDao;
import com.zjh.graduationproject.pojo.Movie;
import com.zjh.graduationproject.pojo.Room;
import com.zjh.graduationproject.pojo.Schedule;
import com.zjh.graduationproject.service.admin.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/6
 */
@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private MovieDao movieDao;
    @Autowired
    private RoomDao roomDao;
    @Autowired
    private ScheduleDao scheduleDao;

    @Override
    public Map<String, Object> addScheduleBefore() {
        Map<String,Object> map = new HashMap<>(3);
        List<Movie> movies = movieDao.findMovieName();
        List<Room> rooms = roomDao.findRoomName();
        map.put("HttpCode",200);
        map.put("movies",movies);
        map.put("rooms",rooms);
        return map;
    }

    @Override
    public Map<String, Object> addSchedule(Schedule schedule) {
        Map<String,Object> map = new HashMap<>(3);
        List<Schedule> schedules = scheduleDao.checkSchedule(schedule.getStartTime(),schedule.getRoom().getId());
        if(schedules.size() > 0) {
            map.put("HttpCode",302);
            map.put("message","该播放室该时段已被使用，无法作为排期时间");
        } else {
            scheduleDao.save(schedule);
            map.put("HttpCode",200);
            map.put("message","添加成功");
        }
        return map;
    }

    @Override
    public Map<String, Object> showSchedule() {
        Map<String,Object> map = new HashMap<>(2);
        List<Schedule> schedules = scheduleDao.findAll();
        map.put("schedules",schedules);
        map.put("HttpCode",200);
        return map;
    }

    @Override
    public Map<String, Object> updateState(int id, int state) {
        Map<String,Object> map = new HashMap<>(3);
        scheduleDao.updateState(id,state);
        List<Schedule> schedules = scheduleDao.findAll();
        map.put("HttpCode",200);
        map.put("schedules",schedules);
        map.put("message","修改成功");
        return map;
    }

    @Override
    public Map<String, Object> deleteSchedule(int id) {
        Map<String,Object> map = new HashMap<>(3);
        scheduleDao.deleteById(id);
        List<Schedule> schedules = scheduleDao.findAll();
        map.put("HttpCode",200);
        map.put("schedules",schedules);
        map.put("message","删除成功");
        return map;
    }


}
