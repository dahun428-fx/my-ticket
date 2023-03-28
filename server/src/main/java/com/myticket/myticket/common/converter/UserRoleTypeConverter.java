package com.myticket.myticket.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;

import com.myticket.myticket.user.Enum.UserRoleType;

@Convert
public class UserRoleTypeConverter implements AttributeConverter<UserRoleType, Integer> {
    
    @Override
    public Integer convertToDatabaseColumn(UserRoleType attribute) {
        // TODO Auto-generated method stub
        return attribute.getType();
    }

    @Override
    public UserRoleType convertToEntityAttribute(Integer dbData) {
        return UserRoleType.ofRoleType(dbData);
    }
}
