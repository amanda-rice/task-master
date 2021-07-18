import { ProxyState } from "../AppState.js";
import { listsService } from "../Services/ListsService.js"
import { loadState, saveState } from "../Utils/LocalStorage.js"


function _draw() {
  let template = ''
  ProxyState.lists.forEach(list => {
    template += list.Template
  })
  document.getElementById('list-card').innerHTML = template
}
function _drawCounts(id) {
  console.log("id", id)
  let task = ProxyState.tasks.find(t => t.id == id)
  let list = ProxyState.lists.find(l => l.id == task.listId)
  document.getElementById('task-counts-' + list.id).innerText = list.unchecked + '/' + list.total
}
export default class ListsController {
  constructor() {
    ProxyState.on('lists', _draw)
    ProxyState.on('tasks', _draw)
    ProxyState.on('lists', saveState)
    ProxyState.on('tasks', saveState)
    loadState()
    _draw()
  }
  createList() {
    event.preventDefault()
    let form = event.target
    let rawList = {
      name: form.name.value,
      color: form.colors.value,
    }
    listsService.createList(rawList)
    form.reset()
  }
  addTask(id) {
    event.preventDefault()
    let form = event.target
    let rawTask = {
      name: form.task.value,
      isChecked: false,
      listId: id
    }
    listsService.addTask(rawTask)
    form.reset()
  }
  deleteList(id) {
    listsService.deleteList(id)
  }
  deleteTask(id) {
    listsService.deleteTask(id)
  }
  storeChecked(id) {
    listsService.storeChecked(id)
    _drawCounts(id)
  }
}