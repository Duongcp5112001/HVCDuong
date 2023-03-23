from selenium import webdriver
from config import BASE_URL, CHROME_DRIVER_PATH
from selenium.webdriver.chrome.service import Service as ChromeService
import unittest

class BaseSetup(unittest.TestCase):

    def setUp(self, name):
        self.base_url = BASE_URL
        self.driver = self.setDriver('chrome')
        self.driver.get('{}{}'.format(self.base_url, name))
        self.driver.maximize_window()
       
    def getDriver(self):
        return self.driver
    
    def setDriver(self, browerType):
        if(browerType == 'chrome'):
            return webdriver.Chrome(service=ChromeService(CHROME_DRIVER_PATH))

        if(browerType == 'firefox'):
            return webdriver.Firefox()

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    
   




