from page.common import AbstractPage

class TicketSummariesdDialog(AbstractPage):
    
    locators = {
        "btn_dialog": ('xpath', '//*[@id="app"]/div/main/div/div[2]/div/span/span[2]/span[3]/button[1]'),
        "dialog": ('xpath', '/html/body/dialog[1]'),
        "title_dialog": ('xpath', '/html/body/dialog[1]/div/div[1]/div/span'),
    }

    def click_open_dialog(self):
        self.btn_dialog.click()

    def is_open_dialog(self):
        self.click_open_dialog()
        return self.dialog.getAttribute("open")

    def get_title_dialog(self):
        self.click_open_dialog()
        return self.title_dialog.get_text()
        

