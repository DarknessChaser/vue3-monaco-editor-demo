<template>
  <div class="editor-view">
    <monaco-editor @change="(val)=>value=val"/>
  </div>
  <p>{{ value }}</p>
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
