document.getElementById("calorieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let checkboxes = document.querySelectorAll('input[name="food"]:checked');
    let totalCalories = parseInt(document.getElementById("totalCalories").textContent);
    let totalProtein = 0; // Initialize total protein

    for (var i = 0; i < checkboxes.length; i++) {
      let foodInfo = checkboxes[i].value.split("|");
      let calories = parseInt(foodInfo[1]);
      let protein = parseFloat(FoodInfo[2]); // Parse protein as a float
      // Extract protein from the foodInfo array (Assuming it's the third item)

      totalCalories += calories;
      totalProtein += protein
    }

    document.getElementById("totalCalories").textContent = totalCalories;
    document.getElementById("totalProtein").textContent = totalProtein.toFixed(1); // Display total protein with 1 decimal place

    document.getElementById("calorieForm").reset();
});





