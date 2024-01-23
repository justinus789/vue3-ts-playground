<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    @click="props.onClick"
    :style="{ background: props.background, color: props.color }"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  onClick?: Function
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  background?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  onClick: () => {},
  type: undefined,
  disabled: false,
  background: 'burlywood',
  color: 'blueviolet'
})
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  color: #c39cf0;
  background-color: #d4d3d1;
}
</style>
