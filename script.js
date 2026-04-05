// Finance Dashboard - script.js

let transactions = JSON.parse(localStorage.getItem("transactions")) || [
    {date: "2026-04-01", amount: 500, category: "Salary", type: "income"},
    {date: "2026-04-02", amount: 100, category: "Food", type: "expense"},
    {date: "2026-04-03", amount: 50, category: "Transport", type: "expense"}
  ];
  
  let role = "viewer";
  let sortKey = null;
  
  // Save state to localStorage
  function saveState() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  
  // Render summary cards
  function renderSummary() {
    let income = transactions.filter(t => t.type === "income").reduce((a,b)=>a+b.amount,0);
    let expenses = transactions.filter(t => t.type === "expense").reduce((a,b)=>a+b.amount,0);
    let balance = income - expenses;
  
    $("#income").text("Income: $" + income);
    $("#expenses").text("Expenses: $" + expenses);
    $("#totalBalance").text("Balance: $" + balance);
  }
  
  // Render transactions table
  function renderTransactions(filter="") {
    $("#transactionList").empty();
    let data = transactions.filter(t => 
      t.category.toLowerCase().includes(filter.toLowerCase()) ||
      t.date.includes(filter) ||
      t.type.toLowerCase().includes(filter.toLowerCase())
    );
    if(sortKey) {
      data.sort((a,b)=> (a[sortKey] > b[sortKey]) ? 1 : -1);
    }
    if(data.length === 0) {
      $("#transactionList").append("<tr><td colspan='4'>No transactions found</td></tr>");
      return;
    }
    data.forEach(t => {
      $("#transactionList").append(`<tr>
        <td>${t.date}</td><td>${t.amount}</td><td>${t.category}</td><td>${t.type}</td>
      </tr>`);
    });
  }
  
  // Render insights
  function renderInsights() {
    let categories = {};
    transactions.forEach(t => {
      if(t.type === "expense") {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });
    let highestCategory = Object.keys(categories).reduce((a,b)=>categories[a]>categories[b]?a:b,"");
    let avgExpense = (Object.values(categories).reduce((a,b)=>a+b,0) / (Object.keys(categories).length || 1)).toFixed(2);
  
    $("#insightList").html(`
      <li>Highest spending category: ${highestCategory || "N/A"}</li>
      <li>Average expense per category: $${avgExpense}</li>
      <li>Total transactions: ${transactions.length}</li>
    `);
  }
  
  // Render charts
  function renderCharts() {
    // Reset canvases to avoid duplicate charts
    $("#balanceTrend").replaceWith('<canvas id="balanceTrend"></canvas>');
    $("#spendingBreakdown").replaceWith('<canvas id="spendingBreakdown"></canvas>');
  
    let ctx1 = document.getElementById("balanceTrend").getContext("2d");
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: transactions.map(t=>t.date),
        datasets: [{
          label:"Balance Trend",
          data: transactions.map((t,i)=>{
            let income = transactions.slice(0,i+1).filter(x=>x.type==="income").reduce((a,b)=>a+b.amount,0);
            let expense = transactions.slice(0,i+1).filter(x=>x.type==="expense").reduce((a,b)=>a+b.amount,0);
            return income-expense;
          }),
          borderColor:"blue", fill:false
        }]
      }
    });
  
    let ctx2 = document.getElementById("spendingBreakdown").getContext("2d");
    let expenseCategories = {};
    transactions.filter(t=>t.type==="expense").forEach(t=>{
      expenseCategories[t.category]=(expenseCategories[t.category]||0)+t.amount;
    });
    new Chart(ctx2, {
      type: "pie",
      data: {
        labels: Object.keys(expenseCategories),
        datasets: [{
          data:Object.values(expenseCategories),
          backgroundColor:["pink","blue","orange","purple","yellow"]
        }]
      }
    });
  }
  
  // Update role-based UI
  function updateRoleUI() {
    if(role === "admin") {
      $("#addTransactionBtn").show();
    } else {
      $("#addTransactionBtn").hide();
    }
  }
  
  // Document ready
  $(document).ready(function(){
    renderSummary();
    renderTransactions();
    renderInsights();
    renderCharts();
    updateRoleUI();
  
    // Search filter
    $("#searchBox").on("input", function(){
      renderTransactions($(this).val());
    });
  
    // Role switching
    $("#roleSelector").on("change", function(){
      role = $(this).val();
      updateRoleUI();
    });
  
    // Add transaction (Admin only)
    $("#addTransactionBtn").on("click", function(){
      let newT = {date:"2026-04-05", amount:200, category:"Shopping", type:"expense"};
      transactions.push(newT);
      saveState();
      renderSummary();
      renderTransactions();
      renderInsights();
      renderCharts();
    });
  
    // Sorting
    $("th").on("click", function(){
      sortKey = $(this).data("sort");
      renderTransactions($("#searchBox").val());
    });
  
    // Dark mode toggle
    $("#darkModeToggle").on("click", function(){
      $("body").toggleClass("dark-mode");
    });
  });