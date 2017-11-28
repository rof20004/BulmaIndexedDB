<template>
	<div class="topico-create">
		<div class="section">
      <div class="container">
        <div class="box">
          <form @submit.stop.prevent="add">
            <div class="columns is-mobile">
              <div class="column">
                <div class="field">
                  <label for="" class="label">Descrição</label>
                  <p class="control">
                    <input type="text" class="input" ref="descricao" v-model="topico.descricao" :disabled="isLoading">
                  </p>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column">
                <button :class="['button', 'is-primary', {'is-loading': isLoading}]">Salvar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <topico-list :topicos="topicos" @topicosRemoved="list"></topico-list>
	</div>
</template>

<script>
import Database from '../../database.js'
import TopicoList from '@/components/topico/TopicoList.vue'

export default {
  name: 'topico-create',
  data () {
    return {
      topico: {
        descricao: ''
      },
      topicos: [],
      isLoading: false
    }
  },
  components: {
    'topico-list': TopicoList
  },
  computed: {
    validation () {
      return {
        descricao: !!this.topico.descricao.trim()
      }
    },
    isValid () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    clearForm () {
      this.topico.descricao = ''
    },
    add () {
      if (this.isValid) {
        this.isLoading = true
        let transaction = Database.getDatabase().transaction(['topicos'], 'readwrite')
        let store = transaction.objectStore('topicos')
        let result = store.add(this.topico)

        result.onerror = e => {
          console.log(e.target.error.name)
        }

        result.onsuccess = e => {
          this.isLoading = false
          this.clearForm()
          this.$refs.descricao.focus()
          this.list()
        }
      }
    },
    list () {
      let transaction = Database.getDatabase().transaction(['topicos'], 'readwrite')
      let store = transaction.objectStore('topicos')
      let result = store.getAll()

      result.onerror = e => {
        console.log(e.target.error.name)
      }

      result.onsuccess = e => {
        this.topicos = e.target.result
        if (this.topicos.length === 0) {
          this.topicos = null
        }
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.list()
    }, 1000)
  }
}
</script>

<style>
</style>
