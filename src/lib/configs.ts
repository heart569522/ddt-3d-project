interface Configs {
  numberOfDecimal: number;
  building: {
    [key: string]: {
      active: boolean;
      floor: {
        [key: string]: {
          active: boolean;
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
  building: {
    en124: {
      active: true,
      floor: {
        en12408: {
          active: true,
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
