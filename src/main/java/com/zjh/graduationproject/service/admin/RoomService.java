package com.zjh.graduationproject.service.admin;

import com.zjh.graduationproject.pojo.Room;

import java.util.Map;

/**
 * @author zjh
 * @date 2019/10/30
 */
public interface RoomService {

    Map<String,Object> addRoom(Room room);


    Map<String,Object> showRooms();

    Map<String,Object> updateRoom(int id,int state);

}
