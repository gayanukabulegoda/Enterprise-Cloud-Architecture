package lk.ijse.hdse.eca.repo;

import lk.ijse.hdse.eca.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, String> {
}
