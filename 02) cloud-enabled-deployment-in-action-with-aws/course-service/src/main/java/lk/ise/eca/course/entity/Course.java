package lk.ise.eca.course.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ise.eca.course.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @NotBlank(message = "Course ID cannot be empty")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Course ID must contain only letters")
    private String id;          // e.g., "HDSE"

    @NotBlank(message = "Course name cannot be empty")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Course name must contain only letters and spaces")
    @Column(nullable = false)
    private String name;        // e.g., "Higher Diploma in Software Engineering"

    @NotBlank(message = "Course duration cannot be empty")
    @Column(nullable = false)
    private String duration;    // e.g., "2 Years"

    @Component
    @RepositoryEventHandler
    @RequiredArgsConstructor
    public static class CourseEntityEventHandler {
        private final CourseRepository courseRepository;

        @HandleBeforeCreate
        public void handleBeforeCreate(Course course) {
            if (courseRepository.existsById(course.getId())) {
                throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    String.format("Course with ID: %s already exists", course.getId())
                );
            }
        }
    }
}
