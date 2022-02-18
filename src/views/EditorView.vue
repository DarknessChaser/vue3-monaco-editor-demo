<template>
  <div class="editor-view">
    在此输入 value <input v-model="value">
    <monaco-editor v-model="value"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MonacoEditor from '@/components/MonacoEditor.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    MonacoEditor,
  },
  data() {
    return {
      value: '',
    };
  },
});
</script>

<style>
.editor-view {
  text-align: left;
}
</style>
