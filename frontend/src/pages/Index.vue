<template>
  <div>
    <main-header :pageTitle='title' :tabColour='tabColour' />
    <q-page class='flex flex-center' v-if='!toDo.length'>
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
    <div class="row">
    <div class="col-9"> <q-select :options="options" outlined dense option-label="name" option-value="id" v-model="selectedOption" class="option-select"></q-select></div>
      <div class="col-3 text-right">
      <q-btn outline dense color="primary" @click='taskDialog = !taskDialog'>Add Task</q-btn>
      </div>
    </div>
      <q-card v-for='(task,index) in toDo' :key='task.index' bordered outline flat class='q-my-md'>
        <q-card-section>
          <div class='q-gutter-sm'>
            <q-list>
              <q-item tag='label' v-ripple clickable>
                <q-item-section avatar>
                  <q-checkbox v-model='task.status' color='secondary' class='no-pointer-events' />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-capitalize">{{task.name}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    icon='delete'
                    dense
                    flat
                    size='sm'
                    color='primary'
                    @click.stop='deleteTask(index)'
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
          <q-btn label='Cancel' color='secondary' @click="taskDialog = false ;newTask.length ? newTask = '' : '' " />
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
      newTask: '',
      toDo: [
        { name: 'Get bananas', status: false },
        { name: 'Eat bananas', status: false },
        { name: 'Poo bananas', status: false }
      ],
      taskDialog: false,
      options: [{ id: '1', name: 'All Tasks' }, { id: '2', name: 'Pending Tasks' }, { id: '3', name: 'Completed Tasks' }],
      selectedOption: ''
    }
  },
  mounted () {
    this.selectedOption = this.options[0]
  },
  methods: {
    addTask () {
      this.toDo.push({
        name: this.newTask,
        status: false
      })
      this.newTask = ''
    },
    deleteTask (index) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure ? ',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.toDo.splice(index, 1)
          this.$q.notify({
            message: 'Task Deleted',
            color: 'teal'
          })
        })
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
.option-select{
  width: 30%
}
.done{
  text-decoration:aqua
}
</style>
