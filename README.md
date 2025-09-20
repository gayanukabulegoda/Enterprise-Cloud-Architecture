# 🚀 Enterprise Cloud Architecture - Practical Microservices & Multi-Cloud Patterns

<p align="left">
  <strong>👤 Gayanuka Bulegoda</strong><br>
  🎓 Student ID: <code>2301682023</code><br>
  📧 Email: <a href="mailto:gayanukariviru@gmail.com">gayanukariviru@gmail.com</a>
</p>

---

> **Enterprise-Cloud-Architecture** - A hands-on, practical collection showing how to containerize, build, and deploy microservices across local Docker and cloud environments (AWS & GCP).
> Focus: Spring Boot backends, React frontend, MySQL & MongoDB, and media storage patterns (local → S3/GCS).

[![Read on Notion](https://img.shields.io/badge/Read_on-Notion-111111?style=for-the-badge&logo=notion&logoColor=white)](https://alive-lumber-714.notion.site/Enterprise-Cloud-Architecture-2369212713998038bd50ea842d2e577b?pvs=74)
[![Watch — AWS RDS (YouTube)](https://img.shields.io/badge/Watch-AWS%20RDS%20DB-111111?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/3lRoZ-b2A04?si=INPWWWzBqWCAGDna)
[![Watch — GCP Cloud SQL (YouTube)](https://img.shields.io/badge/Watch-GCP%20Cloud%20SQL-111111?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/0K7LpX-jrGY?si=rbc5xYc8Xp17ckkX)

---

## 🗂 Repository Overview

This repo contains two main, ready-to-play-with project suites:

### 1) `docker-intro-app` - Docker containerization hands-on

A practical, full-stack demo showing how to containerize a microservice system for local development:

* Spring Boot backends and a React frontend packaged for Docker.
* MySQL and MongoDB containerized (latest LTS images recommended).
* `docker-compose.yml` to orchestrate services for local development and tests.
* Updated backend configs to connect to containerized DBs.

### 2) `cloud-enabled-deployment-in-action-with-aws` - Cloud deployment patterns

An introductory multi-cloud deployment blueprint and configs:

* **course-service** (Spring Boot + MySQL) -  cloud deployment scaffolding for AWS & GCP.
* **student-service** (Spring Boot + MongoDB) - infra & deployment notes (AWS/GCP pending).
* **media-service** - local file storage now; instructions and code to integrate S3/MinIO.
* **frontend-app** - React + TypeScript build & cloud hosting patterns.
* Build scripts and sample deployment configs.

---

## 🔗 IMPORTANT NOTES & QUICK REFERENCES

* **Course Backend Service - GCP DB instance record (Google Drive)**: https://drive.google.com/file/d/1t520yyzWENruravxTnmX4SrFivCHmmxK/view?usp=sharing

* Full, **structured notes** on Enterprise Cloud Architecture (concepts, step-by-step guidance, diagrams):
  **Notion:**
  [https://alive-lumber-714.notion.site/Enterprise-Cloud-Architecture-2369212713998038bd50ea842d2e577b?pvs=74](https://alive-lumber-714.notion.site/Enterprise-Cloud-Architecture-2369212713998038bd50ea842d2e577b?pvs=74)

* Quick video walkthroughs:

  * **AWS RDS DB + endpoint creation (YouTube):**
    [https://youtu.be/3lRoZ-b2A04?si=INPWWWzBqWCAGDna](https://youtu.be/3lRoZ-b2A04?si=INPWWWzBqWCAGDna)
  * **GCP Cloud SQL (MySQL) instance creation (YouTube):**
    [https://youtu.be/0K7LpX-jrGY?si=rbc5xYc8Xp17ckkX](https://youtu.be/0K7LpX-jrGY?si=rbc5xYc8Xp17ckkX)

> ⭐ These links contain practical, fast demonstrations that complement the repo - watch them to speed up database provisioning and cloud connections.

---

## 📁 Repo Structure

```
Enterprise-Cloud-Architecture/
├─ 01) docker-intro-app/
│  ├─ course-service/
│  ├─ student-service/
│  ├─ media-service/
│  ├─ frontend/
│  └─ docker-compose.yml
├─ 02) cloud-enabled-deployment-in-action-with-aws/
│  ├─ course-service/
│  ├─ student-service/
│  ├─ media-service/
│  ├─ frontend-app/
│  └─ deployment-configs/ (k8s / IaC / templates)
├─ LICENSE
└─ README.md (this file)
```

---

## ⚡ Quickstart - Run Locally with Docker Compose

**Prerequisites**: Docker & Docker Compose installed. (Java, Node optional for building locally)

```bash
# clone
git clone https://github.com/gayanukabulegoda/Enterprise-Cloud-Architecture.git
cd "01) docker-intro-app"

# see docker-compose.yml and .env.example
# start local environment
docker compose up --build
```

* Frontend: typically available at `http://localhost:3000`.
* Backend APIs: exposed per service (see each service README or `application.properties`).

Stop:

```bash
docker compose down --volumes
```

---

## ☁️ Cloud Deployment Guidance

### AWS (quick routes)

* **Databases**: Use **RDS (MySQL)** for `course-service`. For MongoDB, consider **DocumentDB**, **MongoDB Atlas**, or self-managed on EKS.
* **Storage**: Use **S3** for `media-service`. Use IAM roles with least privilege + pre-signed URLs for client uploads.
* **Compute**: ECS Fargate (quick) or EKS (Kubernetes) for production. Frontend: S3 + CloudFront for static hosting.
* **Secrets**: Store credentials in Secrets Manager / Parameter Store.
* **Artifact registry**: ECR for Docker images.
* **CI/CD**: GitHub Actions → build → push → deploy (ECS/EKS/Terraform).

### GCP (equivalent patterns)

* **Cloud SQL** for MySQL, **GCS** for object storage, **Cloud Run** (serverless) or **GKE** for containers.
* Use **Secret Manager**, **Artifact Registry**, and **Cloud Build** or GitHub Actions for CI.

---

## 🧭 Architecture

```mermaid
flowchart LR
  Browser --> CDN_ALB["Frontend (React)"]
  CDN_ALB --> FrontendApp(("Frontend App"))
  FrontendApp --> API_Gateway["API Gateway"]
  API_Gateway --> CourseService["Course Service"]
  API_Gateway --> StudentService["Student Service"]
  API_Gateway --> MediaService["Media Service"]
  CourseService --> RDS[(MySQL RDS)]
  StudentService --> MongoDB[(MongoDB / Atlas)]
  MediaService --> ObjectStorage[(S3 / GCS)]
  Observability(("Monitoring & Tracing"))
  CourseService --> Observability
  StudentService --> Observability
  MediaService --> Observability
```

---

## 🤝 Contributing

Contributions welcome! Please:

* Open issues for bugs / feature requests.
* Use `pull requests` with clear descriptions.
* Never commit secrets — use `.env.example` for sample variables.

Security disclosure contact: **[grbulegoda@gmail.com](mailto:grbulegoda@gmail.com)**

---

## 📜 License

This repository is provided under the license in the root `LICENSE` file. (Please check that file for terms.)

---

<p align="center">
  💡 If you find this project useful, consider giving it a ⭐ on GitHub!
</p>
<p align="center">
  🚀 Thank you for visiting! Stay connected & keep innovating! 🎉
</p>
<p align="center">
  &copy; 2025 <strong>Gayanuka Bulegoda</strong>
</p>

---
