package com.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.LabTest;

@Repository
public interface LabTestRepository extends JpaRepository<LabTest, Integer> {

	@Query("from LabTest l where l.labDate < :currentDate")
	List<LabTest> findOutdatedLabTests(@Param("currentDate") LocalDate currentDate);

}
