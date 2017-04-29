'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Student Application', function () {

  describe('phoneList', function () {
    beforeEach(function () {
      browser.get('index.html');
    });

    it('should filter the student list as a user types into the search box', function () {
      var studentList = element.all(by.repeater('student in $ctrl.students'));
      var query = element(by.model('$ctrl.query'));

      expect(studentList.count()).toBe(5);

      query.sendKeys('saverio');
      expect(studentList.count()).toBe(1);

      query.clear();
      query.sendKeys('a');
      expect(studentList.count()).toBe(3);
    });

    it('should render student specific links', function () {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('saverio');

      element.all(by.css('.students li a')).first().click();
      expect(browser.getLocationAbsUrl()).toBe('/students/590364b7babf803c177f111c');
    });


    it('should be possible to control student order via the drop-down menu', function () {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="CFU"]'));
      var studentNameColumn = element.all(by.repeater('student in $ctrl.students').column('student.name'));

      function getNames() {
        return studentNameColumn.map(function (elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('a');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Antonio Dell\'ava',
        'Mario Rossi',
        'Saverio Tosi'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'Mario Rossi',
        'Antonio Dell\'ava',
        'Saverio Tosi'
      ]);
    });

  });

});
