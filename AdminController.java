package com.example.authorisationapp.Controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;
import com.example.authorisationapp.Service.AdminService;
import com.example.authorisationapp.model.Admin;
import com.example.authorisationapp.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@RestController
@CrossOrigin
@RequestMapping("/authentication")
public class AdminController {

	@Autowired
	AdminService adminservice;
	
	
	@PostMapping("/adminlogin")
	public ResponseEntity<?> validateuser(@RequestBody Admin admin){
	boolean result=	 adminservice.login(admin);
	if(result)
	{
		String mytoken=generateToken(admin);
		Map mymap=new HashMap();
		
		mymap.put("token",mytoken);
		
		return new ResponseEntity<Map>(mymap,HttpStatus.OK);
		
	}
	else
		return new ResponseEntity<String>("Invalid credentials",HttpStatus.UNAUTHORIZED);
	
	}
	
	@PostMapping("/adminregister")
	public ResponseEntity<?> adduser(@RequestBody Admin admin)
	{
		try {
			Admin userobj=adminservice.addAdmin(admin);
			return new ResponseEntity<Admin>(userobj,HttpStatus.CREATED); 
		} catch (EmailidAlreadyExistsException  e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
			 
		}
	}
	

	private String generateToken(Admin admin) {

		long expiry=10_000_00;
		
		return Jwts.builder().setSubject(admin.getAdminname()).setIssuedAt((new Date(System.currentTimeMillis())))
							.setExpiration(new Date(System.currentTimeMillis()+expiry))
							.signWith(SignatureAlgorithm.HS256 ,"admin")
							.compact();		
		
		
	}
}
