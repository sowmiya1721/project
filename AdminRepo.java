package com.example.authorisationapp.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.authorisationapp.model.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin,String> {
		
		Admin findByAdminnameAndPassword(String aname,String pass);

}
