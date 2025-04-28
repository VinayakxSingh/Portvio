# Investment-Tracker

## Introduction
Introduction -- The Investment Tracker is a comprehensive web application designed to help users monitor their financial investments in various assets. It provides a secure login system, an intuitive dashboard with visual representations of investment data, and tools for analyzing investment performance over time. The application streamlines investment tracking by consolidating information in one accessible platform, saving users from managing complex spreadsheets or multiple finance apps.

Purpose -- The Investment Tracker aims to provide users with a clear view of their financial portfolio's performance and composition. It enables informed decision-making through visual data representations and performance metrics. The platform serves as a centralized hub for monitoring investment growth, losses, and overall financial health. It simplifies complex financial data into digestible insights for both experienced investors and beginners. The application helps users identify trends and patterns in their investments to optimize their financial strategies.

Functionality -- Users can securely log in to access their personalized investment dashboard with pie charts showing asset allocation across different investment types. The dashboard features line charts displaying investment returns over time, helping users visualize performance trends. A detailed table view provides comprehensive information about each investment, including purchase dates, values, and performance metrics. The "Add Investment" feature allows users to easily input new investments with relevant details like purchase price and date. The comparison tool enables users to evaluate the performance of two investments side-by-side with percentage change calculations.

Problem Solved --   The Investment Tracker eliminates the need for manual tracking through spreadsheets or paper records, saving users significant time and reducing human error. It provides real-time insights into investment performance, helping users quickly identify underperforming assets that may need attention. The visual representation of data makes complex financial information more accessible and easier to interpret for users of all expertise levels. By calculating percentage changes and displaying performance metrics, it takes the guesswork out of determining investment success. The centralized platform reduces the stress of portfolio management by keeping all investment information organized in one secure location.

## Project Type
Fullstack

## Deplolyed App
App Link:(https://investment-tracker-one.vercel.app/)
Database: https://investment-6f46c-default-rtdb.firebaseio.com/users.json

## Directory Structure
src
├── assets
├── components
│   ├── AddInvestment.jsx
│   ├── AddInvestment.css
│   ├── Charts.jsx
│   ├── Charts.css
│   ├── Compare.jsx
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── Features.jsx
│   ├── features.css
│   ├── Footer.css
│   ├── footer.css
│   ├── Hero.css
│   ├── hero.jsx
│   ├── HomeChart.jsx
│   ├── HomeChart.css
│   ├── navbar.jsx
│   ├── Navbar.css
│   ├── WhyUsCards.css
│   ├── WhyUsCards.jsx
├── pages
│   ├── login.jsx
│   ├── Login.css
│   ├── signup.jsx
│   └── signup.css
├── App.jsx
├── App.css
├── firebase.js
├── index.css
└── main.jsx

## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features
List out the key features of your application.
1. Secure User Authentication: Personal login system to protect financial data with encryption and secure storage of user credentials.
2. Interactive Dashboard: Comprehensive overview with pie charts showing asset allocation and line charts displaying investment returns over time.
3. Detailed Investment Tracking: Table view with sorting and filtering capabilities showing purchase price, current value, and performance metrics.
4. Investment Comparison Tool: Side-by-side comparison of two investments with percentage change calculations to evaluate relative performance.
5. Add/Edit Investment Functionality: User-friendly forms to add new investments or update existing ones with validation to ensure accurate data entry.
6. Performance Analytics: Automatic calculation of ROI, percentage changes, and other key metrics to measure investment success.
7. Mobile Responsive Design: Full functionality across devices, allowing users to check investments on desktop, tablet, or smartphone.

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE/FS projects, guide the reviewer how to check mongodb schema etc.

Just clone the git repository and run it in terminal. The run "npm run dev" to run the project.

## Credentials
email -- test@example.com
password -- t_123

## APIs Used
1. https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
2. https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
        
## Technology Stack
HTML
ReactJS
CSS
JavaScript
