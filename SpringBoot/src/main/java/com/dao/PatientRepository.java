package com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {

	@Query("from Patient p where p.emailId = :emailId")
	Patient findByEmailId(@Param("emailId") String emailId);

	@Query("from Patient p where p.phoneNo = :phoneNo")
	Patient findByPhoneNo(@Param("phoneNo") String phoneNo);

}
