// ============================================================
// Story Disc: The Cave
// ============================================================

export const THE_CAVE = {
  startScene: {
    text: "The trail was supposed to be a shortcut — twenty minutes through the woods and you'd be back at the campsite before dark. But that was an hour ago. Now the trees have thickened into something older, the kind of forest that doesn't appear on hiking apps. Your flashlight catches something ahead: a gap in the rock face, barely wide enough to squeeze through. From deep inside, a faint hum pulses — not mechanical, not natural. Something in between.\n\nYour phone has no signal. The sun is almost gone. And that hum... it's getting louder.",
    choices: [
      "Squeeze through the gap into the cave",
      "Stay outside and try to find another way back"
    ],
    statChanges: [
      { nerve: 10, excitement: 5 },  // "Squeeze through the gap"
      { luck: 10, wit: 5 }          // "Stay outside"
    ]
  },

  // Steps 1–6: hardcoded middle scenes (Phase 4 will replace with AI generation)
  scenes: [
    {
      // Step 1
      text: "The cave opens up inside — much larger than the entrance suggested. The hum is everywhere now, vibrating in your molars. And then you see it: alien equipment. Sleek instruments with no visible power source, holographic readouts floating in mid-air, and labels written in a script that looks like someone sneezed on a keyboard.\n\nA glowing 3D map rotates slowly in the center of the chamber, showing the forest above — and, unmistakably, your campsite.",
      choices: [
        "Touch the holographic map",
        "Hide behind a rock and observe first"
      ],
      statChanges: [
        { excitement: 10, nerve: 5 }, // "Touch the map"
        { wit: 10, luck: 5 }         // "Hide and observe"
      ]
    },
    {
      // Step 2
      text: "Before you can decide your next move, a sound echoes from a side tunnel: the shuffling, bumbling sound of someone carrying too many things. A figure waddles in — roughly potato-shaped, about knee-height, with two wobbly antennae and enormous round eyes that immediately lock onto you.\n\nIt's holding a clipboard. It looks down at the clipboard. It looks back up at you. It looks at the clipboard again. Then it makes a sound like a disappointed kazoo.",
      choices: [
        "Wave and say hello",
        "Try to slowly back away before it raises an alarm"
      ],
      statChanges: [
        { charm: 10, nerve: 5 },  // "Wave and say hello"
        { luck: 10, wit: 5 }      // "Back away"
      ]
    },
    {
      // Step 3
      text: "The alien drops its clipboard with a clatter. More figures pour in from the tunnel — five, six, seven of them. They're all different sizes but share the same enormous eyes and antenna arrangement. One is wearing a tiny lab coat. Another has what appears to be a miniature hard hat.\n\nThey form a semicircle around you, murmuring to each other in rapid honking tones. The one in the lab coat produces a small device and begins scanning you like a barcode.",
      choices: [
        "Mime that you come in peace (hands up, big smile)",
        "Point at your dead phone and shrug — universal symbol for 'I'm just lost'"
      ],
      statChanges: [
        { charm: 10, wit: 5 },  // "Mime peace"
        { wit: 10, luck: 5 }    // "Point at phone"
      ]
    },
    {
      // Step 4
      text: "The honking reaches a crescendo, then stops. The lab-coat alien steps forward and holds up a device the size of a walnut. It presses a button. The device crackles with static, whirrs, and then speaks in a voice like a squeaky toy being sat on:\n\n\"YOU. SPECIMEN OR VISITOR?\"\n\nAll seven aliens lean in slightly. The one with the hard hat has its pencil raised.",
      choices: [
        "Visitor! Definitely a visitor. One hundred percent visitor.",
        "...what exactly happens if I say specimen?"
      ],
      statChanges: [
        { nerve: 10, charm: 5 },     // "Visitor!"
        { wit: 10, excitement: 5 }    // "What happens if specimen?"
      ]
    },
    {
      // Step 5
      text: "The aliens huddle and confer. The lab-coat one keeps glancing back at you, then making notes. After what feels like a committee meeting, it returns holding a glowing tablet displaying a form with approximately forty fields.\n\nThe translation device squeaks: \"VOLUNTARY DATA EXCHANGE PROPOSED. YOUR INFORMATION FOR SAFE PASSAGE AND ALSO COMPLIMENTARY CRYSTAL.\"\n\nBehind them, a tunnel glows faintly with natural light. That's the way out.",
      choices: [
        "Fill out the survey — honestly, you're curious about the crystal",
        "Politely decline and just ask for directions home"
      ],
      statChanges: [
        { excitement: 10, charm: 5 }, // "Fill out survey"
        { charm: 10, luck: 5 }       // "Decline + ask directions"
      ]
    },
    {
      // Step 6
      text: "The lead alien nods three times — apparently the universal sign for 'transaction complete' — and places a small, warm crystal in your palm. It glows faintly blue. Another alien holds up a laminated sign:\n\n\"PLEASE RATE YOUR EXPERIENCE\"\nWith five stars drawn in what looks suspiciously like glitter pen.\n\nThe exit tunnel is right there. Dawn light is filtering in. You have survived an alien research facility. Somehow.",
      choices: [
        "Five stars — genuinely, this was the best night of your life",
        "Three stars — great aliens, but the no-signal situation was a dealbreaker"
      ],
      statChanges: [
        { charm: 10, excitement: 5 }, // "Five stars"
        { wit: 10, nerve: 5 }        // "Three stars"
      ]
    },
    {
      // Step 7
      text: "The aliens form a surprisingly orderly send-off line. One by one they present you with small laminated cards — each one a different colour, each one stamped with a symbol you don't recognize. The head researcher produces a miniature loudspeaker and announces something in rapid honking tones. The others respond with a synchronized kazoo sound.\n\nYou gather it's a farewell ceremony. You're fairly sure you just got a standing ovation from seven potato-shaped extraterrestrials.",
      choices: [
        "Take a small bow — when in Rome",
        "Wave enthusiastically and back toward the exit tunnel"
      ],
      statChanges: [
        { charm: 10, wit: 5 },      // "Take a bow"
        { nerve: 10, luck: 5 }      // "Wave and back away"
      ]
    },
    {
      // Step 8
      text: "The exit tunnel narrows to a tight squeeze, exactly like the entrance. Dawn light pours through the gap, warm and impossibly ordinary after everything that just happened. You can smell pine and damp earth. Behind you, the alien base hums quietly.\n\nYou pause at the threshold. There's a small ledge to your left with something on it — the aliens must have placed it there. It looks like a parting gift.",
      choices: [
        "Take the gift — you've earned it",
        "Leave it and step through — some things are better left in the cave"
      ],
      statChanges: [
        { excitement: 10, luck: 5 },  // "Take the gift"
        { nerve: 10, wit: 5 }         // "Leave it"
      ]
    }
  ],

  endings: {
    diplomat: {
      minStat: "charm", threshold: 70,
      title: "Honorary Researcher",
      text: "Word spread through the alien base before you even reached the exit: the human is friendly. Unusually friendly, even by their own research standards.\n\nBefore you stepped into the dawn light, the head researcher pressed a laminated card into your hands. It had your name on it — spelled slightly wrong, but close — and the words 'GALACTIC FIELD RESEARCH INSTITUTE — ASSOCIATE MEMBER' printed in seven languages, only one of which you could read.\n\nYou made it back to camp in time for breakfast. You still have the card. You keep it in your wallet, behind your library card. No one knows it's there, but you do."
    },
    scholar: {
      minStat: "excitement", threshold: 70,
      title: "Co-Author",
      text: "You filled out the survey. Then a follow-up survey. Then what turned out to be an exit interview, a supplemental questionnaire, and a brief oral examination on the migratory patterns of songbirds (you guessed).\n\nSomewhere in the process, you accidentally co-authored a paper on human decision-making under conditions of extraterrestrial ambiguity. Your contribution is listed in the acknowledgements as 'HELPFUL SPECIMEN (NON-CONSENTING CATEGORY: VISITOR).'\n\nThe paper will be published in a peer-reviewed journal 40 light-years from here. You'll never see it. But on the hike back to camp, you felt, for the first time in years, genuinely intellectually satisfied."
    },
    survivor: {
      minStat: "nerve", threshold: 70,
      title: "Made It Out",
      text: "You emerged from the cave exactly as the sun cleared the treeline — blinking, slightly dusty, and in possession of a small glowing crystal you couldn't fully explain.\n\nThe trail back to camp was right where it should have been. Your phone found signal the moment you stepped out. You had eleven unread messages, three missed calls, and one new contact you didn't remember adding: '🛸 Research Team Alpha.'\n\nYou stared at it for a long time. Then you put your phone in your pocket and walked back to camp. Some things, you decided, are better processed over coffee."
    },
    trickster: {
      minStat: "wit", threshold: 70,
      title: "Somehow Also Got Their Lunch",
      text: "You left with the crystal. You also left with the translation device — they said you could borrow it, and you chose to interpret 'borrow' very loosely. And somehow, through a sequence of events that remained unclear even to you, you also left with what appeared to be an alien packed lunch in a small insulated bag.\n\nThe aliens watched you go with the particular expression of beings who know they've been outmaneuvered but can't quite figure out how.\n\nThe lunch turned out to be surprisingly good. You ate it on a log at the edge of the forest, watching the sun come up, feeling like the most improbable person on Earth."
    }
  },

  config: {
    tone: "goofy alien mystery-thriller, non-violent",
    setting: "forest cave with quirky alien researchers",
    totalSteps: 9, // step 0 (start) + steps 1–8 (middle); ending triggers after step 8

    // Phase 4: included in every AI scene-generation system prompt
    systemPromptBase: "You are the narrator of a goofy, non-violent alien mystery-thriller. The story takes place inside a forest cave that alien researchers are secretly using as a research base. Keep the tone light and comedic. Never introduce violence or horror.",

    // Phase 4: appended to system prompt when the player uses the custom input cloud
    customInputFraming: "The player has typed a custom action. Interpret it charitably as something a person might realistically attempt in this setting, even if the literal words seem unusual or out of place. Do not reject the premise — find a creative way to make it fit the story world.",

    // Phase 4: soft checkpoints — inject a "must include" constraint at specific steps
    // These are not hard resets; they ensure canonical story elements reappear if the story drifted
    softCheckpoints: [
      {
        atStep: 3,
        mustInclude: "the alien research team and their unusual equipment",
      },
      {
        atStep: 5,
        mustInclude: "the alien cave setting, at least one researcher, and a visible path toward the exit",
      },
    ],
  },
};
