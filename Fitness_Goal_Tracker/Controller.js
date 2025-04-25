import { Model } from "./Model.js";
import { View } from "./View.js";
import { APIs } from "./api.js";

const Controller = ((model, view, api) => {
  const state = new model.State();

  // Handle new goal submission
  const addGoalHandler = () => {
    const data = view.getFormData();
    // Validate required fields
    if (!data.description || !data.repetitions) {
      alert("Please fill all fields");
      return;
    }

    const newGoal = { ...data, achieved: false };
    state.addGoal(newGoal);  // Add to local state first for immediate UI update

    // Then sync with server
    api.createGoal(newGoal).then(createdGoal => {
      view.clearForm();
    });
  };

  // Handle marking a goal as achieved
  const markAsAchievedHandler = (id) => {
    api.updateGoal(id, { achieved: true }).then(updatedGoal => {
      state.goals = state.goals.map(g => g.id === parseInt(id) ? updatedGoal : g);
    });
  };

  // Initialize the application
  const init = () => {
    // Set up state-view synchronization
    state.subscribe(() => view.renderGoals(state.goals));

    // Load initial data and sort by ID
    api.getGoals().then(goals => {
      const sortedGoals = goals.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      state.goals = sortedGoals;
    });

    // Bind event handlers
    view.bindAddGoal(addGoalHandler);
    view.bindMarkAchieved(markAsAchievedHandler);
  };

  return { init };
})(Model, View, APIs);

Controller.init();
 