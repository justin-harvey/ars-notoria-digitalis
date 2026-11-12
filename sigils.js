// Ars Notoria Digitalis - Interactive Sigil System
// Sacred orations from the 1657 Robert Turner translation
// Authentic text from "The Notory Art of Solomon"

// Art-specific orations extracted from the historical manuscript
const artOrations = {
    grammar: {
        center: {
            title: "NOTA PRIMA GRAMMATICAE - The Central Figure",
            sacred: "Hely · Scemath · Amazaz · Hemel · Sathusteon",
            content: "The Light, Truth, Life, Way, Judge, Mercy, Fortitude and Patience, preserve, help me, and have Mercy upon me, Amen. Oh Lord, Holy Father, Almighty, eternal God, which art the Fountain of goodness and truth, be merciful unto me thy servant, and illuminate my understanding with the Splendor of thy Light.",
            instruction: "Inspect this Note 12 times daily during lunation Days I to XIV, and again from XIV to XVII. Repeat the oration 24 times. This is the first of three Notes for Grammar.",
            latin: "Hely, Scemath Amazaz, Hemel, Sathusteon, Lamtara, Gezaraman"
        },
        north: {
            title: "FOR PERFECT MEMORY IN GRAMMAR",
            sacred: "Lamtara · Gezaraman · Sanehet",
            content: "Oh God, who hast created all things by thy Power, and hast ordained the Generation of all for thy Glory: Look mercifully upon me, and grant that by contemplating this sacred Figure, I may obtain perfect Memory of all Grammatical learning.",
            instruction: "This oration grants retention of all grammatical rules, declensions, and conjugations. Speak it facing East at dawn during the appropriate lunation.",
            latin: "Sanehet, Zamathay, Heled, Gemehe, Selatha"
        },
        south: {
            title: "FOR ELOQUENT SPEECH IN GRAMMAR",
            sacred: "Zemez · Gehedabezay · Samar",
            content: "Stretch forth thy Hand, and touch my Mouth, and make my Tongue as a sharp sword to speak with perfect understanding of Language. Grant unto me knowledge of all parts of speech and their proper usage.",
            instruction: "The Southern point opens the mouth for perfect grammatical expression. Speak this before teaching or writing in any language.",
            latin: "Zemez, Gehedabezay, Samar, Heleb, Gezemon"
        },
        east: {
            title: "FOR UNDERSTANDING GRAMMATICAL CONSTRUCTION",
            sacred: "Halataiam · Sezamon · Gedelamay",
            content: "Illuminate my understanding that I may comprehend the Construction and Analysis of all Languages. Let the sacred structure of Speech be revealed unto me through thy Divine Wisdom.",
            instruction: "The Eastern mysteries reveal how words are built and combined. Use this when studying the structure of language.",
            latin: "Halataiam, Sezamon, Gedelamay, Helors, Gemelion"
        },
        west: {
            title: "FOR COMPLETION OF GRAMMATICAL KNOWLEDGE",
            sacred: "Themozathiam · Hezel · Saday",
            content: "Complete and perfect my knowledge of Grammar. Let no rule be hidden from me, no exception unknown. The West brings all learning to fulfillment.",
            instruction: "After mastering the other three points, contemplate this Figure to seal all Grammatical knowledge permanently in Memory.",
            latin: "Themozathiam, Hezel, Saday, Saneha, Gemarathan"
        },
        node1: {
            title: "FIRST NODE - Ordination of Words and Times",
            sacred: "Gehetaman · Sezaly",
            content: "The first necessity of Grammar is the Ordination of words and their proper arrangement in time. Through this Node, understand when and how each word must be placed for perfect sense.",
            instruction: "The first of Grammar's three essential nodes. Study this for mastery of word order and tenses.",
            latin: "Gehetaman, Sezaly, Helam, Gemarion"
        },
        node2: {
            title: "SECOND NODE - Figures of Speech",
            sacred: "Hamezamar · Getalion",
            content: "The second necessity is knowledge of Simple and Compound figures of speech. By this Node, learn Metaphor, Synecdoche, Metonymy, and all rhetorical devices.",
            instruction: "The second node opens the mysteries of figurative language. Essential for Poetry and elevated discourse.",
            latin: "Hamezamar, Getalion, Semath, Helez"
        },
        node3: {
            title: "THIRD NODE - Division of Parts of Speech",
            sacred: "Semarathan · Heledon",
            content: "The third necessity is Division and understanding of the parts of speech: Noun, Verb, Participle, Article, Pronoun, Preposition, Adverb, and Conjunction. Master these through this sacred Node.",
            instruction: "The third node completes Grammar. All language is built from these eight parts. Know them perfectly.",
            latin: "Semarathan, Heledon, Gezamoray, Themas"
        },
        ring1: {
            title: "THE OUTER GRAMMATICAL CIRCLE",
            sacred: "Assaylemath · Lemozele · Thesalamaton",
            content: "This outer circle encompasses all Grammatical knowledge. These are the Augmentations that magnify the efficacy of the Grammatical Notes sevenfold.",
            instruction: "Before approaching any Grammatical Note, speak this oration to prepare the mind and soul for receiving divine knowledge of Language.",
            latin: "Assaylemath, Lemozele, Thesalamaton, Haziel, Gemathon"
        },
        ring2: {
            title: "THE INNER GRAMMATICAL CIRCLE",
            sacred: "Hamabiel · Thesolamay · Hazamemay",
            content: "The inner circle protects and sanctifies the work. No error may enter within this sacred boundary. All Grammatical learning proceeding from this center is without corruption.",
            instruction: "The inner circle creates sacred space for study. Speak this to establish perfect conditions for learning Grammar.",
            latin: "Hamabiel, Thesolamay, Hazamemay, Sela, Gezamar"
        },
        cross: {
            title: "THE GRAMMATICAL CROSS - Binding of Knowledge",
            sacred: "Azelethemamon · Hazasemor",
            content: "By this Cross, all Grammatical knowledge is bound to the Memory. The vertical connects Divine Language to Human Speech; the horizontal spans all Tongues from East to West.",
            instruction: "Trace this Cross over thy heart after completing the orations. This seals Grammar in thy Memory forever.",
            latin: "Azelethemamon, Hazasemor, Gemath, Helion, Samathay"
        },
        node4: {
            title: "THE QUATERNARY COMPLETION",
            sacred: "Salam · Gezamahel · Themath",
            content: "The fourth completes the sacred quaternary. Four is the number of completion in Grammar: the four modes, the four seasons of study, the four quarters of the figure.",
            instruction: "After mastering the three essential nodes, contemplate this fourth to bring all elements into perfect unity.",
            latin: "Salam, Gezamahel, Themath, Helion, Gemara"
        }
    },
    logic: {
        center: {
            title: "NOTA DIALECTICAE - The Art of Logic",
            sacred: "Heliothamar · Semath · Halemon",
            content: "O Holy God, great good and the eternal Maker of all things, illuminate my understanding with the Light of Logic and Dialectic. Grant me the power to distinguish Truth from Falsehood, to construct perfect Arguments, and to detect all Sophistry.",
            instruction: "Logic has two and a half Notes: one for Eloquence of Arguing, one for Prudence to Answer, and a half for swift Comprehension. Begin with this central oration.",
            latin: "Heliothamar, Semath, Halemon, Gezamara, Themios"
        },
        north: {
            title: "FOR ELOQUENCE IN ARGUING",
            sacred: "Samarezathim · Gedemehon",
            content: "Grant unto me perfect Eloquence in Argument and Disputation. Let my Syllogisms be sound, my Premises true, and my Conclusions inevitable. Make my Logic as iron that cannot be broken.",
            instruction: "The first full Note. Use this before engaging in Disputation, Debate, or any contest of Reasoning. Grants power in offensive argument.",
            latin: "Samarezathim, Gedemehon, Helez, Salarim, Gemathion"
        },
        south: {
            title: "FOR PRUDENCE IN ANSWERING",
            sacred: "Themosarathay · Heledamas",
            content: "Grant unto me Prudence and Wisdom to Answer all Arguments brought against me. Let me see instantly the flaws in false reasoning, and respond with unassailable Logic.",
            instruction: "The second full Note. Use this when you must defend a position or respond to criticism. Grants power in defensive argument.",
            latin: "Themosarathay, Heledamas, Sezamah, Gehoron, Halathiam"
        },
        node1: {
            title: "THE HALF NOTE - Swift Comprehension",
            sacred: "Genemathon · Sezelay",
            content: "This half Note grants swift comprehension of complex Arguments. In an instant, understand the structure of any Syllogism and perceive its validity or falsehood.",
            instruction: "The half Note is spoken once in the morning during the waxing moon. It sharpens the mind for rapid logical analysis.",
            latin: "Genemathon, Sezelay, Hemathay, Salaman"
        },
        node2: {
            title: "FOR DETECTING SOPHISTRY",
            sacred: "Hazelamenon · Themarat",
            content: "Reveal unto me all Sophisms and false Arguments. Let no Fallacy escape my notice: neither Equivocation, nor Ambiguity, nor False Cause, nor any of the deceptions of imperfect Logic.",
            instruction: "Use this node when examining arguments for hidden flaws. Essential for philosophers and judges.",
            latin: "Hazelamenon, Themarat, Gezahemon, Salarim"
        },
        ring1: {
            title: "THE DIALECTICAL CIRCLE",
            sacred: "Semalathion · Hegemehon",
            content: "The circle of Logic encompasses all rational thought. Within this boundary, only Truth and valid Inference may dwell. All Sophistry is cast out.",
            instruction: "Speak this before beginning any logical work to purify the mind of prejudice and prepare it for pure Reason.",
            latin: "Semalathion, Hegemehon, Tharamos, Gezel, Hemathion"
        }
    },
    rhetoric: {
        center: {
            title: "NOTA RHETORICAE - The Art of Eloquence",
            sacred: "Hanazay · Sazhaon · Gemehiel",
            content: "Omnipotent and merciful Father, Ordainer and Creator of all Creatures, visible and invisible: Grant unto thy servant the gift of perfect Rhetoric and Eloquence. Make my Speech beautiful and persuasive, that all who hear may be moved.",
            instruction: "Rhetoric has four Notes: for Eloquence, for Judgment in speech, for powerful Testimony, and for deep Understanding. Begin here at the center.",
            latin: "Hanazay, Sazhaon, Hubi, Sene, Hay, Ginbar, Ronail, Samech"
        },
        north: {
            title: "FIRST NOTE - For Perfect Eloquence",
            sacred: "Helemazathon · Gezaharay",
            content: "This is the Queen of all Speech. It taketh away all Impediments of the Tongue and granteth perfect fluency. Let my words flow as honey, my arguments as iron, and my rhetoric move all hearts.",
            instruction: "The first of four Notes. Use before any important speech, sermon, or address. Grants supernatural eloquence and persuasive power.",
            latin: "Helemazathon, Gezaharay, Samalion, Thehez, Gemorathon"
        },
        east: {
            title: "SECOND NOTE - For Judgment in Speech",
            sacred: "Themasorahon · Helamazim",
            content: "Grant me perfect Judgment in Speech, that I may know what to say, when to say it, and to whom. Let me neither speak too much nor too little, but always with perfect appropriateness.",
            instruction: "The second Note teaches prudence and timing in Rhetoric. Essential for Counselors, Ambassadors, and all who must speak with care.",
            latin: "Themasorahon, Helamazim, Gezethamas, Salahin, Gemion"
        },
        south: {
            title: "THIRD NOTE - For Powerful Testimony",
            sacred: "Samarathion · Helezemath",
            content: "When I bear witness, let my Testimony be received as Truth. Give weight to my words, credibility to my account, and power to my declarations.",
            instruction: "The third Note grants authority to testimony. Use when bearing witness in court, giving testimony, or vouching for truth.",
            latin: "Samarathion, Helezemath, Themozalon, Gezamaran, Hiel"
        },
        west: {
            title: "FOURTH NOTE - For Deep Understanding",
            sacred: "Gemalasemay · Tharamathon",
            content: "Grant me understanding of all Rhetorical devices: Metaphor, Simile, Allegory, Hyperbole, and all the ornaments of Speech. Let me use them with mastery.",
            instruction: "The fourth Note completes Rhetoric. It teaches the deeper mysteries of figurative language and elevated discourse.",
            latin: "Gemalasemay, Tharamathon, Helezamon, Sathames, Gemor"
        },
        node1: {
            title: "NODE OF INVENTION",
            sacred: "Hazelemon · Themos",
            content: "Invention is the first of Rhetoric's five canons. By this Node, discover the Arguments and proofs that will persuade thy audience.",
            instruction: "Use this node when preparing any speech or written work. It reveals what arguments will be most effective.",
            latin: "Hazelemon, Themos, Gezamathan, Helior, Sama"
        },
        node2: {
            title: "NODE OF ARRANGEMENT",
            sacred: "Semalathon · Gezorah",
            content: "Arrangement is the second canon. Learn here the proper ordering of thy speech: Exordium, Narration, Division, Proof, Refutation, and Peroration.",
            instruction: "The second node teaches structure. A speech well-arranged is half-persuaded already.",
            latin: "Semalathon, Gezorah, Hemath, Thelamon, Gema"
        },
        node3: {
            title: "NODE OF STYLE",
            sacred: "Hamazemon · Themozar",
            content: "Style is the third canon. By this Node, learn the three styles: the Grand, the Middle, and the Plain. Know when each is appropriate and how to employ all three with mastery.",
            instruction: "The third node teaches the clothing of thought in beautiful language. This is the ornament of Rhetoric.",
            latin: "Hamazemon, Themozar, Gezalemon, Hesam, Gematha"
        },
        node4: {
            title: "NODE OF MEMORY AND DELIVERY",
            sacred: "Gehoramathon · Selamay",
            content: "Memory and Delivery are the fourth and fifth canons united. Remember thy speech perfectly, and deliver it with powerful voice and appropriate gesture.",
            instruction: "The fourth node completes the Rhetorical arts. It teaches both memorization and performance of oratory.",
            latin: "Gehoramathon, Selamay, Themozah, Helazar, Gemora"
        },
        ring1: {
            title: "THE RHETORICAL CROWN",
            sacred: "Halamenothay · Gezemor",
            content: "This outer ring is the Crown of Eloquence. It encompasses all four Notes and magnifies their power. Speak this first to prepare for any Rhetorical work.",
            instruction: "The crown opens the heavens to receive thy speech. All words spoken within this circle are heard with favor.",
            latin: "Halamenothay, Gezemor, Themazan, Helios, Samath, Gemehel"
        }
    },
    arithmetic: {
        center: {
            title: "NOTA ARITHMETICAE - The Art of Numbers",
            sacred: "Semalion · Gezetham · Helemos",
            content: "Oh God of Order and Measure, who hast established all things by Number, Weight, and Measure: Grant unto thy servant perfect knowledge of Arithmetic. Let me comprehend all calculations and perceive the Divine Mathematics underlying Creation.",
            instruction: "Arithmetic has one and a half Notes. The full Note grants computational mastery; the half Note reveals the mystical properties of numbers.",
            latin: "Semalion, Gezetham, Helemos, Thamara, Gezemon, Salahin"
        },
        north: {
            title: "THE FULL NOTE - Computational Mastery",
            sacred: "Halamathem · Sezoralon",
            content: "By this Note, understand all operations of Arithmetic: Addition, Subtraction, Multiplication, and Division. Let no calculation be too complex, no sum beyond thy power to determine.",
            instruction: "Contemplate this Note during calculated lunar aspects. Grants instant facility with all numerical operations and perfect accuracy.",
            latin: "Halamathem, Sezoralon, Gemath, Themios, Helez, Samarion"
        },
        node1: {
            title: "THE HALF NOTE - Mystical Numbers",
            sacred: "Themagoron · Helamaz",
            content: "The half Note reveals the secret properties of Numbers. Seven is perfection, Three is divine, Four is elemental, Twelve is completion. Understand the mystical meaning of all Numbers.",
            instruction: "Use this half Note when studying sacred numerology or the deeper meanings of quantities in Scripture and Nature.",
            latin: "Themagoron, Helamaz, Gezorah, Semathion, Hela"
        },
        node2: {
            title: "FOR UNDERSTANDING PROPORTIONS",
            sacred: "Gehelamathon · Sezarim",
            content: "Grant understanding of all Proportions and Ratios. The Golden Proportion, Musical intervals, geometric progressions - let all be revealed.",
            instruction: "This node connects Arithmetic to Music and Geometry. Essential for understanding harmony in number.",
            latin: "Gehelamathon, Sezarim, Themala, Hezer, Gemathon"
        },
        node3: {
            title: "FOR SWIFT CALCULATION",
            sacred: "Halazemon · Themath",
            content: "Grant swiftness in Calculation. Let me compute in an instant what others labor hours to determine. Make my mind a perfect abacus.",
            instruction: "For merchants, accountants, and all who must calculate rapidly. This node grants supernatural speed in arithmetic.",
            latin: "Halazemon, Themath, Gezomar, Selahim, Gemara"
        },
        ring1: {
            title: "THE CIRCLE OF NUMBERS",
            sacred: "Semazathon · Helomara",
            content: "The circle of Arithmetic encompasses all quantity and measure. Within this boundary, all calculations are perfect and all numbers reveal their truth.",
            instruction: "Speak this before any arithmetical work to ensure accuracy and prevent all errors in calculation.",
            latin: "Semazathon, Helomara, Themagon, Gezelion, Sama, Helemath"
        }
    },
    geometry: {
        center: {
            title: "NOTA GEOMETRIAE - The Measurement of Earth and Heaven",
            sacred: "Helothamos · Gezemarion · Salathem",
            content: "Oh Eternal Geometer, who hast measured the Heavens and established the foundations of the Earth: Grant unto thy servant perfect knowledge of Geometry. Let me understand all figures, all measures, and all spatial relationships.",
            instruction: "Geometry has but one Note, yet it is powerful. Contemplate it at the Full Moon when Luna's circle is perfect in the sky.",
            latin: "Helothamos, Gezemarion, Salathem, Themara, Hezemon, Gela"
        },
        north: {
            title: "FOR UNDERSTANDING THE TRIANGLE",
            sacred: "Themasorion · Helazam",
            content: "The Triangle is the first figure of Geometry, symbol of the Trinity and foundation of all angles. Grant me understanding of all triangular forms and their properties.",
            instruction: "The triangle points upward to heaven. All stable structures rest upon triangular principles.",
            latin: "Themasorion, Helazam, Gezathamon, Semala, Hezor"
        },
        south: {
            title: "FOR UNDERSTANDING THE CIRCLE",
            sacred: "Halazemath · Gehoron",
            content: "The Circle is perfection, eternity, the shape of the Heavens. It has no beginning and no end. Grant me understanding of all circular forms and the mystery of Pi.",
            instruction: "The circle represents divine perfection. Through it, understand the eternal nature of God's creation.",
            latin: "Halazemath, Gehoron, Themazar, Selamon, Gemath"
        },
        east: {
            title: "FOR UNDERSTANDING THE SQUARE",
            sacred: "Gezomalethon · Hesamar",
            content: "The Square is stability, the four elements, the four directions, the foundation of the Earth. Grant me understanding of all quadrilateral forms.",
            instruction: "The square represents earthly stability. Upon square foundations are built all lasting structures.",
            latin: "Gezomalethon, Hesamar, Thamathon, Helazar, Gema"
        },
        west: {
            title: "FOR ALL GEOMETRIC PROOFS",
            sacred: "Semalethon · Hazaram",
            content: "Grant me the power to discover and demonstrate all Geometric truths. Let me prove all theorems with perfect logic and construct all figures with accuracy.",
            instruction: "This completes the single Note of Geometry. With it, all spatial relationships become clear.",
            latin: "Semalethon, Hazaram, Gemath, Themosion, Helaz, Sama"
        },
        ring1: {
            title: "THE GEOMETRIC COMPASS",
            sacred: "Halazemathon · Gezorah",
            content: "As the Compass describes a perfect circle, so let this oration encompass all Geometric knowledge. All measures are true within this sacred boundary.",
            instruction: "Speak this before any geometric work, whether calculation or construction, to ensure all measures are perfect.",
            latin: "Halazemathon, Gezorah, Thematon, Selamon, Hezar, Gemarion"
        }
    },
    music: {
        center: {
            title: "NOTA MUSICAE - The Celestial Harmony",
            sacred: "Hamaloson · Gezethemia · Salamos",
            content: "Oh Lord of Harmony, who hast ordained the Music of the Spheres and given unto Man the gift of Song: Grant me understanding of all Music. Let me perceive the celestial harmonies and reproduce them in earthly sound.",
            instruction: "Music has but one Note, yet it contains all harmony. Contemplate it when Luna aspects Venus, planet of music and beauty.",
            latin: "Hamaloson, Gezethemia, Salamos, Themara, Helozion, Gema"
        },
        north: {
            title: "FOR PERFECT PITCH",
            sacred: "Themahorion · Selamaz",
            content: "Grant unto me perfect Pitch, that I may hear and reproduce any tone with exactness. Let my ear become perfectly attuned to all frequencies and intervals.",
            instruction: "This grants the ability to identify and produce any musical note with perfect accuracy. Essential for singers and instrumentalists.",
            latin: "Themahorion, Selamaz, Gezathon, Helios, Samara"
        },
        south: {
            title: "FOR UNDERSTANDING HARMONY",
            sacred: "Halezemion · Thamathon",
            content: "Reveal unto me the mysteries of Harmony: the Consonances and Dissonances, the perfect intervals and the imperfect. Let me understand how tones combine to create beauty.",
            instruction: "This unveils the mathematical relationships between musical notes. The foundation of all composition.",
            latin: "Halezemion, Thamathon, Sezamar, Gelion, Hematha"
        },
        east: {
            title: "FOR MASTERY OF RHYTHM",
            sacred: "Gemalathon · Hezomar",
            content: "Grant me perfect understanding of Rhythm and Time. Let me master all Meters, keep perfect Tempo, and understand the relationship between Music and Time.",
            instruction: "Rhythm is the temporal element of Music. Master it to give life and motion to melody and harmony.",
            latin: "Gemalathon, Hezomar, Themazar, Selathon, Gema"
        },
        west: {
            title: "FOR HEARING THE MUSIC OF THE SPHERES",
            sacred: "Salamazethon · Helomara",
            content: "Open my ears to hear the Celestial Music, the harmony of the Planets in their orbits. Let me perceive the cosmic symphony that underlies all earthly music.",
            instruction: "The deepest mystery of Music. Requires purity and long preparation. This connects Music to Astronomy.",
            latin: "Salamazethon, Helomara, Gezemathon, Thomion, Helaz"
        },
        ring1: {
            title: "THE HARMONIC CIRCLE",
            sacred: "Hamazonethon · Gelemara",
            content: "As all tones return to their origin in the octave, so this circle encompasses all Musical knowledge and returns it to its divine source.",
            instruction: "Speak this before practicing Music, composing, or performing. It attunes the soul to celestial harmony.",
            latin: "Hamazonethon, Gelemara, Themosion, Selamar, Hezion, Gema"
        }
    },
    astronomy: {
        center: {
            title: "NOTA ASTRONOMIAE - THE GREAT AND DANGEROUS ART",
            sacred: "Halamanethon · Gezoramatheion · Selamathoros",
            content: "Oh Lord God of Hosts, Creator of the Heavenly Bodies, Ordainer of the Stars in their courses: I approach thy most terrible and exalted Art with fear and trembling. Grant me knowledge of Celestial movements, but preserve me from the dangers attendant upon this study.",
            instruction: "EXTREME DANGER. Astronomy has Seven Notes corresponding to the Seven Planets. Twenty-four Angels attend. Fast for three days before approaching. Study only during specific planetary hours. One error may bring madness or death.",
            latin: "Halamanethon, Gezoramatheion, Selamathoros, Themagarion, Helez, Samar, Gemaltheon"
        },
        node1: {
            title: "FIRST NOTE - The Sun (Sol)",
            sacred: "Helios · Samaseol · Themahoron",
            content: "The Sun, center of all, source of Light and Life, ruler of the Day. By this Note, understand the Solar cycles, the year's progression, and the Sun's influence upon all earthly things.",
            instruction: "Study during the hour of the Sun. The First Note is least dangerous but still requires preparation and purity.",
            latin: "Helios, Samaseol, Themahoron, Gezamatheon, Hel, Samaros"
        },
        node2: {
            title: "SECOND NOTE - The Moon (Luna)",
            sacred: "Selene · Lemath · Halazemara",
            content: "The Moon, measurer of Time, mistress of Tides and Cycles, ruler of the Night. By this Note, understand Lunations, eclipses, and Luna's power over waters and the human mind.",
            instruction: "Study during the hour of the Moon. The Second Note affects dreams and visions. Use with caution.",
            latin: "Selene, Lemath, Halazemara, Themagarion, Sela, Gezem"
        },
        node3: {
            title: "THIRD NOTE - Mercury (Mercurius)",
            sacred: "Hermes · Thelegamathon · Sezorim",
            content: "Mercury, swift messenger, planet of Intellect and Communication. By this Note, understand the movements of the swiftest planet and its influence upon the mind.",
            instruction: "Study during the hour of Mercury. The Third Note heightens mental activity but may cause restlessness.",
            latin: "Hermes, Thelegamathon, Sezorim, Gemath, Helomara, Sema"
        },
        node4: {
            title: "FOURTH NOTE - Venus (Venus)",
            sacred: "Aphrodite · Halamathozeon · Gelemara",
            content: "Venus, morning and evening star, planet of Love and Beauty. By this Note, understand the cycles of Venus and its influence upon harmony and affection.",
            instruction: "Study during the hour of Venus. The Fourth Note is relatively safe but affects the passions.",
            latin: "Aphrodite, Halamathozeon, Gelemara, Themason, Hel, Samara"
        },
        north: {
            title: "FIFTH NOTE - Mars (Mars)",
            sacred: "Ares · Themagazeron · Helamoz",
            content: "Mars, the red planet, bringer of Strife and Courage. By this Note, understand the martial cycles and their influence upon War and Conflict. DANGEROUS.",
            instruction: "Study during the hour of Mars. The Fifth Note is DANGEROUS. It may provoke anger and violence. Approach only if pure of heart.",
            latin: "Ares, Themagazeron, Helamoz, Gezamath, Selamon, Thema"
        },
        south: {
            title: "SIXTH NOTE - Jupiter (Jove)",
            sacred: "Zeus · Salamathegon · Helomara",
            content: "Jupiter, king of the planets, bringer of Fortune and Expansion. By this Note, understand the twelve-year cycle of Jupiter and its beneficent influences.",
            instruction: "Study during the hour of Jupiter. The Sixth Note is relatively safe and brings good fortune if approached correctly.",
            latin: "Zeus, Salamathegon, Helomara, Gezemathon, Hela, Samara"
        },
        east: {
            title: "SEVENTH NOTE - Saturn (Saturnus)",
            sacred: "Chronos · Thalamageron · Sezemara",
            content: "Saturn, the old and cold planet, bringer of Time, Limitation, and Death. By this Note, understand the great cycles of Saturn. EXTREMELY DANGEROUS.",
            instruction: "EXTREME DANGER. Study during the hour of Saturn only. The Seventh Note brings knowledge of Time, aging, and mortality. Many who study it fall into melancholy or madness. Attempt only if absolutely necessary and completely prepared.",
            latin: "Chronos, Thalamageron, Sezemara, Halamatheon, Gez, Themos, Hela"
        },
        ring1: {
            title: "THE SPHERE OF THE FIXED STARS",
            sacred: "Themalasoragatheon · Hezelamara",
            content: "Beyond the seven wandering stars lies the Sphere of the Fixed Stars, the outer boundary of Creation. This ring encompasses all planetary knowledge and protects from celestial influences.",
            instruction: "ALWAYS speak this first before approaching any Astronomical Note. It provides essential protection from harmful celestial influences.",
            latin: "Themalasoragatheon, Hezelamara, Samalagorion, Helzem, Thema, Gezemarion, Sala"
        },
        ring2: {
            title: "THE TWENTY-FOUR ANGELS OF ASTRONOMY",
            sacred: "Semalathagorem · Hezelamatheon",
            content: "Twenty-four Angels attend the Art of Astronomy, three for each of the seven planets and three for the sphere of the stars. They protect, guide, and reveal celestial mysteries. Invoke them before any astronomical work.",
            instruction: "The Angels guard against the dangers inherent in Astronomy. NEVER attempt astronomical operations without invoking their protection first.",
            latin: "Semalathagorem, Hezelamatheon, Thalama, Gezemon, Helatha, Samarion, Themegos"
        }
    }
};

