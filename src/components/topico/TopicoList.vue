<template>
	<div class="topico-list">
    <div class="container">
      <div class="box" v-if="topicos != null && topicos.length > 0">
        <table class="table is-striped is-narrow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in topicos" :key="t.id">
              <td>{{ t.id }}</td>
              <td>{{ t.descricao }}</td>
              <td>
                <button class="button is-danger is-outlined" @click="remover(t.id)">
                  <span>Remover</span>
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span v-else-if="topicos === null">Nenhum registro encontrado</span>
      <span v-else>Aguarde, carregando dados...</span>
    </div>
	</div>
</template>

<script>
import Database from '../../database.js'

export default {
  name: 'topico-list',
  props: ['topicos'],
  methods: {
    remover (id) {
      let transaction = Database.getDatabase().transaction(['topicos'], 'readwrite')
      let store = transaction.objectStore('topicos')
      let result = store.delete(id)

      result.onerror = e => {
        console.log(e.target.error.name)
      }

      result.onsuccess = e => {
        this.$emit('topicosRemoved')
      }
    }
  }
}
</script>

<style>
</style>
