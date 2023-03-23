from page.room_information_in_C03AScreen \
    import RoomInformationInC03AScreen
from setup.base_setup import BaseSetup

class TestRoomInformationInC03AScreen(BaseSetup):
    def setUp(self):
       super().setUp('reservationRegistMember')

    def page(self):
        return RoomInformationInC03AScreen(self.getDriver())

    def test_open_dialog_add_plan(self):
        is_open_dialog = self.page().open_dialog_plan()
        assert is_open_dialog == 'true'

    def test_open_dialog_add_arrangements_equipment(self):
        is_open_dialog = self.page().open_dialog_arrangements_equipment()
        assert is_open_dialog == 'true'

    def test_search_dialog_add_plan(self):
        search_plan_settings_success = self.page().search_plan_settings_success()
        assert search_plan_settings_success != '0'

    def test_search_dialog_add_plan_with_param_id(self):
        search_plan_settings_with_id = self.page().search_plan_settings_with_id()
        assert search_plan_settings_with_id != '0'

    def test_search_dialog_add_plan_with_param_plan_name(self):
        search_plan_settings_with_plan_name = self.page().search_plan_settings_with_plan_name()
        assert search_plan_settings_with_plan_name == 0

    def test_add_plan(self):
        add_plan = self.page().add_plan()
        assert add_plan

    def test_add_arrangements_equipment(self):
        add_arrangements_equipment = self.page().add_arrangements_equipment()
        assert add_arrangements_equipment
