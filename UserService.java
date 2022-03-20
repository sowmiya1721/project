package com.example.authorisationapp.Service;


import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;
import com.example.authorisationapp.model.User;

public interface UserService {
	
	User addUser(User userobj) throws EmailidAlreadyExistsException;
	boolean login(User userobj);
	User updateUser(User userobj);

}