// General orations from Artem Novam - applicable to all arts
const generalOrations = {
    oration1: {
        title: "THE FIRST ORATION - For All Arts",
        sacred: "Heliamathe · Sezoralon · Themagazeron",
        content: "Omnipotent, Incomprehensible, invisible and indissolvable Lord God, whose Name is ineffable: Illuminate my Understanding and sanctify my Memory. Grant me perseverance in study and excellence in practice of the Sacred Arts.",
        instruction: "This first general oration may be used to begin the study of any of the Seven Arts. Speak it facing East at dawn.",
        latin: "Heliamathe, Sezoralon, Themagazeron, Heloms, Samaletheon, Gema"
    },
    oration2: {
        title: "THE SECOND ORATION - Confession and Preparation",
        sacred: "Themalazemaron · Helesemonon",
        content: "I confess my self guilty this day before thee Oh God, of many sins and offences. Purify me of all corruption that I may approach these Sacred Arts with a clean heart and pure mind.",
        instruction: "Speak this before beginning serious study. It purifies and prepares the mind for receiving divine knowledge.",
        latin: "Themalazemaron, Helesemonon, Gezamathos, Selamara, Hel"
    },
    oration3: {
        title: "THE THIRD ORATION - For Understanding",
        sacred: "Halethemagoron · Semalazemon",
        content: "Oh Holy God, merciful and omnipotent Father, illuminate my Understanding that I may comprehend these mysteries. Let no part be hidden from me, but all made clear by thy divine Light.",
        instruction: "Use when a concept or text is difficult to understand. This oration opens the mind to comprehension.",
        latin: "Halethemagoron, Semalazemon, Thamatheon, Gezela, Hemaros"
    },
    oration4: {
        title: "THE FOURTH ORATION - For Memory",
        sacred: "Semalathagemon · Helomarathon",
        content: "Lift up the senses of my Heart and Soul unto thee, and grant me Memory that fadeth not. Let all that I learn be retained perfectly, without loss or corruption.",
        instruction: "Speak after learning something important to seal it in Memory. Especially powerful when spoken at night before sleep.",
        latin: "Semalathagemon, Helomarathon, Themazeron, Gezala, Hems"
    },
    oration5: {
        title: "THE FIFTH ORATION - For Grace of the Holy Spirit",
        sacred: "Halemathazeron · Themosagemon",
        content: "Oh God of the living, Lord of all Creatures: Send forth thy Holy Spirit to guide my studies. Let divine inspiration flow through me as I contemplate these Sacred Arts.",
        instruction: "For receiving direct inspiration and divine guidance in study. The highest of the general orations.",
        latin: "Halemathazeron, Themosagemon, Selamarathon, Hel, Gezem"
    }
};

