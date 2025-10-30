from nicegui import ui
from pages.Home import Home
from pages.Prepare import Prepare


def main():
    home = Home()
    prepare = Prepare()

    @ui.page("/")
    def home_page():
        home.render()

    @ui.page("/prepare")
    def prepare_page():
        prepare.render()

    ui.run(host='0.0.0.0', port=8080, title="demo", reload=False, show=False)


if __name__ in ["__main__", "__mp_main__"]:
    main()
