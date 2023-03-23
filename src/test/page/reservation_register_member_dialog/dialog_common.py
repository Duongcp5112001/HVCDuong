from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond
from page.common import AbstractPage
from time import sleep

class DialogCommon(AbstractPage):
    def __init__(self) -> None:
        pass

    def click_open_dialog(self, btn_dialog_xpath):
        btn_dialog = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, btn_dialog_xpath)))
        btn_dialog.click()
    
    def get_title_dialog(self, title_span_xpath):
        self.click_open_dialog()
        title_dialog = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, title_span_xpath)))
        return title_dialog.text
    
