# Stripe Azure Integration App

This project demonstrates a full-stack payment integration using **Stripe (Test Mode)** for a "Pro Plan – $10", hosted on **Azure Static Web Apps**, with automated CI/CD via **GitHub Actions**.

## 🚀 Live Demo

🌐 [Visit Deployed App](https://purple-forest-0db11e710.1.azurestaticapps.net/)  


---


## Screenshots 
![Screenshot](Screenshot%202025-07-26%20110559.png)
![Screenshot](Screenshot%202025-07-26%20110609.png)


## 🛠️ Features

- ✅ Stripe Payment Gateway Integration (Test Mode)
- ✅ "Pro Plan – $10" Checkout
- ✅ Azure Static Web Apps Deployment
- ✅ CI/CD Pipeline with GitHub Actions
- ✅ Environment Variable Support (`.env`)
- ✅ Responsive UI

---

## 📂 Tech Stack

- **Frontend**: HTML, JavaScript
- **Payments**: [Stripe Checkout](https://stripe.com/docs/checkout)
- **Deployment**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

---

## 🧪 Stripe Test Card (for demo)

Use the following card in test mode:
```
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any valid ZIP
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Piyush972004/stripe-azure.git
cd stripe-azure
```
2. Setup Stripe
```
Create an account at https://dashboard.stripe.com

Get your Test API Keys

Update your .env file (for local development) or Azure portal (for deployment)

env
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
3. Run Locally
```
You can use any static server or live server extension to run index.html locally.
npm install -g live-server
live-server
```


## 🚀 Deployment on Azure
```
Push code to your GitHub repo.

Go to Azure Portal > Static Web Apps > Create.

Link it to your GitHub repo.

Set your environment variables in Azure > Configuration.

Azure will automatically build and deploy your app.

```













