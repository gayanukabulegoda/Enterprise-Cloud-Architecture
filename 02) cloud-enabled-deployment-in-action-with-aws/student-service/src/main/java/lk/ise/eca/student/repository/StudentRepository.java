package lk.ise.eca.student.repository;

import lk.ise.eca.student.document.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface StudentRepository extends MongoRepository<Student, String> {
}
