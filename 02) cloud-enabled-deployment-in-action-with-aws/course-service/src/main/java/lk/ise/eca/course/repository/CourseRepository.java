package lk.ise.eca.course.repository;

import lk.ise.eca.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CourseRepository extends JpaRepository<Course, String> {
}
