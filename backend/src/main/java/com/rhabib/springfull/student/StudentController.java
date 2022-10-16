package com.rhabib.springfull.student;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Student> getStudents(){
        return List.of(
                new Student(
                        UUID.randomUUID(),
                        "habib",
                        "rahman",
                        "habib1@gmail.com",
                        Student.Gender.MALE
                ),
                new Student(
                        UUID.randomUUID(),
                        "Ema",
                        "Watson",
                        "ema@gmail.com",
                        Student.Gender.FEMALE
                )
        );
    }
}
