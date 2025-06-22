package com.example.baseAppAuth.entity.base;

import com.example.baseAppAuth.util.AppUtil;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

@Component
public class EntityListener {

    // Run this before creating a new record
    @PrePersist
    public void prePersistFunction(Object object){
        // send the object and status to the function
        this.assignValueToCommonField(object,"CREATE");
    }

    // Run this before updating an existing record
    @PreUpdate
    public void preUpdateFunction(Object object){
        // send the object and status to the function
        this.assignValueToCommonField(object,"UPDATE");
    }


    // This function will set values two input arg and status
    @SneakyThrows
    private void assignValueToCommonField(Object arg,String status){

//        String user = null;
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (AppUtil.isNotNull(auth) && auth.getPrincipal() != "anonymousUser"){
//            UserDetails userDetails = (UserDetails) auth.getPrincipal();
//            if (AppUtil.isNotNull(userDetails) && AppUtil.isNotNull(userDetails.getUsername())) {
//                user = userDetails.getUsername();
//            }
//        }
//        if (status.equals("CREATE")) {
//            BeanUtils.setProperty(arg, "createdBy", user != null ? user : "SYSTEM");
//            BeanUtils.setProperty(arg, "createdDate", DateUtil.getCurrentDate());
//        }else{
//            BeanUtils.setProperty(arg, "updatedBy", user != null ? user : "SYSTEM");
//            BeanUtils.setProperty(arg, "updatedDate", DateUtil.getCurrentDate());
//        }
//
//
//        Class<?> cls = arg.getClass();
//        for (Field field : cls.getDeclaredFields()) {
//
//            Field strField = ReflectionUtils.findField(cls, field.getName());
//            if (strField.getType().equals(String.class)) {
//
//                strField.setAccessible(true);
//                Object value = ReflectionUtils.getField(strField, arg);
//
//                if (AppUtil.isNotNull(value) && AppUtil.isEmpty(value.toString())) {
//                    ReflectionUtils.makeAccessible(strField); //set null when emptyString
//                    ReflectionUtils.setField(strField, arg, null);
//                }
//            }
//        }
    }
}
