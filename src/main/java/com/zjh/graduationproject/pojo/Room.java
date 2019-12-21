package com.zjh.graduationproject.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

/**
 * @author zjh
 * @date 2019/10/12
 */
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;


    @Basic
    @Column(name = "room_number",length = 10,nullable = false)
    private String roomNumber;



    @Basic
    @Column(length = 2,nullable = false)
    @Min(0)
    @Max(1)
    private Integer state;

    @JsonIgnore
    @OneToMany(mappedBy = "room",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Schedule> scheduleList;

    public Room() {
    }

    public Room(Integer id,String roomNumber, @Min(0) @Max(1) Integer state) {
        this.roomNumber = roomNumber;
        this.state = state;
        this.id = id;
    }

    public Room(Integer id,String roomNumber) {
        this.roomNumber = roomNumber;
        this.id = id;
    }

    public List<Schedule> getScheduleList() {
        return scheduleList;
    }

    public void setScheduleList(List<Schedule> scheduleList) {
        this.scheduleList = scheduleList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }


    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
