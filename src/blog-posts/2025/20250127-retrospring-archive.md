---
title: "RetroSpring Archive"
blogSlug: "retrospring-archive"
blogCategs: ["archive"]
blogTags:
date: 2025-01-27 11:44:00 -8
redirect_from: "/2025/01/27/retrospring-archive/"
---
Heyo everyone! You know how I be using this place as an attic. Anyway, RetroSpring is shutting down March 1st, so I wanted to make an archive of all the questions I've received/answered on it. That's all this blog post is! Cool stuff on digital screentone usage, and RSIs, and OCs, and me-stuff.

If you wanna send me anonymous questions or greetings ***now,*** I am giving [WaveBox](https://wavebox.me/wave/9zdpazgbm43lecc5/) a try.

---

> favorite OC and their favorite color and why
> —Anon, 2024-04-29

OOOOOOH this always rotates, this always rotates. I'll word it this way, the OC in the front of my mind right now is Hevel the fallen angel. His favorite color is red, the color of human blood, cause he wants to become human. He's earning his way there by doing good deeds.

It's also bro's eyeliner color of choice.
—Hika, 2024-04-29

---

> what art program do you use?
> —Anon, 2024-04-29

I mostly use Clip Studio Paint! I love its brush engine the most (I'm rly good at making/editing brushes) and haven't seen a single program come close to its comic making tools. I appreciate the tools that let me cheese things like curved speedlines and stuff like that. I'd prolly get get my wrist busted if I tried to consistently do stuff like that by hand.

If you don't have CSP yet I'd recommend just getting a one-time-purchase license for PC and using it till it breaks, or the a new version number comes out, tho. Subscriptions are wild.
—Hika, 2024-04-29

---

> can you explain "The LPI of a layer of screentone after size reduction should be: [Manuscript LPI]*([Reduction % as Decimal]^-1)" for people who can rotate the apple in their heads but don't understand number at all :-( i want to avoid moire when exporting comics at smaller sizes and i think that's the answer to my problem but i've never been able to figure it out myself lol
> —Anon, 2024-05-03

OOH OOH OOH, word!
Lemme preface my answer by saying screentone-moire on web is a *near* inevitability and that it can be avoided online by adding like ~6-8px of gaussian blur (assuming your manuscript is 600dpi; try more blur if your manuscript is 1200 or higher, or less blur if you've already scaled a layered copy of your file down to lower DPI) to a copy of your screentones before scaling down/exporting for web view. You can tell for sure than un-gaussianed, reduced screentones are gonna cause a moire issue when the dot pattern becomes unevenly shaped (some dots are circles, some dots are ovals, etc. Like if it doesn't look like an evenly sized dots or an evenly spaced grid anymore.)

So! 60LPI (lines per inch) at manga manuscript paper size makes for nice, even, textured-but-not-too-textured greys at magazine or tankobon (volume) size. But, the more you size down your screentones, the smaller the dots get, and the more "lines" of dots begin to fit in an *inch*, y'feelme. If you have Clip Studio Paint, you can tell it to do the math for you when scaling down your comic files with screentone in them. On the export screen: "Advanced Color Settings > Export settings for tone > Depend on Export Scale ✅"

For reasons, I scale down my comic files in Photoshop as layered PSDs with the screentones as solid flat grey cells (like I did for my recent mini-zine) so can make the new screentones with the increased LPI myself, after doing the math for what the new LPI has to be. TokyoPop popularized publishing English Manga at 5" x 7.5"; around 57.73% of the size of the original manuscript paper the mangaka drew it on, so when I want to print a comic I've made, I scale it down to 57.73%.

So yeah in the original CSP file, I use 60 LPI for tones just meant to be read as flat colors, but lower LPI for ones more meant to be read as textures/actual dots. To come up with the new LPIs I need based on the old ones I had originally, the mathematical formula is as follows:

[Manuscript LPI]*([Reduction % as Decimal]^-1)

We put the reduction to the power of negative one because, say you reduce a 60 lines-per-inch tone to half its size. You can then fit twice as many of the OG lines in an inch. 120LPI. If you reduced it to a third, you can fit three times as many, etc. Doing something to the negative one power represents that relationship.

So that formula for me reducing a 60LPI tone by 57.73% would look like,

60✖️(.5773^-1)

Which equals 104. I like to roundup to the next multiple of 3, so 60LPI at 57.73% size is 105LPI.

I export my CSP file as a PSD, in Photoshop, scale the whole canvas down by 57.73%, and then go to the grey layers I wanted to be 60LPI and have Photoshop make tones out of them at 105LPI.

I will make a video on this later, but if you want a plug-n-play Google/Excel Sheet that can do the math for you, lmk!!
—Hika, 2024-05-04

---

> thank you so much for the infodump! i've never actually printed comics so i've been setting every screentone layer to 85lpi because that's what looks "best" on my monitor to me 😭 now i know to stick with 60, i guess. but yes, that's basically exactly what i needed! i know moire is unavoidable but... i need texture in my digital art or it feels weird... lol. thank you again :-) i don't have photoshop but hopefully the csp export option will be enough!
> —Anon, 2024-05-05

You're welcome screentone anon!! If you want screentone LPI numbers that just look good for the aesthetic, not for print, don't be shy to experiment with low LPIs tbh. Like ~30. They give more of the "intentional texture" feel instead of a "lo-fi representation of flat greys look. Especially after being scaled down for Social Media posting. This is assuming you draw on inch/centimeter canvases and not pixel-only ones.

"Export for comic" on stuff that's meant to be digital/screen only might give your screentones a KidPix-esque look to them, so don't worry and go for export for illustration in these cases. Just consider adding slight gaussian blur to your screentones beforehand. Good luck!!
—Hika, 2024-05-07

---

> Can you give me a brief premise of your OC projects? I'm curious!
> —Anon, 2024-05-05

Right right, so I'm gonna go for the ones that I think BSky people know about:

The magical girl one is like, about how I feel The Bay Area (& the world) would handle Magical Girls if we had them. Like how the government would regulate them and stuff. And also the divide between Magical Girls, those granted special magic, who most normies see as a spectacle, and Witches, women born with magic, that normies fear and society oppresses because they're blamed for the Monsters the Magical Girls have to purify. Also the core characters are in college. Also non-binary people can be Magical Girls as long as girlhood is a part of their gender experience.

The one with Hevel, the Angel guy, is… part of a series I call Demi-Human Diaries, which I want to be like, a series of character-centric comics that have a shared cast & world? But like each comic is about a different character going through a personal arc. About all these half-humans finding out what like, humanity and living is for them. The "main" character Hevel is a fallen angel who got kicked out of heaven for lying against God. There's also Ashe the Dhampir turned Vampire (with Ghanian Vampire perks), Dami the half-Demon, Juno the half-Phoenix, among other characters.

I feel like the third project of mine that BSky knows about is the one with Clay the robot guy in it. Funnily enough, he's a secondary character!! The main character is Wynn, a robotics/engineering student that gets the internship of a lifetime and gets illegal-but-awesome cybernetics out of it. In exchange, he serves as an agent for a virtual robot assistant company that investigates the dark/secret plans of mili-tech companies' plans to change humanity's relationship with tech forever… Ooh spooky.
His party members include, his childhood friend (a software dev), a woman with an autoimmune disorder that prevents her from getting cybernetics and chip implants, an android that surpasses the limits of his programming (that's Clay!), and multiple iterations of a clone that's part of a "New Game +" hivemind.

If I didn't answerrrrr the project you were thinking about let me know.
—Hika, 2024-05-07

---

> What is hika's favorite colors?
> —Anon, 2024-08-05

Can you guess? 😳💜 /lh

Besides the obvious one, I like Cyan, Magenta, and Black! For some reason, I don't care much for Yellow. You'd think I'm a fan of the entire Printing Process Quartet, but naw, just those three.
—Hika, 2024-08-05

---

> What's your favorite food to make?
> —Anon, 2024-08-05

A clone of my favorite item from Breaktime Tea & Cafe in San Jose!

Prepare a bowl of sticky, white rice, then put small bits of boneless fried chicken on top. Drizzle sriracha mayo and unagi sauce onto the rice, add the chicken, drizzle the mayo and unagi again, then finish it off with green onions and seaweed salad.

I also like a rice bowl topped with moistly/loosely scrambled eggs what have been stirred with a bit of mayo, diced bacon, unagi sauce, and just green onion, no seaweed.
—Hika, 2024-08-05

---

> can u talk about your repetitive strain injury you got a few years ago, how long it took to recover (if it is completely gone now), if anything in particular helped other than ~time~, etc. im feeling that familiar ache in my wrist and its right when im hyperfocused on drawing which as you can probably imagine is Not Fun
> —Anon, 2024-08-06

OH MY GOD yes, I'm sorry I was so late to reply to this one!

Yes, a few years back I decided to go ham into one of the comic ideas I had. It was quite developed at the time and felt that I could just hop into it. I was drawing thumbs/boards for the comic like an absolute maniac, but the real multiplier of that repetitive strain, one I think artists don't take as seriously, is that I was NOT TYPING PROPERLY!! I wasn't touch typing (you know like ASDF JKL;?) I was like... improperly typing. That combined with the crazy amount of drawing I was doing without warmup-wrist stretches and regular breaks caused me to get stinging, shooting pains in both wrists like if I dared to start hopping back into what I was doing!!

I feel like it took me about a year to get back to my new normal. My new normal feels completely normal, like factory reset, as if nothing ever happened, EXCEPT!! Now: my wrists will signal to me if I'm bothering them. Which only happens if I don't stretch or take regular breaks. Do wrist stretches for artists and take breaks every 30min or every hour. They don't even have to be that long. Get up, get a snack, go to the bathroom, take a shower, whatever, that kind of thing. It helps immensely. Do not Leeroy Jenkins your art and do not "look guys, I finished this piece/comic page in one sitting!!" that stuff. And do not, type, improperly. Type the boring standardized way. It's made to minimize the amount of finger/wrist movements you have to make, with the bonus of not needing to look at your keyboard when you do.

Little remedies! Ice packs. Love me a good ice pack when my wrist(s) start beeping at me. If you've had a bad wrist day, you can also chill/sleep in a wrist brace (or two) but don't draw in them. They're made for inaction, not to hold you still IN action.

As a neurodivergent person I'm telling you, HYPERFOCUS... HYPERFOCUS CAN BE THE ENEMY sometimes, like, you have to set annoying-ass timers to tell you to bugger off because our poor little wrist tendons cannot keep up with our brains, it's true.

I hope this was helpful/insightful in some way!! Feel back to send a follow-up question if you need more specific answers about something!
—Hika, 2024-08-22

---

> rsi anon here! i am actually feeling mostly better now, though i can only draw with thicker pens bc i grip skinny pens too hard. thank you for bringing up typing, i knew the way i grip my phone was aggravating it but i should definitely see if typing is doing anything because i do hover lol. and timers! i have workrave but im not good abt using it bc i just get mad and go NO NOT NOW when it goes off lol... i will take this as my sign to start really using it. ty again!
> —Anon, 2024-08-24

🤝Telling-WorkRave-To-Bugger-Off Twins🤝 WE MUST RESIST THE URGE... We must listen to the WorkRave sheep...

Glad you're feeling better!! Yeah I hear thicker pens work! Luckily most I use get thicker towards the hold-y part. Smart on you for considering phone-grip too! I'm kinda loose w/ mine. Pop-Socket & a light touch.

Let's stay strong together, anon!!
—Hika, 2024-08-25