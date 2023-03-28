package com.myticket.myticket.vo;

import java.util.Collection;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.user.Enum.UserRoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

/**
 * user
 */
@Data
@ToString
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long no;
    @Column(name= "user_id")
    private String id;
    @Column(name= "user_name")
    private String name;
    @Column(name = "user_password")
    private String password;
    @Column(name = "user_role")
    private UserRoleType roleType;
    @Transient//escape Jpa
    Collection<GrantedAuthority> authorities;

    @Column(name = "refresh_token")
    private String refreshToken;

    //ouath
    @Transient
    private Map<String, Object> attributes;

    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    @Builder
    public User(String id, String name, String password, UserRoleType roleType) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.roleType = roleType;
    }

}