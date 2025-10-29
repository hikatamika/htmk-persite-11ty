---
title: "Splatoon 3 Post Printer Tutorial"
tags: ["posts", "blog", "cinema"]
date: 2023-04-18 09:02:00 -7
blogSlug: "splatoon-3-post-printer-tutorial"
blogCategs:
  - tutorials
  - cinema
blogTags:
  - splatoon
cinemaThumb: "splatpost.webp"
cinemaCategs:
  - artTutorials
redirect_from: ["/2023/04/18/splatoon-3-post-printer-tutorial/"]
---
{% youTubeEmbed "Bnqc7-x3vEY" %}

Hi! Welcome to my Splatoon 3 Post Printer Tutorial. I’m gonna walk you through my process of getting my pixel art from my PC to the Splatoon post box step-by-step. Gonna try to keep it brief, so let’s hop right in.

## Part 1: Preparing Your Art

- I recommend a pixel art software like Aseprite / Paint Tool SAI / MS Paint
- You’ll need a 320 x 120 PNG image, in black and white only. (If you use grays, the printer will dither them automatically. Using black and white only gives you more control.)
- I recommend sketching on a bigger canvas and shrinking to 320 x 120 to do the lineart.
- I’d also recommend printing only the lineart and doing the shading in game because sometimes the USB printer drops inputs.
    - This tutorial is for the USB method, but if you have a Linux PC/Virtual Machine, you can print over Bluetooth, where the inputs don’t get dropped for some reason. Check the description for more information on that method.

## Part 2: Preparing Your Computer

- This tutorial requires connecting a USB AVR-board to your switch. The Splatoon printer was originally made for a Teensy 2.0++, but they’re no longer manufactured by the original company, and only knock-off versions are made today. They’d probably still work, but use them at your own risk.
- I use an Arduino Micro. I’ve put an official Amazon Link to them in the description.
- If you have a Teensy 2.0++, download the Teensy Loader app. If you have an Adruino Micro, download the Arduino IDE.
- Download and install Python. I’m using version 3. Have your installer add Python to PATH.
- Download and install the Python Imaging Library
- Download the Splatoon 3 Post Printer, link in the description, and put the folder somewhere you can find it later.
- Put your 320 x 120 PNG image in the **Splatoon-3-Post-Printer** folder with a short-and-easy name.
- Download the LUFA library at the bottom of this page, and put it in the folder that your **Splatoon-3-Post-Printer** folder is **in**. Not in the **Splatoon-3-Post-Printer** folder itself. Rename it to **LUFA**.
- You’ll need to setup the AVR GCC Toolchain on your Windows Computer following this guide. I won’t be regurgitating that guide, but start **here**, (3. AVR GCC Toolchain – Setup for Windows) and follow it all the way down to **here,** (Other Useful Tools). _**You don’t need to do the Other Useful Tools part.**_ Put the **AVRGCCStart.cmd** file that it has you make, in the **Splatoon-3-Post-Printer** folder. It should look something like **this** at the end of that guide.
    - If, along that guide, you got an error message of some sort, comment the current timestamp, and an explanation of your error.
- Your computer’s now ready! Onto the next part.

## Part 3: Converting the Art to Code

- You don’t need the **AVRGCCStart.cmd** for this part.
- Just open to the **Splatoon-3-Post-Printer** folder and type **cmd** in the path bar. Then, press enter.
- Type “**python png2c.py**” into the window. Press the **spacebar**_once_, then enter the name of your PNG, with .PNG at the end. Then, press **enter**.
    - If you got an error message you weren’t expecting, comment the current timestamp, and an explanation of your error.
- Close the Command window. Onto the next step.

## Part 4: Converting the Code into Controls

- Important: If you have an Arduino Micro, edit the **makefile** file in a text editor, and change **MCU = at90usb1286** to **MCU = atmega32u4**. If you have a Teensy 2.0++, leave it alone.
- Make a blank folder called **obj** in the **Splatoon-3-Post-Printer** folder.
- In your **Splatoon-3-Post-Printer** folder, open the **AVRGCCStart.cmd** file. It’ll create an important command window with special instructions needed to carry out this step.
- Type “**make**” into the window, then, press **enter**. It should make a **Joystick.hex** file.
    - If you got an error message you weren’t expecting, comment the current timestamp, and an explanation of your error.

