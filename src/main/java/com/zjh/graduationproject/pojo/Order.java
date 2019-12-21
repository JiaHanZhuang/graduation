package com.zjh.graduationproject.pojo;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * @author zjh
 * @date 2019/10/11
 */
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;


    @Basic
    @Column(name = "order_code",nullable = false)
    private String orderCode;


    @Basic
    @Column(nullable = false)
    private String seat;

    @Basic
    @Column(name = "total_price",nullable = false)
    private Float totalPrice;

    @Basic
    @Column(name = "pay_state",length = 2,nullable = false)
    @Min(0)
    @Max(1)
    private Integer payState;

    @Basic
    @Column(name = "fetch_state",length = 2,nullable = false)
    @Min(0)
    @Max(1)
    private Integer fetchState;


    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
    @JoinColumn(name = "schedule_id")
    private  Schedule schedule;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)
    @JoinColumn(name = "user_id")
    private User user;


    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getPayState() {
        return payState;
    }

    public void setPayState(Integer payState) {
        this.payState = payState;
    }

    public Integer getFetchState() {
        return fetchState;
    }

    public void setFetchState(Integer fetchState) {
        this.fetchState = fetchState;
    }

}
