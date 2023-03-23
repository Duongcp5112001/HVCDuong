import datetime
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
import os
from seleniumpagefactory import PageFactory



class AbstractPage(PageFactory):

    def __init__(self, driver):
        self.driver = driver
          
    def wait(self, timeout, method, ignored_exceptions=None):
        try:
            return WebDriverWait(self.driver, timeout, ignored_exceptions=ignored_exceptions).until(method)
        except TimeoutException as e:
            return "NOT_FOUND"

class ScreenShotTaker():
    
    def __init__(self, page: AbstractPage):
        self._dir = page._name
        self._driver = page._driver

    def create_dir(self):
        project_path = os.path.dirname(os.path.abspath(__file__))
        capture_path = os.path.join(project_path, 'screen_shot/{}'.format(self._dir))
        if not os.path.exists(capture_path):
           os.makedirs(capture_path)
        return capture_path

    def save_screenshot(self, file_name):
        now = datetime.datetime.now()
        dt = now.strftime("%Y.%m.%d.%H%M%S")
        filename = "{}_{}".format(dt, file_name)
        path_capture_dir = self.create_dir()
        self._driver.save_screenshot(os.path.join(path_capture_dir, filename))