## Part 5: Putting the Controls onto the Board

- This is where the tutorial gets board-specific. In this walkthrough, I’m using an Arduino Micro.
    - Please follow the linked video for how to do this step on a Teensy 2.0++. I’ve put it in the i-card and in the description. The step ends at **4:21**
- For Arduino Micro users, open Arduino IDE. Go to **File > Preferences** and make sure **show verbose output during: upload** is checked, then click OK.
- Plug in your Arduino Micro and select it under **Tools**, and upload the sketch. Press the board's reset button when it asks you to. In the log window find the line with **avrdude** and copy the command into notepad.
- In notepad, replace the <b>“</b>s (quotation marks) with nothing. Removing them. Replace the path to the .hex file to the path to the **Joystick.hex** file of your image. You can copy the path from an explorer window path bar to make it easier.
- Make sure the -PCOM port matches with what port the Arduino IDE says your Arduino is currently on. Mine is usually COM4 or COM5 but it can change; especially if I replug or reset between steps.
- Copy the notepad command you made, open the **AVRGCCStart.cmd** file, and paste the command into the black window. Don’t press enter yet.
- Here comes a part with tricky timing. Double-tap the reset button on your Arduino Micro, and press enter. You should press enter right after one USB-connecting sound. **avrdude** should report success.
    - If you got an error message you weren’t expecting, comment the current timestamp, and an explanation of your error.
- Save the notepad command somewhere so you don’t have to copy it from the Arduino IDE each time you want to swap images. Though, it’s smart to look at it each time you do to make sure the -PCOM number is still what you expect it to be, as it can change.
- Now it’s time to get your art into Splatoon!

## Part 6: Connecting to the Switch

- Open Splatoon 3 and go to the Post Box. Enter the drawing canvas.
- Plug your Arduino Micro into your Switch in docked mode using a Micro-USB to USB-A cable.
- Or, add on a USB-A to USB-C cable to plug it into an undocked Switch.
- It should automatically make itself the Player 1 controller, clear the canvas, and align the cursor to the top-left side of the canvas, before printing.
- The printing takes about 30 minutes, and if you included shading in your image, it might mess up at parts. Once it’s finished, unplug the Arduino Micro and manually correct the image using the D-Pad on your real controller.
- Sometimes certain lines are shifted. After printing, manually correct those lines as well using the D-Pad on your real controller.

## Afterword

- And you’re done. The next time you connect your Arduino Micro to your computer, it’ll act like an Adruino for a couple seconds before pretending to be a controller again. If you need to upload a different program to it, double-tap the reset button on it before uploading. (Before it pretends to be a controller again.)
- Tutorials aren’t easy, so if you found this video helpful, please follow my art here, or @HikaTamika on Tumblr, Artfol, Inkblot, TikTok, or Instagram. And, consider supporting me on Ko-Fi; also @HikaTamika.
- I’ve included the script to this video in the description if reading it might be helpful. Comment if you have any questions, kthxbye.

## Links

- [Arduino Micro (Amazon)](https://www.amazon.com/Arduino-Micro-Headers-A000053-Controller/dp/B00AFY2S56/)
- [Arduino IDE](https://www.arduino.cc/en/software/)
- [Teensy Loader](https://www.pjrc.com/teensy/loader.html)
- [Teensy Loader Upload Guide (TimeStamped)](https://youtu.be/C-QRc6lb-LM?t=225)
- [Python](https://www.python.org/downloads/)
- [Python Imaging Library](https://python-pillow.org/)
- [Splatoon 3 Post Printer](https://github.com/tarxf/Splatoon-3-Post-Printer)
- [LUFA Library](https://www.fourwalledcubicle.com/LUFA.php)
- [AVR GCC Toolchain Guide](https://tinusaur.com/guides/avr-gcc-toolchain/)
- [Microchip.com Logins](https://bugmenot.com/view/atmel.com/)
- Linux Methods:
    - [https://github.com/Brikwerk/nxbt](https://github.com/Brikwerk/nxbt)
    - [https://github.com/JonathanNye/img2splat](https://github.com/JonathanNye/img2splat)
    - [https://github.com/Victrid/splatplost](https://github.com/Victrid/splatplost)