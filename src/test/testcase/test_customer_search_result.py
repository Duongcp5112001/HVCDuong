from page.customer_search_result import CustomerSearchResult
from setup.base_setup import BaseSetup

class TestCustomerSearchResult(BaseSetup):

    def setUp(self):
        super().setUp('customerSearchResult_2')
        
    def page(self):
        return CustomerSearchResult(self.getDriver())
    
    def test_search_notfound_name(self):
        assert self.page().search_by_name_customer('123') is 'NOT_FOUND'

    def test_search_found_name(self):
        assert self.page().search_by_name_customer() is not 'NOT_FOUND'

    def test_search_notfound_phone(self):
        assert self.page().search_by_phone_customer('123') is 'NOT_FOUND'

    def test_search_found_phone(self):
        assert self.page().search_by_phone_customer() is not 'NOT_FOUND'

    def test_check__route_reservation_register_member_1(self):
        current_path = self.page().check_route_reservation_register_member(1)
        assert current_path == '/reservationRegistMember'

    def test_check__route_reservation_register_member_2(self):
        current_path = self.page().check_route_reservation_register_member(2)
        assert current_path == '/reservationRegistMember'

    def test_property_reservation_register_member_1(self):
        is_name_text, is_phone_text, is_mobile_text, is_birthday_text = self.page().check_property_reservation_register_member(1)
        assert is_name_text == True
        assert is_phone_text == True
        assert is_mobile_text == True
        assert is_birthday_text == True

    def test_property_reservation_register_member_2(self):
        is_name_text, is_phone_text, is_mobile_text, is_birthday_text = self.page().check_property_reservation_register_member(2)
        assert is_name_text == True
        assert is_phone_text == True
        assert is_mobile_text == True
        assert is_birthday_text == True

        
        

        


