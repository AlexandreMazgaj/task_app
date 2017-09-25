import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';


describe('my-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the app and only on empty list', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('NanoTask');
    expect(page.getListOfList().count()).toBe(2);

  });

  it('should display two lists when the user add a list', async() => {
    page.navigateTo();
    let input = element(by.css('#inputL'));
    input.sendKeys('newList');
    let button = element(by.css('#addL'));
    button.click();
    await

    expect(page.getListOfList().count()).toBe(3);
  });

  it('should display zero list when the user click on the delete button', async() => {
    page.navigateTo();
    let button = element(by.css('#buttonTrash'));
    button.click();
    await

    expect(page.getListOfList().count()).toBe(1);

  });

});
