export const CheapComputerConfigurations = [
    {
        scenario: 'Basic configuration',
        processor: 'Slow',
        ram: '2 GB',
        hdd: '320 GB',
        software: [
            'Image Viever [+5.00]'
        ],
        quantity: 1,
        expectedUnitPrice: 805.00,
        expectedSubtotal: 805.00
    },

    {
        scenario: 'Medium configuration',
        processor: 'Medium [+15.00]',
        ram: '4 GB [+20.00]',
        hdd: '320 GB',
        software: [
            'Office Suite [+100.00]'
        ],
        quantity: 1,
        expectedUnitPrice: 935.00,
        expectedSubtotal: 935.00
    },

    {
    scenario: 'High configuration',
    processor: 'Fast [+100.00]',
    ram: '8 GB [+60.00]',
    hdd: '400 GB [+100.00]',
    software: [
        'Other Office Suite [+40.00]'
    ],
    quantity: 1,
    expectedUnitPrice: 1100.00,
    expectedSubtotal: 1100.00
},

    {
        scenario: 'Maximum configuration with multiple software',
        processor: 'Fast [+100.00]',
        ram: '8 GB [+60.00]',
        hdd: '400 GB [+100.00]',
        software: [
            'Image Viever [+5.00]',
            'Office Suite [+100.00]',
            'Other Office Suite [+40.00]'
        ],
        quantity: 3,
        expectedUnitPrice: 1205,
        expectedSubtotal: 3615
    }
];