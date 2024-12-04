# Jarurat: Worker-Seeker Platform

Welcome to **Jarurat**, a comprehensive platform connecting job seekers (workers) and job providers (seekers). Jarurat helps seekers post jobs and find the right talent based on location, skillsets, budget compatibility, and availability, while enabling workers to showcase their profiles and apply for suitable jobs.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

---

## Project Overview
Jarurat aims to bridge the gap between job seekers and job providers. It leverages smart algorithms to match workers with jobs based on various criteria, ensuring efficient recruitment and job application processes.

---

## Features

### For Job Seekers (Workers):
- **Create Profile**: Set up and manage personal profiles.
- **Job Search**: Search and filter jobs based on skills, location, and budget.
- **Apply for Jobs**: Submit applications or bids for posted jobs.

### For Job Providers (Seekers):
- **Post Jobs**: Create detailed job postings.
- **Manage Applications**: View, accept, or reject worker applications.
- **Worker Recommendations**: Receive smart recommendations based on matching algorithms.

### General:
- **Authentication**: User registration, login, and Google authentication.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Notifications**: Real-time updates for job status changes.

---

## Tech Stack
- **Frontend**: React.js, Bootstrap
- **Backend**: Django, Django REST Framework (DRF)
- **Database**: SQLite (development), MySQL (production)
- **Authentication**: Custom authentication, Google OAuth

---

## Setup Instructions

### Prerequisites:
- Node.js & npm
- Python 3.8+
- Virtual environment (recommended)

### Clone the Repository:
```bash
git clone https://github.com/yourusername/jarurat.git
cd jarurat
```
## Backend-Setup

1. **Create a Virtual Environment**:
 ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. **Install Dependencies**:

```bash
pip install -r backend/requirements.txt
```

3. **Apply Migrations**:

```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Run the Server**:

```bash
python manage.py runserver
```
## Frontend-setup

1. **Navigate to Frontend Directory**:

```bash

cd frontend
```
2. **Install Dependencies**:

```bash

npm install
```
3. **Run the Frontend Server**:

```bash

npm start
```

