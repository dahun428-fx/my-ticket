package com.myticket.myticket.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;

import com.myticket.myticket.auth.Enum.ProviderType;

@Convert
public class ProviderTypeConverter implements AttributeConverter<ProviderType, Integer> {
    
    @Override
    public Integer convertToDatabaseColumn(ProviderType attribute) {
        return attribute.getType();
    }

    @Override
    public ProviderType convertToEntityAttribute(Integer dbData) {
        return ProviderType.ofProviderType(dbData);
    }
}