const artDescriptions = {
    grammar: {
        title: "NOTA PRIMA GRAMMATICAE",
        subtitle: "The First Note of the Art of Grammar - Three Notes Total",
        description: "Grammar is the foundation of all learning. Through these three Notes, perfect understanding of language is granted. Master the Ordination of Words, Figures of Speech, and Division of Parts.",
        lunation: "From Luna Day I to XIV, and from XIV to XVII. Inspect 12 times daily, repeat orations 24 times.",
        danger: "Low - Safe for beginners with proper devotion"
    },
    logic: {
        title: "NOTA DIALECTICAE",
        subtitle: "The Notes of Logic - Two and a Half Notes",
        description: "Logic teaches perfect reasoning and argument. Two full Notes grant Eloquence in Arguing and Prudence in Answering. The half Note grants swift comprehension of all syllogisms.",
        lunation: "During the Waxing Moon. Best when Luna increases in light.",
        danger: "Moderate - Requires mental preparation and clarity"
    },
    rhetoric: {
        title: "NOTA RHETORICAE",
        subtitle: "The Art of Eloquence - Four Notes",
        description: "Rhetoric grants supernatural eloquence and persuasive power. Four Notes reveal: Perfect Eloquence, Judgment in Speech, Powerful Testimony, and Deep Understanding of rhetorical devices.",
        lunation: "When Luna is in Mercury's house. Favorable for all speech and communication.",
        danger: "Moderate - Requires purity of intention and heart"
    },
    arithmetic: {
        title: "NOTA ARITHMETICAE",
        subtitle: "The Art of Numbers - One and a Half Notes",
        description: "Arithmetic reveals divine mathematics. The full Note grants perfect computational mastery. The half Note reveals the mystical properties and sacred meanings of all numbers.",
        lunation: "During calculated lunar aspects. Best at Quarter Moons when Luna forms perfect angles.",
        danger: "Moderate - Requires precision and focus"
    },
    geometry: {
        title: "NOTA GEOMETRIAE",
        subtitle: "The Single Note of Geometry",
        description: "Geometry is the measurement of Earth and Heaven. One powerful Note grants understanding of all figures, all measures, all spatial relationships. Triangle, Square, and Circle are revealed.",
        lunation: "At the Full Moon when Luna's circle is perfect in the Heavens.",
        danger: "Moderate - Requires contemplative focus"
    },
    music: {
        title: "NOTA MUSICAE",
        subtitle: "The Celestial Harmony - One Note",
        description: "Music connects Earth to the Celestial Spheres. One Note contains all harmony, revealing perfect pitch, understanding of harmony, mastery of rhythm, and the Music of the Spheres.",
        lunation: "When Luna aspects Venus. Most powerful on Fridays in Venus's hour.",
        danger: "Low - Harmonious and relatively safe practice"
    },
    astronomy: {
        title: "NOTA ASTRONOMIAE",
        subtitle: "The Great and Dangerous Art - Seven Notes",
        description: "Astronomy is the most exalted and most dangerous Art. Seven Notes corresponding to the Seven Planets: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn. Grants knowledge of celestial movements and influences.",
        lunation: "Each Note must be studied during its specific planetary hour. Fast for three days before approaching.",
        danger: "EXTREME - Only for the completely prepared. 24 Angels attend. One error may bring madness or death."
    }
};

