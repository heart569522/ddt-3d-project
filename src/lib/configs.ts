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
      floor: {
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
      [0.5, "#600170"],
      [0.6, "#7002a8"],
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
      [0.25, "#ffa500"],
      [0.5, "#ffff00"],
      [0.75, "#0ae282"],
      [1, "#0096e6"],
    ],
  },
  building: {
    en124: {
      active: true,
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
            en1240818: {
              active: true,
              cameraPosition: [-20, 2, 5.4],
            },
          },
        },
      },
    },
    en202: {
      active: true,
      floor: {
        en20201: {
          active: false,
        },
        en20202: {
          active: false,
        },
      },
    },
  },
};
