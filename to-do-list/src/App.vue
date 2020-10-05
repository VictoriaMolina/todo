<template>
  <div id="app">
    <h1 class="mt-5 mb-5">TO DO LIST</h1>

    <b-button v-b-toggle.sidebar-1 class="mb-3">New task</b-button>
    <router-link to="/about" class="nav-link">Archive</router-link>
    <router-link to="/" class= "mb-3">Home</router-link>
    <b-sidebar id="sidebar-1" title="New Task" shadow>
      <div class="px-3 py-2">
        <p>Fill all text fields to create a new task.</p>
        <b-row>
          <b-col sm="3">
            <label for="`taskName">Name:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              v-model="taskName"
              id="taskName"
              type="text"
              size="sm"
              placeholder="Name task"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row clas="my-1 mb-4">
          <b-col sm="3">
            <label for="`taskName">Description:</label>
          </b-col>
          <b-col sm="9">
            <b-form-textarea
              v-model="taskDesc"
              id="taskDescription"
              size="sm"
              placeholder="Task Description"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row clas="my-1">
          <b-col sm="12">
            <b-button
              variant="success"
              class="mr-0"
              v-on:click="createNewTask()"
              >Save</b-button
            >
          </b-col>
        </b-row>
      </div>
    </b-sidebar>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
//import EventBus from 'eventBus'
export default {
  data() {
    return {
      taskName: "",
      taskDesc: ""
    };
  },
  methods: {
    createNewTask() {
      const vueInstance = this;
      axios.post('http://localhost:3000/task/new', {
  name: this.taskName,
  desc: this.taskDesc
})
    .then(function (response) {
      if (response.status === "200") {
        vueInstance.$bvToast.toast('Task Created', {
          title: `Task Created`,
          variant: "success",
          solid: true
        });
      }
    })
    .catch(function (error) {
      vueInstance.$bvToast.toast(error.message, {
        title: "Error",
        variant: "danger",
        solid: true
      });
    });
    }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
