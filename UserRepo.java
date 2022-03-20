package com.example.authorisationapp.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.authorisationapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,String> {
	
	User findByEmailidAndPassword(String emailid,String pass);
	

}
