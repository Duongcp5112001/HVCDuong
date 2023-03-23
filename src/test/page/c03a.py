from page.common import AbstractPage
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond
from page.components import GoToReservationDetail
import time


class C03A(AbstractPage):

    locators = {
        "button_cancel_reservation": ('xpath', '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[1]/button[1]'),
        "button_open_dialog_preview": ('xpath', '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[1]/button[2]'),
        "button_close_dialog_preview": ('xpath', '/html/body/dialog[3]/div/div[1]/button'),
        "title_dialog_preview": ('xpath', '/html/body/dialog[5]/div/div[1]/div/span'),
        "button_dropdown_status": ('xpath', '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[2]/div[1]'),
        "title_status": ('xpath', '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[2]/div/button/span[1]'),
        "button_register_reservation": ('xpath', '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[2]/button'),
        "title_status_result": ('xpath', '//*[@id="app"]/div/main/div[1]/div[1]/div[1]/span[1]/span'),
    }

    def go_to_reservation_detail(self):
        GoToReservationDetail.handle_quick_reservation_success(self)
        GoToReservationDetail.click_btn_reservation_detail(self)

    def cancel_reservation(self):
        self.button_cancel_reservation.click()
        time.sleep(2)
        last_slash_index = self.driver.current_url.rfind("/")
        return self.driver.current_url[last_slash_index:]

    def click_open_dialog_preview(self):
        self.button_open_dialog_preview.click()

    def is_open_dialog_preview(self):
        dialog_preview_xpath = '/html/body/dialog[5]'
        dialog_preview = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, dialog_preview_xpath)))
        self.click_open_dialog_preview()
        return dialog_preview.get_attribute("open")

    def is_open_dialog_confirm(self):
        dialog_confirm_xpath = '/html/body/dialog[3]'
        dialog_confirm = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, dialog_confirm_xpath)))
        return dialog_confirm.get_attribute("open")

    def close_dialog_confirm(self):
        self.button_close_dialog_preview.click()

    def get_title_dialog(self):
        self.click_open_dialog_preview()
        title_dialog_preview = self.title_dialog_preview.text
        return title_dialog_preview

    def select_status_reservation(self, path):
        self.button_dropdown_status.click()
        status_xpath = '//*[@id="app"]/div/main/div[2]/div[2]/span/span[2]/span[2]/div[2]/div/div'
        button_status = self.wait(5, exp_cond.element_to_be_clickable((By.XPATH, status_xpath + path)))
        button_status.click()
        title_status = self.title_status.text
        return title_status

    def change_status_reservation(self, path):
        title = self.select_status_reservation(path)
        return title

    def register_reservation(self):
        self.button_register_reservation.click()
        self.is_open_dialog_confirm()

    def change_status_and_register_reservation(self, path):
        self.change_status_reservation(path)
        self.button_register_reservation.click()
        time.sleep(2)
        if self.is_open_dialog_confirm() == "true":
            self.close_dialog_confirm()
            title_status_result = self.title_status_result.text
            return title_status_result
        else:
            return ""






















