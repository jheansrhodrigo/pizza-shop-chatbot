const { expect, describe, it } = require('@jest/globals')
const run = require('../globalVariables')

describe('GlobalVariables config', () => {
    it('should check run() function without passing parameters', async () => {
        let runFunction = run()
        expect(runFunction).toBeDefined()
    })

    it('should check run() function with passing parameters', async () => {
        let paramTest = 'OK'
        let runFunction = run(paramTest)
        expect(runFunction).toBeDefined()
    })

    it('should check if channel is WebChat', async () => {
        let rawData = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'ownerTest'
        }
        let runFunction = run(rawData)
        expect(runFunction.channel).toBe('WebChat')
    })

    it('should check if channel is WhatsApp', async () => {
        let rawData = {
            tunnelOriginator: '5548988776655@wa.gw.msging.net',
            tunnelOwner: 'ownerTest'
        }
        let runFunction = run(rawData)
        expect(runFunction.channel).toBe('WhatsApp')
    })

    it('should check if channel is Default', async () => {
        let rawData = {
            tunnelOriginator: 'originatorTest',
            tunnelOwner: 'ownerTest'
        }
        let runFunction = run(rawData)
        expect(runFunction.channel).toBe('Default')
    })

    it('should check bold to text formatter', async () => {
        let rawData1 = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'ownerTest'
        }
        let rawData2 = {
            tunnelOriginator: '5548988776655@wa.gw.msging.net',
            tunnelOwner: 'ownerTest'
        }
        let rawData3 = {
            tunnelOriginator: 'originatorTest',
            tunnelOwner: 'ownerTest'
        }
        expect(run(rawData1).ni).toBe('<b>')
        expect(run(rawData1).nf).toBe('</b>')
        expect(run(rawData2).ni).toBe('*')
        expect(run(rawData2).nf).toBe('*')
        expect(run(rawData3).ni).toBe('')
        expect(run(rawData3).nf).toBe('')
    })

    it('should check italic to text formatter', async () => {
        let rawData1 = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'ownerTest'
        }
        let rawData2 = {
            tunnelOriginator: '5548988776655@wa.gw.msging.net',
            tunnelOwner: 'ownerTest'
        }
        let rawData3 = {
            tunnelOriginator: 'originatorTest',
            tunnelOwner: 'ownerTest'
        }
        expect(run(rawData1).ii).toBe('<i>')
        expect(run(rawData1).if).toBe('</i>')
        expect(run(rawData2).ii).toBe('_')
        expect(run(rawData2).if).toBe('_')
        expect(run(rawData3).ii).toBe('')
        expect(run(rawData3).if).toBe('')
    })

    it('should check environment', async () => {
        let rawDebug = {
            tunnelOriginator: '',
            tunnelOwner: '',
            stagingEnvironment: false
        }
        let rawTest = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'pizzashopdev@msgingi.net',
            stagingEnvironment: false
        }
        let rawHomolog = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'pizzashophomolog@msgingi.net',
            stagingEnvironment: false
        }
        let rawStaging = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'pizzashop@msgingi.net',
            stagingEnvironment: true
        }
        let rawProduction = {
            tunnelOriginator: 'originatorTest@0mn.io',
            tunnelOwner: 'pizzashop@msgingi.net',
            stagingEnvironment: false
        }
        expect(run(rawDebug).environment).toBe('Dev')
        expect(run(rawTest).environment).toBe('Tst')
        expect(run(rawHomolog).environment).toBe('Hmg')
        expect(run(rawStaging).environment).toBe('Stg')
        expect(run(rawProduction).environment).toBe('Prd')
    })
})