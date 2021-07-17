import { ProxyState } from "../AppState.js"
import List from "../Models/List.js"
import Task from "../Models/Task.js"


class ListsService {
  createList(rawList) {
    ProxyState.lists = [...ProxyState.lists, new List(rawList)]
  }
  addTask(rawTask) {
    ProxyState.tasks = [...ProxyState.tasks, new Task(rawTask)]
  }
  deleteList(id) {
    ProxyState.lists = ProxyState.lists.filter(list => list.id != id)
    ProxyState.tasks = ProxyState.tasks.filter(task => task.listId != id)
  }
  deleteTask(id) {
    ProxyState.tasks = ProxyState.tasks.filter(task => task.id != id)
  }
  storeChecked(id) {
    console.log(id)
    let currentTask = ProxyState.tasks.find(task => task.id == id)
    currentTask.isChecked = !currentTask.isChecked
    console.log(currentTask.isChecked)
  }
}


// Singleton Only one instance is ever made and the same instance is always exported
export const listsService = new ListsService()