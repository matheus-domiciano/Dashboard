const DB = {
    clients: [
            {
                id: 154,
                name: 'Magnetti Marelli',
                cnpj: '64.822.024/0001-09',
                cpf: null,
                phone: '3198465-4556',
                addres: 'Rua Fake, 123 - Belo Horizinte/MG',
                contractID: 23
            },
            {
                id: 155,
                name: 'MANN+HUMMEL',
                cnpj: '64.822.024/0001-09',
                cpf: null,
                phone: '3198465-4556',
                addres: 'Rua Fake, 123 - Belo Horizinte/MG',
                contractID: 24
            }
        ],
        services: [
            {
                id: 236,
                clientID: 154,
                wedoID: 89,
                scheduled: false,
                start: "2025-07-13 09:12:30",
                estimatedTime: 458400, // Tempo estimado em segundos
                timeSpent: 318400, // Tempo gasto em segundos
                end: "2025-07-15 13:27:17",
                status: "finished", //started | inProgress | finished | cancelled
                priority: 'low', //["Low", "Medium", "High", "Critical"]
                employees: [
                    63,
                    64
                ]
            },
            {
                id: 237,
                clientID: 155,
                wedoID: 90,
                start: "2025-07-07 09:12:30",
                estimatedTime: "5 days",
                end: "2025-07-11 14:43:21",
                status: "cancelled", //started | inProgress | finished | cancelled
                employees: [
                    65,
                    66,
                    65,
                    67,
                    68
                ]
            },

        ],
        weDo: [
            {
                id: 89,
                category: "Inspeção",
                typeCharge: "perHour",
                basePrice: 27.55,
                unit: 1,
                description: "Inspeção de peças"
            },
            {
                id: 90,
                category: "Retrabalho",
                typeCharge: "perHour",
                basePrice: 32.83,
                unit: 1,
                description: "Inspeção de peças"
            },
        ],
        timeSheet: [
            {
                id: 665, 
                employeeID: 63, // Id Funcionário
                workDate: "13/06/2023",
                startTime: "", // Inicio trabalho
                breakStart: "", // Inicio Intervalo
                breakEnd: "", // Fim Intervalo
                endTime: "", // Fim trabalho
                total: "08:09:13", // Total Trabalhado
                overtime: "", // Hora extra em Minutos e Segundos
                latLong: "[]",
                supervisorSignature: true,
                employeeSignature: true,
                status: null,
                medicalLeave: false
            }
        ],
        clientsContracts: [
            {
                id: 23,
                date: '2019/05/23 15:46:23',
                staus: 'active', // ativo, em negociação, expirado, rescindido
                contractPurpose: ''

            }
        ],
        employees: [
            {
                id: 63,
                name: "Matheus",
                cpf: "15166525495",
                bDay: '1998/09/02',
                phone: '31984684465',
                contractID: 11,
                address: 'Rua Fake, 1 - MG/Contagem'
            },
            {
                id: 64,
                name: "Tamires",
                cpf: "14562348565",
            },
            {
                id: 65,
                name: "Ricardo",
                cpf: "14562348565",
            },
            {
                id: 66,
                name: "Bruna",
                cpf: "14562348565",
            },
            {
                id: 67,
                name: "Thiago",
                cpf: "14562348565",
            },
            {
                id: 68,
                name: "Roger",
                cpf: "14562348565",
            }
        ],
        employeeContracts: [
            {
                id: 11,
                signatureDate: '2013/05/18',
                function: "Auxiliar de Qualidade",
                salary: "1650,22",
            },
            {
                id: 64,
                function: "Inspetor de Qualidade I",
                salary: "2330,23",
            }
    ]
}

export default DB