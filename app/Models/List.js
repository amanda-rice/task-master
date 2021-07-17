import { generateId } from "../Utils/GenerateId.js"
import { ProxyState } from "../AppState.js"

export default class List {
  constructor({ name, color, id = generateId() }) {
    this.name = name
    this.id = id
    this.color = color
  }
  get Template() {
    let tasks = ProxyState.tasks.filter(task => task.listId === this.id)
    let complete = 0
    console.log(tasks.length)
    tasks.forEach(t => {
      if (t.complete) {
        complete++
      }
    })
    return `
    <div class="col-4 mt-3">
      <div class="bg-light rounded shadow-light">
        <div class="d-flex justify-content-around align-items-center rounded-top text-center p-3 bg-${this.color}">
            <h5>${this.name.toUpperCase()}</h5>
            <i class="fa fa-trash action text-danger" title="delete list" onclick="app.listsController.deleteList('${this.id}')"></i>
            <p>${complete}/${tasks.length}</p>
        </div>
        <div class="p-2 ">
            <div>
                ${this.MyTasks}
            </div>
        </div>
        <form onsubmit="app.listsController.addTask('${this.id}')"> 
          <input type="text" name="task" placeholder="Add a task..." required>
          <button type="submit" class="btn btn-outline-success">+</button>
        </form>
      </div>
    </div>`
  }
  get MyTasks() {
    let template = ''
    let tasks = ProxyState.tasks.filter(task => task.listId === this.id)
    tasks.forEach(t => {
      template += t.Template
    });
    if (!template) {
      template += 'No lists yet'
    }
    return template
  }
}