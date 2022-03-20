package com.example.authorisationapp.Controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.authorisationapp.Exception.EmailidAlreadyExistsException;

import com.example.authorisationapp.Service.UserService;
import com.example.authorisationapp.model.User;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.Jwts;

@RestController
@CrossOrigin
@RequestMapping("/authentication")
public class UserController {
	
	@Autowired
	UserService userservice;
	
	@PostMapping("/register")
	public ResponseEntity<?> adduser(@RequestBody User usernew )
	{

		try {
			User userobj=userservice.addUser(usernew);
			return new ResponseEntity<User>(userobj,HttpStatus.CREATED); 
		} catch (EmailidAlreadyExistsException  e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
			 
		}
	}
	
	@PutMapping("/updateuser")
	public ResponseEntity<?> updateuser(@RequestBody User userupdate)
	{
		User userresult=userservice.updateUser(userupdate);
		
		if(userresult==null)
			return new ResponseEntity<String>("update not done",HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<String>("updated ",HttpStatus.OK);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> validateuser(@RequestBody User user)
	{
	boolean result=	 userservice.login(user);
	if(result)
	{
		String mytoken=generateToken(user);
		Map mymap=new HashMap();
		
		mymap.put("token",mytoken);
		
		return new ResponseEntity<Map>(mymap,HttpStatus.OK);
		
	}
	else
		return new ResponseEntity<String>("Invalid credentials",HttpStatus.UNAUTHORIZED);
	
	}
	

	private String generateToken(User user) {

		long expiry=10_000_00;
		
		return Jwts.builder().setSubject(user.getEmailid()).setIssuedAt((new Date(System.currentTimeMillis())))
							.setExpiration(new Date(System.currentTimeMillis()+expiry))
							.signWith(SignatureAlgorithm.HS256 ,"admin")
							.compact();		
		
		
	}


}
