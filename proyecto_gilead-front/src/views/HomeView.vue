<template>
  <HomeAfiliado />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HomeAfiliado from '../components/HomeAfiliado.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeAfiliado,
  },
});
</script>
