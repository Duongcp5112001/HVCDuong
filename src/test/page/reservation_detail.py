from page.common import AbstractPage
from page.components import GoToReservationDetail
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as exp_cond
from time import sleep

class ReservationDetail(AbstractPage):
    name = "reservationRegistMember"

    def __init__(self):
        super().__init__(self.name)
    
    def click_open_dropdown(self):
        GoToReservationDetail.handle_quick_reservation_success(self)
        GoToReservationDetail.click_btn_reservation_detail(self)
    
