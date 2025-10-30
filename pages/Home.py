from io import BytesIO

from nicegui import ui
from PIL import Image, ImageOps
import json
import utils


class Home:

    def __init__(self, user_id):
        self.data_path = "./data.json"
        self.user_id = user_id

        self.chemical = 0
        self.carbon = 0
        self.water = 0
        self.soil = 0
        self.load_data()

        self.chemical_data_label = None
        self.chemical_text_label = None
        self.carbon_data_label = None
        self.carbon_text_label = None
        self.water_data_label = None
        self.water_text_label = None
        self.soil_data_label = None
        self.soil_text_label = None

        self.input_box = None
        self.image_pil = None
        self.name = None

    def render(self):
        with ui.element("div").classes("relative w-full flex justify-center"):
            ui.image("./assets/home/home.png")
            self.chemical_data_label = ui.label(f"{self.chemical}g").style(
                "position:absolute; top:60.5%; left:38%; "
                "font-size:12vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )
            self.chemical_text_label = ui.label("of chemical pesticide residues reduction.").style(
                "position:absolute; top:65.5%; left:38%; "
                "font-size:3.5vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )

            self.carbon_data_label = ui.label(f"{self.carbon}kg").style(
                "position:absolute; top:70%; left:38%; "
                "font-size:12vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )
            self.carbon_text_label = ui.label("of carbon emission reduction, equivalent to planting " + str(self.carbon // 20) + " trees.").style(
                "position:absolute; top:75%; left:38%; "
                "font-size:3.5vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )

            self.water_data_label = ui.label(f"{self.water}L").style(
                "position:absolute; top:79.5%; left:38%; "
                "font-size:12vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )
            self.water_text_label = ui.label(
                "of precious clean water has been saved.").style(
                "position:absolute; top:84.5%; left:38%; "
                "font-size:3.5vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )

            self.soil_data_label = ui.label(f"{self.soil}m²").style(
                "position:absolute; top:90%; left:38%; "
                "font-size:12vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )
            self.soil_text_label = ui.label(
                "of healthy soil has been protected, and been full of vitality.").style(
                "position:absolute; top:95%; left:38%; "
                "font-size:3.5vw; color:white; font-weight:bold;"
                "text-shadow: 3px 3px 8px rgba(0,0,0,0.8);"
            )

        with ui.element("div").classes("relative w-full flex justify-center"):
            ui.image("./assets/home/join us with text.png")
            ui.label("Add your contribution").style(
                "position:absolute; top:40%; left:12%; "
                "font-size:7vw; color:white; font-weight:bold;"
                "text-shadow: 2px 2px 0px rgba(0,0,0,0.5);"
            )
            self.input_box = ui.input("Enter your name", on_change=self.input_box_callback).style(
                "position:absolute; top:47%; left:12%; "
                "font-size:3vw; "
                "color:black; "
                "background-color:rgba(255,255,255,0.8); "
                "border-radius:8px; "
                "width:50%; height:8%; "
                "padding: 0% 1.2%"
            )
            ui.button("Start").style(
                "position:absolute; top:47%; left:65%; font-size:4vw; "
                "width:20%; height:8%"
            ).on("click", self.start_bt_callback)
            ui.upload(label="Load Photo", auto_upload=True, on_upload=self.upload_callback).style(
                "position:absolute; top:56%; left:12%; font-size:1.5px; "
                "width: 73%;"
                "background-color: rgba(255, 255, 255, 0.5); "
                "color: black; "
                "border: 1px solid #333; "
                "border-radius: 5px; "
                "padding: 2px 5px;"
            )

    async def upload_callback(self, event):
        file = event.file
        if not file:
            ui.notify("No file uploaded")
            return
        content_bytes = await file.read()
        self.image_pil = Image.open(BytesIO(content_bytes)).convert("RGB")
        self.image_pil = ImageOps.exif_transpose(self.image_pil)

    def input_box_callback(self, e):
        self.name = e.value

    def start_bt_callback(self):
        if self.is_valid_name() and self.image_pil:
            utils.USER_SESSIONS[self.user_id]["name_home"] = self.name
            utils.USER_SESSIONS[self.user_id]["image_home"] = self.image_pil
            ui.navigate.to("/prepare")
        else:
            ui.notify("Please enter your name and upload the photo.", color="yellow")

    def is_valid_name(self):
        if (not self.name) or self.name == "":
            return False
        for i in self.name:
            if not (i in [" ", "\n", "\t"]):
                return True

    def load_data(self):
        try:
            with open(self.data_path, "r") as f:
                data = json.load(f)
                self.chemical = data["chemical"]
                self.water = data["water"]
                self.soil = data["soil"]
                self.carbon = data["carbon"]
        except Exception as e:
            ui.notify(e, color="red")
        finally:
            f.close()

    def save_data(self):
        try:
            data = {
                "chemical": self.chemical,
                "carbon": self.carbon,
                "water": self.water,
                "soil": self.soil
            }
            with open(self.data_path, "w") as f:
                json.dump(data, f)
        except Exception as e:
            ui.notify(e, color="red")
        finally:
            f.close()

