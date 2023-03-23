from page.reservation_register_member_dialog.quick_reservation_dialog import QuickReservationDialog
from setup.base_setup import BaseSetup

class TestQuickReservationDialog(BaseSetup):

    def setUp(self):
        super().setUp('reservationRegistMember')
        
    def page(self):
        return QuickReservationDialog(self.getDriver())

    def test_is_open_dialog(self):
        open = self.page().is_open_dialog()
        assert open == "true"
    
    def test_title_dialog(self):
        title = self.page().get_title_dialog_success()
        assert title == "部屋を確保しました"