let currentArt = 'grammar';
let currentNote = 1;

// Initialize the application
function init() {
    setupEventListeners();
    loadArt('grammar');
    updateClock();
    setInterval(updateClock, 60000); // Update every minute
}

function setupEventListeners() {
    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const art = this.getAttribute('data-art');
            loadArt(art);
        });
    });

    // Note buttons
    document.querySelectorAll('.note-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const note = parseInt(this.getAttribute('data-note'));
            selectNote(note);
        });
    });
}

function loadArt(art) {
    currentArt = art;
    const artData = artDescriptions[art];

    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-art') === art) {
            item.classList.add('active');
        }
    });

    // Update headers
    document.getElementById('artTitle').textContent = artData.title;
    document.getElementById('panelHeader').textContent = artData.title;
    document.querySelector('.manuscript-header p').textContent = artData.subtitle;

    // Generate appropriate sigil
    const sigilCanvas = document.getElementById('sigilCanvas');
    sigilCanvas.innerHTML = generateSigil(art);

    // Update panel content
    updatePanelWithArtInfo(artData);

    // Update status
    document.getElementById('statusText').textContent = `Viewing ${art.toUpperCase()} - Click on sigil elements to reveal orations`;
}

function updatePanelWithArtInfo(artData) {
    const dangerColor = artData.danger.includes('EXTREME') ? 'color: var(--ltred);' :
                        artData.danger.includes('Moderate') ? 'color: var(--yellow);' :
                        'color: var(--ltgreen);';

    document.getElementById('panelContent').innerHTML = `
        <div class="panel-section">
            <div class="panel-section-title">DESCRIPTION</div>
            <p class="oration-text">${artData.description}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">LUNATION TIMES</div>
            <p class="oration-text">${artData.lunation}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">DANGER LEVEL</div>
            <p class="oration-text" style="${dangerColor}">${artData.danger}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">INSTRUCTIONS</div>
            <p class="instruction-text">
                Click upon any circle, cross, or figure within the sigil to reveal its sacred oration and purpose.
                Approach with reverence. Speak the sacred names with precision.
            </p>
        </div>
    `;
}

