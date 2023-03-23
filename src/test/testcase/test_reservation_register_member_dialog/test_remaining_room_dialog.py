from page.reservation_register_member_dialog.remaining_room_dialog import RemainingRoomDialog
from setup.base_setup import BaseSetup


class TestRemainningRoomDialog(BaseSetup):

    def setUp(self):
        super().setUp('reservationRegistMember')
        
    def page(self):
        return RemainingRoomDialog(self.getDriver())

    def test_is_open_dialog(self):
        open = self.page().is_open_dialog()
        assert open == "true"
    
    def test_title_dialog(self):
        title = self.page().get_title_dialog()
        assert title == "残室確認／詳細設定予約"
    
    def test_search_room_inventory_calendar(self):
        dateString = "2023/01/15"
        year, month, date = self.page().room_inventory_calendars_search(dateString)
        assert year == "2023"
        assert month == "1"
        assert date == "15"
    
    