document.getElementById("calorieForm").addEventListener("submit", function(event){
    event.preventDefault();

    let checkboxes = document.querySelectorAll('input[name="food"]:checked');

    let totalCalories = 0;
    for(var i = 0; i < checkboxes.length; i++) {
        let foodInfo = checkboxes[i].value.split("|");
        let calories = parseInt(foodInfo[1]);
        totalCalories += calories;
    }

    document.getElementById("totalCalories").textContent = totalCalories;

})