/**
* Author: Jean Silva
* Version: 1.0
*/
const discoverEnvironment = (rawData) => {
    let debugEnvironment = (rawData.tunnelOwner.length == 0)
    let homologEnvironment = (rawData.tunnelOwner.match(/(hmg|homolog|homg)/gi))
    let developmentEnvironment = (rawData.tunnelOwner.match(/(dev|development|bet)/gi))
    let stagingEnvironment = (rawData.stagingEnvironment)
    if (debugEnvironment) return 'Dev'
    if (homologEnvironment) return 'Hmg'
    if (developmentEnvironment) return 'Tst'
    if (stagingEnvironment) return 'Stg'
    return 'Prd'
}

const discoverChannel = (config) => {
    if (config.originator.search('@wa.gw.msging.net') != -1) return 'WhatsApp'
    if (config.originator.search('@0mn.io') != -1) return 'WebChat'
    return 'Default'
}

const discoverBold = (config) => {
    let bold = {
        'WhatsApp': { ni: '*', nf: '*' },
        'WebChat': { ni: '<b>', nf: '</b>' },
        'Default': { ni: '', nf: '' },
    }
    return bold[config.channel]
}

const discoverItalic = (config) => {
    let italic = {
        'WhatsApp': { ii: '_', if: '_' },
        'WebChat': { ii: '<i>', if: '</i>' },
        'Default': { ii: '', if: '' },
    }
    return italic[config.channel]
}
/**
 * Main function of execution
 * [1] All input variables needs to be passed as function run() param.
 * [2] Objects received as param needs to be parsed. Ex.: JSON.parse(inputVariable).
 * [3] Objects returned needs to be stringfied. Ex.: JSON.stringify(inputVariable).
 */
function run(rawData) {
    let config = {}
    let textFormatter = {}
    let dataWit = new Date()
    let dayWit = (
        dataWit.getDate().toString().length == 1 ? `0${dataWit.getDate()}` : dataWit.getDate()

    )
    let monthWit = (
        dataWit.getMonth().toString().length == 1 ? `0${dataWit.getMonth() + 1}` : dataWit.getMonth() + 1
    )
    try {
        if (!rawData) throw new Error('rawData is empty!')
        config.environment = discoverEnvironment(rawData)
        config.originator = config.environment != 'Dev' ? rawData.tunnelOriginator : '{{config.client}}'
        config.channel = discoverChannel(config)
        textFormatter = discoverBold(config)
        config.ni = textFormatter.ni
        config.nf = textFormatter.nf
        textFormatter = discoverItalic(config)
        config.ii = textFormatter.ii
        config.if = textFormatter.if
        dataWit = `${dataWit.getFullYear()}${monthWit}${dayWit}`
        config.witUrl = `https://api.wit.ai/message?v=${dataWit}`
        config.witAuthorization = 'Bearer 437L4LEIZKDS5LLQ6VFE6CCSHNAR2B5D'
        return config
    } catch (error) {
        return error.toString()
    }
}

module.exports = run