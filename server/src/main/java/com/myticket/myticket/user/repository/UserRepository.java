package com.myticket.myticket.user.repository;


import org.springframework.data.repository.CrudRepository;

import com.myticket.myticket.vo.User;
import java.util.*;

public interface UserRepository extends CrudRepository<User, Long> {

    User findById(String id);
    User findByRefreshToken(String refreshToken);
}
