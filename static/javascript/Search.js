function init() {
    // Check if the current URL is the page you want
    if (location.pathname === '/Search') {
        // Your code here
        // For From Year
        let fromYear = document.getElementById('from');

        let currentYear = new Date().getFullYear();
        let earliestYear = 1970;
        while (currentYear >= earliestYear) {
            let dateOption = document.createElement('option');
            dateOption.text = currentYear;
            dateOption.value = currentYear;
            fromYear.add(dateOption);
            currentYear -= 1;
        }

        document.getElementById('from').addEventListener("change",applyDropdown)
// // For Until Year

        function applyDropdown() {
            let untilYear = document.getElementById('until');
            currentYear = new Date().getFullYear();
            let startYear = fromYear.value;
            while (currentYear >= startYear) {
                let yearOption = document.createElement('option');
                yearOption.text = currentYear;
                yearOption.value = currentYear;
                untilYear.add(yearOption);
                currentYear -= 1;
            }
        }
    }
}


window.addEventListener('load', init);



