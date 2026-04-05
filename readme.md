Finance Dashboard UI

Overview

This project is a simple Finance Dashboard built using HTML, CSS, jQuery, and plain JavaScript. It demonstrates frontend development skills including UI design, state management, role-based UI, and interactive visualizations.

Features Implemented

Dashboard Overview with Summary Cards

Displays Total Balance, Income, and Expenses.

Time-Based Visualization (Balance Trend)

Line chart showing balance changes over time.

Categorical Visualization (Spending Breakdown)

Pie chart showing expenses by category.

Transaction List with Details

Shows Date, Amount, Category, and Type (income/expense).

Transaction Filtering

Search box to filter transactions by category, type, or date.

Transaction Sorting

Clickable table headers to sort by Date, Amount, Category, or Type.

Role-Based UI (Viewer and Admin)

Viewer: read-only access.

Admin: can add new transactions.

Insights Section

Highest spending category.

Average expense per category.

Total transactions count.

State Management

Transactions stored in JavaScript arrays and persisted with Local Storage.

Responsive Design

Flexbox layout and media queries for different screen sizes.

Optional Enhancements

Dark Mode toggle.

Local Storage persistence.

Graceful empty state handling.

Setup Instructions

Clone or download the project folder.

Ensure the following files are present:

index.html

style.css

script.js

Open index.html in a browser.

Use the role selector to switch between Viewer and Admin.

Try searching, sorting, and adding transactions to see updates in charts and insights.

Technical Approach

Frontend Only: No backend integration, all logic handled in JavaScript.

Charts: Implemented using Chart.js (UMD build for browser compatibility).

State Management: Simple JavaScript state with persistence via Local Storage.

UI/UX: Clean cards, responsive charts, and role-based controls.

Evaluation Criteria Mapping

Design and Creativity: Clean layout, intuitive navigation.

Responsiveness: Works across screen sizes.

Functionality: Dashboard features, role-based UI, filtering, sorting.

User Experience: Easy to use, clear insights, dark mode.

Technical Quality: Modular functions, localStorage persistence.

State Management: Transactions and filters handled in JS.

Documentation: README with setup, features, and approach.

Attention to Detail: Empty states, chart resizing, UI polish.

