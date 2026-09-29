// Derived from the original D3 graph and the CUNY dissertation LDA notebook.
// See README.md for provenance and interpretation limits.
window.topicNetworkData = {
  "topics": [
    {
      "id": 0,
      "label": "Translation & textual tradition",
      "count": 21,
      "interpretation": "Translation, textual tradition, and Spanish-language cultural history",
      "examples": [
        {
          "title": "Traduccion e interpretacion: Langston Hughes y Federico Garcia Lorca, encuentro en el lenguaje.",
          "year": 2007
        },
        {
          "title": "Continuidad y cambio en los condicionantes lingüísticos y socio-demográficos del uso del pronombre sujeto en el español de la primera generación en Nueva York",
          "year": 2017
        },
        {
          "title": "Mahoma en dos textos aljamiados del siglo XVI: La filosofía perenne y el monomito de los moriscos",
          "year": 2018
        }
      ]
    },
    {
      "id": 1,
      "label": "Subjectivity, politics & narrative",
      "count": 52,
      "interpretation": "Subjectivity, politics, and narrative in Hispanic literature",
      "examples": [
        {
          "title": "El caso de Mateo Alemán: La interaccion entre el derecho y la literatura en el informe de la mina de mercurio de Almaden y El Guzman de Alfarache",
          "year": 2019
        },
        {
          "title": "Origén e influencia de la figura de Simón Bolívar en los escritores modernistas hispanoamericanos",
          "year": 2016
        },
        {
          "title": "PRESENCIA, FUNCION Y MANEJO DEL MITO EN LA OBRA DEL INCA GARCILASO DE LA VEGA. (SPANISH TEXT).",
          "year": 1981
        }
      ]
    },
    {
      "id": 2,
      "label": "Literature, history & political change",
      "count": 45,
      "interpretation": "Narrative, cultural history, and state formation in Latin American contexts",
      "examples": [
        {
          "title": "Selva simbólica selva simbiótica apuntes para una ecocritica latinoamericana",
          "year": 2014
        },
        {
          "title": "The Prose Poem at the Outset of the Modernist Period in Latin America",
          "year": 1977
        },
        {
          "title": "Ánxel fole: Voz cultural y política de Galicia. Á lus do candil. Contos a carón do lume.",
          "year": 2016
        }
      ]
    },
    {
      "id": 3,
      "label": "Culture, politics & nation",
      "count": 37,
      "interpretation": "Culture, politics, nation, and social discourse",
      "examples": [
        {
          "title": "La nación está en otra parte: cultura y neoliberalismo en México (1977-1996)",
          "year": 2017
        },
        {
          "title": "Apocalipsis cultural e imaginación política: el caso de Madrid en el periodo entre crisis (2008–2020)",
          "year": 2020
        },
        {
          "title": "Silva y ciudad: Literatura, cultura y politica en Colombia, 1880--1896.",
          "year": 2002
        }
      ]
    },
    {
      "id": 4,
      "label": "Spanish language & sociolinguistics",
      "count": 41,
      "interpretation": "Spanish language, sociolinguistics, and literary/social analysis",
      "examples": [
        {
          "title": "Marginalidad y subversión en tres novelas de Juan Filloy de la década de 1930",
          "year": 2018
        },
        {
          "title": "Densidad léxica en la prensa hispana de EE.UU. e Hispanoamérica: Un estudio comparativo",
          "year": 2015
        },
        {
          "title": "Glotopolítica de la Desigualdad: Ideologías del Mapudungun y el Español en Chile (2009–2019)",
          "year": 2020
        }
      ]
    }
  ],
  "nodes": [
    {
      "id": "Translation & textual tradition",
      "type": "topic",
      "group": 0
    },
    {
      "id": "Dominican",
      "type": "word",
      "group": 0
    },
    {
      "id": "translation",
      "type": "word",
      "group": 0
    },
    {
      "id": "century",
      "type": "word",
      "group": 0
    },
    {
      "id": "Spanish",
      "type": "word",
      "group": 0
    },
    {
      "id": "text",
      "type": "word",
      "group": 0
    },
    {
      "id": "culture",
      "type": "word",
      "group": 0
    },
    {
      "id": "difference",
      "type": "word",
      "group": 0
    },
    {
      "id": "tradition",
      "type": "word",
      "group": 0
    },
    {
      "id": "criticism",
      "type": "word",
      "group": 0
    },
    {
      "id": "editing",
      "type": "word",
      "group": 0
    },
    {
      "id": "Subjectivity, politics & narrative",
      "type": "topic",
      "group": 1
    },
    {
      "id": "author",
      "type": "word",
      "group": 1
    },
    {
      "id": "politics",
      "type": "word",
      "group": 1
    },
    {
      "id": "novel",
      "type": "word",
      "group": 1
    },
    {
      "id": "narrative",
      "type": "word",
      "group": 1
    },
    {
      "id": "subjectivity",
      "type": "word",
      "group": 1
    },
    {
      "id": "Literature, history & political change",
      "type": "topic",
      "group": 2
    },
    {
      "id": "writer",
      "type": "word",
      "group": 2
    },
    {
      "id": "state",
      "type": "word",
      "group": 2
    },
    {
      "id": "literature",
      "type": "word",
      "group": 2
    },
    {
      "id": "history",
      "type": "word",
      "group": 2
    },
    {
      "id": "Culture, politics & nation",
      "type": "topic",
      "group": 3
    },
    {
      "id": "discourse",
      "type": "word",
      "group": 3
    },
    {
      "id": "nation",
      "type": "word",
      "group": 3
    },
    {
      "id": "social",
      "type": "word",
      "group": 3
    },
    {
      "id": "poetry",
      "type": "word",
      "group": 3
    },
    {
      "id": "Spanish language & sociolinguistics",
      "type": "topic",
      "group": 4
    },
    {
      "id": "language",
      "type": "word",
      "group": 4
    },
    {
      "id": "American",
      "type": "word",
      "group": 4
    },
    {
      "id": "Latin",
      "type": "word",
      "group": 4
    }
  ],
  "links": [
    {
      "source": "Translation & textual tradition",
      "target": "Dominican",
      "topic": 0,
      "weight": 0.015363364480435848
    },
    {
      "source": "Translation & textual tradition",
      "target": "translation",
      "topic": 0,
      "weight": 0.011656871065497398
    },
    {
      "source": "Translation & textual tradition",
      "target": "century",
      "topic": 0,
      "weight": 0.008586278185248375
    },
    {
      "source": "Translation & textual tradition",
      "target": "Spanish",
      "topic": 0,
      "weight": 0.007442195899784565
    },
    {
      "source": "Translation & textual tradition",
      "target": "text",
      "topic": 0,
      "weight": 0.006456272676587105
    },
    {
      "source": "Translation & textual tradition",
      "target": "culture",
      "topic": 0,
      "weight": 0.0059638842940330505
    },
    {
      "source": "Translation & textual tradition",
      "target": "difference",
      "topic": 0,
      "weight": 0.005814842879772186
    },
    {
      "source": "Translation & textual tradition",
      "target": "tradition",
      "topic": 0,
      "weight": 0.005674249026924372
    },
    {
      "source": "Translation & textual tradition",
      "target": "criticism",
      "topic": 0,
      "weight": 0.005314765498042107
    },
    {
      "source": "Translation & textual tradition",
      "target": "editing",
      "topic": 0,
      "weight": 0.0046211788430809975
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "author",
      "topic": 1,
      "weight": 0.008666954934597015
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "politics",
      "topic": 1,
      "weight": 0.007764540147036314
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "novel",
      "topic": 1,
      "weight": 0.006584359798580408
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "narrative",
      "topic": 1,
      "weight": 0.0058472431264817715
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "century",
      "topic": 1,
      "weight": 0.005544475745409727
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "text",
      "topic": 1,
      "weight": 0.005515242926776409
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "subjectivity",
      "topic": 1,
      "weight": 0.005357849877327681
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "Spanish",
      "topic": 1,
      "weight": 0.005146823823451996
    },
    {
      "source": "Subjectivity, politics & narrative",
      "target": "criticism",
      "topic": 1,
      "weight": 0.005018706899136305
    },
    {
      "source": "Literature, history & political change",
      "target": "writer",
      "topic": 2,
      "weight": 0.007441346999257803
    },
    {
      "source": "Literature, history & political change",
      "target": "narrative",
      "topic": 2,
      "weight": 0.007242274004966021
    },
    {
      "source": "Literature, history & political change",
      "target": "culture",
      "topic": 2,
      "weight": 0.007086124736815691
    },
    {
      "source": "Literature, history & political change",
      "target": "state",
      "topic": 2,
      "weight": 0.006855221930891275
    },
    {
      "source": "Literature, history & political change",
      "target": "author",
      "topic": 2,
      "weight": 0.006278469227254391
    },
    {
      "source": "Literature, history & political change",
      "target": "literature",
      "topic": 2,
      "weight": 0.006228105165064335
    },
    {
      "source": "Literature, history & political change",
      "target": "history",
      "topic": 2,
      "weight": 0.005419369321316481
    },
    {
      "source": "Literature, history & political change",
      "target": "criticism",
      "topic": 2,
      "weight": 0.004998940508812666
    },
    {
      "source": "Culture, politics & nation",
      "target": "culture",
      "topic": 3,
      "weight": 0.012003418058156967
    },
    {
      "source": "Culture, politics & nation",
      "target": "politics",
      "topic": 3,
      "weight": 0.009150845929980278
    },
    {
      "source": "Culture, politics & nation",
      "target": "discourse",
      "topic": 3,
      "weight": 0.0077047706581652164
    },
    {
      "source": "Culture, politics & nation",
      "target": "nation",
      "topic": 3,
      "weight": 0.006855968851596117
    },
    {
      "source": "Culture, politics & nation",
      "target": "social",
      "topic": 3,
      "weight": 0.006123365834355354
    },
    {
      "source": "Culture, politics & nation",
      "target": "literature",
      "topic": 3,
      "weight": 0.006053399760276079
    },
    {
      "source": "Culture, politics & nation",
      "target": "author",
      "topic": 3,
      "weight": 0.005657234229147434
    },
    {
      "source": "Culture, politics & nation",
      "target": "narrative",
      "topic": 3,
      "weight": 0.005471062380820513
    },
    {
      "source": "Culture, politics & nation",
      "target": "poetry",
      "topic": 3,
      "weight": 0.005360420793294907
    },
    {
      "source": "Culture, politics & nation",
      "target": "writer",
      "topic": 3,
      "weight": 0.005115854553878307
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "Spanish",
      "topic": 4,
      "weight": 0.02250567078590393
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "language",
      "topic": 4,
      "weight": 0.011950964108109474
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "novel",
      "topic": 4,
      "weight": 0.006587484385818243
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "author",
      "topic": 4,
      "weight": 0.006106564775109291
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "century",
      "topic": 4,
      "weight": 0.005620113108307123
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "American",
      "topic": 4,
      "weight": 0.0051328991539776325
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "Latin",
      "topic": 4,
      "weight": 0.004635649733245373
    },
    {
      "source": "Spanish language & sociolinguistics",
      "target": "social",
      "topic": 4,
      "weight": 0.004626828245818615
    }
  ]
};
