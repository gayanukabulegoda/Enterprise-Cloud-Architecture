# Security Policy

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it **privately** by emailing:

**grbulegoda@gmail.com**

Include:

* A detailed description of the issue
* Steps to reproduce the vulnerability
* Affected services or components
* Any relevant logs or screenshots

We aim to acknowledge all reports within **48 hours** and provide updates until the issue is resolved.

---

## 🛡 Supported Versions

This project maintains security updates for the following:

| Component / Service | Supported Version |
|--------------------|-----------------|
| Spring Boot         | 3.x+             |
| React               | 18.x+            |
| MySQL               | 8.x+              |
| MongoDB             | 6.x+              |
| Docker              | 24.x+             |
| Node.js             | 20.x+             |

Ensure your local or cloud-deployed instances use these or later supported versions for security patches.

---

## 🔐 Security Best Practices

To maintain a secure development and deployment environment:

1. **Secrets Management**
   * Never commit credentials or secrets to Git.
   * Use `.env` files locally and environment variables or cloud secret managers (AWS Secrets Manager, GCP Secret Manager) in production.
   * Use IAM roles with least privilege for cloud resources.

2. **Dependency Management**
   * Regularly update dependencies (`npm`, `Maven`, `Docker images`).
   * Run security audits:
     ```bash
     npm audit
     mvn dependency-check:check
     docker scan <image>
     ```

3. **Network & Access Controls**
   * Restrict service access with firewalls, VPCs, or security groups.
   * Enable TLS/HTTPS for frontend and API endpoints.
   * Use strong passwords and rotate them periodically.

4. **Data Security**
   * Store sensitive data in managed databases with encryption at rest & in transit.
   * For media-service, prefer S3/GCS with pre-signed URLs rather than public access.
   * Ensure backups are encrypted and stored securely.

5. **Container & Cloud Security**
   * Scan Docker images for vulnerabilities.
   * Keep container base images updated.
   * Enable logging, monitoring, and alerting on cloud resources.

---

## ⚠️ Responsible Disclosure

* Do **not** publicly disclose a vulnerability until a fix or mitigation is in place.
* All reports will be treated confidentially.
* We may acknowledge contributors who report security issues responsibly.

---

## 📖 References

* [OWASP Top 10](https://owasp.org/www-project-top-ten/)
* [Docker Security Best Practices](https://docs.docker.com/engine/security/)
* [AWS Security Best Practices](https://aws.amazon.com/architecture/security-best-practices/)
* [GCP Security Best Practices](https://cloud.google.com/security/best-practices)

---

Thank you for helping keep **Enterprise Cloud Architecture** safe and secure. 🚀
