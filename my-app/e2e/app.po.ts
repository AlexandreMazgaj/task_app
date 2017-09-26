import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getListOfList() {
    return element.all(by.css('li'));
  }

  getListOfTasks() {
    return element.all(by.css('#taskList'));
  }

  addTask(task: string) {
    const inputTask = element(by.css('#inputNew'));
    inputTask.sendKeys(task);
    const button = element(by.css('#buttnew'));
    button.click();
  }

  addList(list: string) {
    const input = element(by.css('#inputL'));
    input.sendKeys(list);
    const button = element(by.css('#addL'));
    button.click();
  }

  getFirstTask() {
    const listTask = this.getListOfTasks();
    const selectedTask = listTask.get(0);
    return selectedTask;
  }

  editListName(name: string) {
    const inputEdit = element(by.css('#inputEditName'));
    inputEdit.clear();
    inputEdit.sendKeys(name);

  }

  editTaskName(name: string) {
    const inputEdit = element(by.css('#edit'));
    inputEdit.clear();
    inputEdit.sendKeys(name);

  }

  getButton(name: string) {
    return element(by.css(name));
  }

  getTextOfElement(name: string) {
    return element(by.css(name)).getText();
  }

}
