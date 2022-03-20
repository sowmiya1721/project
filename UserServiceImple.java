package com.example.authorisationapp.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;
import com.example.authorisationapp.Repo.UserRepo;
import com.example.authorisationapp.model.User;

@Service
public class UserServiceImple implements UserService{
	
	@Autowired
	UserRepo userrepo;

	@Override
	public User addUser(User userobj) throws EmailidAlreadyExistsException {
		
	Optional<User> userresult=userrepo.findById(userobj.getEmailid());
	
	if(userresult.isPresent())
			throw new EmailidAlreadyExistsException("User Name Already Exist");
	else
		userrepo.save(userobj);
	
		return userobj;
	}

	@Override
	public boolean login(User userobj) {
		
		User userresult=userrepo.findByEmailidAndPassword(userobj.getEmailid(), userobj.getPassword());
		if(userresult==null)
		
		return false;
		else
			return true;
	}

	@Override
	public User updateUser(User userobj) {
		Optional<User> userresult=userrepo.findById(userobj.getEmailid());
		
		if(userresult.isPresent())
		{
			userrepo.save(userobj);
			return userobj;
		}
		else
		return null;
	}

	
	
}
