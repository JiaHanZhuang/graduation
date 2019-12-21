package com.zjh.graduationproject.service.admin.impl;

import com.zjh.graduationproject.dao.RoomDao;
import com.zjh.graduationproject.pojo.Room;
import com.zjh.graduationproject.service.admin.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/30
 */
@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomDao roomDao;

    @Override
    public Map<String, Object> addRoom(Room room) {
        Map<String,Object> map = new HashMap<>(2);
        roomDao.save(room);
        map.put("HttpCode",200);
        map.put("message","添加成功");
        return map;
    }

    @Override
    public Map<String, Object> showRooms() {
        Map<String,Object> map = new HashMap<>(2);
        List<Room> rooms = roomDao.findRooms();
        map.put("HttpCode",200);
        map.put("rooms",rooms);
        return map;
    }

    @Override
    public Map<String, Object> updateRoom(int id, int state) {
        Map<String,Object> map = new HashMap<>(3);
        roomDao.updateRoom(id,state);
        List<Room> rooms = roomDao.findRooms();
        map.put("HttpCode",200);
        map.put("rooms",rooms);
        map.put("message","修改成功");
        return map;
    }
}
