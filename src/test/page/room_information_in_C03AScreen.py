from page.common import AbstractPage
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond
import time
from page.components import GoToReservationDetail


class RoomInformationInC03AScreen(AbstractPage):
    locators = {
        "show_div_room_xpath": ('xpath', '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]'),
        "show_div_room_parent_xpath": ('xpath', '//*[@id="section-3"]'),
        "btn_add_plan_xpath": ('xpath', '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/button'),
        "btn_add_arrangements_equipment_xpath": ('xpath', '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/button'),
    }

    def goto_reservation_detail_C03A(self):
        GoToReservationDetail.handle_quick_reservation_success(self)
        GoToReservationDetail.click_btn_reservation_detail(self)
        time.sleep(3)
        show_div_room_parent_xpath = '//*[@id="section-3"]'
        div_parent = self.driver.find_element(By.XPATH, show_div_room_parent_xpath)
        show_div_room_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]'
        self.driver.execute_script("arguments[0].scrollIntoView(true);", div_parent)
        time.sleep(3)
        div = self.driver.find_element(By.XPATH, show_div_room_xpath)
        self.driver.execute_script("arguments[0].style.display = '';", div)
    def open_dialog_plan(self):
        time.sleep(2)
        self.goto_reservation_detail_C03A()
        btn_add_plan_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/button'
        btn_add_plan = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, btn_add_plan_xpath)))
        btn_add_plan.click()
        dialog_add_plan_xpath = "/html/body/dialog[4]"
        dialog_add_plan = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, dialog_add_plan_xpath)))
        return dialog_add_plan.get_attribute("open")

    def open_dialog_arrangements_equipment(self):
        time.sleep(2)
        self.goto_reservation_detail_C03A()
        btn_add_arrangements_equipment_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/button'
        btn_add_arrangements_equipment = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, btn_add_arrangements_equipment_xpath)))
        btn_add_arrangements_equipment.click()
        dialog_add_arrangements_equipment_xpath = "/html/body/dialog[1]"
        dialog_add_arrangements_equipment = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, dialog_add_arrangements_equipment_xpath)))
        return dialog_add_arrangements_equipment.get_attribute("open")

    def search_plan_settings_success(self):
        self.open_dialog_plan()
        result_search_text_xpath = '/html/body/dialog[4]/div/div[2]/span/span[1]/span[2]'
        result_search_text = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, result_search_text_xpath)))
        return result_search_text.text

    def search_plan_settings_with_id(self):
        self.open_dialog_plan()
        input_id_xpath = '/html/body/dialog[4]/div/div[2]/div/span/div[2]/div/input'
        input_id = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, input_id_xpath)))
        input_id.clear()
        input_id.send_keys('ABC')
        time.sleep(3)

        button_search_xpath = '/html/body/dialog[4]/div/div[2]/div/span/div[2]/div/input'
        button_search = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, button_search_xpath)))
        button_search.click()

        result_search_text_xpath = '/html/body/dialog[4]/div/div[2]/span/span[1]/span[2]'
        result_search_text = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, result_search_text_xpath)))
        return result_search_text.text

    def search_plan_settings_with_plan_name(self):
        self.open_dialog_plan()
        input_plan_name_xpath = '/html/body/dialog[4]/div/div[2]/div/span/div[3]/div/input'
        input_plan_name = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, input_plan_name_xpath)))
        input_plan_name.clear()
        input_plan_name.send_keys('tokyo')

        button_search_xpath = '/html/body/dialog[4]/div/div[2]/div/span/span/button[1]'
        button_search = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, button_search_xpath)))
        button_search.click()
        time.sleep(5)
        table_data_plan_xpath = '/html/body/dialog[4]/div/div[3]/div/table'
        table_data_plan = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_plan_xpath)))
        rows = len(table_data_plan.find_elements(By.TAG_NAME, "tr")) - 1
        return rows

    def add_plan(self):
        self.open_dialog_plan()
        table_data_xpath = '/html/body/dialog[4]/div/div[3]/div/table'
        table_data = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_xpath)))
        if len(table_data.find_elements(By.TAG_NAME, "tr")) - 1 == '0':
            return 'false'

        table_data_plan_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/table'
        table_data_plan = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_plan_xpath)))
        if table_data_plan != 'NOT_FOUND':
            rows = len(table_data_plan.find_elements(By.TAG_NAME, "tr")) - 1
        else:
            rows = 0

        first_checkbox_xpath = '/html/body/dialog[4]/div/div[3]/div/table/tbody/tr[1]/td[1]/span/label/input'
        first_checkbox = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, first_checkbox_xpath)))
        first_checkbox.click()
        time.sleep(4)

        button_add_xpath = '/html/body/dialog[4]/div/div[4]/button'
        button_add = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, button_add_xpath)))
        button_add.click()
        time.sleep(4)
        table_data_plan_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/table'
        table_data_plan = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_plan_xpath)))
        rows_after_add_plan = len(table_data_plan.find_elements(By.TAG_NAME, "tr")) - 1
        if rows_after_add_plan > rows:
            return 'true'
        else:
            return 'false'

    def add_arrangements_equipment(self):
        self.open_dialog_arrangements_equipment()

        table_data_xpath = '/html/body/dialog[1]/div/div[3]/div/table'
        table_data = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_xpath)))
        if len(table_data.find_elements(By.TAG_NAME, "tr")) - 1 == '0':
            return 'false'

        table_data_arrangements_equipment_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[4]/table'
        table_data_arrangements_equipment = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_arrangements_equipment_xpath)))

        if table_data_arrangements_equipment != 'NOT_FOUND':
            rows = len(table_data_arrangements_equipment.find_elements(By.TAG_NAME, "tr")) - 1
        else:
            rows = 0

        first_checkbox_xpath = '/html/body/dialog[1]/div/div[3]/div/table/tbody/tr[1]/td[1]/span/label/input'
        first_checkbox = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, first_checkbox_xpath)))
        first_checkbox.click()
        time.sleep(1)

        button_add_xpath = '/html/body/dialog[1]/div/div[4]/button'
        button_add = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, button_add_xpath)))
        button_add.click()

        table_data_after_add_xpath = '//*[@id="section-3"]/div[2]/div[2]/div[2]/div[2]/div[2]/div[3]/table'
        table_data_after_add = self.wait(5, exp_cond.presence_of_element_located(
            (By.XPATH, table_data_after_add_xpath)))

        rows_table_after_add = len(table_data_after_add.find_elements(By.TAG_NAME, "tr")) - 1
        if rows_table_after_add > rows:
            return 'true'
        else:
            return 'false'
