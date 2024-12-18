interface Configs {
  numberOfDecimal: number;
  colorScale: {
    pm25: Array<[number, string]>;
    temperature: Array<[number, string]>;
    humidity: Array<[number, string]>;
  };
  building: {
    [key: string]: {
      active: boolean;
      bgMap: boolean;
      camera: {
        position?: [number, number, number];
        minDistance: number;
        maxDistance: number;
      },
      floor?: {
        [key: string]: {
          active: boolean;
          documents?: {
            [key: string]: {
              name?: string;
              path?: string;
              [key: number]: { name: string; path: string };
            };
          };
          room?: {
            [key: string]: {
              active: boolean;
              cameraPosition: [number, number, number];
              minDistance: number;
              maxDistance: number;
              modalDistance: number;
              airCount: number;
              lampCount: number;
            };
          };
        };
      };
    };
  };
}

export const configs: Configs = {
  numberOfDecimal: 1,
  colorScale: {
    pm25: [
      [0, "#0000FF"],
      [0.1, "#00FF00"],
      [0.2, "#FFFF00"],
      [0.3, "#FF0000"],
      [0.4, "#9002a8"],
      [0.6, "#7002a8"],
      [0.5, "#600170"],
      [0.7, "#500072"],
      [0.8, "#440061"],
      [0.9, "#390051"],
      [1, "#220030"],
    ],
    temperature: [
      [0, "#0096e6"],
      [0.25, "#0ae282"],
      [0.5, "#ffff00"],
      [0.75, "#ffa500"],
      [1, "#ff0000"],
    ],
    humidity: [
      [0, "#ff0000"],
      [0.15, "#ffa500"],
      [0.3, "#ffff00"],
      [0.6, "#0ae282"],
      [1, "#0096e6"],
    ],
  },
  building: {
    en001: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 60,
      },
    },
    en101: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 60,
      },
    },
    en104: {
      active: true,
      bgMap: true,
      camera: {
        minDistance: 15,
        maxDistance: 30,
      },
      floor: {
        en10401: {
          active: true,
          room: {
            en1040101: {
              active: true,
              cameraPosition: [-16, 0, -4],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 12,
              airCount: 0,
              lampCount: 0
            },
            en1040102: {
              active: true,
              cameraPosition: [-7, 0, 0],
              minDistance: 12,
              maxDistance: 15,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040103: {
              active: true,
              cameraPosition: [10, 5, 0],
              minDistance: 7,
              maxDistance: 10,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040104: {
              active: true,
              cameraPosition: [16, 0, 0],
              minDistance: 10,
              maxDistance: 13,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040199: {
              active: true,
              cameraPosition: [0, 5, 0],
              minDistance: 20,
              maxDistance: 23,
              modalDistance: 20,
              airCount: 0,
              lampCount: 0
            }
          }
        },
        en10402: {
          active: true,
          room: {
            en1040201: {
              active: true,
              cameraPosition: [-15, 0, 0],
              minDistance: 12,
              maxDistance: 15,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040202: {
              active: true,
              cameraPosition: [-8.5, 0, 0],
              minDistance: 12,
              maxDistance: 15,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040203: {
              active: true,
              cameraPosition: [8.5, 0, 0],
              minDistance: 12,
              maxDistance: 15,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040204: {
              active: true,
              cameraPosition: [15, 0, 0],
              minDistance: 12,
              maxDistance: 15,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1040299: {
              active: true,
              cameraPosition: [0, 5, 0],
              minDistance: 20,
              maxDistance: 23,
              modalDistance: 25,
              airCount: 0,
              lampCount: 0
            }
          }
        }
      },
    },
    en105: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en106: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en107: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en108: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en110: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 20,
        maxDistance: 50,
      },
    },
    en113: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 90,
      },
    },
    en115: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en116: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en117: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 40,
        maxDistance: 80,
      },
    },
    en120: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en124: {
      active: true,
      bgMap: true,
      camera: {
        minDistance: 30,
        maxDistance: 100,
      },
      floor: {
        en12408: {
          active: true,
          documents: {
            air_con: {
              name: "Air Conditioner",
              path: "/documents/air-con/en124/08/AIR-08.pdf",
            },
            architecture: {
              name: "Architecture",
              path: "/documents/architecture/en124/08/ARCH-08.pdf",
            },
            EE: {
              name: "EE",
              path: "/documents/EE/en124/08/EE-08.pdf",
            },
            lighting_system: {
              name: "Lighting System",
              path: "/documents/lighting-system/en124/08/L-08.pdf",
            },
            sanitary_system: {
              1: {
                name: "Sanitary System 1",
                path: "/documents/sanitary-system/en124/08/SN-08.pdf",
              },
              2: {
                name: "Sanitary System 2",
                path: "/documents/sanitary-system/en124/08/SN-08(2).pdf",
              },
            },
          },
          room: {
            en1240801: {
              active: true,
              cameraPosition: [-11, 0, -21],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240802: {
              active: true,
              cameraPosition: [-7, 0, -21],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240803: {
              active: true,
              cameraPosition: [-3, 0, -20],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240804: {
              active: true,
              cameraPosition: [3, 3, -18.5],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 18,
              airCount: 0,
              lampCount: 0
            },
            en1240805: {
              active: true,
              cameraPosition: [12.5, 0, -17.5],
              minDistance: 15,
              maxDistance: 18,
              modalDistance: 18,
              airCount: 0,
              lampCount: 0
            },
            en1240806: {
              active: true,
              cameraPosition: [20, 0, -17.5],
              minDistance: 15,
              maxDistance: 18,
              modalDistance: 18,
              airCount: 0,
              lampCount: 0
            },
            en1240807: {
              active: true,
              cameraPosition: [-11, 0, -18],
              minDistance: 7,
              maxDistance: 10,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240808: {
              active: true,
              cameraPosition: [-3, 0, -17.2],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240809: {
              active: true,
              cameraPosition: [-3, 0, -15],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240810: {
              active: true,
              cameraPosition: [3, 3, -11],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240811: {
              active: true,
              cameraPosition: [20, 7, -7.5],
              minDistance: 5,
              maxDistance: 8,
              modalDistance: 15,
              airCount: 0,
              lampCount: 2
            },
            en1240812: {
              active: true,
              cameraPosition: [-9, 6, -3],
              minDistance: 9,
              maxDistance: 11,
              modalDistance: 20,
              airCount: 3,
              lampCount: 15
            },
            en1240813: {
              active: true,
              cameraPosition: [10, 5, 0],
              minDistance: 10,
              maxDistance: 15,
              modalDistance: 20,
              airCount: 0,
              lampCount: 0
            },
            en1240814: {
              active: true,
              cameraPosition: [21, 5.5, -3.2],
              minDistance: 5,
              maxDistance: 8,
              modalDistance: 11,
              airCount: 0,
              lampCount: 0
            },
            en1240815: {
              active: true,
              cameraPosition: [15, 1, 0],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240816: {
              active: true,
              cameraPosition: [20, 1, 0],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240817: {
              active: true,
              cameraPosition: [15, 1, 4],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240818: {
              active: true,
              cameraPosition: [-20, 2, 5.4],
              minDistance: 10,
              maxDistance: 12,
              modalDistance: 20,
              airCount: 3,
              lampCount: 9
            },
            en1240819: {
              active: true,
              cameraPosition: [-10, 3.5, 7.5],
              minDistance: 4.5,
              maxDistance: 6,
              modalDistance: 13,
              airCount: 0,
              lampCount: 0
            },
            en1240820: {
              active: true,
              cameraPosition: [9, 0, 8.5],
              minDistance: 7,
              maxDistance: 10,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240821: {
              active: true,
              cameraPosition: [13, 2, 8],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240822: {
              active: true,
              cameraPosition: [13, 2, 8],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240823: {
              active: true,
              cameraPosition: [-20, 7, 15],
              minDistance: 5,
              maxDistance: 7,
              modalDistance: 20,
              airCount: 0,
              lampCount: 0
            },
            en1240824: {
              active: true,
              cameraPosition: [-10, 6, 12],
              minDistance: 2,
              maxDistance: 4,
              modalDistance: 13,
              airCount: 0,
              lampCount: 0
            },
            en1240825: {
              active: true,
              cameraPosition: [12, 2, 11.2],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240826: {
              active: true,
              cameraPosition: [9.9, 2, 16.5],
              minDistance: 8,
              maxDistance: 11,
              modalDistance: 13,
              airCount: 1,
              lampCount: 1
            },
            en1240827: {
              active: true,
              cameraPosition: [15, 2, 15],
              minDistance: 8,
              maxDistance: 10,
              modalDistance: 13,
              airCount: 1,
              lampCount: 1
            },
            en1240828: {
              active: true,
              cameraPosition: [-12, 13, 22],
              minDistance: 1,
              maxDistance: 3,
              modalDistance: 20,
              airCount: 0,
              lampCount: 0
            },
            en1240829: {
              active: true,
              cameraPosition: [-4, 3, 21],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 20,
              airCount: 2,
              lampCount: 9
            },
            en1240830: {
              active: true,
              cameraPosition: [2, 0, 20],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240831: {
              active: true,
              cameraPosition: [6, 0, 19.5],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240832: {
              active: true,
              cameraPosition: [2, 0, 24],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240833: {
              active: true,
              cameraPosition: [6, 0, 23],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en1240899: {
              active: true,
              cameraPosition: [0, 0, 0],
              minDistance: 25,
              maxDistance: 40,
              modalDistance: 30,
              airCount: 0,
              lampCount: 24
            },
          },
        },
      },
    },
    en126: {
      active: true,
      bgMap: false,
      camera: {
        position: [72, 30, 60],
        minDistance: 40,
        maxDistance: 80,
      },
    },
    en161: {
      active: true,
      bgMap: false,
      camera: {
        minDistance: 30,
        maxDistance: 70,
      },
    },
    en202: {
      active: true,
      bgMap: true,
      camera: {
        minDistance: 40,
        maxDistance: 90,
      },
      floor: {
        en202b1: {
          active: true,
          room: {
            en202b101: {
              active: true,
              cameraPosition: [-8, 0, -16],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 12,
              airCount: 0,
              lampCount: 0
            },
            en202b102: {
              active: true,
              cameraPosition: [0, 0, -16.5],
              minDistance: 9,
              maxDistance: 12,
              modalDistance: 15,
              airCount: 0,
              lampCount: 0
            },
            en202b103: {
              active: true,
              cameraPosition: [15, 5, 0],
              minDistance: 24,
              maxDistance: 28,
              modalDistance: 40,
              airCount: 0,
              lampCount: 0
            },
            en202b199: {
              active: true,
              cameraPosition: [-10, 5, 0],
              minDistance: 24,
              maxDistance: 28,
              modalDistance: 40,
              airCount: 0,
              lampCount: 0
            }
          }
        },
        en20201: {
          active: true,
          room: {
            en2020101: {
              active: true,
              cameraPosition: [-16, 5, 0],
              minDistance: 24,
              maxDistance: 28,
              modalDistance: 40,
              airCount: 0,
              lampCount: 0
            },
            en2020102: {
              active: true,
              cameraPosition: [16, 5, 0],
              minDistance: 24,
              maxDistance: 28,
              modalDistance: 40,
              airCount: 0,
              lampCount: 0
            },
            en2020199: {
              active: true,
              cameraPosition: [0, 5, 0],
              minDistance: 24,
              maxDistance: 28,
              modalDistance: 40,
              airCount: 0,
              lampCount: 0
            }
          }
        },
      },
    },
  },
};
