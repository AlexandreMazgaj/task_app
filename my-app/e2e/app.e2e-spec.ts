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

      page.deleteFirstTask();

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


  it('should modify the name when a list with a name that already exists is added', async() => {
      page.navigateTo();
      page.addList('list1');
      // We delete the first list to make it easier to find where the name of the list we added is displayed
      page.deleteFirstList();
      const nameFirstList = await page.getTextOfElement('#divNotDel');
      expect(nameFirstList).toBe('list1 n.1');
  });


  it('should modify the name of a task when a task with a name that already exists is added', async() => {
      page.navigateTo();
      // First the same task is added twice
      page.addTask('task1');
      page.addTask('task1');
      // Then we delete the first task to make it easier to find where the name of the task we added is displayed
      page.deleteFirstTask();

      const nameTask = await page.getTextOfElement('p');

      expect(nameTask).toBe('TASK1 N.1');

  });


  it('should still have the task in the list when another list is selected', async() => {
      page.navigateTo();
      // We start by adding two tasks to the first list
      page.addTask('buy groceries');
      page.addTask('buy cake');
      // Then we add a list, it will automatically select the list freshly added
      page.addList('newList');

      // Then we select the first list with the two tasks, we select the first one to make it easier
      const list = page.getFirstList();
      list.click();

      // We expect the number of tasks to be 2, the two tasks that we added at the beginning
      expect(page.getListOfTasks().count()).toBe(2);

  });


  it('should still have the task done in the list when another list is selected', async() => {
    page.navigateTo();
    // We start by adding three tasks to the first list
    page.addTask('wash my laundry');
    page.addTask('watch TV');
    page.addTask('relax, really important to do that');

    // We add another list
    page.addList('newList');

    // We go back to the first page
    const firstList = page.getFirstList();
    firstList.click();

    // Then we check the checkboxes
    const checkboxes = element.all(by.css('#ulc li [type="checkbox"]'));

    checkboxes.each((checkbox) => {
      // We click on each checkbox
      checkbox.click();
    });

    // Finally we expect all the checkboxes to still be selected
    await

    checkboxes.each((checkbox) => {
      // We check for each checkbox if they are true
      expect(checkbox.isSelected()).toBeTruthy();
    });


  });


});