function generateSigil(art) {
    switch(art) {
        case 'grammar': return generateGrammarSigil();
        case 'logic': return generateLogicSigil();
        case 'rhetoric': return generateRhetoricSigil();
        case 'arithmetic': return generateArithmeticSigil();
        case 'geometry': return generateGeometrySigil();
        case 'music': return generateMusicSigil();
        case 'astronomy': return generateAstronomySigil();
        default: return generateGrammarSigil();
    }
}

function generateGrammarSigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer rings -->
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="185"
                fill="none" stroke="#8B2500" stroke-width="2.5" opacity="0.8"/>
        <circle class="sigil-node" onclick="showOration('ring2')" cx="200" cy="200" r="155"
                fill="none" stroke="#8B2500" stroke-width="2" opacity="0.7"/>
        <circle cx="200" cy="200" r="125" fill="none" stroke="#8B2500" stroke-width="1.5" opacity="0.6"/>

        <!-- Cardinal circles (NSEW) -->
        <circle class="sigil-node" onclick="showOration('north')" cx="200" cy="75" r="38"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('south')" cx="200" cy="325" r="38"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('east')" cx="325" cy="200" r="38"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('west')" cx="75" cy="200" r="38"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Corner nodes (diagonal points) -->
        <circle class="sigil-node" onclick="showOration('node1')" cx="105" cy="105" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node2')" cx="295" cy="105" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node3')" cx="105" cy="295" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node4')" cx="295" cy="295" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>

        <!-- Connecting lines from corners to cardinals -->
        <line x1="133" y1="105" x2="162" y2="75" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="267" y1="105" x2="238" y2="75" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="133" y1="295" x2="162" y2="325" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="267" y1="295" x2="238" y2="325" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>

        <line x1="105" y1="133" x2="75" y2="162" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="105" y1="267" x2="75" y2="238" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="295" y1="133" x2="325" y2="162" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>
        <line x1="295" y1="267" x2="325" y2="238" stroke="#8B2500" stroke-width="1.5" opacity="0.5"/>

        <!-- Central cross -->
        <g class="sigil-node" onclick="showOration('cross')">
            <line x1="200" y1="155" x2="200" y2="245" stroke="#8B2500" stroke-width="3"/>
            <line x1="155" y1="200" x2="245" y2="200" stroke="#8B2500" stroke-width="3"/>
        </g>

        <!-- Small crosses in cardinal circles -->
        <line x1="200" y1="65" x2="200" y2="85" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="75" x2="210" y2="75" stroke="#8B2500" stroke-width="2"/>

        <line x1="200" y1="315" x2="200" y2="335" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="325" x2="210" y2="325" stroke="#8B2500" stroke-width="2"/>

        <line x1="315" y1="200" x2="335" y2="200" stroke="#8B2500" stroke-width="2"/>
        <line x1="325" y1="190" x2="325" y2="210" stroke="#8B2500" stroke-width="2"/>

        <line x1="65" y1="200" x2="85" y2="200" stroke="#8B2500" stroke-width="2"/>
        <line x1="75" y1="190" x2="75" y2="210" stroke="#8B2500" stroke-width="2"/>

        <!-- Center circles -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="30"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle cx="200" cy="200" r="15" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="200" cy="200" r="6" fill="#8B2500"/>

        <!-- Decorative elements -->
        <circle cx="200" cy="40" r="4" fill="#8B2500"/>
        <circle cx="200" cy="360" r="4" fill="#8B2500"/>
        <circle cx="40" cy="200" r="4" fill="#8B2500"/>
        <circle cx="360" cy="200" r="4" fill="#8B2500"/>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">GRAMMATICA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">Alpha et Omega</text>
    </svg>`;
}

function generateLogicSigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="175"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('ring2')" cx="200" cy="200" r="135"
                fill="none" stroke="#8B2500" stroke-width="2"/>

        <!-- Main vertical axis -->
        <circle class="sigil-node" onclick="showOration('north')" cx="200" cy="85" r="45"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('south')" cx="200" cy="315" r="45"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <line x1="200" y1="130" x2="200" y2="270" stroke="#8B2500" stroke-width="2"/>

        <!-- Center -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="35"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle cx="200" cy="200" r="12" fill="#8B2500"/>

        <!-- Mid nodes -->
        <circle class="sigil-node" onclick="showOration('node1')" cx="200" cy="150" r="15"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node2')" cx="200" cy="250" r="15"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Side arcs -->
        <path d="M 125 110 Q 75 200 125 290" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <path d="M 275 110 Q 325 200 275 290" fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Crosses -->
        <line x1="200" y1="75" x2="200" y2="95" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="85" x2="210" y2="85" stroke="#8B2500" stroke-width="2"/>
        <line x1="200" y1="305" x2="200" y2="325" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="315" x2="210" y2="315" stroke="#8B2500" stroke-width="2"/>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">DIALECTICA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">Truth through Argument</text>
    </svg>`;
}

function generateRhetoricSigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="180"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Four main circles -->
        <circle class="sigil-node" onclick="showOration('north')" cx="200" cy="65" r="40"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('east')" cx="335" cy="200" r="40"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('south')" cx="200" cy="335" r="40"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('west')" cx="65" cy="200" r="40"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Connecting diamond -->
        <path class="sigil-node" onclick="showOration('cross')"
              d="M 200 105 L 295 200 L 200 295 L 105 200 Z"
              fill="none" stroke="#8B2500" stroke-width="2"/>

        <!-- Center -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="45"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle cx="200" cy="200" r="20" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="200" cy="200" r="8" fill="#8B2500"/>

        <!-- Corner nodes -->
        <circle class="sigil-node" onclick="showOration('node1')" cx="115" cy="115" r="22"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node2')" cx="285" cy="115" r="22"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node3')" cx="115" cy="285" r="22"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node4')" cx="285" cy="285" r="22"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Crosses -->
        <line x1="200" y1="55" x2="200" y2="75" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="65" x2="210" y2="65" stroke="#8B2500" stroke-width="2"/>
        <line x1="325" y1="200" x2="345" y2="200" stroke="#8B2500" stroke-width="2"/>
        <line x1="335" y1="190" x2="335" y2="210" stroke="#8B2500" stroke-width="2"/>
        <line x1="200" y1="325" x2="200" y2="345" stroke="#8B2500" stroke-width="2"/>
        <line x1="190" y1="335" x2="210" y2="335" stroke="#8B2500" stroke-width="2"/>
        <line x1="55" y1="200" x2="75" y2="200" stroke="#8B2500" stroke-width="2"/>
        <line x1="65" y1="190" x2="65" y2="210" stroke="#8B2500" stroke-width="2"/>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">RHETORICA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">The Art of Eloquence</text>
    </svg>`;
}

function generateArithmeticSigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="165"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Main circle -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="85"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Half circle (the "half note") -->
        <path class="sigil-node" onclick="showOration('north')"
              d="M 115 200 A 85 85 0 0 1 285 200"
              fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Inner circles -->
        <circle cx="200" cy="200" r="35" fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle cx="200" cy="200" r="12" fill="#8B2500"/>

        <!-- Seven circles (for the seven liberal arts) -->
        <circle class="sigil-node" onclick="showOration('node1')" cx="200" cy="75" r="18"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node2')" cx="295" cy="125" r="18"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node3')" cx="315" cy="220" r="18"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle class="sigil-node" onclick="showOration('node4')" cx="260" cy="305" r="18"
                fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="140" cy="305" r="18" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="85" cy="220" r="18" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="105" cy="125" r="18" fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Number symbols -->
        <text x="200" y="80" text-anchor="middle" fill="#8B2500" font-size="12" font-weight="bold">I</text>
        <text x="295" y="130" text-anchor="middle" fill="#8B2500" font-size="12" font-weight="bold">II</text>
        <text x="315" y="225" text-anchor="middle" fill="#8B2500" font-size="12" font-weight="bold">III</text>
        <text x="260" y="310" text-anchor="middle" fill="#8B2500" font-size="12" font-weight="bold">IV</text>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">ARITHMETICA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">Numerus · Mensura · Pondus</text>
    </svg>`;
}

function generateGeometrySigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="175"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Triangle (pointing up) -->
        <path class="sigil-node" onclick="showOration('north')"
              d="M 200 65 L 315 285 L 85 285 Z"
              fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Square -->
        <rect class="sigil-node" onclick="showOration('center')"
              x="135" y="135" width="130" height="130"
              fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Circle -->
        <circle class="sigil-node" onclick="showOration('south')" cx="200" cy="200" r="55"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Center point and compass lines -->
        <circle cx="200" cy="200" r="10" fill="#8B2500"/>
        <line x1="200" y1="145" x2="200" y2="255" stroke="#8B2500" stroke-width="1.5"/>
        <line x1="145" y1="200" x2="255" y2="200" stroke="#8B2500" stroke-width="1.5"/>
        <line x1="161" y1="161" x2="239" y2="239" stroke="#8B2500" stroke-width="1"/>
        <line x1="239" y1="161" x2="161" y2="239" stroke="#8B2500" stroke-width="1"/>

        <!-- Corner marks -->
        <circle cx="200" cy="65" r="5" fill="#8B2500"/>
        <circle cx="315" cy="285" r="5" fill="#8B2500"/>
        <circle cx="85" cy="285" r="5" fill="#8B2500"/>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">GEOMETRIA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">Mensura Terrae et Caeli</text>
    </svg>`;
}

function generateMusicSigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="175"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Harmonic circles -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="125"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle cx="200" cy="200" r="85" fill="none" stroke="#8B2500" stroke-width="1.5"/>
        <circle cx="200" cy="200" r="45" fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Wave/string line -->
        <path class="sigil-node" onclick="showOration('north')"
              d="M 200 45 Q 235 95 200 145 Q 165 195 200 245 Q 235 295 200 345"
              fill="none" stroke="#8B2500" stroke-width="2.5"/>

        <!-- Horizontal "fret" lines -->
        <line x1="145" y1="115" x2="255" y2="115" stroke="#8B2500" stroke-width="1.5"/>
        <line x1="125" y1="200" x2="275" y2="200" stroke="#8B2500" stroke-width="1.5"/>
        <line x1="145" y1="285" x2="255" y2="285" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Center point -->
        <circle cx="200" cy="200" r="12" fill="#8B2500"/>

        <!-- Note markers -->
        <circle cx="200" cy="115" r="6" fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle cx="200" cy="285" r="6" fill="none" stroke="#8B2500" stroke-width="2"/>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">MUSICA</text>
        <text x="200" y="385" text-anchor="middle" fill="#8B2500" font-size="10" font-style="italic">Harmonia Caelestis</text>
    </svg>`;
}

