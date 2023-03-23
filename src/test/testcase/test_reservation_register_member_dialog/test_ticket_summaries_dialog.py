from page.reservation_register_member_dialog.ticket_summaries_dialog import TicketSummariesdDialog
from setup.base_setup import BaseSetup

class TestTicketSummariesDialog(BaseSetup):

    def setUp(self):
        super().setUp('reservationRegistMember')
        
    def page(self):
        return TicketSummariesdDialog(self.getDriver())

    def test_is_open_dialog(self):
        open = self.page().is_open_dialog()
        assert open == "true"
    
    def test_title_dialog(self):
        title_dialog = self.page().get_title_dialog()
        assert title_dialog == "使用利用券設定"