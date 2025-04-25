export const Model = (() => {
    class State {
      #goals = [];
      #onChange = () => {};
      #currentId = 1;
  
      get goals() {
        return this.#goals;
      }
      //Update goals and maintain
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
      
      // Update goal's achieved status by ID
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
  