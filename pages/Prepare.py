import base64
import io

from nicegui import ui

import utils
from utils.Recognize import recognize


class Prepare:
    def __init__(self):
        self.name = None
        self.image_pil = None

    def render(self):
        self.name = utils.NAME_HOME
        utils.NAME_HOME = None
        self.image_pil = utils.IMAGE_HOME
        utils.IMAGE_HOME = None
        vegetable = ""
        if self.image_pil and self.name:
            vegetable = str(recognize(self.image_pil)).lower()

            # ui.image("./assets/prepare/prepare.png")
            overlay_b64 = self.pil_to_base64()
            with ui.row():
                ui.image("./assets/prepare/prepare.png").style('''
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                ''')

                ui.label("Hello👋,").style('''
                    position: absolute;
                    top: calc(50% - 250px);  /* 控件中心往上移一点 */
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 24px;
                    color: white;
                    z-index: 10;
                ''')

                with ui.element('div').style('''
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 300px;
                    height: 400px;
                    background: rgba(10, 72, 40, 0.2);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    backdrop-filter: blur(4px);
                '''):
                    width = self.image_pil.width
                    height = self.image_pil.height

                    max_width_1 = 270
                    max_height_1 = max_width_1 / width * height

                    max_height_2 = 360
                    max_width_2 = max_height_2 / height * width

                    if max_height_1 <= 360:
                        percentage_width = max_width_1 / 300 * 100
                        percentage_height = max_height_1 / 400 * 100
                    else:
                        percentage_width = max_width_2 / 300 * 100
                        percentage_height = max_height_2 / 400 * 100

                    ui.image(overlay_b64).style("max-width: " + str(percentage_width) + "%; max-height: " + str(percentage_height) + "%; object-fit: contain;")
        else:
            ui.notify("Not prepared.", color="yellow")

    def pil_to_base64(self) -> str:
        buffer = io.BytesIO()
        self.image_pil.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        return f"data:image/png;base64,{img_str}"