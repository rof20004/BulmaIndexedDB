export default {
  database: null,
  getDatabase () {
    return this.database
  },
  initDB () {
    let request = window.indexedDB.open('prodam-propostas', 1)

    request.onsuccess = e => {
      this.database = e.target.result
    }

    request.onupgradeneeded = e => {
      this.database = e.target.result

      if (!this.database.objectStoreNames.contains('topicos')) {
        this.database.createObjectStore('topicos', { keyPath: 'id', autoIncrement: true })
      }
    }

    request.onerror = e => {
      console.log('Error:', e.target.error.name)
    }
  }
}
