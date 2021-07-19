import { generateId } from "../Utils/GenerateId.js"
import { ProxyState } from "../AppState.js"

export default class List {
  constructor({ name, color, total, unchecked = 0, id = generateId() }) {
    this.name = name
    this.id = id
    this.color = color
    this.total = total || 0
    this.unchecked = unchecked
  }
  get Template() {

    return `
    <div class="mt-3">
            <div class="bg-light rounded shadow-light list-cards m-3 d-flex flex-column">
                <div class="d-flex justify-content-around align-items-center rounded-top text-light flex-column card-text-shadow text-center p-3 bg-${this.color}">
                    <div >
                        <h5 class="">${this.name.toUpperCase()}</h5>
                    </div>
                    <div class="d-flex">
                        <p id="task-counts-${this.id}">${this.unchecked}/${this.total}</p>
                        <p class="pl-3"><i class="fa fa-trash action" title="delete list"
                            onclick="app.listsController.deleteList('${this.id}')"></i></p>
                    </div>
                </div>
                <div class="p-2 flex-grow-1">
                    <div>
                        ${this.MyTasks}
                    </div>
                </div>
                <form onsubmit="app.listsController.addTask('${this.id}')" class="p-2 d-flex outline-dark">
                    <input type="text" name="task" class="form-control" placeholder="Add a task..." required minlength="3" maxlength="50">
                    <button type="submit" class="btn ml-2 btn-outline-dark">+</button>
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