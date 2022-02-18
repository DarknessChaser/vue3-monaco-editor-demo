<template>
  <div id="editor" style="height: 300px;"></div>
</template>

<script>
import { defineComponent } from 'vue';
import { Uri, editor } from 'monaco-editor';
import { setDiagnosticsOptions } from 'monaco-yaml';

// 仅用来匹配 schema 其实可以不写。
const modelUri = Uri.parse('a://b/foo.yaml');

// 方便大家看效果的默认 schema
const defaultSchemas = [
  {
    // Id of the first schema
    uri: 'http://myserver/foo-schema.json',
    // Associate with our model 这里要和上面的modelUri匹配
    fileMatch: [String(modelUri)],
    schema: {
      type: 'object',
      properties: {
        p1: {
          enum: ['v1', 'v2'],
        },
        p2: {
          // Reference the second schema
          $ref: 'http://myserver/bar-schema.json',
        },
      },
    },
  },
  {
    // Id of the first schema
    uri: 'http://myserver/bar-schema.json',
    schema: {
      type: 'object',
      properties: {
        q1: {
          enum: ['x1', 'x2'],
        },
      },
    },
  },
];

const defaultValue = 'p1: \n';

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
      case 'yaml':
        return new Worker(new URL('monaco-yaml/lib/esm/yaml.worker', import.meta.url));
      default:
        throw new Error(`Unknown label ${label}`);
    }
  },
};

let monacoEditor;
export default defineComponent({
  name: 'MonacoEditor',
  props: {
    modelValue: {
      type: String,
      require: false,
      default: defaultValue, // 此处只是为了演示提供默认值，使用的时候要改成需要的值
    },
    schemas: {
      require: false,
      default: defaultSchemas, // 此处只是为了演示提供默认值，使用的时候要改成需要的值
    },
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(value) {
      if (monacoEditor) {
        monacoEditor.setValue(value);
      }
    },
  },
  created() {
    if (this.schemas) {
      setDiagnosticsOptions({
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        validate: true,
        format: true,
        schemas: defaultSchemas,
      });
    }
  },
  mounted() {
    monacoEditor = editor.create(document.getElementById('editor'), {
      // Monaco-yaml features should just work if the editor language is set to 'yaml'.
      language: 'yaml',
      model: editor.createModel(defaultValue, 'yaml', modelUri),
    });
    monacoEditor.onDidChangeModelContent(() => {
      this.$emit('update:modelValue', monacoEditor.getValue());
    });
  },
  beforeUnmount() {
    monacoEditor.dispose();
  },
});
</script>
