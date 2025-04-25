export const APIs = (() => {
    const baseURL = "http://localhost:3000/goals";
  
    const getGoals = () => {
        return fetch(baseURL).then((res) => res.json());
      };
  
    const createGoal = (goal) => {
      return fetch(baseURL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(goal)
      }).then(res => res.json());
    };
  
    const updateGoal = (id, updatedData) => {
      return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(updatedData)
      }).then(res => res.json());
    };
  
    return { getGoals, createGoal, updateGoal };
  })();
  