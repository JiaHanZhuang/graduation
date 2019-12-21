package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author zjh
 * @date 2019/10/30
 */
public interface RoomDao extends JpaRepository<Room,Integer> {


    @Query("select new Room(id,roomNumber,state) from Room")
    List<Room> findRooms();


    @Transactional
    @Modifying
    @Query(value = "update room set state = ?2 where id = ?1",nativeQuery = true)
    void updateRoom(int id,int sate);

    @Query(value = "select new Room(r.id,r.roomNumber)from Room r where r.state = 1")
    List<Room> findRoomName();
}
