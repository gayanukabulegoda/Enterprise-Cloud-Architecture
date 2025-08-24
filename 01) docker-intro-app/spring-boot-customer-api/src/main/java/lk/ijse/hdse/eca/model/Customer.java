package lk.ijse.hdse.eca.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.hdse.eca.repo.CustomerRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.Serializable;

@Entity
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer implements Serializable {

    @Id
    @Pattern(regexp = "^C[0-9]{3}$", message = "Invalid Customer ID")
    @NotBlank
    private String id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(nullable = false)
    private String address;

    @RepositoryEventHandler
    @RequiredArgsConstructor
    @Component
    static class CustomerEventHandler {

        private final CustomerRepository customerRepository;

        @HandleBeforeCreate
        public void handleCustomerSave(Customer customer) {
            if (customer.getId() != null && customerRepository.existsById(customer.getId())){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer already exists");
            }
        }
    }

}