function generateAstronomySigil() {
    return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Rings -->
        <circle class="sigil-node" onclick="showOration('ring1')" cx="200" cy="200" r="185"
                fill="none" stroke="#8B2500" stroke-width="2.5"/>
        <circle class="sigil-node" onclick="showOration('ring2')" cx="200" cy="200" r="155"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle cx="200" cy="200" r="125" fill="none" stroke="#8B2500" stroke-width="1.5"/>

        <!-- Seven planetary circles -->
        <circle class="sigil-node" onclick="showOration('node1')" cx="200" cy="45" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node2')" cx="315" cy="90" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node3')" cx="350" cy="210" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('node4')" cx="280" cy="325" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('north')" cx="120" cy="325" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('south')" cx="50" cy="210" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle class="sigil-node" onclick="showOration('east')" cx="85" cy="90" r="28"
                fill="none" stroke="#8B2500" stroke-width="2"/>

        <!-- Central sun -->
        <circle class="sigil-node" onclick="showOration('center')" cx="200" cy="200" r="55"
                fill="none" stroke="#8B2500" stroke-width="3"/>
        <circle cx="200" cy="200" r="30" fill="none" stroke="#8B2500" stroke-width="2"/>
        <circle cx="200" cy="200" r="15" fill="#8B2500"/>

        <!-- Rays from center to planets -->
        <line x1="200" y1="145" x2="200" y2="45" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="243" y1="157" x2="315" y2="90" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="255" y1="200" x2="350" y2="210" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="243" y1="243" x2="280" y2="325" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="157" y1="243" x2="120" y2="325" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="145" y1="200" x2="50" y2="210" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>
        <line x1="157" y1="157" x2="85" y2="90" stroke="#8B2500" stroke-width="1" stroke-dasharray="5,5" opacity="0.6"/>

        <!-- Planetary symbols (simplified) -->
        <text x="200" y="50" text-anchor="middle" fill="#8B2500" font-size="10">☉</text>
        <text x="315" y="95" text-anchor="middle" fill="#8B2500" font-size="10">☽</text>
        <text x="350" y="215" text-anchor="middle" fill="#8B2500" font-size="10">♂</text>
        <text x="280" y="330" text-anchor="middle" fill="#8B2500" font-size="10">☿</text>
        <text x="120" y="330" text-anchor="middle" fill="#8B2500" font-size="10">♃</text>
        <text x="50" y="215" text-anchor="middle" fill="#8B2500" font-size="10">♀</text>
        <text x="85" y="95" text-anchor="middle" fill="#8B2500" font-size="10">♄</text>

        <!-- Text labels -->
        <text x="200" y="30" text-anchor="middle" fill="#8B2500" font-size="11" font-style="italic" font-weight="bold">ASTRONOMIA</text>
        <text x="200" y="385" text-anchor="middle" fill="darkred" font-size="10" font-style="italic" font-weight="bold">⚠ GREAT AND DANGEROUS ⚠</text>
    </svg>`;
}

function showOration(key) {
    // Get art-specific oration or fall back to general oration
    let data = artOrations[currentArt]?.[key];

    // If not found in current art, check general orations
    if (!data && generalOrations[key]) {
        data = generalOrations[key];
    }

    if (!data) return;

    document.getElementById('panelContent').innerHTML = `
        <div class="panel-section">
            <div class="panel-section-title">${data.title}</div>
            <p class="sacred-text">${data.sacred}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">THE ORATION</div>
            <p class="oration-text">${data.content}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">INSTRUCTION</div>
            <p class="instruction-text">${data.instruction}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">SACRED NAMES</div>
            <p class="latin-text">${data.latin}</p>
        </div>
    `;

    document.getElementById('statusText').textContent = `Viewing: ${data.title}`;

    // Visual feedback
    document.querySelectorAll('.sigil-node').forEach(n => n.classList.remove('active'));
    event.target.closest('.sigil-node')?.classList.add('active');
}

function selectNote(num) {
    currentNote = num;
    document.querySelectorAll('.note-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-note')) === num) {
            btn.classList.add('active');
        }
    });

    // Update the panel to show information about the selected note
    const artData = artDescriptions[currentArt];
    const noteInfo = {
        grammar: {
            1: "The First Note of Grammar focuses on the Ordination of Words and Times. Inspect 12 times daily during Luna Days I-XIV.",
            2: "The Second Note of Grammar reveals Simple and Compound Figures of Speech. Master metaphor, synecdoche, and all rhetorical devices.",
            3: "The Third Note of Grammar teaches Division of Parts of Speech: Noun, Verb, Participle, Article, Pronoun, Preposition, Adverb, and Conjunction."
        },
        logic: {
            1: "The First Full Note grants Eloquence in Arguing. Construct perfect syllogisms with sound premises and inevitable conclusions.",
            2: "The Second Full Note grants Prudence in Answering. Detect flaws in false reasoning and respond with unassailable logic.",
            3: "The Half Note grants Swift Comprehension of complex arguments. Understand any syllogism instantly."
        },
        rhetoric: {
            1: "The First Note grants Perfect Eloquence. The Queen of all Speech removes impediments and grants supernatural fluency.",
            2: "The Second Note grants Judgment in Speech. Know what to say, when to say it, and to whom with perfect appropriateness.",
            3: "The Third Note grants Powerful Testimony. Your words carry weight, credibility, and authority.",
            4: "The Fourth Note grants Deep Understanding of all rhetorical devices: Metaphor, Simile, Allegory, Hyperbole."
        },
        arithmetic: {
            1: "The Full Note grants Computational Mastery. Understand all operations: Addition, Subtraction, Multiplication, Division.",
            2: "The Half Note reveals Mystical Numbers. Seven is perfection, Three is divine, Four is elemental, Twelve is completion."
        },
        geometry: {
            1: "The Single Note of Geometry grants understanding of Triangle, Circle, and Square - the foundational forms of all creation."
        },
        music: {
            1: "The Single Note of Music contains all harmony: Perfect Pitch, Understanding of Harmony, Mastery of Rhythm, and the Music of the Spheres."
        },
        astronomy: {
            1: "First Note: The Sun - Solar cycles and the year's progression. Study during the hour of the Sun.",
            2: "Second Note: The Moon - Lunations, eclipses, tides. Study during the hour of the Moon. CAUTION.",
            3: "Third Note: Mercury - Swift planet of intellect. Study during the hour of Mercury.",
            4: "Fourth Note: Venus - Morning star of love and beauty. Study during the hour of Venus.",
            5: "Fifth Note: Mars - The red planet. DANGEROUS. Study during the hour of Mars only.",
            6: "Sixth Note: Jupiter - King of planets, bringer of fortune. Study during the hour of Jupiter.",
            7: "Seventh Note: Saturn - EXTREMELY DANGEROUS. Study during the hour of Saturn only. Brings knowledge of Time, aging, and mortality."
        }
    };

    const noteText = noteInfo[currentArt]?.[num] || `Note ${num} of ${currentArt.toUpperCase()}`;

    document.getElementById('panelContent').innerHTML = `
        <div class="panel-section">
            <div class="panel-section-title">NOTE ${num} SELECTED</div>
            <p class="oration-text">${noteText}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">DESCRIPTION</div>
            <p class="oration-text">${artData.description}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">LUNATION TIMES</div>
            <p class="oration-text">${artData.lunation}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">DANGER LEVEL</div>
            <p class="oration-text" style="color: ${artData.danger.includes('EXTREME') ? 'var(--ltred)' : artData.danger.includes('Moderate') ? 'var(--yellow)' : 'var(--ltgreen)'};">${artData.danger}</p>
        </div>
        <div class="panel-section">
            <div class="panel-section-title">INSTRUCTIONS</div>
            <p class="instruction-text">
                Click upon any circle, cross, or figure within the sigil to reveal its sacred oration and purpose.
                Approach with reverence. Speak the sacred names with precision.
            </p>
        </div>
    `;

    document.getElementById('statusText').textContent = `Viewing ${currentArt.toUpperCase()} - Note ${num}`;
}

function resetView() {
    loadArt('grammar');
    document.querySelectorAll('.sigil-node').forEach(n => n.classList.remove('active'));
}

function togglePanel() {
    const panel = document.getElementById('sidePanel');
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

function toggleGallery() {
    const gallery = document.getElementById('manuscriptGallery');
    gallery.style.display = gallery.style.display === 'none' ? 'grid' : 'none';
}

function viewManuscriptPage(pageNum) {
    alert(`Viewing manuscript page ${pageNum}. In a full implementation, this would open a detailed view of the manuscript image.`);
}

function showIntro() {
    document.getElementById('introScreen').classList.remove('hidden');
}

function enterTheArt() {
    document.getElementById('introScreen').classList.add('hidden');
}

function updateClock() {
    const now = new Date();
    const hour = now.getHours();

    // Day of the Moon, counted from the true astronomical new moon (see lunar.js)
    const lunaEl = document.getElementById('lunaDay');
    if (window.Lunar) {
        const lun = Lunar.lunation(now);
        lunaEl.textContent = Lunar.toRoman(lun.day);
        lunaEl.title = 'Day ' + lun.day + ' of the Moon (' + Lunar.phaseName(lun.age) + ')';
    }

    // Planetary hour (simplified)
    const planetaryHour = (hour % 12) + 1;
    document.getElementById('currentHour').textContent = romanNumeral(planetaryHour);
}

function romanNumeral(num) {
    const lookup = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
        6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
        11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV'
    };
    return lookup[num] || num.toString();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
