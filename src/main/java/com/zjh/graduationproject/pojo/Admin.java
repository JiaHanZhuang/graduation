package com.zjh.graduationproject.pojo;

import javax.persistence.*;

/**
 * @author zjh
 * @date 2019/10/12
 */
@Entity
public class Admin {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic
    @Column(nullable = false,length = 30)
    private String username;

    @Basic
    @Column(nullable = false)
    private String password;

    public Admin(){}

    public Admin(Integer id,String username,String password) {
        this.id =id;
        this.password = password;
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
