<template>
  <div class="container">
    <div class="row">
      <div class="col-md">
        <ul v-if="tasks.length > 0" style="list-style-type:none;">
          <li class="mb-4">
            <b-card
              v-for="task in tasks"
              border-variant="secondary"
              :header="task.name"
              header-border-variant="secondary"
              align="center"
              :key="task._id"
              class= "mb-3"
            >
              <b-card-text>{{ task.description }}</b-card-text>
              <b-button variant="outline-success" 
                v-b-toggle.sidebar-1
                v-model="task.name"
              >Edit</b-button>
              <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
              </b-modal>
            </b-card>
          </li>
        </ul>
        <p v-else>You have been finished all your tasks!!</p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  components: {},
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    async getDoneTaskList() {
      try {
        const response = await Axios.get("http://localhost:3000/task/doneList");

        //Modify task
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          this.tasks = response.data.data;
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getDoneTaskList();
  },
};
</script>
