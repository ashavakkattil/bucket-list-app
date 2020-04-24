<template>
 <div> <q-header elevated :class= "'bg-' + tabColour">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{pageTitle}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
         Take me to..
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
</div>
</template>
<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',
  props: ['pageTitle', 'tabColour'],
  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        /* {
          title: 'Bucket List',
          icon: 'mdi-airballoon'
        },
        {
          title: 'Goals',
          icon: 'mdi-library-books'
        },
        {
          title: 'Monthly Planner',
          icon: 'mdi-calendar-multiple-check'
        },
        {
          title: 'Weekly Planner',
          icon: 'mdi-calendar-today'
        }, */
        {
          title: 'To Do List',
          icon: 'mdi-format-list-bulleted',
          link: '/todolists'
        },
        {
          title: 'Notes',
          icon: 'mdi-format-list-bulleted',
          link: '/notes'
        }
      ]
    }
  }
}
</script>
