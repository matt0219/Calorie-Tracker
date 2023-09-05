document.getElementById("calorieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let checkboxes = document.querySelectorAll('input[name="food"]:checked');
    let totalCalories = parseInt(document.getElementById("totalCalories").textContent);
    let totalProtein = 0; // Initialize total protein

    for (var i = 0; i < checkboxes.length; i++) {
      let foodInfo = checkboxes[i].value.split("|");
      let calories = parseInt(foodInfo[1]);

      // Checkk if protein value is present before parsing
      if (foodInfo.length >= 3) {
          let protein = parseFloat(foodInfo[2]); // Parse protein as a float
          totalProtein += protein
          // Extract protein from the foodInfo array (Assuming it's the third item)
      }

      totalCalories += calories;
    }

    document.getElementById("totalCalories").textContent = totalCalories;
    document.getElementById("totalProtein").textContent = totalProtein.toFixed(1); // Display total protein with 1 decimal place

    document.getElementById("calorieForm").reset();

    // Reset the custom food input fields
    document.getElementById("customFoodName").value = "";
    document.getElementById("customFoodCalories").value = "";
    document.getElementById("customFoodProtein").value = "";
});

// Handle custom food addition
document.getElementById("addCustomFood").addEventListener("click", function () {
  const customFoodName = document.getElementById("customFoodName").value;
  const customFoodCalories = parseInt(document.getElementById("customFoodCalories").value);
  const customFoodProtein = parseFloat(document.getElementById("customFoodProtein").value);

  if (customFoodName && customFoodCalories) {
    // Create a new list item for the custom food
    const customFoodListItem = document.createElement("li");
    customFoodListItem.innerHTML = `<input type="checkbox" name="food" value="${customFoodName}|${customFoodCalories}|${customFoodProtein} || ''}"> ${customFoodName} (${customFoodCalories} calories${customFoodProtein ? `, ${customFoodProtein}g Protein` : ''})`;

    // Add the custom food item to the list
    const customFoodList = document.getElementById("customFoodList");
    customFoodList.appendChild(customFoodListItem);

    // Reset the input fields
    document.getElementById("customFoodName").value = "";
    document.getElementById("customFoodCalories").value = "";
    document.getElementById("customFoodProtein").value = "";
  }
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("usernae").value;
  const password = document.getElementById("password").value;

  // Send a POST request to your server to create a new user
  fetch("/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    // Handle registration success or failure
    if (data.success) {
      alert("Registration successful!");
    } else {
      alert("Registration failed. Try a different username.");
    }
  });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send a POST request to your server to authenticate the user
  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    // Handle login success or failure
    if(data.success) {
      alert("Login successful!");
      // Redirect or update UI as needed
    } else {
      alert("Login failed. Check your username and password.");
    }
  });
});




