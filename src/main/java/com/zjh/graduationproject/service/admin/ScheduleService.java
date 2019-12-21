package com.zjh.graduationproject.service.admin;

import com.zjh.graduationproject.pojo.Schedule;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/11/6
 */
public interface ScheduleService {

    Map<String,Object> addScheduleBefore();

    Map<String,Object> addSchedule(Schedule schedule);

    Map<String,Object> showSchedule();

    Map<String,Object> updateState(int id,int state);

    Map<String,Object> deleteSchedule(int id);

}
