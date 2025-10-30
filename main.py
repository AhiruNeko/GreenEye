from nicegui import ui
from pages.Home import Home
from pages.Prepare import Prepare
import uuid
from nicegui import app
from utils import USER_SESSIONS


def get_user_session():
    user_id = app.storage.user.get("user_id")
    if not user_id:
        user_id = str(uuid.uuid4())
        app.storage.user["user_id"] = user_id

    if user_id not in USER_SESSIONS:
        USER_SESSIONS[user_id] = {
            "home": Home(user_id),
            "prepare": Prepare(user_id)
        }

    return USER_SESSIONS[user_id]


def main():

    @ui.page("/")
    def home_page():
        session = get_user_session()
        session["home"].render()

    @ui.page("/prepare")
    def prepare_page():
        session = get_user_session()
        session["prepare"].render()

    ui.run(host='0.0.0.0', port=8080, title="GreenEye", reload=False, show=False, storage_secret="GreenEye")


if __name__ in ["__main__", "__mp_main__"]:
    main()
