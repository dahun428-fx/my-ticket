package com.myticket.myticket.vo;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.myticket.myticket.auth.Enum.ProviderType;
import com.myticket.myticket.user.Enum.UserRoleType;

import lombok.AllArgsConstructor;
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
    // @Column(name = "provider")
    // private ProviderType providerType;

    //ouath
    // private Map<String, Object> attributes;

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

    // @Override
    // public Map<String, Object> getAttributes() {
    //     // TODO Auto-generated method stub
    //     return attributes;
    // }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    // public static User create(User user){
    //     // return new User(user.getNo(), 
    //     //                 user.getId(), 
    //     //                 user.getName(), 
    //     //                 user.getPassword(), 
    //     //                 user.getRoleType(), 
    //     //                 user.setAuthorities(List.of(new SimpleGrantedAuthority(User.getRoleType().name()))), 
    //     //                 user.getRefreshToken(), 
    //     //                 user.getProviderType(), user.getAttributes());
    //     return new User(user.getNo(), 
    //                     user.getId(),
    //                     user.getName(), 
    //                     user.getPassword(), 
    //                     user.getRoleType(),
    //                     Collections.singletonList(new SimpleGrantedAuthority(user.getRoleType().name())), 
    //                     user.getRefreshToken(), 
    //                     user.getProviderType(), 
    //                     user.getAttributes());
    // }

}