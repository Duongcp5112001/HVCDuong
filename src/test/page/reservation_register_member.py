from page.common import AbstractPage
from page.components import Dropdown, Combobox, DatePicker
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond


class ReservationRegisterMember(AbstractPage):

    locators = {
        "button_quick_reservation" : ('xpath', '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[3]/button[3]')
    }

    def quick_reservation(self):
        self.button_quick_reservation.click()

    def validate_member_number(self, is_handle_component):
        member_number_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[1]/div'
        member_number_element = Dropdown(member_number_dropdown_xpath)
        if is_handle_component == True: 
            member_number_element.handle_component(self)
        return member_number_element.is_displayed_error(self)
    
    def validate_hotel(self, is_handle_component):
        hotel_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[2]/div'
        hotel_element = Combobox(hotel_dropdown_xpath)
        if is_handle_component == True:
            hotel_element.handle_component(self)
        return hotel_element.is_displayed_error(self)


    def validate_night(self, is_handle_component):
        night_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/span/div/div'
        night_element = Dropdown(night_dropdown_xpath)
        if is_handle_component == True:
            night_element.handle_component(self)
        return night_element.is_displayed_error(self)
    
    def validate_room(self, is_handle_component):
        room_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[1]/div/div'
        room_element = Dropdown(room_dropdown_xpath)
        if is_handle_component == True:
            room_element.handle_component(self)
        return room_element.is_displayed_error(self)

    def validate_adult(self, is_handle_component):
        adult_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[3]/div/div'
        adult_element = Dropdown(adult_dropdown_xpath)
        if is_handle_component == True:
            adult_element.handle_component(self)
        self.quick_reservation()
        return adult_element.is_displayed_error(self)

    def check_all_required_is_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(True)
        hotel = self.validate_hotel(True)
        night = self.validate_night(True)
        room = self.validate_room(True)
        adult = self.validate_adult(True)
        return member_number, hotel, night, room, adult

    def check_all_required_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(False)
        hotel = self.validate_hotel(False)
        night = self.validate_night(False)
        room = self.validate_room(False)
        adult = self.validate_adult(False)
        return member_number, hotel, night, room, adult

    def check_member_number_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(False)
        hotel = self.validate_hotel(True)
        night = self.validate_night(True)
        room = self.validate_room(True)
        adult = self.validate_adult(True)
        return member_number, hotel, night, room, adult

    def check_hotel_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(True)
        hotel = self.validate_hotel(False)
        night = self.validate_night(True)
        room = self.validate_room(True)
        adult = self.validate_adult(True)
        return member_number, hotel, night, room, adult

    def check_night_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(True)
        hotel = self.validate_hotel(True)
        night = self.validate_night(False)
        room = self.validate_room(True)
        adult = self.validate_adult(True)
        return member_number, hotel, night, room, adult

    def check_room_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(True)
        hotel = self.validate_hotel(True)
        night = self.validate_night(True)
        room = self.validate_room(False)
        adult = self.validate_adult(True)
        return member_number, hotel, night, room, adult

    def check_adult_is_not_selected(self):
        self.quick_reservation()
        member_number = self.validate_member_number(True)
        hotel = self.validate_hotel(True)
        night = self.validate_night(True)
        room = self.validate_room(True)
        adult = self.validate_adult(False)
        return member_number, hotel, night, room, adult

    def check_existed_popover_member_number(self):
        member_number_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[1]/div'
        member_number_element = Dropdown(member_number_dropdown_xpath)
        return member_number_element.check_existed_popover(self)

    def check_existed_popover_hotel(self):
        hotel_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/div[2]/div'
        hotel_element = Combobox(hotel_dropdown_xpath)
        return hotel_element.check_existed_popover(self)

    def check_existed_popover_room(self):
        room_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[1]/div/div'
        room_element = Dropdown(room_dropdown_xpath)
        return room_element.check_existed_popover(self)

    def check_existed_popover_night(self):
        night_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[1]/span/div/div'
        night_element = Dropdown(night_dropdown_xpath)
        return night_element.check_existed_popover(self)

    def check_existed_popover_adult(self):
        adult_dropdown_xpath = '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[2]/span[3]/div/div'
        adult_element = Dropdown(adult_dropdown_xpath)
        return adult_element.check_existed_popover(self)



    


       



    




