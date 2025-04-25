export const View = (() => {
    const goalListEl = document.querySelector(".goal__list");
    const inputDescEl = document.querySelector(".goal__input");
    const inputCategoryEl = document.querySelector(".goal__category");
    const inputRepsEl = document.querySelector(".goal__repetitions");
    const addBtnEl = document.querySelector(".goal__btn--add");
  
    const renderGoals = (goals) => {
      goalListEl.innerHTML = "";
  
      goals.forEach((goal) => {
        const goalItem = document.createElement("div");
        goalItem.classList.add("goal__item");
        goalItem.id = goal.id;
  
        const span = document.createElement("span");
        span.innerHTML = `${goal.description} - <strong>${goal.category}</strong> (${goal.repetitions} repetitions)`;
  
        const button = document.createElement("button");
        button.textContent = goal.achieved ? "Achieved" : "Mark as Achieved";
        button.classList.add("goal__btn--achieve");
        if (goal.achieved) {
          goalItem.classList.add("achieved");
          button.disabled = true;
        }
  
        goalItem.appendChild(span);
        goalItem.appendChild(button);
        goalListEl.appendChild(goalItem);
      });
  
      if (goals.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No fitness goals. Let's get moving!";
        message.classList.add("empty-message");
        goalListEl.appendChild(message);
      }
    };
  
    const getFormData = () => {
      return {
        description: inputDescEl.value.trim(),
        category: inputCategoryEl.value,
        repetitions: inputRepsEl.value
      };
    };
  
    const clearForm = () => {
      inputDescEl.value = "";
      inputCategoryEl.selectedIndex = 0;
      inputRepsEl.selectedIndex = 0;
    };
  
    const bindAddGoal = (handler) => {
      const form = document.querySelector(".goal__form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        handler();
      });
    };
  
    const bindMarkAchieved = (handler) => {
      goalListEl.addEventListener("click", (event) => {
        if (event.target.classList.contains("goal__btn--achieve")) {
          const id = event.target.parentElement.id;
          handler(id);
        }
      });
    };
  
    return {
      renderGoals,
      getFormData,
      clearForm,
      bindAddGoal,
      bindMarkAchieved
    };
  })();
  
  