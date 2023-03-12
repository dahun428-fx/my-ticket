package com.myticket.myticket.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

/**
 * user
 */
@Data
@Entity
public class User {
    @Id
    @Column(name = "user_no")
    private int no;
    @Column(name= "user_id")
    private String id;
    @Column(name= "user_name")
    private String name;
    @Column(name = "user_password")
    private String password;
}