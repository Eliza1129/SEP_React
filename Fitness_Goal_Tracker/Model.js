export const Model = (() => {
    class State {
      #goals = [];
      #onChange = () => {};
      #currentId = 1;
  
      get goals() {
        return this.#goals;
      }
  
      set goals(newGoals) {
        this.#goals = newGoals;
        if (newGoals.length > 0) {
          const maxId = Math.max(...newGoals.map(g => parseInt(g.id)));
          this.#currentId = maxId + 1;
        }
        this.#onChange();
      }
  
      addGoal(goal) {
        const goalWithId = { ...goal, id: this.#currentId++ };
        this.goals = [...this.goals, goalWithId];
      }
  
      markAsAchieved(id) {
        this.goals = this.goals.map(g => 
          g.id === id ? { ...g, achieved: true } : g
        );
      }
  
      subscribe(callback) {
        this.#onChange = callback;
      }
    }
  
    return { State };
  })();
  