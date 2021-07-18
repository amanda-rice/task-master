import { ProxyState } from "../AppState.js"
import List from "../Models/List.js"
import Task from "../Models/Task.js"


class ListsService {
  createList(rawList) {
    ProxyState.lists = [...ProxyState.lists, new List(rawList)]
  }
  addTask(rawTask) {
    let list = ProxyState.lists.find(l => l.id == rawTask.listId)
    list.unchecked++
    list.total++
    ProxyState.tasks = [...ProxyState.tasks, new Task(rawTask)]
    ProxyState.lists = ProxyState.lists
  }
  deleteList(id) {
    ProxyState.lists = ProxyState.lists.filter(list => list.id != id)
    ProxyState.tasks = ProxyState.tasks.filter(task => task.listId != id)
  }
  deleteTask(id) {
    let currentTask = ProxyState.tasks.find(task => task.id == id)
    let currentList = ProxyState.lists.find(list => list.id == currentTask.listId)
    currentList.total--
    if (!currentTask.isChecked) {
      currentList.unchecked--
    }
    ProxyState.tasks = ProxyState.tasks.filter(task => task.id != id)
    ProxyState.lists = ProxyState.lists
  }
  storeChecked(id) {
    console.log(id)
    let currentTask = ProxyState.tasks.find(task => task.id == id)
    let list = ProxyState.lists.find(l => l.id == currentTask.listId)
    currentTask.isChecked = !currentTask.isChecked
    let theseTasks = ProxyState.tasks.filter(t => t.listId == currentTask.listId)
    let unchecked = 0
    theseTasks.forEach(t => {
      if (!t.isChecked) {
        unchecked++
      }
    });
    list.unchecked = unchecked
    ProxyState.lists = ProxyState.lists
  }
}


// Singleton Only one instance is ever made and the same instance is always exported
export const listsService = new ListsService()