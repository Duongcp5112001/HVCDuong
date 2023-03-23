from page.common import AbstractPage
from page.components import GoToReservationDetail

class QuickReservationDialog(AbstractPage):

    locators = {
        "dialog": ('xpath', '/html/body/dialog[5]'),
        "title_dialog": ('xpath', '/html/body/dialog[5]/div/div[1]/div/span[2]'),
    }

    def is_open_dialog(self):
        GoToReservationDetail.handle_quick_reservation_success(self)
        return self.dialog.getAttribute("open")

    def get_title_dialog_success(self):
        GoToReservationDetail.handle_quick_reservation_success(self)
        return self.title_dialog.get_text()