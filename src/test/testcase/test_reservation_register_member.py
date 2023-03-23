from page.reservation_register_member import ReservationRegisterMember
from setup.base_setup import BaseSetup

class TestReservationRegisterMember(BaseSetup):

    def setUp(self):
        super().setUp('reservationRegistMember')
        
    def page(self):
        return ReservationRegisterMember(self.getDriver())

    def test_validation_all_required_is_selected(self):
        member_number, hotel, night, room, adult = self.page().check_all_required_is_selected()
        assert member_number == False
        assert hotel == False
        assert night == False
        assert room == False
        assert adult == False

    def test_validation_all_required_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_all_required_is_not_selected()
        assert member_number == True
        assert hotel == True
        assert night == True
        assert room == True
        assert adult == True

    def test_validation_member_number_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_member_number_is_not_selected()
        assert member_number == True
        assert hotel == False
        assert night == False
        assert room == False
        assert adult == False

    def test_validation_hotel_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_hotel_is_not_selected()
        assert member_number == False
        assert hotel == True
        assert night == False
        assert room == False
        assert adult == False

    def test_validation_room_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_room_is_not_selected()
        assert member_number == False
        assert hotel == False
        assert night == False
        assert room == True
        assert adult == False

    def test_validation_night_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_night_is_not_selected()
        assert member_number == False
        assert hotel == False
        assert night == True
        assert room == False
        assert adult == False

    def test_validation_adult_is_not_selected(self):
        member_number, hotel, night, room, adult = self.page().check_adult_is_not_selected()
        assert member_number == False
        assert hotel == False
        assert night == False
        assert room == False
        assert adult == True

    def test_existed_popover_member_number(self):
        is_existed_popover = self.page().check_existed_popover_member_number()
        assert is_existed_popover != 'NOT_FOUND'

    def test_existed_popover_hotel(self):
        is_existed_popover = self.page().check_existed_popover_hotel()
        assert is_existed_popover != 'NOT_FOUND'

    def test_existed_popover_room(self):
        is_existed_popover = self.page().check_existed_popover_room()
        assert is_existed_popover != 'NOT_FOUND'

    def test_existed_popover_night(self):
        is_existed_popover = self.page().check_existed_popover_night()
        assert is_existed_popover != 'NOT_FOUND'

    def test_existed_popover_adult(self):
        is_existed_popover = self.page().check_existed_popover_adult()
        assert is_existed_popover != 'NOT_FOUND'


        