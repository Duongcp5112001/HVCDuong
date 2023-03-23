from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond
from page.common import AbstractPage
import time

class CustomerSearchResult(AbstractPage):

    locators = {
        "button_search" : ('xpath', '//*[@id="app"]/div/main/div/div[2]/span/span[2]/button[1]/span[2]'),
        "name_input" : ("xpath", '//*[@id="app"]/div/main/div/div[2]/span/span[2]/div[2]/div/input'),
        "phone_input": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span/span[2]/div[3]/div/input'),
        "table_body": ("tag_name", '//*[@id="app"]/div/main/div/div[2]/span/div/table/tbody'),
        "name_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[1]/span[1]/span[3]/span[2]'),
        "phone_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[2]/span[1]/span[2]'),
        "mobile_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[2]/span[2]/span[2]'),
        "birthday_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[2]/span[6]/span[2]'),
        "customer_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[1]/span[1]/span[2]/span[2]'),
        "mail_reservation": ("xpath", '//*[@id="app"]/div/main/div/div[2]/span[2]/span[7]/span[2]')
    }

    def search_click(self):
        self.button_search.click()
        time.sleep(3)

    def search_by_name_customer(self, input = None):
        if input is not None:
            self.name_input.send_keys(input)
        self.search_click()
        table_body_xpath = '//*[@id="app"]/div/main/div/div[2]/span/div/table/tbody/tr[1]'
        table_body_row = self.wait(2, exp_cond.presence_of_element_located((By.XPATH, table_body_xpath)))
        return table_body_row 

    def search_by_phone_customer(self, input = None):
        if input is not None:
            self.phone_input.send_keys(input)
        self.search_click()
        table_body_xpath = '//*[@id="app"]/div/main/div/div[2]/span/div/table/tbody/tr[1]'
        table_body_row = self.wait(2, exp_cond.presence_of_element_located((By.XPATH, table_body_xpath)))
        return table_body_row 

    def redirect_to_reservation_register_member(self, index):
        button_redirect_xpath = '//*[@id="app"]/div/main/div/div[2]/span/div/table/tbody/tr[{}]/td[1]/span/button'.format(index)
        button_redirect_element = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, button_redirect_xpath)))
        button_redirect_element.click()
        time.sleep(2)

    def check_route_reservation_register_member(self, index):
        self.redirect_to_reservation_register_member(index)
        last_slash_index = self.driver.current_url.rfind("/")
        return self.driver.current_url[last_slash_index:]

    def get_info_customer(self, index):
        customer_row_xpath = '//*[@id="app"]/div/main/div/div[2]/span/div/table/tbody/tr[{}]'.format(index)
        name_xpath = customer_row_xpath + '/td[4]/span'
        name_text = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, name_xpath))).text
        phone_xpath = customer_row_xpath + '/td[5]/span'
        phone_text = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, phone_xpath))).text
        mobile_path = customer_row_xpath + '/td[6]/span'
        mobile_text = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, mobile_path))).text
        birthday_path = customer_row_xpath + '/td[8]/span'
        birthday_text = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, birthday_path))).text
        return name_text, phone_text, mobile_text, birthday_text

    def check_property_reservation_register_member(self, index):
        name_text, phone_text, mobile_text, birthday_text = self.get_info_customer(index)
        self.redirect_to_reservation_register_member(index)
        customer_id_text =  self.customer_reservation.text
        name_text_reservation = self.name_reservation.text
        phone_text_reservation = self.phone_reservation.text
        mobile_text_reservation = self.mobile_reservation.text
        birthday_text_reservation = self.birthday_reservation.text
        mail_text_reservation = self.mail_reservation.text
        return name_text_reservation == '({})'.format(name_text), phone_text_reservation == phone_text, mobile_text_reservation == mobile_text, birthday_text_reservation == birthday_text

