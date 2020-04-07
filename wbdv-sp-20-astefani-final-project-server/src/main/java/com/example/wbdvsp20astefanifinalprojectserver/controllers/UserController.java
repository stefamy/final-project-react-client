package com.example.wbdvsp20astefanifinalprojectserver.controllers;

import com.example.wbdvsp20astefanifinalprojectserver.models.User;
import com.example.wbdvsp20astefanifinalprojectserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    UserRepository repository;

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @PostMapping("/login")
    public User login(HttpSession session,
        @RequestBody User user) {
        User profile = repository.findUserByCredentials(user.getUsername(), user.getPassword());
        session.setAttribute("profile", profile);
        return profile;
    }

    @PostMapping("/register")
    public User register(HttpSession session,
        @RequestBody User user) {
        User newUser = repository.save(user);
        newUser.setPassword("***");
        session.setAttribute("profile", newUser);
        return newUser;
    }

    @PostMapping("/profile")
    public User profile(HttpSession session) {
        User profile = (User) session.getAttribute("profile");
        return profile;
    }

    @PutMapping("/profile/{id}")
    public User updateProfile(HttpSession session, @PathVariable("id") Integer id,
        @RequestBody User updatedUserDetails) {
        User newProfile = repository.findUserById(id);

        newProfile.setUsername(updatedUserDetails.getUsername());
        if (updatedUserDetails.getPassword() != "***") {
            newProfile.setPassword(updatedUserDetails.getPassword());
        }
        newProfile.setFirstName(updatedUserDetails.getFirstName());
        newProfile.setLastName(updatedUserDetails.getLastName());
        newProfile.setEmail(updatedUserDetails.getEmail());
        newProfile.setPhone(updatedUserDetails.getPhone());
        newProfile.setStreetAddress1(updatedUserDetails.getStreetAddress1());
        newProfile.setStreetAddress2(updatedUserDetails.getStreetAddress2());
        newProfile.setCity(updatedUserDetails.getCity());
        newProfile.setState(updatedUserDetails.getState());
        newProfile.setZip(updatedUserDetails.getZip());
        newProfile.setGlutenFree(updatedUserDetails.getGlutenFree());
        newProfile.setVegetarian(updatedUserDetails.getVegetarian());
        newProfile.setVegan(updatedUserDetails.getVegan());
        newProfile.setNutAllergy(updatedUserDetails.getNutAllergy());
        newProfile.setOtherDietaryRestrictions(updatedUserDetails.getOtherDietaryRestrictions());
        newProfile.setSpecialRequests(updatedUserDetails.getSpecialRequests());

        newProfile = repository.save(newProfile);
        newProfile.setPassword("***");
        session.setAttribute("profile", newProfile);
        return newProfile;
    }

}


//        @GetMapping("/profile")
//    public User profile(HttpSession session,
//        @RequestBody User user) {
//        User newUser = repository.save(user);
//        newUser.setPassword("***");
//        session.setAttribute("profile", newUser);
//        return newUser;
//    }

