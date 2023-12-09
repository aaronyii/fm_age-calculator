const dayInput = document.getElementById("day")
const monthInput = document.getElementById("month")
const yearInput = document.getElementById("year")
const submitBtn = document.getElementById("arrowBtn")
const errorMessage_Day = document.querySelector(".container form .day p")
const errorMessage_Month = document.querySelector(".container form .month p")
const errorMessage_Year = document.querySelector(".container form .year p")
const resultDay = document.querySelector(".result .result_days span")
const resultMonth = document.querySelector(".result .result_months span")
const resultYear = document.querySelector(".result .result_years span")
const labelDay = document.querySelector(".container form .day label")
const labelMonth = document.querySelector(".container form .month label")
const labelYear = document.querySelector(".container form .year label")



const reset = () => {
    errorMessage_Day.classList.add("hidden")
    errorMessage_Month.classList.add("hidden")
    errorMessage_Year.classList.add("hidden")
    resultDay.textContent = "--"
    resultMonth.textContent = "--"
    resultYear.textContent = "--"
    errorMessage_Day.textContent = ""
    errorMessage_Month.textContent = ""
    errorMessage_Year.textContent = ""
    dayInput.classList.remove("invalid")
    monthInput.classList.remove("invalid")
    yearInput.classList.remove("invalid")
    labelDay.classList.remove("invalid_label")
    labelMonth.classList.remove("invalid_label")
    labelYear.classList.remove("invalid_label")
}


submitBtn.addEventListener('click', ()=> {

    reset()

    //Check if the input is empty
    if (dayInput.value.length === 0) {
        errorMessage_Day.classList.remove("hidden")
        errorMessage_Day.textContent = "This field is required"
        dayInput.classList.add("invalid")
        labelDay.classList.add("invalid_label")
    }
    if (monthInput.value.length === 0) {
        errorMessage_Month.classList.remove("hidden")
        errorMessage_Month.textContent = "This field is required"
        monthInput.classList.add("invalid")
        labelMonth.classList.add("invalid_label")
    }
    if (yearInput.value.length === 0) {
        errorMessage_Year.classList.remove("hidden")
        errorMessage_Year.textContent = "This field is required"
        yearInput.classList.add("invalid")
        labelYear.classList.add("invalid_label")
    }

    if (dayInput.value.length === 0 || monthInput.value.length === 0 || yearInput.value.length === 0) return
    
    
    const [days, months, years] = [parseInt(dayInput.value),parseInt(monthInput.value),parseInt(yearInput.value)]
    //Check if the inputs are valid
    if (days <= 0 || days > 31) {
        errorMessage_Day.classList.remove("hidden")
        errorMessage_Day.textContent = "Must be a valid day"
        dayInput.classList.add("invalid")
        labelDay.classList.add("invalid_label")
    }
    if (months <= 0 || months > 12) {
        errorMessage_Month.classList.remove("hidden")
        errorMessage_Month.textContent = "Must be a valid month"
        monthInput.classList.add("invalid")
        labelMonth.classList.add("invalid_label")
    }
    if (years <= 1000) {
        errorMessage_Year.classList.remove("hidden")
        errorMessage_Year.textContent = "Must be a valid year"
        yearInput.classList.add("invalid")
        labelYear.classList.add("invalid_label")
    }

    if (days <= 0 || days > 31 || months <= 0 || months > 12 || years <= 1000) return

    const inputDate = new Date(years, months - 1, days)

    // Check if the date is valid
    if (inputDate.getFullYear() !== years ||
    inputDate.getMonth() !== months - 1 ||
    inputDate.getDate() !== days) {
        errorMessage_Day.classList.remove("hidden")
        errorMessage_Day.textContent = "Must be a valid date"
        dayInput.classList.add("invalid")
        monthInput.classList.add("invalid")
        yearInput.classList.add("invalid")
        labelDay.classList.add("invalid_label")
        labelMonth.classList.add("invalid_label")
        labelYear.classList.add("invalid_label")
        return
    }



    // Check if the date is in the past
    const currentDate = new Date()
    if (currentDate < inputDate)  {
        errorMessage_Day.classList.remove("hidden")
        errorMessage_Day.textContent = "Must be a valid date"
        dayInput.classList.add("invalid")
        monthInput.classList.add("invalid")
        yearInput.classList.add("invalid")
        labelDay.classList.add("invalid_label")
        labelMonth.classList.add("invalid_label")
        labelYear.classList.add("invalid_label")
        return
    }

    let timeDifference = currentDate.getTime() - inputDate.getTime();
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) 

    let ageYear = currentDate.getFullYear()- inputDate.getFullYear()
    let ageMonth = currentDate.getMonth() - inputDate.getMonth()

    if (ageMonth < 0) {
        ageYear--;
        ageMonth += 12;
    }

    let ageDay = totalDays - (ageYear * 365 + ageMonth * 30);

    if (ageDay < 0) {
        ageDay += 31
        if (ageMonth - 1 < 0) {
            ageMonth = 12
            ageYear--
        }
        ageMonth--
    }


    resultDay.textContent = ageDay
    resultMonth.textContent = ageMonth
    resultYear.textContent = ageYear

    

})
