package com.example.authorisationapp.Service;

import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;
import com.example.authorisationapp.model.Admin;



public interface AdminService {
	boolean login(Admin adminobj);
	Admin addAdmin(Admin adminobj) throws EmailidAlreadyExistsException;

}
