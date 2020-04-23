<template>
  <div>
    <main-header :pageTitle='title' :tabColour='tabColour' />
    <q-page class='flex flex-center' v-if='!taskList.length && !selectFilterApplied'>
      <div class='no-task'>
        <h5>Your List is Empty</h5>
        <q-btn
          round
          color='primary'
          icon='add'
          text-color='white'
          @click='taskDialog = !taskDialog'
        ></q-btn>
      </div>
    </q-page>
    <div v-else class='q-ma-lg'>
      <div class='row'>
        <div class='col-9'>
          <q-select
            :options='options'
            outlined
            dense
            option-label='name'
            option-value='id'
            v-model='selectedOption'
            class='option-select'
            @input="selectTaskType"
          ></q-select>
        </div>
        <div class='col-3 text-right'>
          <q-btn outline dense color='primary' @click='taskDialog = !taskDialog'>Add Task</q-btn>
        </div>
      </div>
      <q-card
        v-for='(task,index) in taskList'
        :key='task.index'
        bordered
        outline
        flat
        class='q-my-md'
      >
        <q-card-section>
          <div class='q-gutter-sm'>
            <q-list>
              <q-item tag='label' v-ripple>
                <q-item-section avatar>
                  <q-checkbox
                    v-model='task.task_status'
                    color='secondary'
                    @input="checkTask(task)"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label :class= "task.task_status ? 'done': 'not-done'">{{task.task_name}}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="!task.task_status">
                  <q-btn
                    icon='edit'
                    dense
                    flat
                    size='sm'
                    color='primary'
                    @click.stop='editTask(task, index)'
                  ></q-btn>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon='delete'
                    dense
                    flat
                    size='sm'
                    color='primary'
                    @click.stop='deleteTask(task, index)'
                  ></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model='taskDialog'>
      <q-card class='add-task-card q-py-md'>
        <q-card-section>
          <div class='text-h6'>Add New Task</div>
        </q-card-section>

        <q-card-section class='q-pt-none'>
          <q-input placeholder='Enter the task' outlined dense v-model='newTask'></q-input>
        </q-card-section>

        <q-card-actions align='center'>
          <q-btn label='Add task' color='primary' @click='addTask' />
          <q-btn
            label='Cancel'
            color='secondary'
            @click="taskDialog = false; newTask.length ? newTask = '' : '' "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model='editTaskDialog'>
      <q-card class='add-task-card q-py-md'>
        <q-card-section>
          <div class='text-h6'>Edit Task</div>
        </q-card-section>

        <q-card-section class='q-pt-none'>
          <q-input placeholder='Enter the task' outlined dense v-model='toDo.task_name'></q-input>
        </q-card-section>

        <q-card-actions align='center'>
          <q-btn label='Update task' color='primary' @click='saveTask(toDo)' />
          <q-btn
            label='Cancel'
            color='secondary'
            @click="editTaskDialog = false; toDo.task_name.length ? toDo.task_name = '' : '' "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
export default {
  components: {
    MainHeader
  },
  data () {
    return {
      title: 'To Do List',
      tabColour: 'primary',
      toDo: { task_name: '', task_status: false },
      taskDialog: false,
      options: [
        { id: '1', name: 'All Tasks' },
        { id: '2', name: 'Pending Tasks' },
        { id: '3', name: 'Completed Tasks' }
      ],
      selectedOption: '',
      newTask: '',
      taskList: [],
      editTaskDialog: false,
      selectFilterApplied: false
    }
  },
  mounted () {
    this.selectedOption = this.options[0]
    this.getTasks()
  },
  methods: {
    async getTasks () {
      const response = await this.$axios.get(`todolists/?tasks=${this.selectedOption.id}`).catch(error => {
        console.log('Error', error.message)
      })
      if (response && response.status === 200) {
        this.taskList = response.data.data
      }
    },
    async addTask () {
      this.toDo.task_name = this.newTask
      this.toDo.task_status = false
      const response = await this.$axios
        .post('todolists/', this.toDo)
        .catch(error => {
          console.log('error', error.message)
        })
      if (response && response.status === 200) {
        this.taskList = response.data.data
        this.newTask = ''
        this.taskDialog = false
        this.getTasks()
      }
    },
    editTask (item, index) {
      this.editTaskDialog = true
      this.$axios
        .get('/todolists/' + item._id)
        .then(response => {
          if (response) {
            this.toDo = Object.assign({}, response.data.data)
          }
        })
        .catch(error => {
          this.$q.notify({
            message: error.message,
            color: 'negative'
          })
        })
    },
    saveTask (item) {
      this.$axios.put('/todolists/' + item._id, item).then(response => {
        if (response) {
          this.editTaskDialog = false
          this.toDo = {}
          this.getTasks()
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          color: 'negative'
        })
      })
    },
    checkTask (item) {
      this.saveTask(item)
    },
    deleteTask (item, index) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure ? ',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete('/todolists/' + item._id, item)
            .then(response => {
              if (response) {
                this.taskList.splice(index, 1)
              }
            })
            .catch(error => {
              this.$q.notify({
                message: error.message,
                color: 'positive'
              })
            })
        })
    },
    selectTaskType () {
      this.selectFilterApplied = true
      this.getTasks()
    }
  }
}
</script>
<style lang='scss'>
.no-task {
  text-align: center
}
.add-task-card {
  width: 300px
}
.option-select {
  width: 40%
}
.done {
  color: #888;
  text-decoration: line-through;
}
.not-done::first-letter, .done::first-letter {
  text-transform:uppercase
}
</style>
