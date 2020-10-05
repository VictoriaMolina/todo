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
            >
              <b-card-text>{{ task.description }}</b-card-text>
              <b-button
                class="mr-3"
                variant="outline-primary"
                v-on:click="doneTask(task._id)"
                >Done</b-button>
              <b-button 
                class="mr-3"
                variant="outline-danger" 
                v-on:click="deleteTask(task._id)"
                >Delete</b-button>
              <b-button 
                class="mr-3"
                variant="outline-success" 
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
//import EventBus from './eventBus';
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    async getTaskList() {
      try {
        const response = await Axios.get("http://localhost:3000/task/list");

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
    },
    doneTask(taskId) {
      const vueInstance = this;
      Axios.post("http://localhost:3000/task/done", {
          taskId: taskId,
        })
        .then(function(response) {
          if (response.status === "200") {
            vueInstance.$bvToast.toast("Task Updated", {
              title: `Task Created`,
              variant: "success",
              solid: true,
            });
          } else {
            vueInstance.$bvToast.toast(response.data.message, {
              title: "Error",
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch(function(error) {
          vueInstance.$bvToast.toast(error.message, {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        });
    },
    deleteTask(taskId) {
      const vueInstance = this;
      Axios.post("http://localhost:3000/task/delete", {
          taskId: taskId,
        })
        .then(function(response) {
          if (response.status === "200") {
            vueInstance.$bvToast.toast("Task Deleted", {
              title: `Task Deleted`,
              variant: "success",
              solid: true,
            });
          } else {
            vueInstance.$bvToast.toast(response.data.message, {
              title: "Error",
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch(function(error) {
          vueInstance.$bvToast.toast(error.message, {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        });
    }
  },
  mounted() {
    this.getTaskList();
  },
};
</script>
