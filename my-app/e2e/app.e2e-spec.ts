import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';


describe('my-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the app and only one empty list', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('NanoTask');
    expect(page.getListOfList().count()).toBe(2);

  });

  it('should display two lists when the user add a list', async() => {
    page.navigateTo();
    page.addList('shopping list');
    await
    // We count three because there already is the input that is in the list
    expect(page.getListOfList().count()).toBe(3);
  });

  it('should not add a list when the input is empty and the add button is clicked', async() => {
    page.navigateTo();
    page.addList('');
    await
    expect(page.getListOfList().count()).toBe(2);
  });

  it('should display zero list when the user click on the delete button', async() => {
    page.navigateTo();
    const button = page.getButton('#buttonTrash');
    button.click();
    await
    // This is because the input is in the list that we count 1 even if there is no list
    expect(page.getListOfList().count()).toBe(1);

  });


  it('should display the current list when a list is clicked', async() => {
    page.navigateTo();
    const nameCurrentList = page.getTextOfElement('#h3current');
    await
    expect(nameCurrentList).toBe('list1');
  });

  it('should add a task to the list when the add button is clicked', async() => {
    page.navigateTo();
    // The function addTask click on the button directly
    page.addTask('buy cake');
    await

    expect(page.getListOfTasks().count()).toBe(1);
  });

  it('should not add a task to the list when the input is empty and the add button is clicked', async() => {
    page.navigateTo();
    page.addTask('');

    await
    expect(page.getListOfTasks().count()).toBe(0);
  });


  it('should delete a task when the trash button is clicked', async() => {
      page.navigateTo();
      page.addTask('buy cake');

      const selectedTask = page.getFirstTask();
      await
      // We click on the task to make the trash button appear
      selectedTask.click();

      const buttonDel = page.getButton('#deleteTask');
      buttonDel.click();
      await
      expect(page.getListOfTasks().count()).toBe(0);
  });

  it('should have the checkbox true, when all the tasks are done', async() => {
      page.navigateTo();
      page.addTask('buy cake');
      page.addTask('buy a second cake');

      const checkboxes = element.all(by.css('#ulc li [type="checkbox"]'));
      await

      checkboxes.each((checkbox) => {
        // We click on each checkbox
        checkbox.click();
      });

      await

      checkboxes.each((checkbox) => {
        // We check for each checkbox if they are true
        expect(checkbox.isSelected()).toBeTruthy();
      });

  });


  it('should edit the name of the list when the edit button is clicked', async() => {
      page.navigateTo();
      const buttEdit = page.getButton('#editingTrue');
      buttEdit.click();
      // We edit the name of the first list in the app
      page.editListName('edited List');

      const buttonSaveEdit = page.getButton('#buttsaveL');
      await
      buttonSaveEdit.click();


      const nameOfListEdited = await page.getTextOfElement('.editingFalse #divNotDel');
      await
      expect(nameOfListEdited).toBe('edited List');
  });


  it('should edit the name of a task when the edit button is clicked on the task', async() => {
      page.navigateTo();
      page.addTask('buy cake');

      const selectedTask = page.getFirstTask();
      await
      selectedTask.click();
      // We edit the name of the task we have just added
      page.editTaskName('edited Task');

      const buttSaveEdit = page.getButton('#buttsave');
      await
      buttSaveEdit.click();

      const nameOfTaskEdited = await page.getTextOfElement('p');
      await
      expect(nameOfTaskEdited).toBe('EDITED TASK');

  });

});
