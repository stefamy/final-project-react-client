package com.example.wbdvsp20astefanifinalprojectserver.repositories;

import com.example.wbdvsp20astefanifinalprojectserver.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository
        extends CrudRepository<User, Integer> {

    @Query("SELECT user FROM User user WHERE user.username=:username AND user.password=:password")
    public User findUserByCredentials(
            @Param("username") String username,
            @Param("password") String password
    );

    @Query("SELECT user FROM User user WHERE id.id=:id")
    public User findUserById(
        @Param("id") Integer id
    );



}
