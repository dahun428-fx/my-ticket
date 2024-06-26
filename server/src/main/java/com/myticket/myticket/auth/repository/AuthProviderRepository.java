package com.myticket.myticket.auth.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.myticket.myticket.auth.vo.AuthProvider;
import com.myticket.myticket.user.vo.User;

public interface AuthProviderRepository extends CrudRepository<AuthProvider, Long> {
    AuthProvider findByUser_idAndType(String userid, int type);

    AuthProvider findById(String id);

    List<AuthProvider> findByIdAndType(String id, int type);

    List<AuthProvider> findByUser_id(String userid);

    AuthProvider findByUser_idAndName(String userid, String name);

}
