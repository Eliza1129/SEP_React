import { Model } from "./Model.js";
import { View } from "./View.js";
import { APIs } from "./api.js";

const Controller = ((model, view, api) => {
  const state = new model.State();

  const addGoalHandler = () => {
    const data = view.getFormData();
    if (!data.description || !data.repetitions) {
      alert("Please fill all fields");
      return;
    }

    const newGoal = { ...data, achieved: false };
    state.addGoal(newGoal);

    api.createGoal(newGoal).then(createdGoal => {
      view.clearForm();
    });
  };

  const markAsAchievedHandler = (id) => {
    api.updateGoal(id, { achieved: true }).then(updatedGoal => {
      state.goals = state.goals.map(g => g.id === parseInt(id) ? updatedGoal : g);
    });
  };

  const init = () => {
    state.subscribe(() => view.renderGoals(state.goals));

    api.getGoals().then(goals => {
      const sortedGoals = goals.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      state.goals = sortedGoals;
    });

    view.bindAddGoal(addGoalHandler);
    view.bindMarkAchieved(markAsAchievedHandler);
  };

  return { init };
})(Model, View, APIs);

Controller.init();
 