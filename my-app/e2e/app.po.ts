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
    const firstTask = listTask.get(0);
    return firstTask;
  }

  getFirstList() {
    const listOfList = this.getListOfList();
    const firstList = listOfList.get(0);
    return firstList;
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

  deleteFirstList() {
    const button = this.getButton('#buttonTrash');
    button.click();
  }

  deleteFirstTask() {
      const selectedTask = this.getFirstTask();
      selectedTask.click();
      const buttonDel = this.getButton('#deleteTask');
      buttonDel.click();
  }

  checkAllcheckboxes() {
    const checkboxes = element.all(by.css('#ulc li [type="checkbox"]'));

    checkboxes.each((checkbox) => {
      // We click on each checkbox
      checkbox.click();
    });


    checkboxes.each((checkbox) => {
      // We check for each checkbox if they are true
      expect(checkbox.isSelected()).toBeTruthy();
    });
  }

  getList(num: number) {
    const lists = this.getListOfList();

    return lists.get(num);
  }

}
