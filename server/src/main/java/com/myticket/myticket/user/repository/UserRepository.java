package com.myticket.myticket.user.repository;

import org.springframework.stereotype.Repository;

import com.myticket.myticket.vo.User;

@Repository
public interface UserRepository {
    void save(User user);
}
