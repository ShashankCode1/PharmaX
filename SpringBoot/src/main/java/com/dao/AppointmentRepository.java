package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

	@Query("from Appointment a where a.docId = :docId")
	List<Appointment> findByDocId(@Param("docId") int docId);

}
