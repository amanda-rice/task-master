import { generateId } from "../Utils/GenerateId.js"

export default class List {
  constructor({ name, listId, id = generateId() }) {
    this.name = name
    this.isChecked = false
    this.id = id
    this.listId = listId
  }
  get Template() {
    return `
    <div class="col-12 d-flex align-items-center"">
      <input class="px-2" onclick="app.listsController.storeChecked('${this.id}')" type="checkbox" id="task-${this.id}" name="${this.name}" value="${this.name}">
      <label class="px-2 align-self-end flex-fill" for="task-${this.id}">${this.name}</label>
      <i class="p-2 fa fa-trash action" title="delete list" onclick="app.listsController.deleteTask('${this.id}')"></i>
    </div>
  `
  }
}