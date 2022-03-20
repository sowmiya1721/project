package com.example.authorisationapp.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;
import com.example.authorisationapp.Repo.AdminRepo;
import com.example.authorisationapp.model.Admin;


@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	AdminRepo adminrepo;

	@Override
	public boolean login(Admin adminobj) {
		Admin adminresult=adminrepo.findByAdminnameAndPassword(adminobj.getAdminname(), adminobj.getPassword());
		if(adminresult==null)
		
		return false;
		else
			return true;
	}

	@Override
	public Admin addAdmin(Admin adminobj) throws EmailidAlreadyExistsException {
		Optional<Admin> userresult=adminrepo.findById(adminobj.getAdminname());
		
		if(userresult.isPresent())
				throw new EmailidAlreadyExistsException("User Name Already Exist");
		else
			adminrepo.save(adminobj);
		
			return adminobj;
	}
	}


