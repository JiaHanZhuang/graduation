package com.zjh.graduationproject.dao;

import com.zjh.graduationproject.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author zjh
 * @date 2019/11/20
 */
public interface UserDao  extends JpaRepository<User,Integer> {

    User findUserByEmailAndPhone(String email,String phone);

    User findUserByEmailAndPassword(String phone,String password);

}
