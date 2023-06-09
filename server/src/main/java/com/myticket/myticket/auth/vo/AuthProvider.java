package com.myticket.myticket.auth.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.myticket.myticket.user.vo.User;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
public class AuthProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_no")
    private Long no;
    @Column(name = "provider_type")
    private int type;
    @Column(name = "provider_name")
    private String name;
    @Column(name = "provider_id")
    private String id;
    @Column(name = "provider_email")
    private String email;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", columnDefinition = "VARCHAR(100)")
    private User user;

    @Builder
    public AuthProvider(int providerType, String providerName, User user, String providerId, String providerEmail) {
        this.type = providerType;
        this.name = providerName;
        this.user = user;
        this.id = providerId;
        this.email = providerEmail;
    }
}
