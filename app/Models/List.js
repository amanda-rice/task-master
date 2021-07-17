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
    <div class="mt-3">
            <div class="bg-light rounded shadow-light">
                <div class="d-flex justify-content-around align-items-center rounded-top text-light flex-column card-text-shadow text-center p-3 bg-${this.color}">
                    <div >
                        <h5 class="">${this.name.toUpperCase()}</h5>
                    </div>
                    <div class="d-flex">
                        <p>${complete}/${tasks.length}</p>
                        <p class="pl-3"><i class="fa fa-trash action" title="delete list"
                            onclick="app.listsController.deleteList('${this.id}')"></i></p>
                    </div>
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