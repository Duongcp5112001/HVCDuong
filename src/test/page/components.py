from page.common import AbstractPage
from selenium.webdriver.support import expected_conditions as exp_cond
from selenium.webdriver.common.by import By
import time


class Attribute():
    def __init__(self, tag, base_tag, x_path):
        self._tag = tag
        self._base_tag = base_tag
        self._x_path = x_path
        
class Component():
    def __init__(self, attribute: Attribute):
        self._attribute = attribute 

    def handle_component():
        pass

    def check_existed_popover():
        pass

    def is_displayed_error(self, page):
        component = page.wait(5, exp_cond.element_to_be_clickable((By.XPATH, self._attribute._x_path)))
        component_base = '{}-{}' if self._attribute._base_tag == 'button' else '{}__{}'
        component_tag = component.find_element(By.CLASS_NAME, component_base.format(self._attribute._tag, self._attribute._base_tag))
        component_tag_classes = component_tag.get_attribute("class")
        error_base =  '{}-{}--error' if self._attribute._base_tag == 'button' else '{}__{}--error'
        error_class = error_base.format(self._attribute._tag, self._attribute._base_tag)
        return error_class in component_tag_classes.split(" ")
        
class Dropdown(Component):
    _tag = 'dropdown'
    _base_tag = 'button'
    
    def __init__(self , x_path):
        attribute = Attribute(self._tag, self._base_tag, x_path)
        super().__init__(attribute)

    def handle_component(self, page, item_index = 1):
        dropdown = page.wait(5, exp_cond.element_to_be_clickable((By.XPATH, self._attribute._x_path)))
        dropdown.click()
        dropdown_item_xpath = self._attribute._x_path + '/div/div/div/div[{}]'.format(item_index)
        dropdown_item = page.wait(10, exp_cond.presence_of_element_located((By.XPATH, dropdown_item_xpath)))
        dropdown_item.click()

    def check_existed_popover(self, page):
        dropdown = page.wait(5, exp_cond.element_to_be_clickable((By.XPATH, self._attribute._x_path)))
        dropdown.click()
        popover_item_xpath = self._attribute._x_path + '/div'
        popover_item_elems = page.wait(10, exp_cond.presence_of_element_located((By.XPATH, popover_item_xpath)))
        return popover_item_elems

class Combobox(Component):
    _tag = 'combobox'
    _base_tag = 'input'
    
    def __init__(self , x_path):
        attribute = Attribute(self._tag, self._base_tag, x_path)
        super().__init__(attribute)

    def handle_component(self, page, item_index = 1):
        combobox = page.wait(5, exp_cond.element_to_be_clickable((By.XPATH, self._attribute._x_path)))
        combobox.click()
        combobox_item_xpath = self._attribute._x_path + '/div[2]/div/div/div[{}]'.format(item_index)
        combobox_item = page.wait(10, exp_cond.presence_of_element_located((By.XPATH, combobox_item_xpath)))
        combobox_item.click()

    def check_existed_popover(self, page):
        combobox = page.wait(5, exp_cond.element_to_be_clickable((By.XPATH, self._attribute._x_path)))
        combobox.click()
        time.sleep(3)
        popover_item_xpath = self._attribute._x_path + '/div[2]'
        popover_item_elems = page.wait(10, exp_cond.presence_of_element_located((By.XPATH, popover_item_xpath)))
        return popover_item_elems

class DatePicker(Component):
    _tag = 'date-picker'
    _base_tag = 'input'
    
    def __init__(self , x_path):
        attribute = Attribute(self._tag, self._base_tag, x_path)
        super().__init__(attribute)

    def handle_date_picker_input(self, page, dateString):
        input_datepicker = page.wait(5, exp_cond.presence_of_element_located((By.XPATH, self._attribute._x_path)))
        input_datepicker.click()
        input_datepicker.clear()
        input_datepicker.send_keys(dateString)

    def is_displayed_error(self, page):
        input_datepicker = page.wait(5, exp_cond.presence_of_element_located((By.XPATH, self._attribute._x_path)))
        component_tag_classes = input_datepicker.get_attribute("class")
        error_class = 'date-picker__input--error'
        return error_class in component_tag_classes.split(" ")

class GoToReservationDetail():
    def __init__(self) -> None:
        pass

    def click_btn_reservation_detail(self):
        btn_reservation_detail_xpath = '/html/body/dialog[5]/div/div[4]/button[2]'
        btn_reservation_detail = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, btn_reservation_detail_xpath)))
        btn_reservation_detail.click()
        time.sleep(2)

    def handle_quick_reservation_success(self):
        time.sleep(3)
        member_number_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[1]/div'
        member_number_element = Dropdown(member_number_dropdown_xpath)
        member_number_element.handle_component(self)

        hotel_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[2]/div'
        hotel_element = Combobox(hotel_dropdown_xpath)
        hotel_element.handle_component(self)

        night_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/span/div/div'
        night_element = Dropdown(night_dropdown_xpath)
        night_element.handle_component(self)

        room_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[1]/div/div'
        room_element = Dropdown(room_dropdown_xpath)
        room_element.handle_component(self)

        adult_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[3]/div/div'
        adult_element = Dropdown(adult_dropdown_xpath)
        adult_element.handle_component(self)

        btn_quick_reservation_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[3]/button[3]'
        btn_quick_reservation = self.wait(5, exp_cond.presence_of_element_located((By.XPATH, btn_quick_reservation_xpath)))
        btn_quick_reservation.click()
        