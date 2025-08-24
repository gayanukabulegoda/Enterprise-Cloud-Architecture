## Spring Boot Customer Service (MongoDB)

### How to run
- Update src/main/resources/application.properties with your MongoDB URL.
- Build and run:
  - mvn spring-boot:run

### API
- Base path: /api
- Exposes Spring Data REST endpoints for Customer at /api/customers
- Sample payload for creating a customer:
  ```json
  {
    "id": "C001",
    "name": "John Doe",
    "address": "123 Main St"
  }
  ```

