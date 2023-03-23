from page.common import AbstractPage
from page.components import DatePicker
from time import sleep

class RemainingRoomDialog(AbstractPage):
    
    locators = {
        "btn_dialog" : ('xpath', '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[3]/button[2]'),
        "dialog": ('xpath', '/html/body/dialog[2]'),
        "title_dialog" : ('xpath', '/html/body/dialog[2]/div/div[1]/div/span'),
        "btn_search": ('xpath', '/html/body/dialog[2]/div/div[2]/div[1]/span/span[3]/button'),
        "year_month_span": ('xpath', '/html/body/dialog[2]/div/div[2]/div[1]/div/table/thead/tr[1]/th[4]/span'),
        "date_span" : ('xpath', '/html/body/dialog[2]/div/div[2]/div[1]/div/table/thead/tr[2]/th[5]/div/span[2]')
    }

    def click_open_dialog(self):
        self.btn_dialog.click()

    def is_open_dialog(self):
        self.click_open_dialog()
        return self.dialog.getAttribute("open")
    
    def get_title_dialog(self):
        self.click_open_dialog()
        return self.title_dialog.get_text()

    def enter_date_picker(self, dateString):
        input_date_picker_xpath = '/html/body/dialog[2]/div/div[2]/div[1]/span/span[1]/div[3]/div/div[1]/input'
        input_date_picker = DatePicker(input_date_picker_xpath)
        input_date_picker.handle_date_picker_input(self, dateString)
    
    def click_btn_search(self):
        self.btn_search.click()

    def room_inventory_calendars_search(self, dateString):
        self.click_open_dialog()
        self.enter_date_picker(dateString)
        self.click_btn_search()
        sleep(3)
        year_month_span_text = self.year_month_span.get_text()
        year_month_span_text = year_month_span_text.replace('年', "")
        year_month_span_text = year_month_span_text.replace('月', "")
        year = year_month_span_text[0:4]
        month = year_month_span_text[4:6]
        date = self.date_span.get_text()
        return year, month, date

    
