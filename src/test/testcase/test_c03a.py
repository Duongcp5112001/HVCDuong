import time

from page.c03a import C03A
from setup.base_setup import BaseSetup

import pytest


class TestC03A(BaseSetup):

    def setUp(self):
        super().setUp('reservationRegistMember')

    def page(self):
        return C03A(self.getDriver())

    def test_cancel_reservation(self):
        self.page().go_to_reservation_detail()
        current_path = self.page().cancel_reservation()
        assert current_path == '/reservationRegistMember'

    def test_open_success_dialog_preview(self):
        self.page().go_to_reservation_detail()
        is_open_dialog = self.page().is_open_dialog_preview()
        assert is_open_dialog == "true"

    def test_title_dialog(self):
        self.page().go_to_reservation_detail()
        title_dialog = self.page().get_title_dialog()
        assert title_dialog == "予約内容確認"

    def test_change_status_reservation(self):
        self.page().go_to_reservation_detail()
        text = self.page().change_status_reservation('/div[1]')
        assert text == '確定予約'
        text = self.page().change_status_reservation('/div[2]')
        assert text == '仮予約'
        text = self.page().change_status_reservation('/div[3]')
        assert text == 'キャンセル待ち'

    def test_register_reservation(self):
        self.page().go_to_reservation_detail()
        self.page().register_reservation()

    def test_change_status_and_register_reservation(self):
        self.page().go_to_reservation_detail()
        title_status = self.page().change_status_and_register_reservation('/div[1]')
        assert title_status == 'Confirmed'
        title_status = self.page().change_status_and_register_reservation('/div[2]')
        time.sleep(2)
        assert title_status == 'Tentative'
        title_status = self.page().change_status_and_register_reservation('/div[3]')
        time.sleep(2)
        assert title_status == 'Waiting'

